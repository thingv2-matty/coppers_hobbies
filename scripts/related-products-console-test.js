// CONSOLE TEST — paste into DevTools on any product page, refresh to remove
// Reads from localStorage cache (ch_search_v7) — visit a shop page first if blank
(function () {
  'use strict';

  if (!window.location.pathname.includes('/p/')) {
    console.warn('[CH Related] Not a product page'); return;
  }

  // ── Load product index (in-memory first, localStorage fallback) ───────────
  var products = (window.__chProducts && window.__chProducts.length) ? window.__chProducts : [];
  if (!products.length) {
    try {
      var raw = localStorage.getItem('ch_search_v7');
      if (raw) products = JSON.parse(raw).products || [];
    } catch(e) {}
  }

  if (!products.length) {
    console.warn('[CH Related] No products loaded yet — wait a few seconds for the index to build, then try again'); return;
  }

  // ── Find the product this page is for ────────────────────────────────────────
  var path = window.location.pathname;
  var current = null;
  for (var i = 0; i < products.length; i++) {
    if (products[i].u === path) { current = products[i]; break; }
  }
  if (!current) { console.warn('[CH Related] Product not in index:', path); return; }

  // ── Related product algorithm ─────────────────────────────────────────────
  // cats array contains both category names AND brand names, so category overlap
  // naturally groups same-brand products first, which is the desired behaviour.
  function getRelated(cur) {
    var price = parseFloat(cur.p) || 0;
    var others = products.filter(function(p) { return p.id !== cur.id; });

    function catOverlap(p) {
      return cur.cats.length > 0 && cur.cats.some(function(c) { return (p.cats || []).indexOf(c) !== -1; });
    }
    function inPrice(p, pct) {
      if (!price) return true;
      var pp = parseFloat(p.p) || 0;
      return pp >= price * (1 - pct) && pp <= price * (1 + pct);
    }

    var seen = {}, out = [];
    function take(p) { if (!seen[p.id] && out.length < 8) { seen[p.id] = true; out.push(p); } }

    // T1: same collection + any shared tag + ±20% price
    others.filter(function(p) { return p.c === cur.c && catOverlap(p) && inPrice(p, 0.2); }).forEach(take);
    // T2: same collection + any shared tag + ±40% price
    others.filter(function(p) { return p.c === cur.c && catOverlap(p) && inPrice(p, 0.4); }).forEach(take);
    // T3: same collection + any shared tag (any price)
    others.filter(function(p) { return p.c === cur.c && catOverlap(p); }).forEach(take);
    // T4: cross-collection + any shared tag (fills edge cases like brushes across collections)
    others.filter(function(p) { return catOverlap(p); }).forEach(take);

    return out;
  }

  var picks = getRelated(current);
  if (!picks.length) { console.warn('[CH Related] No related products found for:', current.t); return; }

  // ── CSS ───────────────────────────────────────────────────────────────────
  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#ch-related{font-family:"Work Sans",sans-serif;color:#1f1c18;padding:52px 0 64px;border-top:1px solid #ece4d6;background:#fff;margin-top:40px}',
    '#ch-related *{box-sizing:border-box}',
    '.ch-rel-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:600px){.ch-rel-inner{padding:0 20px}}',
    '.ch-rel-eye{font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin:0 0 10px}',
    '.ch-rel-heading{font-family:"Cormorant Garamond",serif;font-size:28px;font-weight:500;color:#1f1c18;margin:0 0 28px;line-height:1.2}',

    // Carousel wrapper — position:relative so arrows can anchor to it
    '.ch-rel-wrap{position:relative}',

    // Track
    '.ch-rel-track{display:flex;gap:16px;overflow-x:auto;overflow-y:visible;scroll-snap-type:x mandatory;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none;cursor:grab;padding:4px 0 4px}',
    '.ch-rel-track::-webkit-scrollbar{display:none}',
    '.ch-rel-track.is-dragging{cursor:grabbing;scroll-behavior:auto;user-select:none}',

    // Cards
    '.ch-rel-card{flex:0 0 200px;scroll-snap-align:start;text-decoration:none;color:inherit;display:flex;flex-direction:column;border:1px solid #ece4d6;border-radius:8px;overflow:hidden;background:#fff;transition:border-color .18s,box-shadow .18s}',
    '.ch-rel-card:hover{border-color:#c9943a;box-shadow:0 4px 16px rgba(201,148,58,.12)}',
    '.ch-rel-img{aspect-ratio:1/1;background:#f5f1eb center/cover no-repeat;flex-shrink:0}',
    '.ch-rel-info{padding:11px 13px 13px;display:flex;flex-direction:column;gap:5px;flex:1}',
    '.ch-rel-name{font-size:13px;font-weight:500;color:#1f1c18;margin:0;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
    '.ch-rel-price{font-size:13px;color:#c9943a;font-weight:600;margin:0;margin-top:auto}',

    // Arrow buttons
    '.ch-rel-arrow{position:absolute;top:50%;transform:translateY(-50%);width:36px;height:36px;border-radius:50%;background:#fff;border:1px solid #ece4d6;box-shadow:0 2px 8px rgba(0,0,0,.1);display:flex;align-items:center;justify-content:center;font-size:20px;line-height:1;color:#1f1c18;cursor:pointer;z-index:2;padding:0;transition:background .15s,opacity .2s}',
    '.ch-rel-arrow:hover{background:#faf7f1}',
    '.ch-rel-arrow--left{left:-18px}',
    '.ch-rel-arrow--right{right:-18px}',
    '.ch-rel-arrow.is-hidden{opacity:0;pointer-events:none}',
    // On tight screens, tuck arrows inside the track edge
    '@media(max-width:1160px){.ch-rel-arrow--left{left:4px}.ch-rel-arrow--right{right:4px}}',
    // On mobile, hide arrows — touch scrolling handles navigation
    '@media(max-width:600px){.ch-rel-arrow{display:none}.ch-rel-card{flex-basis:150px}}'
  ].join('');
  document.head.appendChild(styleEl);

  // ── Build HTML ─────────────────────────────────────────────────────────────
  function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function fmtPrice(p) {
    var n = parseFloat(p.p);
    return n ? '$' + n.toFixed(2) : '';
  }
  function card(p) {
    var imgStyle = p.img ? ' style="background-image:url(\'' + esc(p.img) + '\')"' : '';
    var price = fmtPrice(p);
    return '<a class="ch-rel-card" href="' + esc(p.u) + '">' +
      '<div class="ch-rel-img"' + imgStyle + '></div>' +
      '<div class="ch-rel-info">' +
        '<p class="ch-rel-name">' + esc(p.t) + '</p>' +
        (price ? '<p class="ch-rel-price">' + price + '</p>' : '') +
      '</div>' +
    '</a>';
  }

  var container = document.createElement('div');
  container.id = 'ch-related';
  container.innerHTML =
    '<div class="ch-rel-inner">' +
      '<p class="ch-rel-eye">From Our Shop</p>' +
      '<h2 class="ch-rel-heading">You might also like</h2>' +
      '<div class="ch-rel-wrap">' +
        '<button class="ch-rel-arrow ch-rel-arrow--left is-hidden" aria-label="Scroll left">&#8249;</button>' +
        '<div class="ch-rel-track">' + picks.map(card).join('') + '</div>' +
        '<button class="ch-rel-arrow ch-rel-arrow--right" aria-label="Scroll right">&#8250;</button>' +
      '</div>' +
    '</div>';

  var main = document.querySelector('main, #page, .Site-inner') || document.body;
  main.appendChild(container);

  // ── Carousel logic ─────────────────────────────────────────────────────────
  var track = container.querySelector('.ch-rel-track');
  var btnL  = container.querySelector('.ch-rel-arrow--left');
  var btnR  = container.querySelector('.ch-rel-arrow--right');
  var STEP  = 220;

  function syncArrows() {
    btnL.classList.toggle('is-hidden', track.scrollLeft < 1);
    btnR.classList.toggle('is-hidden', track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
  }

  syncArrows();
  track.addEventListener('scroll', syncArrows, { passive: true });
  btnL.addEventListener('click', function() { track.scrollBy({ left: -STEP, behavior: 'smooth' }); });
  btnR.addEventListener('click', function() { track.scrollBy({ left:  STEP, behavior: 'smooth' }); });

  // Click-and-drag
  var drag = { on: false, moved: false, x0: 0, sl0: 0 };
  // Stop the browser dragging the <a> card as a native link drag
  track.addEventListener('dragstart', function(e) { e.preventDefault(); });
  track.addEventListener('mousedown', function(e) {
    drag.on    = true;
    drag.moved = false;
    drag.x0    = e.pageX;
    drag.sl0   = track.scrollLeft;
    track.classList.add('is-dragging');
  });
  function endDrag() { drag.on = false; track.classList.remove('is-dragging'); }
  track.addEventListener('mouseup',    endDrag);
  track.addEventListener('mouseleave', endDrag);
  track.addEventListener('mousemove', function(e) {
    if (!drag.on) return;
    var dx = e.pageX - drag.x0;
    if (Math.abs(dx) > 4) {
      drag.moved = true;
      track.scrollLeft = drag.sl0 - dx;
    }
  });
  // If the user actually dragged, swallow the click so the card doesn't navigate
  track.addEventListener('click', function(e) {
    if (drag.moved) e.preventDefault();
  }, true);

  // Hide right arrow if carousel doesn't overflow
  window.addEventListener('load', syncArrows);

  console.log('[CH Related] Showing', picks.length, 'related products for:', current.t);
}());
