// Copper's Hobbies — Related Products Carousel
(function () {
  'use strict';

  if (!/\/p\/[^/]+/.test(window.location.pathname)) return;

  // ── CSS ───────────────────────────────────────────────────────────────────
  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#ch-related{font-family:"Work Sans",sans-serif;color:#1f1c18;padding:52px 0 64px;border-top:1px solid #ece4d6;background:#fff;margin-top:40px}',
    '#ch-related *{box-sizing:border-box}',
    '.ch-rel-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:600px){.ch-rel-inner{padding:0 20px}}',
    '.ch-rel-eye{font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin:0 0 10px}',
    '.ch-rel-heading{font-family:"Cormorant Garamond",serif;font-size:28px;font-weight:500;color:#1f1c18;margin:0 0 28px;line-height:1.2}',
    '.ch-rel-wrap{position:relative}',
    '.ch-rel-track{display:flex;gap:16px;overflow-x:auto;overflow-y:visible;scroll-snap-type:x mandatory;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none;cursor:grab;padding:4px 0 4px}',
    '.ch-rel-track::-webkit-scrollbar{display:none}',
    '.ch-rel-track.is-dragging{cursor:grabbing;scroll-behavior:auto;user-select:none;scroll-snap-type:none}',
    '.ch-rel-card{flex:0 0 200px;scroll-snap-align:start;text-decoration:none;color:inherit;display:flex;flex-direction:column;border:1px solid #ece4d6;border-radius:8px;overflow:hidden;background:#fff;transition:border-color .18s,box-shadow .18s}',
    '.ch-rel-card:hover{border-color:#c9943a;box-shadow:0 4px 16px rgba(201,148,58,.12)}',
    '.ch-rel-img{aspect-ratio:1/1;background:#f5f1eb center/cover no-repeat;flex-shrink:0}',
    '.ch-rel-info{padding:11px 13px 13px;display:flex;flex-direction:column;gap:5px;flex:1}',
    '.ch-rel-name{font-size:13px;font-weight:500;color:#1f1c18;margin:0;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
    '.ch-rel-price{font-size:13px;color:#c9943a;font-weight:600;margin:0;margin-top:auto}',
    '.ch-rel-arrow{position:absolute;top:50%;transform:translateY(-50%);width:36px;height:36px;border-radius:50%;background:#fff;border:1px solid #ece4d6;box-shadow:0 2px 8px rgba(0,0,0,.1);display:flex;align-items:center;justify-content:center;font-size:20px;line-height:1;color:#1f1c18;cursor:pointer;z-index:2;padding:0;transition:background .15s,opacity .2s}',
    '.ch-rel-arrow:hover{background:#faf7f1}',
    '.ch-rel-arrow--left{left:-18px}',
    '.ch-rel-arrow--right{right:-18px}',
    '.ch-rel-arrow.is-hidden{opacity:0;pointer-events:none}',
    '@media(max-width:1160px){.ch-rel-arrow--left{left:4px}.ch-rel-arrow--right{right:4px}}',
    '@media(max-width:600px){.ch-rel-arrow{display:none}.ch-rel-card{flex-basis:150px}}',
    // Accessories section
    '#ch-acc{font-family:"Work Sans",sans-serif;color:#1f1c18;padding:52px 0 56px;border-top:1px solid #ece4d6;background:#faf7f1;margin-top:40px}',
    '#ch-acc *{box-sizing:border-box}',
    '.ch-acc-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:600px){.ch-acc-inner{padding:0 20px}}',
    '.ch-acc-eye{font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin:0 0 10px}',
    '.ch-acc-heading{font-family:"Cormorant Garamond",serif;font-size:28px;font-weight:500;color:#1f1c18;margin:0 0 28px;line-height:1.2}',
    '.ch-acc-wrap{position:relative}',
    '.ch-acc-track{display:flex;gap:16px;overflow-x:auto;overflow-y:visible;scroll-snap-type:x mandatory;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none;cursor:grab;padding:4px 0 4px}',
    '.ch-acc-track::-webkit-scrollbar{display:none}',
    '.ch-acc-track.is-dragging{cursor:grabbing;scroll-behavior:auto;user-select:none;scroll-snap-type:none}'
  ].join('');
  document.head.appendChild(styleEl);

  // ── Shared helpers ────────────────────────────────────────────────────────
  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function card(p) {
    var n = parseFloat(p.p);
    return '<a class="ch-rel-card" href="' + esc(p.u) + '">' +
      '<div class="ch-rel-img"' + (p.img ? ' style="background-image:url(\'' + esc(p.img) + '\')"' : '') + '></div>' +
      '<div class="ch-rel-info">' +
        '<p class="ch-rel-name">' + esc(p.t) + '</p>' +
        (n ? '<p class="ch-rel-price">$' + n.toFixed(2) + '</p>' : '') +
      '</div>' +
    '</a>';
  }
  function wireCarousel(track, btnL, btnR) {
    var STEP = 220;
    function syncArrows() {
      btnL.classList.toggle('is-hidden', track.scrollLeft < 1);
      btnR.classList.toggle('is-hidden', track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
    }
    syncArrows();
    track.addEventListener('scroll', syncArrows, { passive: true });
    btnL.addEventListener('click', function() { track.scrollBy({ left: -STEP, behavior: 'smooth' }); });
    btnR.addEventListener('click', function() { track.scrollBy({ left:  STEP, behavior: 'smooth' }); });
    var drag = { on: false, moved: false, x0: 0, sl0: 0 };
    track.addEventListener('dragstart', function(e) { e.preventDefault(); });
    track.addEventListener('mousedown', function(e) {
      drag.on = true; drag.moved = false; drag.x0 = e.pageX; drag.sl0 = track.scrollLeft;
      track.classList.add('is-dragging');
    });
    function endDrag() { drag.on = false; track.classList.remove('is-dragging'); }
    track.addEventListener('mouseup',    endDrag);
    track.addEventListener('mouseleave', endDrag);
    track.addEventListener('mousemove', function(e) {
      if (!drag.on) return;
      var dx = e.pageX - drag.x0;
      if (Math.abs(dx) > 4) { drag.moved = true; track.scrollLeft = drag.sl0 - dx; }
    });
    track.addEventListener('click', function(e) { if (drag.moved) e.preventDefault(); }, true);
  }

  // ── Recommended accessories ───────────────────────────────────────────────
  var ACC = {
    sandingSticks : ['p/kamiyasu-sanding-stick-1000-10mm-gh-ks10-p1000', 'p/dspiae-semi-rigid-sanding-sticks', 'p/flex-i-file-combo-set-flx-123'],
    hobbyKnives   : ['p/narrow-blade-hobby-knife-dsp-at-dk02', 'p/1-light-duty-knife-wsafety-cap'],
    nippers       : ['p/sharp-point-side-cutters-tam-74035', 'p/dspiae-single-blade-precision-nipper-dsp-st-a30', 'p/metal-wire-nipper-mini-gh-swn-100-m'],
    toolSet       : ['p/dspiae-tc-s01-departure-tool-combo-set-dsp-tc-s01'],
    tweezers      : ['p/tweezer-4-12-curve-pointed-excel-30410', 'p/dspiae-crane-beak-tweezers-dsp-at-tz04'],
    panelLiner    : ['p/panel-accent-color-black'],
    cement        : ['p/tamiya-extra-thin-cement-40ml'],
    clearCoat     : ['p/mr-super-clear-spray-gloss-mrhob-b513'],
    paint         : ['p/tamiya-acrylic-paints-10ml', 'p/vallejo-model-color', 'p/ak-interactive-real-colors-17ml']
  };

  function pickOne(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function lookupUrl(products, urlPath) {
    var needle = '/' + urlPath.replace(/^\//, '');
    for (var i = 0; i < products.length; i++) {
      if (products[i].u === needle) return products[i];
    }
    return null;
  }

  function getAccPicks(kitType, products) {
    var urls = [];
    if (kitType === 'traditional-kit') {
      urls = [
        pickOne(ACC.nippers),
        pickOne(ACC.sandingSticks),
        pickOne(ACC.paint),
        ACC.cement[0],
        ACC.clearCoat[0],
        pickOne(ACC.tweezers)
      ];
    } else if (kitType === 'snap-fit') {
      urls = [
        pickOne(ACC.nippers.concat(ACC.toolSet)),
        pickOne(ACC.hobbyKnives),
        pickOne(ACC.sandingSticks),
        ACC.panelLiner[0],
        ACC.clearCoat[0],
        pickOne(ACC.tweezers)
      ];
    }
    return urls.map(function(u) { return lookupUrl(products, u); }).filter(Boolean);
  }

  function renderAccessories(current, products) {
    var tags = current.tags || [];
    var kitType = tags.indexOf('traditional-kit') !== -1 ? 'traditional-kit'
                : tags.indexOf('snap-fit')        !== -1 ? 'snap-fit'
                : null;
    if (!kitType) return;

    var picks = getAccPicks(kitType, products);
    if (!picks.length) return;

    var container = document.createElement('div');
    container.id = 'ch-acc';
    container.innerHTML =
      '<div class="ch-acc-inner">' +
        '<p class="ch-acc-eye">Complete Your Build</p>' +
        '<h2 class="ch-acc-heading">What you\'ll need</h2>' +
        '<div class="ch-acc-wrap">' +
          '<button class="ch-rel-arrow ch-rel-arrow--left is-hidden" aria-label="Scroll left">&#8249;</button>' +
          '<div class="ch-acc-track">' + picks.map(card).join('') + '</div>' +
          '<button class="ch-rel-arrow ch-rel-arrow--right" aria-label="Scroll right">&#8250;</button>' +
        '</div>' +
      '</div>';

    var main = document.querySelector('main, #page, .Site-inner') || document.body;
    main.appendChild(container);
    wireCarousel(
      container.querySelector('.ch-acc-track'),
      container.querySelector('.ch-rel-arrow--left'),
      container.querySelector('.ch-rel-arrow--right')
    );
  }

  // ── Related product algorithm ─────────────────────────────────────────────
  function getRelated(cur, products) {
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

    others.filter(function(p) { return p.c === cur.c && catOverlap(p) && inPrice(p, 0.2); }).forEach(take);
    others.filter(function(p) { return p.c === cur.c && catOverlap(p) && inPrice(p, 0.4); }).forEach(take);
    others.filter(function(p) { return p.c === cur.c && catOverlap(p); }).forEach(take);
    others.filter(function(p) { return catOverlap(p); }).forEach(take);

    return out;
  }

  // ── Render ────────────────────────────────────────────────────────────────
  function render(products) {
    var path = window.location.pathname;
    var current = null;
    for (var i = 0; i < products.length; i++) {
      if (products[i].u === path) { current = products[i]; break; }
    }
    if (!current) return;

    // Accessories first so it sits above related products in the DOM
    renderAccessories(current, products);

    var picks = getRelated(current, products);
    if (!picks.length) return;

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

    wireCarousel(
      container.querySelector('.ch-rel-track'),
      container.querySelector('.ch-rel-arrow--left'),
      container.querySelector('.ch-rel-arrow--right')
    );
  }

  // ── Init: use in-memory products if ready, otherwise wait for chReady ─────
  if (window.__chProducts && window.__chProducts.length) {
    render(window.__chProducts);
  } else {
    window.addEventListener('chReady', function() {
      render(window.__chProducts || []);
    }, { once: true });
  }

}());
