#!/usr/bin/env node
// Coppers Hobbies — product description backfill
// =================================================
// Reads a Squarespace product CSV export, finds products whose existing
// description is under MIN_WORDS words (covers empty, "NEW!!!", "5m in
// length", etc.), generates a real description for those via Claude, and
// writes an updated CSV ready to re-import into Squarespace.
//
// Products with a real description (>= MIN_WORDS words) are left untouched.
// Variant continuation rows (blank Product ID) are never modified.
//
// USAGE:
//   ANTHROPIC_API_KEY=sk-ant-... node generate-descriptions.js products.csv --dry-run
//   ANTHROPIC_API_KEY=sk-ant-... node generate-descriptions.js products.csv --limit=10
//   ANTHROPIC_API_KEY=sk-ant-... node generate-descriptions.js products.csv

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');

// ── Config ──────────────────────────────────────────────────────────────────
const MIN_WORDS    = 10;
const CONCURRENCY  = 5;
const MODEL        = 'claude-sonnet-4-6';
const CHECKPOINT   = path.join(__dirname, 'descriptions-cache.json');

const args      = process.argv.slice(2);
const INPUT     = args.find(function(a) { return !a.startsWith('--'); });
const DRY_RUN   = args.includes('--dry-run');
const LIMIT_ARG = args.find(function(a) { return a.startsWith('--limit='); });
const LIMIT     = LIMIT_ARG ? parseInt(LIMIT_ARG.split('=')[1], 10) : null;

if (!INPUT) {
  console.error('Usage: node generate-descriptions.js <input.csv> [--dry-run] [--limit=N]');
  process.exit(1);
}

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY && !DRY_RUN) {
  console.error('Missing ANTHROPIC_API_KEY environment variable.');
  console.error('Run with --dry-run to preview without calling the API, or set the key:');
  console.error('  ANTHROPIC_API_KEY=sk-ant-... node generate-descriptions.js ' + INPUT);
  process.exit(1);
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function stripHtml(html) {
  return (html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(html) {
  var text = stripHtml(html);
  return text ? text.split(' ').filter(Boolean).length : 0;
}

function cleanCategories(raw) {
  return (raw || '')
    .split(',')
    .map(function(c) { return c.trim().replace(/^\//, '').replace(/-/g, ' '); })
    .filter(Boolean)
    .join(', ');
}

function wrapHtml(text) {
  return '<p style="white-space:pre-wrap;" data-rte-preserve-empty="true">' + text + '</p>';
}

async function generateDescription(title, categories) {
  var prompt = 'Write a concise, factual 2-sentence product description for a hobby and art supply store listing. ' +
    'Do not use marketing fluff or filler phrases like "discover" or "introducing", and do not just restate the title. ' +
    'Describe what the product is and its key feature(s) in plain, helpful language for a shopper browsing the store.\n\n' +
    'Product title: ' + title + '\n' +
    'Categories: ' + (categories || 'none listed') + '\n\n' +
    'Reply with ONLY the description text, no preamble or quotes.';

  var res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 150,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!res.ok) {
    var body = await res.text();
    throw new Error('Anthropic API ' + res.status + ': ' + body.slice(0, 200));
  }

  var data = await res.json();
  return data.content[0].text.trim();
}

// ── Checkpoint cache (Product ID -> generated description) ─────────────────
function loadCache() {
  if (fs.existsSync(CHECKPOINT)) {
    return JSON.parse(fs.readFileSync(CHECKPOINT, 'utf8'));
  }
  return {};
}

function saveCache(cache) {
  fs.writeFileSync(CHECKPOINT, JSON.stringify(cache, null, 2));
}

// ── Simple concurrency pool ──────────────────────────────────────────────────
function processInPool(items, worker, concurrency) {
  var index = 0, active = 0, completed = 0;
  return new Promise(function(resolve) {
    function next() {
      if (index >= items.length && active === 0) return resolve();
      while (active < concurrency && index < items.length) {
        var item = items[index++];
        active++;
        worker(item)
          .catch(function(err) { console.error('  ✗ ' + (item.Title || '?') + ': ' + err.message); })
          .finally(function() {
            active--;
            completed++;
            if (completed % 25 === 0 || completed === items.length) {
              console.log('  ' + completed + '/' + items.length + ' processed...');
            }
            next();
          });
      }
    }
    next();
  });
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('Reading ' + INPUT + '...');
  var csvContent = fs.readFileSync(INPUT, 'utf8');
  var rows = parse(csvContent, { columns: true, skip_empty_lines: false });
  console.log('Total rows: ' + rows.length);

  var noTitle = rows.filter(function(r) {
    return (r['Product ID [Non Editable]'] || '').trim() !== '' && (r['Title'] || '').trim() === '';
  });
  if (noTitle.length) {
    console.log(noTitle.length + ' product(s) have no title — skipping these, nothing to generate from:');
    noTitle.forEach(function(r) { console.log('  SKU ' + r['SKU'] + ' (Product ID ' + r['Product ID [Non Editable]'] + ')'); });
  }

  var candidates = rows.filter(function(r) {
    if ((r['Product ID [Non Editable]'] || '').trim() === '') return false; // variant continuation row
    if ((r['Title'] || '').trim() === '') return false; // no title, nothing to generate from
    return wordCount(r['Description']) < MIN_WORDS;
  });
  console.log('Products needing a description: ' + candidates.length);

  var toProcess = LIMIT ? candidates.slice(0, LIMIT) : candidates;
  if (LIMIT) console.log('--limit=' + LIMIT + ' set, processing first ' + toProcess.length + ' only');

  if (DRY_RUN) {
    console.log('\n--- DRY RUN: no API calls made, no files written ---\n');
    toProcess.slice(0, 25).forEach(function(r) {
      console.log('[' + wordCount(r['Description']) + 'w] ' + r['Title']);
    });
    if (toProcess.length > 25) console.log('... and ' + (toProcess.length - 25) + ' more');
    console.log('\nTotal that would be processed: ' + toProcess.length);
    return;
  }

  var cache = loadCache();
  var apiCalls = 0;

  console.log('Generating descriptions (concurrency=' + CONCURRENCY + ')...');
  await processInPool(toProcess, async function(row) {
    var id = row['Product ID [Non Editable]'];
    if (cache[id]) return; // already done in a previous run
    var categories = cleanCategories(row['Categories']);
    var desc = await generateDescription(row['Title'], categories);
    cache[id] = desc;
    apiCalls++;
    if (apiCalls % 20 === 0) saveCache(cache);
  }, CONCURRENCY);

  saveCache(cache);
  console.log('\nGenerated ' + apiCalls + ' new descriptions (' + Object.keys(cache).length + ' total cached).');

  // Apply descriptions and track which product IDs were updated
  var updatedIds = new Set();
  rows.forEach(function(row) {
    var id = row['Product ID [Non Editable]'];
    if (id && cache[id]) {
      row['Description'] = wrapHtml(cache[id]);
      updatedIds.add(id);
    }
  });

  // Build a filtered CSV containing only rows belonging to updated products.
  // Variant continuation rows have a blank Product ID — they belong to the last
  // seen product ID, so we include them when that product was updated.
  var lastId = null;
  var filteredRows = rows.filter(function(row) {
    var id = row['Product ID [Non Editable]'];
    if (id) lastId = id;
    return updatedIds.has(lastId);
  });

  var outFile = INPUT.replace(/\.csv$/, '') + '-updated.csv';
  var output = stringify(filteredRows, { header: true, columns: Object.keys(rows[0]) });
  fs.writeFileSync(outFile, output);

  console.log('\nWrote ' + outFile);
  console.log(updatedIds.size + ' products updated (' + filteredRows.length + ' rows) — import this file only.');
  console.log('Squarespace will upsert these products and leave everything else untouched.');
}

main().catch(function(err) {
  console.error('Fatal error:', err);
  process.exit(1);
});
