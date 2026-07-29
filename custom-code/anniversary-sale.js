// Copper's Hobbies — 3rd Anniversary Sale (July 29 – August 2, 2026)
(function () {
  'use strict';

  if (Date.now() > new Date('2026-08-03T00:00:00').getTime()) return;

  var path     = window.location.pathname;
  var isHome   = path === '/';
  var isModels = /^\/coppers-hobbies-szOJ2/.test(path);
  var isArt    = /^\/art-supplies/.test(path);
  var isProd   = /\/p\//.test(path);

  if (!isHome && !isModels && !isArt) return;

  // ── CSS ────────────────────────────────────────────────────────────────────
  var styleEl = document.createElement('style');
  styleEl.textContent = [
    // Popup overlay
    '#ch-anniv-overlay{position:fixed;inset:0;z-index:11000;background:rgba(31,28,24,.65);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;padding:20px}',
    '#ch-anniv-overlay.ch-ann-off{display:none}',
    '#ch-anniv-card{background:#fff;border-radius:16px;padding:36px 40px 32px;max-width:480px;width:100%;position:relative;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.25);max-height:90vh;overflow-y:auto}',
    '#ch-anniv-close{position:absolute;top:14px;right:16px;background:none;border:none;font-size:22px;color:#b0a899;cursor:pointer;line-height:1;padding:4px 8px}',
    '#ch-anniv-close:hover{color:#1f1c18}',
    '.ch-ann-stars{color:#e8357a;font-size:18px;letter-spacing:.28em;margin:0 0 10px}',
    '.ch-ann-title{font-family:"Cormorant Garamond",serif;font-size:clamp(28px,6vw,40px);font-weight:700;color:#e8357a;margin:0 0 6px;line-height:1.1}',
    '.ch-ann-dates{font-family:"Work Sans",sans-serif;font-size:13px;font-weight:600;color:#c9943a;letter-spacing:.08em;text-transform:uppercase;margin:0 0 22px}',
    '.ch-ann-deals{display:flex;flex-direction:column;gap:8px;margin:0 0 14px}',
    '.ch-ann-deal{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:#faf7f1;border-radius:8px;gap:12px;border:1px solid #ece4d6}',
    '.ch-ann-deal-lbl{font-family:"Work Sans",sans-serif;font-size:14px;font-weight:600;color:#1f1c18;text-align:left}',
    '.ch-ann-deal-val{font-family:"Work Sans",sans-serif;font-size:14px;font-weight:700;color:#c9943a;white-space:nowrap}',
    '.ch-ann-fine{font-family:"Work Sans",sans-serif;font-size:11px;color:#b0a899;line-height:1.55;margin:0 0 20px;text-align:left}',
    '.ch-ann-pop-btn{display:inline-block;background:#e8357a;color:#fff;padding:13px 32px;border-radius:6px;font-family:"Work Sans",sans-serif;font-weight:600;font-size:15px;text-decoration:none;transition:background .2s;margin-bottom:14px}',
    '.ch-ann-pop-btn:hover{background:#cc2e6b}',
    '.ch-ann-thanks{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:17px;color:#8a8273;margin:0}',
    '.ch-ann-instore{background:#faf7f1;border:1px solid #ece4d6;border-radius:8px;padding:14px 16px;margin:0 0 18px;text-align:center}',
    '.ch-ann-instore-msg{font-family:"Work Sans",sans-serif;font-size:14px;font-weight:600;color:#1f1c18;margin:0 0 6px}',
    '.ch-ann-instore-addr{font-family:"Work Sans",sans-serif;font-size:13px;color:#5e5850;margin:0 0 4px}',
    '.ch-ann-instore-hrs{font-family:"Work Sans",sans-serif;font-size:12px;color:#8a8273;margin:0;line-height:1.6}',
    '.ch-ann-hide-label{display:flex;align-items:center;justify-content:center;gap:6px;font-family:"Work Sans",sans-serif;font-size:12px;color:#b0a899;cursor:pointer;margin-top:14px}',
    '.ch-ann-hide-label input[type="checkbox"]{width:14px;height:14px;accent-color:#c9943a;cursor:pointer;margin:0;flex-shrink:0}',
    '@media(max-width:520px){#ch-anniv-card{padding:28px 20px 24px}.ch-ann-deal{flex-direction:column;align-items:flex-start;gap:2px}.ch-ann-deal-val{text-align:left}}',

    // Collection banner
    '.ch-ann-col{border-radius:10px;margin:0 0 20px;overflow:hidden;font-family:"Work Sans",sans-serif}',
    '.ch-ann-col-top{background:#e8357a;padding:10px 20px;display:flex;align-items:center;flex-wrap:wrap;gap:6px 16px}',
    '.ch-ann-col-top-title{font-size:13px;font-weight:700;color:#fff;letter-spacing:.05em;text-transform:uppercase}',
    '.ch-ann-col-top-dates{font-size:12px;color:rgba(255,255,255,.78);font-weight:500}',
    '.ch-ann-col-deals{background:#faf7f1;padding:12px 20px;display:flex;flex-wrap:wrap;gap:8px 28px;border:1px solid #ece4d6;border-top:none}',
    '.ch-ann-col-deal{display:flex;gap:6px;align-items:baseline}',
    '.ch-ann-col-lbl{font-size:13px;color:#5e5850}',
    '.ch-ann-col-val{font-size:13px;font-weight:700;color:#c9943a}',
    '.ch-ann-col-fine{font-size:11px;color:#b0a899;width:100%;margin:4px 0 0;line-height:1.5}',

    // Product page banner
    '#ch-anniv-prod{position:fixed;left:0;right:0;z-index:9000;background:#e8357a;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:4px 16px;padding:9px 20px;font-family:"Work Sans",sans-serif}',
    '.ch-ann-prod-title{font-size:13px;font-weight:700;color:#fff;letter-spacing:.04em}',
    '.ch-ann-prod-sep{color:rgba(255,255,255,.4);font-size:11px;padding:0 2px}',
    '.ch-ann-prod-deal{font-size:13px;color:rgba(255,255,255,.92);font-weight:500}'
  ].join('');
  document.head.appendChild(styleEl);

  // ── Helpers ────────────────────────────────────────────────────────────────
  function getHeaderH() {
    var el = document.querySelector('.Site-header, header, [class*="Header"]');
    return el ? el.getBoundingClientRect().height : 72;
  }

  // ── Homepage popup ─────────────────────────────────────────────────────────
  if (isHome) {
    setTimeout(function() {
      var hideUntil = localStorage.getItem('ch_anniv3_hide');
      if (hideUntil && Date.now() < parseInt(hideUntil, 10)) return;

      var overlay = document.createElement('div');
      overlay.id = 'ch-anniv-overlay';
      overlay.innerHTML =
        '<div id="ch-anniv-card">' +
          '<button id="ch-anniv-close" aria-label="Close">&#215;</button>' +
          '<p class="ch-ann-stars">&#9733; &#9733; &#9733;</p>' +
          '<h2 class="ch-ann-title">3rd Anniversary Sale!</h2>' +
          '<p class="ch-ann-dates">July 29 &ndash; August 2, 2026</p>' +
          '<div class="ch-ann-deals">' +
            '<div class="ch-ann-deal"><span class="ch-ann-deal-lbl">Sale Kits</span><span class="ch-ann-deal-val">Huge selection!</span></div>' +
            '<div class="ch-ann-deal"><span class="ch-ann-deal-lbl">Vintage Kits</span><span class="ch-ann-deal-val">Buy 1 Get 2nd 50% Off*</span></div>' +
            '<div class="ch-ann-deal"><span class="ch-ann-deal-lbl">Art Supplies</span><span class="ch-ann-deal-val">15% Off**</span></div>' +
            '<div class="ch-ann-deal"><span class="ch-ann-deal-lbl">Many Minis</span><span class="ch-ann-deal-val">20% Off</span></div>' +
            '<div class="ch-ann-deal"><span class="ch-ann-deal-lbl">Staedtler Marker Sets</span><span class="ch-ann-deal-val">30% Off</span></div>' +
          '</div>' +
          '<p class="ch-ann-fine">*Applied to kit of equal or lesser value. Kits in display case not included.<br>**Brushes not included. No deal stacking.</p>' +
          '<div class="ch-ann-instore">' +
            '<p class="ch-ann-instore-msg">In-store only &mdash; come see us in Kitchener!</p>' +
            '<p class="ch-ann-instore-addr">935 Frederick St &nbsp;&middot;&nbsp; 519-570-0001</p>' +
            '<p class="ch-ann-instore-hrs">Mon&ndash;Fri 10am&ndash;6pm<br>Sat 10am&ndash;5pm &nbsp;&middot;&nbsp; Sun 11am&ndash;5pm</p>' +
          '</div>' +
          '<a href="/location" class="ch-ann-pop-btn">View Location &amp; Hours</a>' +
          '<p class="ch-ann-thanks">Thank you for 3 amazing years!</p>' +
          '<label class="ch-ann-hide-label"><input type="checkbox" id="ch-ann-hide24"> Hide for 24 hours</label>' +
        '</div>';

      document.body.appendChild(overlay);

      function dismiss() {
        overlay.classList.add('ch-ann-off');
        var cb = document.getElementById('ch-ann-hide24');
        if (cb && cb.checked) {
          localStorage.setItem('ch_anniv3_hide', String(Date.now() + 86400000));
        }
      }
      overlay.querySelector('#ch-anniv-close').addEventListener('click', dismiss);
      overlay.addEventListener('click', function(e) { if (e.target === overlay) dismiss(); });
      overlay.querySelector('.ch-ann-pop-btn').addEventListener('click', dismiss);
    }, 600);
  }

  // ── Collection banner (inserted above search bar in #ch-col) ───────────────
  if (!isProd && (isModels || isArt)) {
    var colHtml = isModels
      ? '<div class="ch-ann-col">' +
          '<div class="ch-ann-col-top">' +
            '<span class="ch-ann-col-top-title">3rd Anniversary Sale</span>' +
            '<span class="ch-ann-col-top-dates">July 29 &ndash; August 2 &nbsp;&middot;&nbsp; In-store only</span>' +
          '</div>' +
          '<div class="ch-ann-col-deals">' +
            '<div class="ch-ann-col-deal"><span class="ch-ann-col-lbl">Sale Kits</span><span class="ch-ann-col-val">Huge selection on now!</span></div>' +
            '<div class="ch-ann-col-deal"><span class="ch-ann-col-lbl">Vintage Kits</span><span class="ch-ann-col-val">Buy 1 Get 2nd 50% Off*</span></div>' +
            '<div class="ch-ann-col-deal"><span class="ch-ann-col-lbl">Many Minis</span><span class="ch-ann-col-val">20% Off</span></div>' +
            '<p class="ch-ann-col-fine">*Applied to kit of equal or lesser value. Kits in display case not included.</p>' +
          '</div>' +
        '</div>'
      : '<div class="ch-ann-col">' +
          '<div class="ch-ann-col-top">' +
            '<span class="ch-ann-col-top-title">3rd Anniversary Sale</span>' +
            '<span class="ch-ann-col-top-dates">July 29 &ndash; August 2 &nbsp;&middot;&nbsp; In-store only</span>' +
          '</div>' +
          '<div class="ch-ann-col-deals">' +
            '<div class="ch-ann-col-deal"><span class="ch-ann-col-lbl">Art Supplies</span><span class="ch-ann-col-val">15% Off*</span></div>' +
            '<div class="ch-ann-col-deal"><span class="ch-ann-col-lbl">Staedtler Marker Sets</span><span class="ch-ann-col-val">30% Off</span></div>' +
            '<p class="ch-ann-col-fine">*Brushes not included. No deal stacking.</p>' +
          '</div>' +
        '</div>';

    function tryColInsert() {
      var col = document.getElementById('ch-col');
      if (!col) return false;
      var tmp = document.createElement('div');
      tmp.innerHTML = colHtml;
      col.insertBefore(tmp.firstChild, col.firstChild);
      return true;
    }
    if (!tryColInsert()) {
      var attempts = 0;
      var tid = setInterval(function() {
        if (tryColInsert() || ++attempts > 30) clearInterval(tid);
      }, 100);
    }
  }

  // ── Product page banner (fixed bar below header) ───────────────────────────
  if (isProd && (isModels || isArt)) {
    function initProdBanner() {
      var h = getHeaderH();
      var banner = document.createElement('div');
      banner.id = 'ch-anniv-prod';
      banner.style.top = h + 'px';
      banner.innerHTML = isModels
        ? '<span class="ch-ann-prod-title">3rd Anniversary Sale</span>' +
          '<span class="ch-ann-prod-sep">&#183;</span>' +
          '<span class="ch-ann-prod-deal">Sale Kits on now</span>' +
          '<span class="ch-ann-prod-sep">&#183;</span>' +
          '<span class="ch-ann-prod-deal">Vintage Kits: Buy 1 Get 2nd 50% Off</span>' +
          '<span class="ch-ann-prod-sep">&#183;</span>' +
          '<span class="ch-ann-prod-deal">Many Minis: 20% Off</span>' +
          '<span class="ch-ann-prod-sep">&#183;</span>' +
          '<span class="ch-ann-prod-deal">In-store only</span>'
        : '<span class="ch-ann-prod-title">3rd Anniversary Sale</span>' +
          '<span class="ch-ann-prod-sep">&#183;</span>' +
          '<span class="ch-ann-prod-deal">15% Off Art Supplies*</span>' +
          '<span class="ch-ann-prod-sep">&#183;</span>' +
          '<span class="ch-ann-prod-deal">Staedtler Marker Sets: 30% Off</span>' +
          '<span class="ch-ann-prod-sep">&#183;</span>' +
          '<span class="ch-ann-prod-deal">In-store only</span>';
      document.body.appendChild(banner);
      setTimeout(function() {
        var bh = banner.getBoundingClientRect().height;
        var cur = parseInt(getComputedStyle(document.body).paddingTop, 10) || 0;
        document.body.style.paddingTop = (cur + bh) + 'px';
      }, 0);
    }
    if (document.readyState === 'complete') {
      initProdBanner();
    } else {
      window.addEventListener('load', initProdBanner);
    }
  }

}());
