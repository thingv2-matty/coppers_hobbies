// Copper's Hobbies — Many Minis brand page (/manyminis)
(function () {
  'use strict';

  if (window.location.pathname !== '/manyminis') return;

  var IMG_BANNER  = 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/09c96065-ab56-4655-990f-c4ca8b83ad2c/manyminis-banner.jpg?content-type=image%2Fjpeg';
  var IMG_CLOSEUP = 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/dfdcc881-aa44-448d-b16b-c16a70e5a2e8/manymini-closeup.jpg?content-type=image%2Fjpeg';
  var IMG_PAINTED = 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/e28d6c47-bed7-46ba-b68c-af18fea0b32a/manymini-painted.jpg?content-type=image%2Fjpeg';
  var IMG_COPPERS = 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/efc6da01-2bcf-4880-b05b-c1a3bd375dfe/manymini-atcoppers.jpg?content-type=image%2Fjpeg';

  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#ch-mm{font-family:"Work Sans",sans-serif;color:#1f1c18;line-height:1.6}',
    '#ch-mm *{box-sizing:border-box}',

    '.ch-mm-hero{position:relative;min-height:480px;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}',
    '.ch-mm-hero-bg{position:absolute;inset:0;background-image:url("' + IMG_BANNER + '");background-size:cover;background-position:center center}',
    '.ch-mm-hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(20,18,15,.5) 0%,rgba(20,18,15,.72) 100%)}',
    '.ch-mm-hero-inner{position:relative;z-index:1;padding:80px 32px 72px;max-width:700px}',
    '.ch-mm-h1{font-family:"Cormorant Garamond",serif;font-size:clamp(52px,9vw,92px);font-weight:600;color:#faf7f1;line-height:1;margin:0 0 18px;letter-spacing:-.01em}',
    '.ch-mm-tagline{font-size:16px;color:rgba(250,247,241,.75);margin:0;letter-spacing:.04em;font-weight:400}',
    '@media(max-width:600px){.ch-mm-hero{min-height:340px}.ch-mm-hero-inner{padding:60px 24px 52px}}',

    '.ch-mm-about{padding:80px 0;background:#fff;border-top:1px solid #ece4d6}',
    '.ch-mm-about-inner{max-width:1100px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1fr 420px;gap:72px;align-items:center}',
    '@media(max-width:900px){.ch-mm-about-inner{grid-template-columns:1fr;gap:44px}}',
    '@media(max-width:600px){.ch-mm-about-inner{padding:0 20px}}',
    '.ch-mm-about-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0 0 22px;line-height:1.2;text-wrap:balance}',
    '.ch-mm-about-p{font-size:15px;color:#5e5850;line-height:1.8;margin:0 0 18px}',
    '.ch-mm-about-p:last-child{margin-bottom:0}',
    '.ch-mm-about-img{width:100%;border-radius:10px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.12)}',
    '.ch-mm-about-img img{width:100%;height:auto;display:block}',
    '@media(max-width:900px){.ch-mm-about-img{max-width:500px;margin:0 auto}}',

    '.ch-mm-showcase{position:relative;overflow:hidden;height:440px}',
    '.ch-mm-showcase-bg{position:absolute;inset:0;background-image:url("' + IMG_PAINTED + '");background-size:cover;background-position:center 20%}',
    '.ch-mm-showcase-overlay{position:absolute;inset:0;background:rgba(0,0,0,.4)}',
    '.ch-mm-showcase-inner{position:relative;z-index:1;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:0 32px 48px;text-align:center}',
    '.ch-mm-showcase-cap{font-size:13px;color:rgba(250,247,241,.65);letter-spacing:.08em;text-transform:uppercase;margin:0}',
    '@media(max-width:600px){.ch-mm-showcase{height:300px}}',

    '.ch-mm-store{padding:80px 0;background:#faf7f1;border-top:1px solid #ece4d6}',
    '.ch-mm-store-inner{max-width:1100px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:420px 1fr;gap:72px;align-items:center}',
    '@media(max-width:900px){.ch-mm-store-inner{grid-template-columns:1fr;gap:44px}}',
    '@media(max-width:600px){.ch-mm-store-inner{padding:0 20px}}',
    '.ch-mm-store-img{width:100%;border-radius:10px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.12)}',
    '.ch-mm-store-img img{width:100%;height:auto;display:block}',
    '@media(max-width:900px){.ch-mm-store-img{max-width:500px;margin:0 auto}}',
    '.ch-mm-store-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0 0 20px;line-height:1.2;text-wrap:balance}',
    '.ch-mm-store-p{font-size:15px;color:#5e5850;line-height:1.8;margin:0 0 18px}',
    '.ch-mm-store-p:last-child{margin-bottom:0}',

    '.ch-mm-cta{padding:72px 0;background:#1f1c18;border-top:1px solid #2e2a24}',
    '.ch-mm-cta-inner{max-width:700px;margin:0 auto;padding:0 32px;text-align:center}',
    '@media(max-width:600px){.ch-mm-cta-inner{padding:0 20px}}',
    '.ch-mm-cta-h2{font-family:"Cormorant Garamond",serif;font-size:36px;font-weight:500;color:#faf7f1;margin:0 0 14px;text-wrap:balance}',
    '.ch-mm-cta-p{font-size:15px;color:#8a7f72;margin:0 0 32px;line-height:1.65}',
    '.ch-mm-cta-btn{display:inline-flex;align-items:center;background:#c9943a;color:#fff;padding:14px 36px;border-radius:6px;font-family:"Work Sans",sans-serif;font-weight:600;font-size:15px;text-decoration:none;letter-spacing:.02em;transition:background .2s}',
    '.ch-mm-cta-btn:hover{background:#b8832e}'
  ].join('');
  document.head.appendChild(styleEl);

  var main     = document.querySelector('main, #page, .Site-inner') || document.body;
  var headerEl = document.querySelector('.Site-header, header, [class*="Header"]');
  var headerH  = headerEl ? headerEl.getBoundingClientRect().height : 72;

  var container = document.createElement('div');
  container.id = 'ch-mm';

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

    '<section class="ch-mm-hero">' +
      '<div class="ch-mm-hero-bg"></div>' +
      '<div class="ch-mm-hero-overlay"></div>' +
      '<div class="ch-mm-hero-inner">' +
        '<h1 class="ch-mm-h1">Many Minis</h1>' +
        '<p class="ch-mm-tagline">Precision-Crafted Resin Miniatures &mdash; Made in Canada</p>' +
      '</div>' +
    '</section>' +

    '<section class="ch-mm-about">' +
      '<div class="ch-mm-about-inner">' +
        '<div>' +
          '<h2 class="ch-mm-about-h2">The smallest details make the biggest difference</h2>' +
          '<p class="ch-mm-about-p">Many Minis is a proudly Canadian company specializing in premium resin miniatures and scale modelling products. Every model is precision-crafted in Canada with an emphasis on exceptional detail, realism, and quality.</p>' +
          '<p class="ch-mm-about-p">We create products for scale modelers, miniature painters, collectors, diorama builders, and hobbyists who appreciate accuracy and realism. As hobbyists ourselves, we understand what matters: clean prints, crisp details, and reliable quality — every product is held to the same standard we expect for our own collections.</p>' +
          '<p class="ch-mm-about-p">Our growing range covers figures, accessories, vehicles, and scenery across multiple scales, with the ability to rescale many models from 1/12 down to 1/72 and smaller to suit individual projects.</p>' +
        '</div>' +
        '<div class="ch-mm-about-img">' +
          '<img src="' + IMG_CLOSEUP + '" alt="Close-up detail on a Many Minis resin print">' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<section class="ch-mm-showcase">' +
      '<div class="ch-mm-showcase-bg"></div>' +
      '<div class="ch-mm-showcase-overlay"></div>' +
      '<div class="ch-mm-showcase-inner">' +
        '<p class="ch-mm-showcase-cap">The detail is there &mdash; all you have to bring is the paint</p>' +
      '</div>' +
    '</section>' +

    '<section class="ch-mm-store">' +
      '<div class="ch-mm-store-inner">' +
        '<div class="ch-mm-store-img">' +
          '<img src="' + IMG_COPPERS + '" alt="Many Minis display at Copper\'s Hobbies">' +
        '</div>' +
        '<div>' +
          '<h2 class="ch-mm-store-h2">Find us at Copper\'s Hobbies</h2>' +
          '<p class="ch-mm-store-p">Many Minis proudly works with Copper\'s Hobbies to make our products easily available to the Canadian hobby community. You\'ll find our full range of figures, accessories, and scenery right on the shelf in Kitchener.</p>' +
          '<p class="ch-mm-store-p">We\'re constantly expanding our catalogue with new releases and unique subjects that are difficult to find elsewhere. Great customer service matters just as much as great products &mdash; we\'re always happy to help you find the right scale or solution for your next project.</p>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<section class="ch-mm-cta">' +
      '<div class="ch-mm-cta-inner">' +
        '<h2 class="ch-mm-cta-h2">Browse the collection</h2>' +
        '<p class="ch-mm-cta-p">Explore the full range of Many Minis resin models available at Copper\'s Hobbies &mdash; figures, accessories, vehicles, and more.</p>' +
        '<a href="https://www.coppershobbies.com/shopall?brands=Many+Minis" class="ch-mm-cta-btn">Shop Many Minis</a>' +
      '</div>' +
    '</section>';

}());
