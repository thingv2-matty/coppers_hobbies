(function () {
  'use strict';
  if (window.location.pathname !== '/group-build') return;

  var IMG_POSTER = 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/650e1560-49f2-40eb-b707-4eda84928c91/Watercolour-Workshop+%283%29.png?content-type=image%2Fpng';
  var IMG_KIT    = 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/b892fe45-a711-456c-b9d7-005fe89c3140/528044938_787281027195689_6945750101866892617_n.jpg?content-type=image%2Fjpeg';

  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#ch-gb{font-family:"Work Sans",sans-serif;color:#1f1c18;line-height:1.6}',
    '#ch-gb *{box-sizing:border-box}',

    // Identity
    '.ch-gb-identity{background:#faf7f1;border-bottom:1px solid #ece4d6;padding:60px 32px 52px;text-align:center}',
    '.ch-gb-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin-bottom:20px}',
    '.ch-gb-h1{font-family:"Cormorant Garamond",serif;font-size:clamp(42px,7vw,72px);font-weight:600;color:#1f1c18;line-height:1;margin:0 0 6px}',
    '.ch-gb-vintage{font-family:"Cormorant Garamond",serif;font-size:clamp(22px,4vw,38px);font-weight:400;font-style:italic;color:#c9943a;display:block;margin-bottom:22px}',
    '.ch-gb-tagline{font-size:15px;color:#5e5850;max-width:520px;margin:0 auto 32px;line-height:1.65}',
    '.ch-gb-chips{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}',
    '.ch-gb-chip{background:#fff;border:1px solid #ece4d6;border-radius:20px;padding:7px 16px;font-size:13px;color:#5e5850;font-weight:500}',
    '.ch-gb-chip strong{color:#1f1c18}',
    '@media(max-width:600px){.ch-gb-identity{padding:44px 20px 40px}}',

    // About
    '.ch-gb-about{padding:72px 0;background:#fff;border-top:1px solid #ece4d6}',
    '.ch-gb-about-inner{max-width:1100px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1fr 340px;gap:64px;align-items:center}',
    '@media(max-width:880px){.ch-gb-about-inner{grid-template-columns:1fr;gap:40px}}',
    '@media(max-width:600px){.ch-gb-about-inner{padding:0 20px}}',
    '.ch-gb-about-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin-bottom:14px}',
    '.ch-gb-about-h2{font-family:"Cormorant Garamond",serif;font-size:32px;font-weight:500;color:#1f1c18;margin:0 0 20px;line-height:1.2;text-wrap:balance}',
    '.ch-gb-about-p{font-size:15px;color:#5e5850;line-height:1.8;margin:0 0 16px}',
    '.ch-gb-about-p:last-child{margin-bottom:0}',
    '.ch-gb-poster{width:100%;border-radius:10px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.1)}',
    '.ch-gb-poster img{width:100%;height:auto;display:block}',
    '@media(max-width:880px){.ch-gb-poster{max-width:360px;margin:0 auto}}',

    // Rules
    '.ch-gb-rules{padding:72px 0;background:#faf7f1;border-top:1px solid #ece4d6}',
    '.ch-gb-rules-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:600px){.ch-gb-rules-inner{padding:0 20px}}',
    '.ch-gb-rules-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin-bottom:14px}',
    '.ch-gb-rules-h2{font-family:"Cormorant Garamond",serif;font-size:32px;font-weight:500;color:#1f1c18;margin:0 0 36px;line-height:1.2}',
    '.ch-gb-kit-photo{width:100%;max-width:560px;margin:0 auto 40px;display:block;border-radius:10px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,.1)}',
    '.ch-gb-kit-photo img{width:100%;height:auto;display:block}',
    '.ch-gb-kit-caption{text-align:center;font-size:12px;color:#8a8273;margin:-28px auto 40px;max-width:560px;font-style:italic}',
    '.ch-gb-rule-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}',
    '@media(max-width:640px){.ch-gb-rule-grid{grid-template-columns:1fr}}',
    '.ch-gb-rule-card{background:#fff;border:1px solid #ece4d6;border-radius:10px;padding:22px 20px;border-left:3px solid #c9943a}',
    '.ch-gb-rule-title{font-size:13px;font-weight:700;color:#1f1c18;margin:0 0 6px;letter-spacing:.01em}',
    '.ch-gb-rule-body{font-size:13px;color:#5e5850;line-height:1.6;margin:0}',

    // Steps
    '.ch-gb-steps{padding:72px 0;background:#fff;border-top:1px solid #ece4d6}',
    '.ch-gb-steps-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:600px){.ch-gb-steps-inner{padding:0 20px}}',
    '.ch-gb-steps-h2{font-family:"Cormorant Garamond",serif;font-size:32px;font-weight:500;color:#1f1c18;margin:0 0 36px;line-height:1.2}',
    '.ch-gb-step-list{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}',
    '@media(max-width:720px){.ch-gb-step-list{grid-template-columns:1fr;gap:16px}}',
    '.ch-gb-step{background:#faf7f1;border:1px solid #ece4d6;border-radius:10px;padding:28px 24px;position:relative}',
    '.ch-gb-step-num{font-family:"Cormorant Garamond",serif;font-size:42px;font-weight:600;color:#ece4d6;line-height:1;display:block;margin-bottom:10px}',
    '.ch-gb-step-title{font-size:14px;font-weight:700;color:#1f1c18;margin:0 0 8px}',
    '.ch-gb-step-body{font-size:13px;color:#5e5850;line-height:1.65;margin:0}',

    // CTA
    '.ch-gb-cta{padding:72px 0;background:#1f1c18;border-top:1px solid #2c2820}',
    '.ch-gb-cta-inner{max-width:1100px;margin:0 auto;padding:0 32px;text-align:center}',
    '@media(max-width:600px){.ch-gb-cta-inner{padding:0 20px}}',
    '.ch-gb-cta-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#faf7f1;margin:0 0 12px;text-wrap:balance}',
    '.ch-gb-cta-p{font-size:15px;color:#8a8273;margin:0 0 28px;line-height:1.65}',
    '.ch-gb-cta-btn{display:inline-flex;align-items:center;background:#c9943a;color:#fff;padding:13px 32px;border-radius:6px;font-family:"Work Sans",sans-serif;font-weight:600;font-size:15px;text-decoration:none;transition:background .2s}',
    '.ch-gb-cta-btn:hover{background:#b5832f}'
  ].join('');
  document.head.appendChild(styleEl);

  var main = document.querySelector('main, #page, .Site-inner') || document.body;
  var headerEl = document.querySelector('.Site-header, header, [class*="Header"]');
  var headerH  = headerEl ? headerEl.getBoundingClientRect().height : 72;

  var container = document.createElement('div');
  container.id = 'ch-gb';

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

    '<section class="ch-gb-identity">' +
      '<span class="ch-gb-eye">A Copper\'s Community Event</span>' +
      '<h1 class="ch-gb-h1">Group Build!</h1>' +
      '<em class="ch-gb-vintage">Vintage 1985</em>' +
      '<p class="ch-gb-tagline">Any kit. Any scale. Any brand. As long as the mold dates back to 1985 or older — and you\'re ready to finally build it.</p>' +
      '<div class="ch-gb-chips">' +
        '<span class="ch-gb-chip"><strong>Registration:</strong>&nbsp; July 12 – August 9</span>' +
        '<span class="ch-gb-chip"><strong>Reveal Night:</strong>&nbsp; December 12</span>' +
        '<span class="ch-gb-chip"><strong>Cost:</strong>&nbsp; Free</span>' +
      '</div>' +
    '</section>' +

    '<section class="ch-gb-about">' +
      '<div class="ch-gb-about-inner">' +
        '<div>' +
          '<span class="ch-gb-about-eye">What Is It?</span>' +
          '<h2 class="ch-gb-about-h2">A build challenge for kits from a different era</h2>' +
          '<p class="ch-gb-about-p">We\'re running a community build — and this one has a twist. Every kit in the build has to come from a mold that was tooled in 1985 or older. Vintage kits, built by modern hands.</p>' +
          '<p class="ch-gb-about-p">It\'s not a competition. There\'s no judging, no prizes, and no pressure. Just a good reason to pull that kit out of the stash — or pick one up here — and actually build it. Then bring it back on December 12 and see what the whole group put together.</p>' +
          '<p class="ch-gb-about-p">All experience levels welcome. All kit types welcome. Just keep it old school.</p>' +
        '</div>' +
        '<div class="ch-gb-poster">' +
          '<img src="' + IMG_POSTER + '" alt="Group Build: Vintage 1985 — event poster">' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<section class="ch-gb-rules">' +
      '<div class="ch-gb-rules-inner">' +
        '<span class="ch-gb-rules-eye">The Rules</span>' +
        '<h2 class="ch-gb-rules-h2">What qualifies</h2>' +
        '<div class="ch-gb-kit-photo">' +
          '<img src="' + IMG_KIT + '" alt="An example of a qualifying vintage kit">' +
        '</div>' +
        '<p class="ch-gb-kit-caption">An example of a kit that qualifies. Box stock, mold from 1985 or older.</p>' +
        '<div class="ch-gb-rule-grid">' +
          '<div class="ch-gb-rule-card">' +
            '<p class="ch-gb-rule-title">Mold from 1985 or older</p>' +
            '<p class="ch-gb-rule-body">The original tooling must date to 1985 or before. Re-engraved or otherwise updated versions do not qualify — it has to be the original mold, unchanged.</p>' +
          '</div>' +
          '<div class="ch-gb-rule-card">' +
            '<p class="ch-gb-rule-title">Built Box Stock</p>' +
            '<p class="ch-gb-rule-body">Build what came in the box. No major modifications, scratch-building, or aftermarket detail sets. The point is to see what the old kit can do on its own.</p>' +
          '</div>' +
          '<div class="ch-gb-rule-card">' +
            '<p class="ch-gb-rule-title">Must be unstarted</p>' +
            '<p class="ch-gb-rule-body">The kit cannot have been opened and begun before you register. If it\'s been sitting untouched in the stash for thirty years, that\'s perfect.</p>' +
          '</div>' +
          '<div class="ch-gb-rule-card">' +
            '<p class="ch-gb-rule-title">New decals are allowed</p>' +
            '<p class="ch-gb-rule-body">Vintage decals can be beyond saving — that\'s understood. Replacement or aftermarket decals are fine. Everything else stays Box Stock.</p>' +
          '</div>' +
          '<div class="ch-gb-rule-card">' +
            '<p class="ch-gb-rule-title">Any brand, type, or scale</p>' +
            '<p class="ch-gb-rule-body">Cars, aircraft, armour, ships, figures — whatever you\'re into. Any scale, any manufacturer. If the mold fits the era, the kit qualifies.</p>' +
          '</div>' +
          '<div class="ch-gb-rule-card">' +
            '<p class="ch-gb-rule-title">Stash or store</p>' +
            '<p class="ch-gb-rule-body">Already have something that fits? Great. Looking for one? Come browse — we stock a selection of older kits and can help you find something that qualifies.</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<section class="ch-gb-steps">' +
      '<div class="ch-gb-steps-inner">' +
        '<h2 class="ch-gb-steps-h2">How to take part</h2>' +
        '<div class="ch-gb-step-list">' +
          '<div class="ch-gb-step">' +
            '<span class="ch-gb-step-num">01</span>' +
            '<p class="ch-gb-step-title">Pick your kit</p>' +
            '<p class="ch-gb-step-body">Find a kit from your stash or pick one up in store. Any type, any scale — just make sure the mold dates back to 1985 or earlier and the box is unstarted.</p>' +
          '</div>' +
          '<div class="ch-gb-step">' +
            '<span class="ch-gb-step-num">02</span>' +
            '<p class="ch-gb-step-title">Register at Copper\'s</p>' +
            '<p class="ch-gb-step-body">Bring the kit into the store between July 12 and August 9. We\'ll take a photo, log it, confirm the date, and check it\'s unstarted. That\'s all there is to it.</p>' +
          '</div>' +
          '<div class="ch-gb-step">' +
            '<span class="ch-gb-step-num">03</span>' +
            '<p class="ch-gb-step-title">Build &amp; reveal</p>' +
            '<p class="ch-gb-step-body">Build it at your own pace — Box Stock, no rush. Bring the finished kit back to Copper\'s on December 12 for the big Reveal and see what everyone else built.</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<section class="ch-gb-cta">' +
      '<div class="ch-gb-cta-inner">' +
        '<h2 class="ch-gb-cta-h2">Need a kit? We might have just the thing.</h2>' +
        '<p class="ch-gb-cta-p">Browse our model kit collection — we carry a range of older kits and can help you find something that fits the era.</p>' +
        '<a href="/coppers-hobbies-szOJ2" class="ch-gb-cta-btn">Shop Model Kits</a>' +
      '</div>' +
    '</section>';

}());
