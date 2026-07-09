// CONSOLE TEST — paste into DevTools on /scale-model-happenings, refresh to remove
// Production file: custom-code/scale-model-happenings.js
(function () {
  'use strict';

  var IMG_AMPS        = 'https://images.squarespace-cdn.com/content/v1/6227ef6f1be14312f370c9fe/568e5db0-9f48-41eb-8de8-7fbeef800ec0/amps.png?format=2500w';
  var IMG_BUILD_NIGHT = 'https://i0.wp.com/www.gunpla101.com/wp-content/uploads/2019/01/image1.jpg?resize=980%2C980&ssl=1';

  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#ch-hap{font-family:"Work Sans",sans-serif;color:#1f1c18}',
    '#ch-hap *{box-sizing:border-box}',
    '.ch-hap-hdr{background:#faf7f1;border-bottom:1px solid #ece4d6;padding:64px 32px 56px;text-align:center}',
    '.ch-hap-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin-bottom:18px}',
    '.ch-hap-h1{font-family:"Cormorant Garamond",serif;font-size:clamp(34px,5.5vw,58px);font-weight:500;color:#1f1c18;margin:0 0 18px;line-height:1.1;text-wrap:balance}',
    '.ch-hap-sub{font-size:15px;color:#5e5850;max-width:540px;margin:0 auto;line-height:1.65}',
    '@media(max-width:600px){.ch-hap-hdr{padding:44px 20px 40px}}',
    '.ch-hap-body{background:#fff;border-top:1px solid #ece4d6;padding:64px 32px}',
    '@media(max-width:600px){.ch-hap-body{padding:40px 20px}}',
    '.ch-hap-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:860px;margin:0 auto}',
    '@media(max-width:640px){.ch-hap-grid{grid-template-columns:1fr}}',
    '.ch-hap-card{background:#fff;border-radius:12px;border:1px solid #ecdcc0;overflow:hidden;text-decoration:none;color:inherit;display:block;transition:border-color .18s,box-shadow .18s}',
    '.ch-hap-card:hover{border-color:#c9943a;box-shadow:0 4px 16px rgba(201,148,58,.12)}',
    '.ch-hap-card-img{height:210px;background-size:cover;background-position:center;background-color:#ede3d2}',
    '.ch-hap-card-body{padding:24px}',
    '.ch-hap-badge{display:inline-block;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:.02em;margin-bottom:14px;background:#c9943a;color:#fff}',
    '.ch-hap-card-h3{font-family:"Cormorant Garamond",serif;font-size:25px;font-weight:600;color:#1f1c18;margin:0 0 10px;line-height:1.2}',
    '.ch-hap-card-p{font-size:14px;color:#5e5850;line-height:1.65;margin:0 0 16px}',
    '.ch-hap-card-link{font-size:14px;color:#a9772a;font-weight:600}'
  ].join('');
  document.head.appendChild(styleEl);

  var main     = document.querySelector('main, #page, .Site-inner') || document.body;
  var headerEl = document.querySelector('.Site-header, header, [class*="Header"]');
  var headerH  = headerEl ? headerEl.getBoundingClientRect().height : 72;

  var container = document.createElement('div');
  container.id = 'ch-hap';

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

  container.innerHTML =
    '<div class="ch-hap-hdr">' +
      '<span class="ch-hap-eye">Scale Modelling Community</span>' +
      '<h1 class="ch-hap-h1">Local Events for Model Builders</h1>' +
      '<p class="ch-hap-sub">Clubs, meetups, and community nights for scale modellers in the Kitchener-Waterloo region and beyond.</p>' +
    '</div>' +
    '<div class="ch-hap-body">' +
      '<div class="ch-hap-grid">' +

        '<a href="/scale-model-happenings/waterloo-wellington-amps" class="ch-hap-card">' +
          '<div class="ch-hap-card-img" style="background-image:url(' + IMG_AMPS + ');background-size:contain;background-repeat:no-repeat;background-color:#1a1e1a"></div>' +
          '<div class="ch-hap-card-body">' +
            '<span class="ch-hap-badge">Monthly · Free</span>' +
            '<h3 class="ch-hap-card-h3">Waterloo-Wellington AMPS</h3>' +
            '<p class="ch-hap-card-p">A local chapter of the Armor Modeling &amp; Preservation Society — meeting the first Saturday of each month at Copper\'s Hobbies.</p>' +
            '<span class="ch-hap-card-link">Learn more →</span>' +
          '</div>' +
        '</a>' +

        '<a href="/build-night" class="ch-hap-card">' +
          '<div class="ch-hap-card-img" style="background-image:url(' + IMG_BUILD_NIGHT + ')"></div>' +
          '<div class="ch-hap-card-body">' +
            '<span class="ch-hap-badge">Weekly · Free</span>' +
            '<h3 class="ch-hap-card-h3">Community Build Night</h3>' +
            '<p class="ch-hap-card-p">Drop in any Sunday noon to 5 — bring your kit and join whoever shows up. All skill levels and subjects welcome.</p>' +
            '<span class="ch-hap-card-link">Find out more →</span>' +
          '</div>' +
        '</a>' +

      '</div>' +
    '</div>';

}());
