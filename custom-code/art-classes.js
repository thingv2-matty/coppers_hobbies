// Copper's Hobbies — Art Classes Page
(function () {
  'use strict';

  function isArtClassesPage() {
    return window.location.pathname === '/art-classes';
  }

  if (!isArtClassesPage()) return;

  // TODO: replace with a dedicated art classes hero image when available
  var HERO_IMG = 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/f63955ae-40dc-43e0-a5ca-61391b4bccad/Richard+Painting.jpg?content-type=image%2Fjpeg';

  var SESSIONS = [
    { date: 'July 18',     topic: 'Watercolour Landscape' },
    { date: 'August 22',   topic: 'Acrylic Landscape' },
    { date: 'September 19', topic: 'Painting with Gouache' },
    { date: 'October 24',  topic: 'Intro to Wildlife Drawing' },
    { date: 'November 21', topic: 'Watercolour Pencil Cityscape' }
  ];

  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#ch-ac{font-family:"Work Sans",sans-serif;color:#1f1c18;line-height:1.6}',
    '#ch-ac *{box-sizing:border-box}',

    // Hero
    '.ch-ac-hero{position:relative;min-height:480px;display:flex;align-items:flex-end;background-size:cover;background-position:center top;background-color:#2a2118}',
    '.ch-ac-hero-scrim{position:absolute;inset:0;background:linear-gradient(to top,rgba(20,16,10,.85) 0%,rgba(20,16,10,.4) 55%,rgba(20,16,10,.15) 100%)}',
    '.ch-ac-hero-inner{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:0 32px 60px;width:100%}',
    '.ch-ac-hero-h1{font-family:"Cormorant Garamond",serif;font-size:clamp(38px,5.5vw,66px);font-weight:500;color:#f6f1e7;margin:0 0 16px;line-height:1.1}',
    '.ch-ac-hero-meta{font-size:15px;color:#d4c9b8;margin:0;line-height:1.5}',
    '@media(max-width:720px){.ch-ac-hero-inner{padding:0 20px 44px}}',

    // About + schedule grid
    '.ch-ac-main{padding:72px 0;background:#fff;border-top:1px solid #ece4d6}',
    '.ch-ac-main-inner{max-width:1100px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1fr 380px;gap:72px;align-items:start}',
    '@media(max-width:900px){.ch-ac-main-inner{grid-template-columns:1fr;gap:48px}}',
    '@media(max-width:720px){.ch-ac-main-inner{padding:0 20px}}',
    '.ch-ac-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin-bottom:16px}',
    '.ch-ac-h2{font-family:"Cormorant Garamond",serif;font-size:36px;font-weight:500;color:#1f1c18;margin:0 0 24px;line-height:1.2}',
    '.ch-ac-p{font-size:15px;color:#5e5850;line-height:1.8;margin:0 0 18px}',
    '.ch-ac-p:last-child{margin-bottom:0}',

    // Schedule panel
    '.ch-ac-schedule{background:#faf7f1;border:1px solid #ece4d6;border-radius:10px;padding:28px}',
    '.ch-ac-sched-h3{font-family:"Cormorant Garamond",serif;font-size:22px;font-weight:500;color:#1f1c18;margin:0 0 20px;line-height:1.2}',
    '.ch-ac-sched-list{list-style:none;margin:0;padding:0}',
    '.ch-ac-sched-item{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:12px 0;border-bottom:1px solid #ece4d6;font-size:14px}',
    '.ch-ac-sched-item:last-child{border-bottom:none;padding-bottom:0}',
    '.ch-ac-sched-date{font-weight:600;color:#1f1c18;white-space:nowrap;font-variant-numeric:tabular-nums}',
    '.ch-ac-sched-topic{color:#5e5850;text-align:right}',
    '.ch-ac-sched-note{font-size:12px;color:#8a8273;margin:14px 0 0;font-style:italic}',

    // Practical cards
    '.ch-ac-practical{padding:72px 0;background:#faf7f1;border-top:1px solid #ece4d6}',
    '.ch-ac-practical-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:720px){.ch-ac-practical-inner{padding:0 20px}}',
    '.ch-ac-practical-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0 0 40px;line-height:1.2}',
    '.ch-ac-cards{display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px}',
    '@media(max-width:800px){.ch-ac-cards{grid-template-columns:1fr 1fr;gap:20px}}',
    '@media(max-width:500px){.ch-ac-cards{grid-template-columns:1fr;gap:16px}}',
    '.ch-ac-card{background:#fff;border:1px solid #ece4d6;border-radius:10px;padding:28px 24px;border-left:3px solid #c9943a}',
    '.ch-ac-card-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#c9943a;margin:0 0 8px}',
    '.ch-ac-card-text{font-size:14.5px;color:#5e5850;line-height:1.65;margin:0}',

    // CTA
    '.ch-ac-cta{padding:72px 0;background:#fff;border-top:1px solid #ece4d6;text-align:center}',
    '.ch-ac-cta-inner{max-width:560px;margin:0 auto;padding:0 32px}',
    '@media(max-width:720px){.ch-ac-cta-inner{padding:0 20px}}',
    '.ch-ac-cta-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0 0 14px;line-height:1.2}',
    '.ch-ac-cta-p{font-size:15px;color:#5e5850;line-height:1.65;margin:0 0 28px}',
    '.ch-ac-cta-btn{display:inline-flex;align-items:center;background:#c9943a;color:#fff;padding:12px 28px;border-radius:6px;font-family:"Work Sans",sans-serif;font-weight:600;font-size:15px;text-decoration:none;transition:background .2s}',
    '.ch-ac-cta-btn:hover{background:#b5832f}'
  ].join('');
  document.head.appendChild(styleEl);

  function init() {
    var main = document.querySelector('main, #page, .Site-inner') || document.body;
    var headerEl = document.querySelector('.Site-header, header, [class*="Header"]');
    var headerH = headerEl ? headerEl.getBoundingClientRect().height : 72;

    var container = document.createElement('div');
    container.id = 'ch-ac';

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

    var scheduleItems = SESSIONS.map(function(s) {
      return '<li class="ch-ac-sched-item">' +
        '<span class="ch-ac-sched-date">' + s.date + '</span>' +
        '<span class="ch-ac-sched-topic">' + s.topic + '</span>' +
      '</li>';
    }).join('');

    container.innerHTML =
      '<section class="ch-ac-hero" style="background-image:url(' + HERO_IMG + ')">' +
        '<div class="ch-ac-hero-scrim"></div>' +
        '<div class="ch-ac-hero-inner">' +
          '<h1 class="ch-ac-hero-h1">Workshops at Copper’s</h1>' +
          '<p class="ch-ac-hero-meta">Monthly Saturday sessions · Led by Richard Zajac · 935 Frederick Street</p>' +
        '</div>' +
      '</section>' +

      '<section class="ch-ac-main">' +
        '<div class="ch-ac-main-inner">' +
          '<div>' +
            '<span class="ch-ac-eye">About the workshops</span>' +
            '<h2 class="ch-ac-h2">Learn to paint from someone who’s done it for 25 years</h2>' +
            '<p class="ch-ac-p">Once a month, Copper’s Hobbies hosts a hands-on art workshop open to anyone looking to develop their skills. Each session covers a different topic — from watercolour landscapes to gouache to wildlife drawing — so there’s always something new to try.</p>' +
            '<p class="ch-ac-p">Workshops are led by Richard Zajac, a Canadian artist with over 25 years of experience. Whether you’re picking up a brush for the first time or looking to push your technique further, the sessions will give you skills and tricks to bring home to your own work.</p>' +
            '<p class="ch-ac-p">Space is limited — spots fill up quickly, so register early.</p>' +
          '</div>' +
          '<div>' +
            '<div class="ch-ac-schedule">' +
              '<h3 class="ch-ac-sched-h3">Upcoming 2026 sessions</h3>' +
              '<ul class="ch-ac-sched-list">' + scheduleItems + '</ul>' +
              '<p class="ch-ac-sched-note">All sessions start at 11 am. Topics subject to change.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="ch-ac-practical">' +
        '<div class="ch-ac-practical-inner">' +
          '<h2 class="ch-ac-practical-h2">What to know</h2>' +
          '<div class="ch-ac-cards">' +
            '<div class="ch-ac-card">' +
              '<p class="ch-ac-card-label">When</p>' +
              '<p class="ch-ac-card-text">The second-last Saturday of each month, starting at 11 am. See the schedule above for specific dates and topics.</p>' +
            '</div>' +
            '<div class="ch-ac-card">' +
              '<p class="ch-ac-card-label">What to bring</p>' +
              '<p class="ch-ac-card-text">A supply list is emailed to registered students a few days before each session. You can also purchase what you need right here at the shop on the day.</p>' +
            '</div>' +
            '<div class="ch-ac-card">' +
              '<p class="ch-ac-card-label">How to sign up</p>' +
              '<p class="ch-ac-card-text">Get in touch through our contact page or email us at coppershobbies@gmail.com. Spots are limited and go fast — don’t leave it too long.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="ch-ac-cta">' +
        '<div class="ch-ac-cta-inner">' +
          '<h2 class="ch-ac-cta-h2">Ready to join a session?</h2>' +
          '<p class="ch-ac-cta-p">Reach out to reserve your spot. We’ll confirm your registration and send you the supply list ahead of time.</p>' +
          '<a href="/contact" class="ch-ac-cta-btn">Get in touch</a>' +
        '</div>' +
      '</section>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
