// Copper's Hobbies — Location Page
(function () {
  'use strict';

  function isLocationPage() {
    return window.location.pathname === '/location';
  }

  if (!isLocationPage()) return;

  // Storefront photo is already on Squarespace CDN — no swap needed
  // TODO: replace interior photo with Squarespace CDN URL once uploaded
  var STOREFRONT = 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/4dd756d5-74ed-4832-a2d5-8ce2fb2eac2a/storefront.jpg?content-type=image%2Fjpeg';

  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#ch-loc{font-family:"Work Sans",sans-serif;color:#1f1c18;line-height:1.6}',
    '#ch-loc *{box-sizing:border-box}',

    // Page header
    '.ch-loc-hdr{padding:56px 0 52px;background:#faf7f1;border-bottom:1px solid #ece4d6}',
    '.ch-loc-hdr-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:720px){.ch-loc-hdr-inner{padding:0 20px}}',
    '.ch-loc-hdr-h1{font-family:"Cormorant Garamond",serif;font-size:clamp(40px,5vw,64px);font-weight:500;color:#1f1c18;margin:0 0 10px;line-height:1.1}',
    '.ch-loc-hdr-sub{font-size:16px;color:#8a8273;margin:0}',

    // Map + details
    '.ch-loc-main{padding:56px 0;background:#fff;border-bottom:1px solid #ece4d6}',
    '.ch-loc-main-inner{max-width:1100px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1fr 300px;gap:56px;align-items:start}',
    '@media(max-width:860px){.ch-loc-main-inner{grid-template-columns:1fr;gap:40px}}',
    '@media(max-width:720px){.ch-loc-main-inner{padding:0 20px}}',
    '.ch-loc-map-wrap{border-radius:10px;overflow:hidden;border:1px solid #ece4d6;line-height:0}',
    '.ch-loc-map-wrap iframe{width:100%;height:480px;border:0;display:block}',
    '@media(max-width:860px){.ch-loc-map-wrap iframe{height:340px}}',
    '.ch-loc-detail-block{margin-bottom:32px;padding-bottom:32px;border-bottom:1px solid #ece4d6}',
    '.ch-loc-detail-block:last-child{margin-bottom:0;padding-bottom:0;border-bottom:none}',
    '.ch-loc-detail-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#c9943a;margin:0 0 10px}',
    '.ch-loc-detail-val{font-size:14.5px;color:#1f1c18;line-height:2;margin:0;font-variant-numeric:tabular-nums}',
    '.ch-loc-detail-val a{color:#1f1c18;text-decoration:none}',
    '.ch-loc-detail-val a:hover{color:#c9943a}',
    '.ch-loc-dir-btn{display:inline-flex;align-items:center;margin-top:16px;background:#c9943a;color:#fff;padding:10px 20px;border-radius:6px;font-family:"Work Sans",sans-serif;font-weight:600;font-size:14px;text-decoration:none;transition:background .2s}',
    '.ch-loc-dir-btn:hover{background:#b5832f}',

    // Getting here
    '.ch-loc-here{padding:56px 0;background:#faf7f1;border-bottom:1px solid #ece4d6}',
    '.ch-loc-here-inner{max-width:1100px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}',
    '@media(max-width:860px){.ch-loc-here-inner{grid-template-columns:1fr;gap:32px}}',
    '@media(max-width:720px){.ch-loc-here-inner{padding:0 20px}}',
    '.ch-loc-here-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0 0 28px;line-height:1.2}',
    '.ch-loc-here-item{display:flex;gap:16px;margin-bottom:24px;align-items:flex-start}',
    '.ch-loc-here-item:last-child{margin-bottom:0}',
    '.ch-loc-here-pip{width:8px;height:8px;border-radius:50%;background:#c9943a;flex-shrink:0;margin-top:6px}',
    '.ch-loc-here-text{font-size:14.5px;color:#5e5850;line-height:1.65}',
    '.ch-loc-here-text strong{color:#1f1c18;font-weight:600;display:block;margin-bottom:3px}',
    '.ch-loc-here-text a{color:#c9943a;text-decoration:none}',
    '.ch-loc-here-text a:hover{text-decoration:underline}',
    '.ch-loc-storefront-wrap{border-radius:10px;overflow:hidden;border:1px solid #ece4d6;aspect-ratio:4/3}',
    '.ch-loc-storefront-img{width:100%;height:100%;object-fit:cover;display:block}',
    '@media(max-width:860px){.ch-loc-storefront-wrap{aspect-ratio:16/9}}',

    // CTA
    '.ch-loc-cta{padding:68px 0;background:#fff;text-align:center}',
    '.ch-loc-cta-inner{max-width:520px;margin:0 auto;padding:0 32px}',
    '@media(max-width:720px){.ch-loc-cta-inner{padding:0 20px}}',
    '.ch-loc-cta-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0 0 12px;line-height:1.2}',
    '.ch-loc-cta-p{font-size:15px;color:#5e5850;line-height:1.65;margin:0 0 28px}',
    '.ch-loc-cta-btn{display:inline-flex;align-items:center;background:#c9943a;color:#fff;padding:12px 28px;border-radius:6px;font-family:"Work Sans",sans-serif;font-weight:600;font-size:15px;text-decoration:none;transition:background .2s}',
    '.ch-loc-cta-btn:hover{background:#b5832f}'
  ].join('');
  document.head.appendChild(styleEl);

  function init() {
    var main = document.querySelector('main, #page, .Site-inner') || document.body;
    var headerEl = document.querySelector('.Site-header, header, [class*="Header"]');
    var headerH = headerEl ? headerEl.getBoundingClientRect().height : 72;

    var container = document.createElement('div');
    container.id = 'ch-loc';

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
    document.querySelectorAll('.sqs-layout,.sqs-col-wid-12,.sqs-block').forEach(function(el) {
      el.style.minHeight = '0';
    });

    container.innerHTML =
      '<section class="ch-loc-hdr">' +
        '<div class="ch-loc-hdr-inner">' +
          '<h1 class="ch-loc-hdr-h1">Come find us</h1>' +
          '<p class="ch-loc-hdr-sub">935 Frederick Street, Kitchener — where Frederick meets Victoria</p>' +
        '</div>' +
      '</section>' +

      '<section class="ch-loc-main">' +
        '<div class="ch-loc-main-inner">' +
          '<div class="ch-loc-map-wrap">' +
            '<iframe src="https://maps.google.com/maps?q=935+Frederick+Street+Kitchener+ON+Canada&output=embed&z=16" loading="lazy" title="Copper\'s Hobbies location" allowfullscreen></iframe>' +
          '</div>' +
          '<div>' +
            '<div class="ch-loc-detail-block">' +
              '<p class="ch-loc-detail-label">Hours</p>' +
              '<p class="ch-loc-detail-val">' +
                'Mon–Fri&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10 am – 6 pm<br>' +
                'Saturday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10 am – 5 pm<br>' +
                'Sunday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11 am – 5 pm' +
              '</p>' +
            '</div>' +
            '<div class="ch-loc-detail-block">' +
              '<p class="ch-loc-detail-label">Address</p>' +
              '<p class="ch-loc-detail-val">935 Frederick Street<br>Kitchener, ON  N2B 2B9</p>' +
              '<a href="https://maps.google.com/?q=935+Frederick+Street+Kitchener+ON+Canada" target="_blank" rel="noopener" class="ch-loc-dir-btn">Get directions</a>' +
            '</div>' +
            '<div class="ch-loc-detail-block">' +
              '<p class="ch-loc-detail-label">Phone</p>' +
              '<p class="ch-loc-detail-val"><a href="tel:+15195700001">519-570-0001</a></p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="ch-loc-here">' +
        '<div class="ch-loc-here-inner">' +
          '<div>' +
            '<h2 class="ch-loc-here-h2">Getting here</h2>' +
            '<div class="ch-loc-here-item">' +
              '<div class="ch-loc-here-pip"></div>' +
              '<div class="ch-loc-here-text"><strong>Parking</strong>Free parking lot on-site — entrance is off Frederick Street. The lot is visible from Victoria Street but there is no entrance from that side.</div>' +
            '</div>' +
            '<div class="ch-loc-here-item">' +
              '<div class="ch-loc-here-pip"></div>' +
              '<div class="ch-loc-here-text"><strong>Transit</strong>Take GRT Route 20 and get off at <strong>Victoria St N @ Frederick St</strong> — we\'re right there.</div>' +
            '</div>' +
          '</div>' +
          '<div class="ch-loc-storefront-wrap">' +
            '<img class="ch-loc-storefront-img" src="' + STOREFRONT + '" alt="Copper\'s Hobbies storefront">' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="ch-loc-cta">' +
        '<div class="ch-loc-cta-inner">' +
          '<h2 class="ch-loc-cta-h2">Have a question before you visit?</h2>' +
          '<p class="ch-loc-cta-p">We’re happy to help with stock questions, special orders, or just a chat about what you’re working on.</p>' +
          '<a href="/contact" class="ch-loc-cta-btn">Get in touch</a>' +
        '</div>' +
      '</section>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
