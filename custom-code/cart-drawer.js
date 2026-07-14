// Copper's Hobbies — Cart Drawer
(function () {

  // ── Inject CSS ──────────────────────────────────────────
  var style = document.createElement('style');
  style.id = 'ch-cart-styles';
  style.textContent = [
    '#ch-cart-drawer{display:none}',
    '#ch-cart-drawer.ch-open{display:block}',
    '#ch-cart-scrim{position:fixed;inset:0;background:rgba(28,24,18,.45);z-index:9000;animation:ch-fade-in .2s ease forwards}',
    '#ch-cart-panel{position:fixed;top:0;right:0;width:430px;max-width:92vw;height:100dvh;background:#fff;z-index:9001;display:flex;flex-direction:column;box-shadow:-20px 0 50px -20px rgba(0,0,0,.4);animation:ch-slide-in .28s cubic-bezier(.2,.8,.2,1) forwards}',
    '@keyframes ch-fade-in{from{opacity:0}to{opacity:1}}',
    '@keyframes ch-slide-in{from{transform:translateX(100%)}to{transform:translateX(0)}}',
    '#ch-cart-header{display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid #ece4d6;flex-shrink:0}',
    '#ch-cart-title{font-family:"Cormorant Garamond",serif;font-size:22px;font-weight:500;color:#1f1c18;margin:0}',
    '#ch-cart-close{background:none;border:none;font-size:22px;cursor:pointer;color:#5e5850;line-height:1;padding:4px 8px}',
    '#ch-cart-close:hover{color:#1f1c18}',
    '#ch-cart-body{flex:1;overflow-y:auto}',
    '#ch-cart-items{padding:0 24px}',
    '.ch-item{display:grid;grid-template-columns:78px 1fr auto;gap:14px;padding:16px 0;border-bottom:1px solid #ece4d6;align-items:start}',
    '.ch-item img,.ch-img-placeholder{width:78px;height:78px;object-fit:cover;border-radius:8px;background:#faf7f1;display:block;flex-shrink:0}',
    '.ch-item-name{font-family:"Work Sans",sans-serif;font-size:13px;color:#1f1c18;line-height:1.45;margin:0 0 10px}',
    '.ch-qty-row{display:flex;align-items:center;gap:10px}',
    '.ch-qty-btn{background:none;border:1px solid #e7dcc9;width:26px;height:26px;border-radius:4px;cursor:pointer;font-size:15px;color:#1f1c18;display:flex;align-items:center;justify-content:center;line-height:1}',
    '.ch-qty-btn:hover:not(:disabled){border-color:#c9943a;color:#c9943a}',
    '.ch-qty-inc:disabled{opacity:0.35;cursor:not-allowed;border-color:#e7dcc9;color:#bcae93}',
    '.ch-remove-btn{background:none;border:none;font-family:"Work Sans",sans-serif;font-size:11px;color:#8a8273;cursor:pointer;padding:0;text-decoration:underline;margin-top:6px;display:inline-block}',
    '.ch-remove-btn:hover{color:#c9943a}',
    '.ch-qty-val{font-family:"Work Sans",sans-serif;font-size:14px;min-width:16px;text-align:center}',
    '.ch-item-price{font-family:"Cormorant Garamond",serif;font-size:16px;font-weight:600;color:#1f1c18;white-space:nowrap;padding-top:2px}',
    '.ch-loading,.ch-empty{font-family:"Work Sans",sans-serif;font-size:14px;color:#8a8273;text-align:center;padding:48px 20px;margin:0}',
    '.ch-empty a{color:#c9943a}',
    '#ch-cart-footer{padding:20px 24px;border-top:1px solid #ece4d6;flex-shrink:0}',
    '#ch-cart-subtotal-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px}',
    '#ch-cart-subtotal-row span:first-child{font-family:"Work Sans",sans-serif;font-size:14px;font-weight:500;color:#1f1c18}',
    '#ch-cart-subtotal{font-family:"Cormorant Garamond",serif;font-size:20px;font-weight:600;color:#1f1c18}',
    '#ch-cart-note{font-family:"Work Sans",sans-serif;font-size:12px;color:#8a8273;line-height:1.55;margin:0 0 16px}',
    '#ch-cart-checkout-btn{display:block;background:#c9943a;color:#fff;text-align:center;padding:15px;border-radius:6px;font-family:"Work Sans",sans-serif;font-size:14px;font-weight:600;text-decoration:none;margin-bottom:10px;transition:background .2s}',
    '#ch-cart-checkout-btn:hover{background:#a9772a}',
    '#ch-cart-continue-btn{display:block;width:100%;background:none;border:1.5px solid #2c2820;color:#2c2820;padding:13px;border-radius:6px;font-family:"Work Sans",sans-serif;font-size:14px;cursor:pointer;transition:background .2s}',
    '#ch-cart-continue-btn:hover{background:#f5f0e8}',
    '.yui-popup-container-node,[class*="commerce-mini-cart"]{display:none!important;visibility:hidden!important;pointer-events:none!important}',
    // Geo-restriction modal
    '#ch-geo-block{display:none;position:fixed;inset:0;z-index:9100}',
    '#ch-geo-block.open{display:flex;align-items:center;justify-content:center}',
    '#ch-geo-scrim{position:absolute;inset:0;background:rgba(28,24,18,.6)}',
    '#ch-geo-panel{position:relative;background:#fff;border-radius:12px;padding:32px;max-width:440px;width:calc(100% - 40px);z-index:1}',
    '#ch-geo-title{font-family:"Cormorant Garamond",serif;font-size:24px;font-weight:500;color:#1f1c18;margin:0 0 14px}',
    '#ch-geo-body{font-family:"Work Sans",sans-serif;font-size:14px;color:#1f1c18;line-height:1.6;margin:0 0 10px}',
    '#ch-geo-note{font-family:"Work Sans",sans-serif;font-size:12px;color:#8a8273;line-height:1.55;margin:0}',
    '#ch-geo-btn{display:block;width:100%;background:#1f1c18;color:#faf7f1;border:none;padding:14px;border-radius:6px;font-family:"Work Sans",sans-serif;font-size:14px;font-weight:500;cursor:pointer;margin-top:24px}',
    '#ch-geo-btn:hover{background:#2c2820}'
  ].join('');
  document.head.appendChild(style);

  // ── Inject HTML ─────────────────────────────────────────
  var tmp = document.createElement('div');
  tmp.innerHTML = '<div id="ch-cart-drawer" aria-hidden="true">' +
    '<div id="ch-cart-scrim"></div>' +
    '<div id="ch-cart-panel" role="dialog" aria-label="Shopping cart">' +
      '<div id="ch-cart-header">' +
        '<h2 id="ch-cart-title">Your cart</h2>' +
        '<button id="ch-cart-close" aria-label="Close cart">×</button>' +
      '</div>' +
      '<div id="ch-cart-body"><div id="ch-cart-items"></div></div>' +
      '<div id="ch-cart-footer">' +
        '<div id="ch-cart-subtotal-row"><span>Subtotal</span><span id="ch-cart-subtotal">—</span></div>' +
        '<p id="ch-cart-note">$20 flat-rate shipping across Canada* · Free in-store pickup at 935 Frederick St<br><span style="font-size:11px;color:#b0a899">* May be higher for large or heavy items</span></p>' +
        '<a href="/checkout" id="ch-cart-checkout-btn">Checkout</a>' +
        '<button id="ch-cart-continue-btn">Continue shopping</button>' +
      '</div>' +
    '</div>' +
  '</div>';
  document.body.appendChild(tmp.firstElementChild);

  // ── Geo-restriction modal ───────────────────────────────
  var geoTmp = document.createElement('div');
  geoTmp.innerHTML = '<div id="ch-geo-block" aria-hidden="true">' +
    '<div id="ch-geo-scrim"></div>' +
    '<div id="ch-geo-panel" role="dialog" aria-label="Canadian orders only">' +
      '<h2 id="ch-geo-title">Canadian Orders Only</h2>' +
      '<p id="ch-geo-body">Copper\'s Hobbies is a local shop in Kitchener, Ontario, Canada. We\'re unable to process orders outside Canada — we don\'t ship internationally, and in-store pickup is only available at our Kitchener location.</p>' +
      '<p id="ch-geo-note">Planning a trip to Kitchener? Feel free to keep building your cart — we\'d love to see you when you arrive!</p>' +
      '<button id="ch-geo-btn">Got it</button>' +
    '</div>' +
  '</div>';
  document.body.appendChild(geoTmp.firstElementChild);

  // ── Cart logic ──────────────────────────────────────────
  'use strict';

  var drawer     = document.getElementById('ch-cart-drawer');
  var scrim      = document.getElementById('ch-cart-scrim');
  var titleEl    = document.getElementById('ch-cart-title');
  var itemsEl    = document.getElementById('ch-cart-items');
  var subtotalEl = document.getElementById('ch-cart-subtotal');
  var cartToken  = null;

  // ── Open / close ────────────────────────────────────────
  function openDrawer() {
    drawer.classList.add('ch-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    loadCart();
  }

  function closeDrawer() {
    drawer.classList.remove('ch-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  scrim.addEventListener('click', closeDrawer);
  document.getElementById('ch-cart-close').addEventListener('click', closeDrawer);
  document.getElementById('ch-cart-continue-btn').addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeDrawer(); });

  // ── CRUMB and cart token ─────────────────────────────────
  function getCrumb() {
    // Always read from cookie — the Squarespace context crumb goes stale after request rotation
    var m = document.cookie.match(/(?:^|;\s*)crumb=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : '';
  }

  // ── Load cart — v1 for token, then v3 for full product details ──
  // The CART cookie is HttpOnly so we can't read it directly in JS.
  function loadCart() {
    itemsEl.innerHTML = '<p class="ch-loading">Loading…</p>';

    fetch('/api/commerce/shopping-cart', { credentials: 'same-origin' })
      .then(function(r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function(v1) {
        cartToken = v1.cartToken || cartToken;
        if (!cartToken) {
          titleEl.textContent = 'Your cart (0)';
          itemsEl.innerHTML = '<p class="ch-empty">Your cart is empty.</p>';
          subtotalEl.textContent = '$0.00 CAD';
          return Promise.reject('no-token');
        }
        return fetch('/api/3/commerce/cart/' + cartToken, { credentials: 'same-origin' })
          .then(function(r) { return r.ok ? r.json() : Promise.reject(); });
      })
      .then(function(data) {
        cartToken = data.cartToken || cartToken;
        var items   = data.items || [];
        var entries = items.map(function(item) {
          return {
            id       : item.id,
            title    : item.productName,
            price    : '$' + item.unitPrice.decimalValue,
            img      : item.image ? item.image.url : '',
            quantity : item.quantity
          };
        });
        var subtotalCents = items.reduce(function(sum, item) { return sum + item.itemTotal.value; }, 0);
        renderCart({ entries: entries, subtotal: '$' + (subtotalCents / 100).toFixed(2) + ' CAD' });
      })
      .catch(function(e) {
        if (e !== 'no-token') {
          itemsEl.innerHTML = '<p class="ch-empty">Could not load cart.<br><a href="/cart">View cart page →</a></p>';
        }
      });
  }

  // ── Render cart entries ──────────────────────────────────
  function renderCart(cart) {
    var entries  = cart.entries || [];
    var totalQty = entries.reduce(function(s, e) { return s + (e.quantity || 1); }, 0);
    titleEl.textContent = 'Your cart (' + totalQty + ')';

    var badgeTarget = totalQty;
    var badgeFix = setInterval(function() {
      document.querySelectorAll('.sqs-cart-quantity').forEach(function(b) {
        if (b.textContent != badgeTarget) b.textContent = badgeTarget;
      });
    }, 50);
    setTimeout(function() { clearInterval(badgeFix); }, 1000);

    if (entries.length === 0) {
      itemsEl.innerHTML = '<p class="ch-empty">Your cart is empty.</p>';
      subtotalEl.textContent = '$0.00 CAD';
      return;
    }

    subtotalEl.textContent = cart.subtotal || '—';

    itemsEl.innerHTML = entries.map(function(entry) {
      var imgStyle = entry.img ? ' style="background-image:url(\'' + entry.img + '\');background-size:cover;background-position:center"' : '';
      return '<div class="ch-item" data-id="' + entry.id + '">' +
        '<div class="ch-img-placeholder"' + imgStyle + '></div>' +
        '<div class="ch-item-info">' +
          '<p class="ch-item-name">' + entry.title + '</p>' +
          '<div class="ch-qty-row">' +
            '<button class="ch-qty-btn ch-qty-dec" data-id="' + entry.id + '" data-qty="' + (entry.quantity - 1) + '" aria-label="Remove one">−</button>' +
            '<span class="ch-qty-val">' + entry.quantity + '</span>' +
            '<button class="ch-qty-btn ch-qty-inc" data-id="' + entry.id + '" data-qty="' + (entry.quantity + 1) + '" aria-label="Add one">+</button>' +
          '</div>' +
          '<button class="ch-remove-btn" data-id="' + entry.id + '" data-qty="0">Remove all</button>' +
        '</div>' +
        '<span class="ch-item-price">' + entry.price + '</span>' +
      '</div>';
    }).join('');

    itemsEl.querySelectorAll('.ch-qty-btn, .ch-remove-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        updateEntry(btn.dataset.id, parseInt(btn.dataset.qty, 10), btn);
      });
    });
  }

  // ── Update / remove cart entry ───────────────────────────
  function updateEntry(id, qty, triggerBtn) {
    if (!cartToken) return;
    var crumb   = getCrumb();
    var url     = '/api/3/commerce/cart/' + cartToken + '/items/' + id;
    var headers = { 'Content-Type': 'application/json' };
    if (crumb) headers['X-CSRF-Token'] = crumb;
    fetch(url, { method: 'PUT', credentials: 'same-origin', headers: headers,
                 body: JSON.stringify({ quantity: Math.max(0, qty) }) })
      .then(function(r) {
        if (r.status === 400) {
          // Stock limit hit — grey out the + button without reloading
          return r.json().then(function(data) {
            var plusBtn = triggerBtn && triggerBtn.classList.contains('ch-qty-inc')
              ? triggerBtn
              : itemsEl.querySelector('.ch-qty-inc[data-id="' + id + '"]');
            if (plusBtn) {
              plusBtn.disabled = true;
              plusBtn.title = data.message || 'Max stock reached';
              setTimeout(function() {
                plusBtn.disabled = false;
                plusBtn.title = '';
              }, 3000);
            }
          });
        }
        loadCart();
      })
      .catch(function() { loadCart(); });
  }

  // ── Intercept cart icon clicks ───────────────────────────
  function hookCartLinks() {
    document.querySelectorAll('a[href="/cart"]:not(#ch-cart-drawer a)').forEach(function(a) {
      if (a.dataset.chHooked) return;
      a.dataset.chHooked = '1';
      a.addEventListener('click', function(e) { e.preventDefault(); openDrawer(); });
    });
  }

  // ── Intercept add-to-cart network calls ──────────────────
  function interceptAddToCart() {
    // Must match the add-to-cart endpoints only — NOT the bare /shopping-cart init POST
  var cartPattern = /api\/commerce\/shopping-cart\/entries|api\/3\/commerce\/cart\/[^\/]+\/items/;
    var origOpen = XMLHttpRequest.prototype.open;
    var origSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function(method, url) {
      this._chMethod = (method || '').toUpperCase();
      this._chUrl    = url || '';
      return origOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function() {
      if (this._chMethod === 'POST' && cartPattern.test(this._chUrl)) {
        this.addEventListener('load', function() {
          if (this.status >= 200 && this.status < 300) {
            startPopupSuppression();
            setTimeout(openDrawer, 300);
          }
        });
      }
      return origSend.apply(this, arguments);
    };
    var origFetch = window.fetch;
    window.fetch = function(input, init) {
      var url    = typeof input === 'string' ? input : ((input && input.url) || '');
      var method = ((init && init.method) || 'GET').toUpperCase();
      var result = origFetch.apply(this, arguments);
      if (method === 'POST' && cartPattern.test(url)) {
        result.then(function(r) {
          if (r.ok) { startPopupSuppression(); setTimeout(openDrawer, 300); }
        });
      }
      return result;
    };
  }

  // ── Suppress Squarespace's native add-to-cart popup ─────
  var popupSel = '.commerce-mini-cart-container, .yui-popup-container-node, .commerce-mini-cart-items-details';
  var popupTimer = null;

  function hidePopup() {
    document.querySelectorAll(popupSel).forEach(function(el) {
      el.style.setProperty('display',         'none',   'important');
      el.style.setProperty('visibility',      'hidden', 'important');
      el.style.setProperty('pointer-events',  'none',   'important');
    });
  }

  function startPopupSuppression() {
    clearInterval(popupTimer);
    var ticks = 0;
    popupTimer = setInterval(function() {
      hidePopup();
      if (++ticks > 60) clearInterval(popupTimer); // 3 seconds at 50ms
    }, 50);
  }

  function suppressCartPopup() {
    // Catch any popup inserted into the DOM
    new MutationObserver(hidePopup).observe(document.body, { childList: true, subtree: true });
  }

  // ── Geo-restriction (Canadian orders only) ──────────────
  var _geoCountry = sessionStorage.getItem('ch_geo_country') || null;
  var GEO_BLOCK   = document.getElementById('ch-geo-block');
  var GEO_BTN     = document.getElementById('ch-geo-btn');
  var GEO_SCRIM   = document.getElementById('ch-geo-scrim');
  var ON_CHECKOUT  = window.location.pathname === '/checkout' || window.location.pathname.indexOf('/checkout/') === 0;

  function isCanadian() { return !_geoCountry || _geoCountry === 'CA'; }

  function showGeoBlock() {
    closeDrawer();
    // On checkout page the button redirects home; elsewhere it just closes
    GEO_BTN.textContent = ON_CHECKOUT ? 'Go to Homepage' : 'Got it';
    GEO_BLOCK.classList.add('open');
    GEO_BLOCK.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function dismissGeoBlock() {
    if (ON_CHECKOUT) { window.location.replace('/'); return; }
    GEO_BLOCK.classList.remove('open');
    GEO_BLOCK.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  GEO_BTN.addEventListener('click', dismissGeoBlock);
  GEO_SCRIM.addEventListener('click', dismissGeoBlock);
  GEO_SCRIM.addEventListener('touchend', function(e) { e.preventDefault(); dismissGeoBlock(); });

  // Intercept all checkout navigation (drawer button + native /cart page links)
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href^="/checkout"]');
    if (link && !isCanadian()) { e.preventDefault(); e.stopPropagation(); showGeoBlock(); }
  });

  // Fetch visitor country once per session; also triggers modal if landing directly on /checkout
  if (!_geoCountry) {
    fetch('https://ipinfo.io/lite?token=b32d41bcb9bac9')
      .then(function(r) { return r.json(); })
      .then(function(d) {
        _geoCountry = d.country || '';
        try { sessionStorage.setItem('ch_geo_country', _geoCountry); } catch(e) {}
        if (ON_CHECKOUT && !isCanadian()) showGeoBlock();
      })
      .catch(function() { _geoCountry = ''; }); // fail open — never block on API error
  } else if (ON_CHECKOUT && !isCanadian()) {
    showGeoBlock();
  }

  interceptAddToCart();
  hookCartLinks();
  suppressCartPopup();
  new MutationObserver(hookCartLinks).observe(document.body, { childList: true, subtree: true });



})();
