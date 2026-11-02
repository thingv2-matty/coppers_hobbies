// Copper's Hobbies — Copper's Canvas Challenge store page
(function () {
  'use strict';

  var PATH = window.location.pathname.replace(/\/$/, '');
  var CC = '/coppers-canvas-challenge';
  var IS_COLLECTION = PATH === CC;
  var IS_PRODUCT = /^\/coppers-canvas-challenge\/p\//.test(PATH);

  if (!IS_COLLECTION && !IS_PRODUCT) return;

  var HS_LOGO = 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/91c19826-4ac6-4174-b892-0bf8848b2b16/KWSP+HS+Logo.png?content-type=image%2Fpng';

  var MEDIUM_LABELS = { acrylic: 'Acrylic', watercolour: 'Watercolour', oil: 'Oil', mixedmedia: 'Mixed Media' };
  var STYLE_LABELS  = { abstract: 'Abstract', nature: 'Nature', realism: 'Realism' };

  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#ch-cc{font-family:"Work Sans",sans-serif;color:#1f1c18;line-height:1.6}',
    '#ch-cc *{box-sizing:border-box}',

    // Banner
    '.ch-cc-banner{background:#faf7f1;border-bottom:1px solid #ece4d6;padding:72px 32px 60px}',
    '.ch-cc-banner-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 210px;gap:52px;align-items:center}',
    '@media(max-width:820px){.ch-cc-banner-inner{grid-template-columns:1fr;gap:36px}}',
    '@media(max-width:600px){.ch-cc-banner{padding:48px 20px 44px}}',
    '.ch-cc-banner-eye{display:block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#c9943a;margin-bottom:16px}',
    '.ch-cc-banner-h1{font-family:"Cormorant Garamond",serif;font-size:clamp(34px,4.5vw,52px);font-weight:500;color:#1f1c18;margin:0 0 22px;line-height:1.1;text-wrap:balance}',
    '.ch-cc-banner-p{font-size:15px;color:#5e5850;line-height:1.8;margin:0 0 14px}',
    '.ch-cc-banner-p:last-of-type{margin-bottom:0}',
    '.ch-cc-banner-p a{color:#c9943a;text-decoration:underline}',
    '.ch-cc-banner-p a:hover{color:#b5832f}',

    // HS support block
    '.ch-cc-hs{text-align:center}',
    '.ch-cc-hs-label{display:block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#c9943a;margin-bottom:12px}',
    '.ch-cc-hs-link{display:block;text-decoration:none}',
    '.ch-cc-hs-logo{max-width:190px;width:100%;height:auto;display:block;margin:0 auto;transition:opacity .2s}',
    '.ch-cc-hs-link:hover .ch-cc-hs-logo{opacity:.8}',
    '@media(max-width:820px){.ch-cc-hs{display:flex;align-items:center;gap:18px;text-align:left}.ch-cc-hs-label{margin:0}.ch-cc-hs-logo{max-width:130px}}',

    // Body layout
    '.ch-cc-body{max-width:1100px;margin:0 auto;padding:48px 32px 80px;display:flex;gap:40px;align-items:flex-start}',
    '@media(max-width:760px){.ch-cc-body{flex-direction:column;padding:32px 20px 60px;gap:28px}}',

    // Sidebar
    '.ch-cc-sidebar{width:220px;flex-shrink:0;position:sticky;top:100px}',
    '@media(max-width:760px){.ch-cc-sidebar{width:100%;position:static}}',
    '.ch-cc-filter-section{margin-bottom:24px}',
    '.ch-cc-filter-h{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1f1c18;margin:0 0 14px;padding:0 0 10px;border-bottom:1px solid #ece4d6}',
    '.ch-cc-filter-opt{display:flex;align-items:center;gap:9px;margin-bottom:9px;cursor:pointer;user-select:none}',
    '.ch-cc-filter-opt input{width:16px;height:16px;accent-color:#c9943a;cursor:pointer;flex-shrink:0;margin:0}',
    '.ch-cc-filter-opt span{font-size:14px;color:#5e5850;line-height:1.3}',
    '.ch-cc-filter-opt:hover span{color:#1f1c18}',
    '.ch-cc-price-val{font-size:13px;color:#5e5850;margin:0 0 10px}',
    '.ch-cc-price-range{width:100%;accent-color:#c9943a;cursor:pointer;display:block}',
    '.ch-cc-clear{display:block;margin-top:4px;font-size:13px;font-weight:600;color:#c9943a;background:none;border:none;padding:0;cursor:pointer;font-family:inherit;text-align:left}',
    '.ch-cc-clear:hover{color:#b5832f}',

    // Main content
    '.ch-cc-content{flex:1;min-width:0}',
    '.ch-cc-meta{font-size:13px;color:#8a8273;margin:0 0 24px;letter-spacing:.02em}',

    // Grid
    '.ch-cc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}',
    '@media(max-width:960px){.ch-cc-grid{grid-template-columns:repeat(2,1fr)}}',
    '@media(max-width:560px){.ch-cc-grid{grid-template-columns:1fr;gap:16px}}',

    // Card
    '.ch-cc-card{background:#fff;border:1px solid #ece4d6;border-radius:10px;overflow:hidden;display:block;text-decoration:none;color:inherit;transition:box-shadow .2s,transform .15s}',
    '.ch-cc-card:hover{box-shadow:0 6px 24px rgba(0,0,0,.09);transform:translateY(-2px)}',
    '.ch-cc-card-img{width:100%;aspect-ratio:1;background-size:cover;background-position:center;background-color:#ede3d2}',
    '.ch-cc-card-body{padding:14px 16px 18px}',
    '.ch-cc-card-medium{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8a8273;margin:0 0 5px}',
    '.ch-cc-card-title{font-family:"Cormorant Garamond",serif;font-size:18px;font-weight:500;color:#1f1c18;margin:0 0 10px;line-height:1.25;text-wrap:balance}',
    '.ch-cc-card-footer{display:flex;align-items:center;justify-content:space-between;gap:8px}',
    '.ch-cc-card-price{font-size:14px;font-weight:600;color:#1f1c18}',
    '.ch-cc-card-nfs{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9e9589;border:1px solid #d8d0c4;border-radius:4px;padding:3px 9px}',
    '.ch-cc-card-view{font-size:13px;font-weight:600;color:#c9943a}',

    // Empty / loading states
    '.ch-cc-empty{padding:60px 20px;text-align:center;color:#8a8273;font-size:15px;grid-column:1/-1}',
    '.ch-cc-loading{text-align:center;padding:100px 32px;color:#8a8273;font-size:15px}',
  ].join('');
  document.head.appendChild(styleEl);

  function isNFS(item) {
    return Array.isArray(item.tags) && item.tags.indexOf('cc_nfs') !== -1;
  }
  function getTag(item, prefix) {
    if (!Array.isArray(item.tags)) return null;
    for (var i = 0; i < item.tags.length; i++) {
      if (item.tags[i].indexOf(prefix) === 0) return item.tags[i].slice(prefix.length);
    }
    return null;
  }
  function formatPrice(cents) {
    var s = (cents / 100).toFixed(2);
    return '$' + s.replace(/\.00$/, '');
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ── Collection page ──────────────────────────────────────────────
  if (IS_COLLECTION) {

    var allItems = [];
    var activeMedia = {};
    var activeStyles = {};
    var maxPrice = 0;
    var priceMax = 0;

    function fetchAll(url, acc, cb) {
      fetch(url)
        .then(function (r) { return r.json(); })
        .then(function (d) {
          var all = acc.concat(d.items || []);
          var next = d.pagination && d.pagination.nextPage;
          if (next) { fetchAll(next, all, cb); } else { cb(all); }
        })
        .catch(function () { cb(acc); });
    }

    function render() {
      var medKeys = Object.keys(activeMedia).filter(function (k) { return activeMedia[k]; });
      var styKeys = Object.keys(activeStyles).filter(function (k) { return activeStyles[k]; });

      var filtered = allItems.filter(function (item) {
        var med = getTag(item, 'cctype_');
        var sty = getTag(item, 'ccstyle_');
        var price = item.variants && item.variants[0] ? item.variants[0].price : 0;
        if (medKeys.length && medKeys.indexOf(med) === -1) return false;
        if (styKeys.length && styKeys.indexOf(sty) === -1) return false;
        if (!isNFS(item) && price > priceMax) return false;
        return true;
      });

      var cards = filtered.map(function (item) {
        var nfs = isNFS(item);
        var med = getTag(item, 'cctype_');
        var price = item.variants && item.variants[0] ? item.variants[0].price : 0;
        var imgSrc = item.assetUrl ? item.assetUrl.split('?')[0] + '?format=600w' : '';
        var url = item.fullUrl || (CC + '/p/' + (item.urlId || ''));
        return '<a href="' + esc(url) + '" class="ch-cc-card">' +
          '<div class="ch-cc-card-img" style="background-image:url(' + imgSrc + ')"></div>' +
          '<div class="ch-cc-card-body">' +
            (med && MEDIUM_LABELS[med] ? '<p class="ch-cc-card-medium">' + esc(MEDIUM_LABELS[med]) + '</p>' : '') +
            '<h3 class="ch-cc-card-title">' + esc(item.title) + '</h3>' +
            '<div class="ch-cc-card-footer">' +
              (nfs
                ? '<span class="ch-cc-card-nfs">Not for Sale</span>'
                : (price ? '<span class="ch-cc-card-price">' + formatPrice(price) + '</span>' : '') +
                  '<span class="ch-cc-card-view">View →</span>') +
            '</div>' +
          '</div>' +
        '</a>';
      }).join('');

      var grid = document.getElementById('ch-cc-grid');
      var meta = document.getElementById('ch-cc-meta');
      if (grid) grid.innerHTML = cards || '<p class="ch-cc-empty">No pieces match your filters.</p>';
      if (meta) meta.textContent = filtered.length + ' piece' + (filtered.length !== 1 ? 's' : '');
    }

    function buildSidebar() {
      var saleItems = allItems.filter(function (i) { return !isNFS(i); });
      var prices = saleItems.map(function (i) {
        return i.variants && i.variants[0] ? i.variants[0].price : 0;
      }).filter(Boolean);
      maxPrice = prices.length ? Math.max.apply(null, prices) : 0;
      priceMax = maxPrice;

      var medSet = {}, stySet = {};
      allItems.forEach(function (item) {
        var med = getTag(item, 'cctype_');
        var sty = getTag(item, 'ccstyle_');
        if (med) medSet[med] = true;
        if (sty) stySet[sty] = true;
      });

      var medOpts = Object.keys(MEDIUM_LABELS).filter(function (k) { return medSet[k]; }).map(function (k) {
        return '<label class="ch-cc-filter-opt"><input type="checkbox" data-med="' + k + '"><span>' + MEDIUM_LABELS[k] + '</span></label>';
      }).join('');

      var styOpts = Object.keys(STYLE_LABELS).filter(function (k) { return stySet[k]; }).map(function (k) {
        return '<label class="ch-cc-filter-opt"><input type="checkbox" data-sty="' + k + '"><span>' + STYLE_LABELS[k] + '</span></label>';
      }).join('');

      var priceSection = (maxPrice > 0 && saleItems.length)
        ? '<div class="ch-cc-filter-section">' +
            '<p class="ch-cc-filter-h">Price</p>' +
            '<p class="ch-cc-price-val" id="ch-cc-price-val">Up to ' + formatPrice(maxPrice) + '</p>' +
            '<input type="range" class="ch-cc-price-range" id="ch-cc-price-range" min="0" max="' + maxPrice + '" value="' + maxPrice + '" step="100">' +
          '</div>'
        : '';

      return (medOpts ? '<div class="ch-cc-filter-section"><p class="ch-cc-filter-h">Medium</p>' + medOpts + '</div>' : '') +
        (styOpts ? '<div class="ch-cc-filter-section"><p class="ch-cc-filter-h">Style</p>' + styOpts + '</div>' : '') +
        priceSection +
        '<button class="ch-cc-clear" id="ch-cc-clear">Clear filters</button>';
    }

    function initPage(items) {
      allItems = items;
      try {
        sessionStorage.setItem('ch_cc_nfs', JSON.stringify(
          items.filter(isNFS).map(function (i) { return i.id; })
        ));
      } catch (e) {}

      var sidebarHtml = buildSidebar();

      container.innerHTML =
        '<section class="ch-cc-banner">' +
          '<div class="ch-cc-banner-inner">' +
            '<div>' +
              '<span class="ch-cc-banner-eye">Copper\'s Hobbies · 2026</span>' +
              '<h1 class="ch-cc-banner-h1">Copper\'s Canvas Challenge</h1>' +
              '<p class="ch-cc-banner-p">Our first community art showcase — each artist received the same size canvas and had until October 31 to create something entirely their own, in any medium they chose. We\'re proud of every piece and thrilled to share them.</p>' +
              '<p class="ch-cc-banner-p">See something you\'d love to own or give as a gift? Every purchase supports a local artist, and a portion of each sale is donated to the <a href="https://kwsphumane.ca/" target="_blank" rel="noopener">Humane Society of Kitchener Waterloo Stratford &amp; Perth</a> — helping animals in our community.</p>' +
            '</div>' +
            '<div class="ch-cc-hs">' +
              '<span class="ch-cc-hs-label">In Support Of</span>' +
              '<a href="https://kwsphumane.ca/" class="ch-cc-hs-link" target="_blank" rel="noopener">' +
                '<img class="ch-cc-hs-logo" src="' + HS_LOGO + '" alt="Humane Society of Kitchener Waterloo Stratford and Perth">' +
              '</a>' +
            '</div>' +
          '</div>' +
        '</section>' +
        '<div class="ch-cc-body">' +
          '<aside class="ch-cc-sidebar">' + sidebarHtml + '</aside>' +
          '<div class="ch-cc-content">' +
            '<p class="ch-cc-meta" id="ch-cc-meta"></p>' +
            '<div class="ch-cc-grid" id="ch-cc-grid"></div>' +
          '</div>' +
        '</div>';

      render();

      container.querySelectorAll('[data-med]').forEach(function (cb) {
        cb.addEventListener('change', function () {
          activeMedia[cb.getAttribute('data-med')] = cb.checked;
          render();
        });
      });
      container.querySelectorAll('[data-sty]').forEach(function (cb) {
        cb.addEventListener('change', function () {
          activeStyles[cb.getAttribute('data-sty')] = cb.checked;
          render();
        });
      });
      var rangeEl = document.getElementById('ch-cc-price-range');
      var priceValEl = document.getElementById('ch-cc-price-val');
      if (rangeEl) {
        rangeEl.addEventListener('input', function () {
          priceMax = parseInt(rangeEl.value, 10);
          if (priceValEl) priceValEl.textContent = 'Up to ' + formatPrice(priceMax);
          render();
        });
      }
      var clearBtn = document.getElementById('ch-cc-clear');
      if (clearBtn) {
        clearBtn.addEventListener('click', function () {
          activeMedia = {};
          activeStyles = {};
          priceMax = maxPrice;
          container.querySelectorAll('[data-med],[data-sty]').forEach(function (cb) { cb.checked = false; });
          if (rangeEl) rangeEl.value = maxPrice;
          if (priceValEl) priceValEl.textContent = 'Up to ' + formatPrice(maxPrice);
          render();
        });
      }
    }

    var main = document.querySelector('main, #page, .Site-inner') || document.body;
    var headerEl = document.querySelector('.Site-header, header, [class*="Header"]');
    var headerH = headerEl ? headerEl.getBoundingClientRect().height : 72;

    var container = document.createElement('div');
    container.id = 'ch-cc';
    container.innerHTML = '<div class="ch-cc-loading">Loading the collection…</div>';

    var firstSection = main.firstElementChild;
    if (firstSection) {
      main.insertBefore(container, firstSection);
      var sib = container.nextElementSibling;
      while (sib) { sib.style.setProperty('display', 'none', 'important'); sib = sib.nextElementSibling; }
    } else {
      main.appendChild(container);
    }
    container.style.marginTop = headerH + 'px';
    main.style.minHeight = '0';
    main.style.paddingBottom = '0';
    document.querySelectorAll('.sqs-layout,.sqs-col-wid-12,.sqs-block').forEach(function (el) { el.style.minHeight = '0'; });
    document.querySelectorAll('#itemPagination').forEach(function (el) { el.style.setProperty('display', 'none', 'important'); });

    function init() {
      fetchAll(CC + '?format=json', [], initPage);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  // ── Product page — NFS handling ──────────────────────────────────
  if (IS_PRODUCT) {
    var NFS_SEL = [
      '.sqs-add-to-cart-button',
      '[data-controller="CartAction"]',
      '.product-price',
      '.ProductItem-nav',
      '.sqs-quantity',
      '[class*="add-to-cart"]',
    ];

    function hideNFSEls() {
      NFS_SEL.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
          el.style.setProperty('display', 'none', 'important');
        });
      });
    }

    function initProduct() {
      fetch(PATH + '?format=json')
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (!d.item || !isNFS(d.item)) return;
          hideNFSEls();
          var obs = new MutationObserver(hideNFSEls);
          obs.observe(document.body, { childList: true, subtree: true });
          setTimeout(function () { obs.disconnect(); }, 8000);
          var ref = document.querySelector('.product-price,[class*="price"]');
          if (ref && !document.getElementById('ch-cc-nfs-pdp')) {
            var lbl = document.createElement('p');
            lbl.id = 'ch-cc-nfs-pdp';
            lbl.textContent = 'Not for Sale — Display Only';
            lbl.style.cssText = 'font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9e9589;margin:12px 0 0';
            ref.parentNode.insertBefore(lbl, ref.nextSibling);
          }
        })
        .catch(function () {});
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initProduct);
    } else {
      initProduct();
    }
  }

}());
