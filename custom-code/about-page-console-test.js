// Copper's Hobbies — About Page — CONSOLE TEST
// Paste into DevTools console on any page. Refresh to remove.
(function () {
  'use strict';

  function isAboutPage() {
    return window.location.pathname === '/about';
  }

  

  // TODO: replace all placeholder image URLs with Squarespace CDN URLs once uploaded
  // NOTE: the 'richard' URL is an Instagram CDN link and will expire — replace soon
  var IMGS = {
    hero    : 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/516bd75a-34db-4502-ad77-2d054d73e9ae/store+aisles+1.jpg?content-type=image%2Fjpeg',
    models  : 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/bac927ac-4882-4d9c-938b-f60b88452fd7/Model+Kit+Aisle.jpg?content-type=image%2Fjpeg',
    art     : 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/21e09f3a-3bb4-4fc7-b4e7-c7e8eb7ccef8/art+supplies.jpg?content-type=image%2Fjpeg',
    richard : 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/f63955ae-40dc-43e0-a5ca-61391b4bccad/Richard+Painting.jpg?content-type=image%2Fjpeg'
  };

  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#ch-about{font-family:"Work Sans",sans-serif;color:#1f1c18;line-height:1.6}',
    '#ch-about *{box-sizing:border-box}',

    // Hero
    '.ch-ab-hero{position:relative;min-height:440px;display:flex;align-items:flex-end;background-size:cover;background-position:center;background-color:#ede3d2}',
    '.ch-ab-hero-scrim{position:absolute;inset:0;background:linear-gradient(to top,rgba(20,16,10,.75) 0%,rgba(20,16,10,.2) 55%,transparent 100%)}',
    '.ch-ab-hero-inner{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:0 32px 52px;width:100%}',
    '.ch-ab-hero-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9b98f;margin-bottom:14px}',
    '.ch-ab-hero-h1{font-family:"Cormorant Garamond",serif;font-size:clamp(34px,5vw,58px);font-weight:500;color:#f6f1e7;margin:0;line-height:1.15}',
    '@media(max-width:720px){.ch-ab-hero-inner{padding:0 20px 40px}}',

    // Story
    '.ch-ab-story{padding:72px 0;background:#fff;border-top:1px solid #ece4d6}',
    '.ch-ab-story-inner{max-width:1100px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1fr 400px;gap:72px;align-items:center}',
    '@media(max-width:900px){.ch-ab-story-inner{grid-template-columns:1fr;gap:40px}}',
    '@media(max-width:720px){.ch-ab-story-inner{padding:0 20px}}',
    '.ch-ab-story-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin-bottom:16px}',
    '.ch-ab-story-h2{font-family:"Cormorant Garamond",serif;font-size:36px;font-weight:500;color:#1f1c18;margin:0 0 24px;line-height:1.2}',
    '.ch-ab-story-p{font-size:15px;color:#5e5850;line-height:1.8;margin:0 0 18px}',
    '.ch-ab-story-p:last-child{margin-bottom:0}',
    '.ch-ab-story-img-wrap{border-radius:10px;overflow:hidden;aspect-ratio:3/4;background:#ede3d2}',
    '.ch-ab-story-img{width:100%;height:100%;object-fit:cover;display:block}',
    '@media(max-width:900px){.ch-ab-story-img-wrap{aspect-ratio:16/9;max-height:380px}}',

    // What we carry
    '.ch-ab-carry{padding:72px 0;background:#faf7f1;border-top:1px solid #ece4d6}',
    '.ch-ab-carry-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:720px){.ch-ab-carry-inner{padding:0 20px}}',
    '.ch-ab-carry-hd{margin-bottom:48px}',
    '.ch-ab-carry-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin-bottom:12px}',
    '.ch-ab-carry-h2{font-family:"Cormorant Garamond",serif;font-size:36px;font-weight:500;color:#1f1c18;margin:0;line-height:1.2}',
    '.ch-ab-carry-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px}',
    '@media(max-width:720px){.ch-ab-carry-grid{grid-template-columns:1fr;gap:20px}}',
    '.ch-ab-carry-card{background:#fff;border:1px solid #ece4d6;border-radius:10px;overflow:hidden}',
    '.ch-ab-carry-img-wrap{height:240px;overflow:hidden;background:#ede3d2}',
    '.ch-ab-carry-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease}',
    '.ch-ab-carry-card:hover .ch-ab-carry-img{transform:scale(1.03)}',
    '.ch-ab-carry-body{padding:28px}',
    '.ch-ab-carry-title{font-family:"Cormorant Garamond",serif;font-size:24px;font-weight:500;color:#1f1c18;margin:0 0 10px}',
    '.ch-ab-carry-p{font-size:14px;color:#5e5850;line-height:1.75;margin:0}',

    // Visit CTA
    '.ch-ab-visit{padding:72px 0;background:#fff;border-top:1px solid #ece4d6;text-align:center}',
    '.ch-ab-visit-inner{max-width:580px;margin:0 auto;padding:0 32px}',
    '@media(max-width:720px){.ch-ab-visit-inner{padding:0 20px}}',
    '.ch-ab-visit-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0 0 14px;line-height:1.2}',
    '.ch-ab-visit-p{font-size:15px;color:#5e5850;line-height:1.65;margin:0 0 28px}',
    '.ch-ab-visit-btn{display:inline-flex;align-items:center;background:#c9943a;color:#fff;padding:12px 28px;border-radius:6px;font-family:"Work Sans",sans-serif;font-weight:600;font-size:15px;text-decoration:none;transition:background .2s}',
    '.ch-ab-visit-btn:hover{background:#b5832f}'
  ].join('');
  document.head.appendChild(styleEl);

  function init() {
    var main = document.querySelector('main, #page, .Site-inner') || document.body;
    var headerEl = document.querySelector('.Site-header, header, [class*="Header"]');
    var headerH = headerEl ? headerEl.getBoundingClientRect().height : 72;

    var container = document.createElement('div');
    container.id = 'ch-about';

    var firstSection = main.firstElementChild;
    if (firstSection) {
      main.insertBefore(container, firstSection);
      var sib = container.nextElementSibling;
      while (sib) { sib.style.setProperty('display', 'none', 'important'); sib = sib.nextElementSibling; }
    } else {
      main.appendChild(container);
    }

    // Start content below the non-sticky header
    container.style.marginTop = headerH + 'px';

    // Fix inflated footer on 404-based pages
    main.style.minHeight = '0';
    main.style.paddingBottom = '0';
    document.querySelectorAll('.sqs-layout,.sqs-col-wid-12,.sqs-block').forEach(function(el) {
      el.style.minHeight = '0';
    });

    container.innerHTML =
      '<section class="ch-ab-hero" style="background-image:url(' + IMGS.hero + ')">'  +
        '<div class="ch-ab-hero-scrim"></div>' +
        '<div class="ch-ab-hero-inner">' +
          '<h1 class="ch-ab-hero-h1">Built by people who love the hobby.<br>Run the same way.</h1>' +
        '</div>' +
      '</section>' +

      '<section class="ch-ab-story">' +
        '<div class="ch-ab-story-inner">' +
          '<div>' +
            '<span class="ch-ab-story-eye">Our story</span>' +
            '<h2 class="ch-ab-story-h2">From a market table to a shop of their own</h2>' +
            '<p class="ch-ab-story-p">Richard and Nancy Zajac have been in the hobby longer than the shop has existed. Copper’s Hobbies started at St. Jacobs Farmers’ Market in 2022 — a modest table of scale model kits and supplies, the kind of thing you bring because you can’t find it locally and figure others are probably in the same boat.</p>' +
            '<p class="ch-ab-story-p">Turns out they were. The booth grew, and a loyal community of local builders grew with it. It quickly became clear this needed a permanent home. On July 31, 2023, Richard and Nancy opened the doors at 935 Frederick Street — a real shop where the full inventory could live and hobbyists could actually gather.</p>' +
            '<p class="ch-ab-story-p">They both still build. They both still paint. The shop is an extension of that — stocked by people who know what you need because they need it too.</p>' +
          '</div>' +
          '<div class="ch-ab-story-img-wrap">' +
            '<img class="ch-ab-story-img" src="' + IMGS.richard + '" alt="Richard Zajac at the workbench">' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="ch-ab-carry">' +
        '<div class="ch-ab-carry-inner">' +
          '<div class="ch-ab-carry-hd">' +
            '<span class="ch-ab-carry-eye">What we carry</span>' +
            '<h2 class="ch-ab-carry-h2">Something for every kind of builder</h2>' +
          '</div>' +
          '<div class="ch-ab-carry-grid">' +
            '<div class="ch-ab-carry-card">' +
              '<div class="ch-ab-carry-img-wrap"><img class="ch-ab-carry-img" src="' + IMGS.models + '" alt="Scale model kits on display"></div>' +
              '<div class="ch-ab-carry-body">' +
                '<h3 class="ch-ab-carry-title">Scale Models & Kits</h3>' +
                '<p class="ch-ab-carry-p">Plastic scale kits from aircraft and armour to cars and Gunpla — spanning Tamiya, Bandai, Academy, Moebius, and more. We also keep a pre-owned and vintage section stocked for the harder-to-find stuff.</p>' +
              '</div>' +
            '</div>' +
            '<div class="ch-ab-carry-card">' +
              '<div class="ch-ab-carry-img-wrap"><img class="ch-ab-carry-img" src="' + IMGS.art + '" alt="Art supplies on shelves"></div>' +
              '<div class="ch-ab-carry-body">' +
                '<h3 class="ch-ab-carry-title">Art Supplies & Paints</h3>' +
                '<p class="ch-ab-carry-p">Professional brushes, fine art tools, POSCA markers, and specialty paints from Vallejo, Winsor & Newton, Rosemary & Co, and Iwata airbrush equipment. Tabletop painters will find exactly what they’re after too.</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="ch-ab-visit">' +
        '<div class="ch-ab-visit-inner">' +
          '<h2 class="ch-ab-visit-h2">Come see it in person</h2>' +
          '<p class="ch-ab-visit-p">Not everything is listed online — the shelves always have more. Richard and Nancy are usually in the shop and happy to talk through whatever you’re working on.</p>' +
          '<a href="/location" class="ch-ab-visit-btn">Visit the store</a>' +
        '</div>' +
      '</section>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
