// Copper's Hobbies — Humane Society of KW Stratford & Perth partner page
(function () {
  'use strict';

  if (window.location.pathname.replace(/\/$/, '') !== '/humane-society') return;

  var LOGO = 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/91c19826-4ac6-4174-b892-0bf8848b2b16/KWSP+HS+Logo.png?content-type=image%2Fpng';

  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#ch-humane{font-family:"Work Sans",sans-serif;color:#1f1c18;line-height:1.6}',
    '#ch-humane *{box-sizing:border-box}',

    // Identity header
    '.ch-hs-identity{background:#fff;border-bottom:1px solid #ece4d6;padding:52px 32px 44px;text-align:center}',
    '.ch-hs-identity-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin-bottom:28px}',
    '.ch-hs-logo{max-width:320px;width:90%;height:auto;display:block;margin:0 auto}',
    '.ch-hs-tagline{font-family:"Cormorant Garamond",serif;font-size:21px;font-weight:400;font-style:italic;color:#5e5850;margin:22px 0 0}',
    '@media(max-width:600px){.ch-hs-identity{padding:40px 20px 36px}.ch-hs-tagline{font-size:18px}}',

    // About
    '.ch-hs-about{padding:72px 0;background:#faf7f1;border-top:1px solid #ece4d6}',
    '.ch-hs-about-inner{max-width:1100px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1fr 280px;gap:64px;align-items:start}',
    '@media(max-width:880px){.ch-hs-about-inner{grid-template-columns:1fr;gap:40px}}',
    '@media(max-width:600px){.ch-hs-about-inner{padding:0 20px}}',
    '.ch-hs-about-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin-bottom:16px}',
    '.ch-hs-about-h2{font-family:"Cormorant Garamond",serif;font-size:36px;font-weight:500;color:#1f1c18;margin:0 0 24px;line-height:1.2;text-wrap:balance}',
    '.ch-hs-about-p{font-size:15px;color:#5e5850;line-height:1.8;margin:0 0 16px}',
    '.ch-hs-about-p:last-child{margin-bottom:0}',
    '.ch-hs-stats{display:flex;flex-direction:column;gap:14px}',
    '.ch-hs-stat{background:#fff;border:1px solid #ece4d6;border-radius:10px;padding:22px 20px;text-align:center}',
    '.ch-hs-stat-num{font-family:"Cormorant Garamond",serif;font-size:38px;font-weight:500;color:#c9943a;line-height:1;display:block;margin-bottom:5px}',
    '.ch-hs-stat-label{font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#8a8273}',
    '@media(max-width:880px){.ch-hs-stats{flex-direction:row}.ch-hs-stat{flex:1}}',
    '@media(max-width:480px){.ch-hs-stats{flex-direction:column}}',

    // Events
    '.ch-hs-events{padding:72px 0;background:#fff;border-top:1px solid #ece4d6}',
    '.ch-hs-events-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:600px){.ch-hs-events-inner{padding:0 20px}}',
    '.ch-hs-events-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin-bottom:16px}',
    '.ch-hs-events-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0 0 36px;line-height:1.2}',
    '.ch-hs-event-card{background:#faf7f1;border:1px solid #ece4d6;border-radius:10px;padding:32px;max-width:680px}',
    '.ch-hs-event-dates{font-size:12px;font-weight:700;color:#c9943a;margin:0 0 12px;text-transform:uppercase;letter-spacing:.07em}',
    '.ch-hs-event-title{font-family:"Cormorant Garamond",serif;font-size:26px;font-weight:500;color:#1f1c18;margin:0 0 16px;line-height:1.2}',
    '.ch-hs-event-desc{font-size:15px;color:#5e5850;line-height:1.8;margin:0 0 16px}',
    '.ch-hs-event-meta{display:flex;flex-direction:column;gap:8px;margin:0 0 24px;padding:16px;background:#fff;border:1px solid #ece4d6;border-radius:8px}',
    '.ch-hs-event-meta-row{display:flex;gap:10px;align-items:flex-start;font-size:14px;color:#5e5850}',
    '.ch-hs-event-meta-label{font-weight:700;color:#1f1c18;white-space:nowrap;min-width:60px}',
    '.ch-hs-event-studios{font-size:13px;color:#8a8273;margin:0 0 24px;line-height:1.65}',
    '.ch-hs-event-studios strong{color:#5e5850;font-weight:600}',
    '.ch-hs-event-link{display:inline-flex;align-items:center;background:#c9943a;color:#fff;padding:12px 28px;border-radius:6px;font-family:"Work Sans",sans-serif;font-weight:600;font-size:14px;text-decoration:none;transition:background .2s}',
    '.ch-hs-event-link:hover{background:#b5832f}',

    // CTA
    '.ch-hs-cta{padding:72px 0;background:#faf7f1;border-top:1px solid #ece4d6}',
    '.ch-hs-cta-inner{max-width:1100px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1fr 320px;gap:64px;align-items:center}',
    '@media(max-width:880px){.ch-hs-cta-inner{grid-template-columns:1fr;gap:36px}}',
    '@media(max-width:600px){.ch-hs-cta-inner{padding:0 20px}}',
    '.ch-hs-cta-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0 0 14px;line-height:1.2;text-wrap:balance}',
    '.ch-hs-cta-p{font-size:15px;color:#5e5850;line-height:1.75;margin:0 0 24px}',
    '.ch-hs-cta-btn{display:inline-flex;align-items:center;background:#c9943a;color:#fff;padding:12px 28px;border-radius:6px;font-family:"Work Sans",sans-serif;font-weight:600;font-size:15px;text-decoration:none;transition:background .2s}',
    '.ch-hs-cta-btn:hover{background:#b5832f}',
    '.ch-hs-ways{display:flex;flex-direction:column;gap:10px}',
    '.ch-hs-way{background:#fff;border:1px solid #ece4d6;border-radius:10px;padding:20px;border-left:3px solid #c9943a}',
    '.ch-hs-way-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#c9943a;margin:0 0 6px}',
    '.ch-hs-way-p{font-size:14px;color:#5e5850;line-height:1.6;margin:0}',
  ].join('');
  document.head.appendChild(styleEl);

  function init() {
    var main = document.querySelector('main, #page, .Site-inner') || document.body;
    var headerEl = document.querySelector('.Site-header, header, [class*="Header"]');
    var headerH = headerEl ? headerEl.getBoundingClientRect().height : 72;

    var container = document.createElement('div');
    container.id = 'ch-humane';

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
    document.querySelectorAll('.sqs-layout,.sqs-col-wid-12,.sqs-block').forEach(function (el) {
      el.style.minHeight = '0';
    });
    document.querySelectorAll('#itemPagination').forEach(function (el) {
      el.style.setProperty('display', 'none', 'important');
    });

    container.innerHTML =

      '<section class="ch-hs-identity">' +
        '<span class="ch-hs-identity-eye">A Copper\'s Community Partner</span>' +
        '<img class="ch-hs-logo" src="' + LOGO + '" alt="Humane Society of Kitchener Waterloo Stratford and Perth">' +
        '<p class="ch-hs-tagline">Caring for Animals in Our Community</p>' +
      '</section>' +

      '<section class="ch-hs-about">' +
        '<div class="ch-hs-about-inner">' +
          '<div>' +
            '<span class="ch-hs-about-eye">About the Humane Society</span>' +
            '<h2 class="ch-hs-about-h2">A safe haven for animals across the region</h2>' +
            '<p class="ch-hs-about-p">The Humane Society of Kitchener Waterloo Stratford &amp; Perth is a non-profit animal welfare organization serving the Waterloo Region and Stratford-Perth area. Their dedicated team works tirelessly to rescue, shelter, and find loving homes for animals in need.</p>' +
            '<p class="ch-hs-about-p">Beyond adoption, the Humane Society provides veterinary care, community outreach, and education programs that promote responsible pet ownership and the humane treatment of all animals across the region.</p>' +
            '<p class="ch-hs-about-p">Copper\'s Hobbies is proud to support their mission. A portion of every sale from the Copper\'s Canvas Challenge goes directly to the Humane Society.</p>' +
          '</div>' +
          '<div class="ch-hs-stats">' +
            '<div class="ch-hs-stat"><span class="ch-hs-stat-num">KW</span><span class="ch-hs-stat-label">Kitchener-Waterloo</span></div>' +
            '<div class="ch-hs-stat"><span class="ch-hs-stat-num">S&amp;P</span><span class="ch-hs-stat-label">Stratford &amp; Perth</span></div>' +
            '<div class="ch-hs-stat"><span class="ch-hs-stat-num">Non</span><span class="ch-hs-stat-label">Non-Profit</span></div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="ch-hs-events">' +
        '<div class="ch-hs-events-inner">' +
          '<span class="ch-hs-events-eye">Coming Up</span>' +
          '<h2 class="ch-hs-events-h2">Events &amp; Fundraisers</h2>' +
          '<div class="ch-hs-event-card">' +
            '<p class="ch-hs-event-dates">November 14, 2026</p>' +
            '<h3 class="ch-hs-event-title">Fur-Ever Ink\'d</h3>' +
            '<p class="ch-hs-event-desc">A flash tattoo fundraiser benefiting the Humane Society of Kitchener Waterloo Stratford &amp; Perth. Multiple studios will be on-site offering pre-designed flash tattoos — first-come, first-served. All proceeds support animals in need.</p>' +
            '<div class="ch-hs-event-meta">' +
              '<div class="ch-hs-event-meta-row"><span class="ch-hs-event-meta-label">When</span><span>Saturday, November 14 · 10 am – 5 pm</span></div>' +
              '<div class="ch-hs-event-meta-row"><span class="ch-hs-event-meta-label">Where</span><span>Stratford Centre · 125 Griffith Rd, Stratford, ON</span></div>' +
              '<div class="ch-hs-event-meta-row"><span class="ch-hs-event-meta-label">Cost</span><span>$150 per flash tattoo · First-come, first-served</span></div>' +
            '</div>' +
            '<p class="ch-hs-event-studios"><strong>Participating studios:</strong> Oak and Acorn Tattoos, Perfect Image Waterloo, Ryan H Tattoo, My Ink Asylum</p>' +
            '<a href="https://kwsphumane.ca/fur-ever-inkd" class="ch-hs-event-link" target="_blank" rel="noopener">Event Details →</a>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="ch-hs-cta">' +
        '<div class="ch-hs-cta-inner">' +
          '<div>' +
            '<h2 class="ch-hs-cta-h2">Want to support animals in our region?</h2>' +
            '<p class="ch-hs-cta-p">The Humane Society relies on community support to care for every animal that comes through their doors. Adopting, donating, volunteering, or simply spreading the word all make a real difference.</p>' +
            '<a href="https://kwsphumane.ca/" class="ch-hs-cta-btn" target="_blank" rel="noopener">Visit Their Website</a>' +
          '</div>' +
          '<div class="ch-hs-ways">' +
            '<div class="ch-hs-way">' +
              '<p class="ch-hs-way-label">Adopt</p>' +
              '<p class="ch-hs-way-p">Browse adoptable animals on their website and find a pet to bring home.</p>' +
            '</div>' +
            '<div class="ch-hs-way">' +
              '<p class="ch-hs-way-label">Donate</p>' +
              '<p class="ch-hs-way-p">One-time or recurring donations help cover food, veterinary care, and shelter.</p>' +
            '</div>' +
            '<div class="ch-hs-way">' +
              '<p class="ch-hs-way-label">Volunteer</p>' +
              '<p class="ch-hs-way-p">Hands-on help is always needed — from animal care to event support.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
