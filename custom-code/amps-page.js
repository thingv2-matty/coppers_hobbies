// Copper's Hobbies — Waterloo-Wellington AMPS page (/scale-model-happenings/waterloo-wellington-amps)
(function () {
  'use strict';

  if (window.location.pathname !== '/scale-model-happenings/waterloo-wellington-amps') return;

  var IMG_AMPS = 'https://images.squarespace-cdn.com/content/v1/6227ef6f1be14312f370c9fe/568e5db0-9f48-41eb-8de8-7fbeef800ec0/amps.png?format=2500w';

  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#ch-amps{font-family:"Work Sans",sans-serif;color:#1f1c18;line-height:1.6}',
    '#ch-amps *{box-sizing:border-box}',

    '.ch-amps-id{background:#1e2219;padding:60px 32px 52px;text-align:center;border-bottom:3px solid #4a6741}',
    '.ch-amps-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#7aaa6a;margin-bottom:20px}',
    '.ch-amps-h1{font-family:"Cormorant Garamond",serif;font-size:clamp(38px,6vw,68px);font-weight:600;color:#faf7f1;line-height:1.05;margin:0 0 8px}',
    '.ch-amps-full{font-size:12px;color:#6a7a65;letter-spacing:.1em;text-transform:uppercase;margin:0 0 30px}',
    '.ch-amps-chips{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}',
    '.ch-amps-chip{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);border-radius:20px;padding:7px 16px;font-size:13px;color:#c8d4c4;font-weight:500}',
    '.ch-amps-chip strong{color:#faf7f1}',
    '@media(max-width:600px){.ch-amps-id{padding:44px 20px 40px}}',

    '.ch-amps-about{padding:72px 0;background:#fff;border-top:1px solid #ece4d6}',
    '.ch-amps-about-inner{max-width:1100px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1fr 420px;gap:64px;align-items:center}',
    '@media(max-width:880px){.ch-amps-about-inner{grid-template-columns:1fr;gap:40px}}',
    '@media(max-width:600px){.ch-amps-about-inner{padding:0 20px}}',
    '.ch-amps-about-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#4a6741;margin-bottom:14px}',
    '.ch-amps-about-h2{font-family:"Cormorant Garamond",serif;font-size:32px;font-weight:500;color:#1f1c18;margin:0 0 20px;line-height:1.2;text-wrap:balance}',
    '.ch-amps-about-p{font-size:15px;color:#5e5850;line-height:1.8;margin:0 0 16px}',
    '.ch-amps-about-p:last-child{margin-bottom:0}',
    '.ch-amps-img{width:100%;border-radius:10px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.15)}',
    '.ch-amps-img img{width:100%;height:auto;display:block}',
    '@media(max-width:880px){.ch-amps-img{max-width:480px;margin:0 auto}}',

    '.ch-amps-cta{padding:64px 0;background:#1e2219;border-top:1px solid #2a3025}',
    '.ch-amps-cta-inner{max-width:1100px;margin:0 auto;padding:0 32px;text-align:center}',
    '@media(max-width:600px){.ch-amps-cta-inner{padding:0 20px}}',
    '.ch-amps-cta-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#faf7f1;margin:0 0 12px;text-wrap:balance}',
    '.ch-amps-cta-p{font-size:15px;color:#7a8a76;margin:0 0 28px;line-height:1.65}',
    '.ch-amps-cta-btn{display:inline-flex;align-items:center;background:#4a6741;color:#fff;padding:13px 32px;border-radius:6px;font-family:"Work Sans",sans-serif;font-weight:600;font-size:15px;text-decoration:none;transition:background .2s}',
    '.ch-amps-cta-btn:hover{background:#3d5636}'
  ].join('');
  document.head.appendChild(styleEl);

  var main     = document.querySelector('main, #page, .Site-inner') || document.body;
  var headerEl = document.querySelector('.Site-header, header, [class*="Header"]');
  var headerH  = headerEl ? headerEl.getBoundingClientRect().height : 72;

  var container = document.createElement('div');
  container.id = 'ch-amps';

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
  document.querySelectorAll('#itemPagination').forEach(function(el) {
    el.style.setProperty('display', 'none', 'important');
  });

  container.innerHTML =

    '<section class="ch-amps-id">' +
      '<span class="ch-amps-eye">Community Chapter · Kitchener-Waterloo</span>' +
      '<h1 class="ch-amps-h1">Waterloo-Wellington AMPS</h1>' +
      '<p class="ch-amps-full">Armor Modeling &amp; Preservation Society</p>' +
      '<div class="ch-amps-chips">' +
        '<span class="ch-amps-chip"><strong>When:</strong>&nbsp; First Saturday of every month</span>' +
        '<span class="ch-amps-chip"><strong>Time:</strong>&nbsp; 1pm – 4pm</span>' +
        '<span class="ch-amps-chip"><strong>Where:</strong>&nbsp; Copper\'s Hobbies</span>' +
        '<span class="ch-amps-chip"><strong>Cost:</strong>&nbsp; Free</span>' +
      '</div>' +
    '</section>' +

    '<section class="ch-amps-about">' +
      '<div class="ch-amps-about-inner">' +
        '<div>' +
          '<span class="ch-amps-about-eye">About the Chapter</span>' +
          '<h2 class="ch-amps-about-h2">Bringing armour modellers together in Waterloo-Wellington</h2>' +
          '<p class="ch-amps-about-p">The Armor Modeling &amp; Preservation Society (AMPS) has been fostering the knowledge and appreciation of armored vehicle history since 1993 — through the study of preserved examples and the craft of scale modelling.</p>' +
          '<p class="ch-amps-about-p">A new local chapter has formed right here in Waterloo-Wellington, holding monthly meetings at Copper\'s Hobbies. Whether you build tanks, artillery, military figures or dioramas — historical or sci-fi — this is your crowd.</p>' +
          '<p class="ch-amps-about-p">Meetings are casual and open to everyone. Come to build, share techniques, pick up tips, or just see what people are working on. All experience levels welcome.</p>' +
        '</div>' +
        '<div class="ch-amps-img">' +
          '<img src="' + IMG_AMPS + '" alt="Waterloo-Wellington AMPS — chapter information">' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<section class="ch-amps-cta">' +
      '<div class="ch-amps-cta-inner">' +
        '<h2 class="ch-amps-cta-h2">Want to get involved?</h2>' +
        '<p class="ch-amps-cta-p">Reach out to the Waterloo-Wellington chapter directly — they\'d love to hear from you.</p>' +
        '<a href="mailto:amps.waterloo.wellington@gmail.com" class="ch-amps-cta-btn">Email the Chapter</a>' +
      '</div>' +
    '</section>';

}());
