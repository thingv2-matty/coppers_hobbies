#!/usr/bin/env node
// Adds snap-fit or traditional-kit tags to model kit products in a Squarespace CSV.
// Non-kit products (paints, tools, terrain, etc.) are left completely untouched.
// Existing tags on all products are preserved — the new tag is appended only.

const fs   = require('fs');
const path = require('path');
const { parse }     = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');

const INPUT   = process.argv[2];
if (!INPUT) { console.error('Usage: node tag-kits.js <input.csv>'); process.exit(1); }

// Categories that indicate this row is an actual model kit
const KIT_CATS = [
  '/cars', '/trucks', '/military', '/aircraft', '/ships',
  '/sci-fi-and-space', '/motorcycles', '/figures', '/diorama'
];

// These brands are always snap-fit coloured plastic — no paint, no glue
const SNAP_BRANDS = ['/bandai', '/snaa', '/good-smile-company'];

// These brands have BOTH traditional and snap lines — check title keywords
const SNAP_TITLE_BRANDS = ['/aoshima', '/revell', '/revell-germany'];

// These slugs appear alongside kit categories but aren't actual kits
const NON_KIT_SLUGS = [
  '/vallejo', '/ak-interactive', '/ammo-by-mig', '/all-game-terrain',
  '/gamers-grass', '/plastruct', '/matho-models', '/many-minis',
  '/tamiya-supplies', '/master-tools'
];

function parseCats(raw) {
  return (raw || '').split(',').map(function(c) { return c.trim(); }).filter(Boolean);
}

function getKitTag(cats, title) {
  if (cats.some(function(c) { return SNAP_BRANDS.indexOf(c) !== -1; }))
    return 'snap-fit';

  if (cats.some(function(c) { return SNAP_TITLE_BRANDS.indexOf(c) !== -1; })) {
    var t = title.toUpperCase();
    if (t.indexOf('SNAP KIT') !== -1 || t.indexOf('SNAP-KIT') !== -1) return 'snap-fit';
    if (t.indexOf('SNAP') !== -1) return 'snap-fit';
    return 'traditional-kit';
  }

  return 'traditional-kit';
}

function addTag(existing, newTag) {
  var tags = (existing || '').split(',').map(function(t) { return t.trim(); }).filter(Boolean);
  if (tags.indexOf(newTag) !== -1) return existing; // already tagged
  tags.push(newTag);
  return tags.join(', ');
}

var csvContent = fs.readFileSync(INPUT, 'utf8');
var rows = parse(csvContent, { columns: true, skip_empty_lines: false });

var snapCount        = 0;
var traditionalCount = 0;
var skippedCount     = 0;

rows.forEach(function(row) {
  var id    = (row['Product ID [Non Editable]'] || '').trim();
  var title = (row['Title'] || '').trim();
  if (!id) return; // variant continuation row — never touch

  var cats = parseCats(row['Categories']);
  var isKit = cats.some(function(c) { return KIT_CATS.indexOf(c) !== -1; });
  var isNonKit = cats.some(function(c) { return NON_KIT_SLUGS.indexOf(c) !== -1; });

  if (!isKit || isNonKit) { skippedCount++; return; }

  var tag = getKitTag(cats, title);
  row['Tags'] = addTag(row['Tags'], tag);

  if (tag === 'snap-fit') snapCount++;
  else traditionalCount++;
});

var outFile = INPUT.replace(/\.csv$/, '') + '-tagged.csv';
fs.writeFileSync(outFile, stringify(rows, { header: true, columns: Object.keys(rows[0]) }));

console.log('Done.');
console.log('  snap-fit tags added:       ' + snapCount);
console.log('  traditional-kit tags added: ' + traditionalCount);
console.log('  non-kit rows skipped:       ' + skippedCount);
console.log('\nOutput: ' + outFile);
