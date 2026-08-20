(function () {
  'use strict';
  if (window.location.pathname !== '/art-hangout') return;

  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#ch-hao{font-family:"Work Sans",sans-serif;color:#1f1c18;line-height:1.6}',
    '#ch-hao *{box-sizing:border-box}',

    // Identity
    '.ch-hao-identity{background:#fdf6e3;border-bottom:1px solid #e8d5a3;padding:60px 32px 52px;text-align:center}',
    '.ch-hao-h1{font-family:"Cormorant Garamond",serif;font-size:clamp(42px,7vw,72px);font-weight:600;color:#1f1c18;line-height:1;margin:0 0 8px}',
    '.ch-hao-sub-h1{font-family:"Cormorant Garamond",serif;font-size:clamp(20px,4vw,34px);font-weight:400;font-style:italic;color:#c9943a;display:block;margin-bottom:20px}',
    '.ch-hao-tagline{font-size:16px;color:#5e5850;max-width:540px;margin:0 auto 32px;line-height:1.65}',
    '.ch-hao-chips{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}',
    '.ch-hao-chip{background:#fff;border:1px solid #e8d5a3;border-radius:20px;padding:7px 16px;font-size:13px;color:#5e5850;font-weight:500}',
    '.ch-hao-chip strong{color:#1f1c18}',
    '@media(max-width:600px){.ch-hao-identity{padding:44px 20px 40px}}',

    // About
    '.ch-hao-about{padding:72px 0;background:#fff;border-top:1px solid #ece4d6}',
    '.ch-hao-about-inner{max-width:1100px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1fr 320px;gap:64px;align-items:center}',
    '@media(max-width:880px){.ch-hao-about-inner{grid-template-columns:1fr;gap:40px}}',
    '@media(max-width:600px){.ch-hao-about-inner{padding:0 20px}}',
    '.ch-hao-about-h2{font-family:"Cormorant Garamond",serif;font-size:32px;font-weight:500;color:#1f1c18;margin:0 0 20px;line-height:1.2;text-wrap:balance}',
    '.ch-hao-about-p{font-size:15px;color:#5e5850;line-height:1.8;margin:0 0 16px}',
    '.ch-hao-about-p:last-child{margin-bottom:0}',
    '.ch-hao-poster-card{background:#fdf6e3;border:1px solid #e8d5a3;border-radius:12px;padding:36px 28px;text-align:center;box-shadow:0 6px 24px rgba(0,0,0,.07)}',
    '.ch-hao-poster-title{font-family:"Cormorant Garamond",serif;font-size:clamp(32px,5vw,48px);font-weight:700;color:#2a4a9c;line-height:1.1;margin:0 0 16px}',
    '.ch-hao-poster-divider{width:40px;height:2px;background:#c9943a;margin:0 auto 16px}',
    '.ch-hao-poster-date{font-family:"Work Sans",sans-serif;font-size:15px;font-weight:600;color:#1f1c18;margin:0 0 4px}',
    '.ch-hao-poster-time{font-family:"Work Sans",sans-serif;font-size:14px;color:#5e5850;margin:0 0 14px}',
    '.ch-hao-poster-loc{font-family:"Work Sans",sans-serif;font-size:13px;color:#8a8273;line-height:1.6;margin:0}',
    '@media(max-width:880px){.ch-hao-poster-card{max-width:380px;margin:0 auto}}',

    // What to know
    '.ch-hao-know{padding:72px 0;background:#faf7f1;border-top:1px solid #ece4d6}',
    '.ch-hao-know-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:600px){.ch-hao-know-inner{padding:0 20px}}',
    '.ch-hao-know-h2{font-family:"Cormorant Garamond",serif;font-size:32px;font-weight:500;color:#1f1c18;margin:0 0 36px;line-height:1.2}',
    '.ch-hao-know-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}',
    '@media(max-width:720px){.ch-hao-know-grid{grid-template-columns:1fr;gap:14px}}',
    '.ch-hao-know-card{background:#fff;border:1px solid #ece4d6;border-radius:10px;padding:24px 20px;border-left:3px solid #c9943a}',
    '.ch-hao-know-title{font-size:14px;font-weight:700;color:#1f1c18;margin:0 0 8px}',
    '.ch-hao-know-body{font-size:13px;color:#5e5850;line-height:1.65;margin:0}',

    // CTA
    '.ch-hao-cta{padding:72px 0;background:#1f1c18;border-top:1px solid #2c2820}',
    '.ch-hao-cta-inner{max-width:1100px;margin:0 auto;padding:0 32px;text-align:center}',
    '@media(max-width:600px){.ch-hao-cta-inner{padding:0 20px}}',
    '.ch-hao-cta-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#faf7f1;margin:0 0 12px;text-wrap:balance}',
    '.ch-hao-cta-p{font-size:15px;color:#8a8273;margin:0 0 6px;line-height:1.65}',
    '.ch-hao-cta-contact{font-size:13px;color:#8a8273;margin:0 0 28px}',
    '.ch-hao-cta-btn{display:inline-flex;align-items:center;background:#c9943a;color:#fff;padding:13px 32px;border-radius:6px;font-family:"Work Sans",sans-serif;font-weight:600;font-size:15px;text-decoration:none;transition:background .2s}',
    '.ch-hao-cta-btn:hover{background:#b5832f}'
  ].join('');
  document.head.appendChild(styleEl);

  var main = document.querySelector('main, #page, .Site-inner') || document.body;
  var headerEl = document.querySelector('.Site-header, header, [class*="Header"]');
  var headerH  = headerEl ? headerEl.getBoundingClientRect().height : 72;

  var container = document.createElement('div');
  container.id = 'ch-hao';

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

    '<section class="ch-hao-identity">' +
      '<h1 class="ch-hao-h1">The Art Hang Out</h1>' +
      '<em class="ch-hao-sub-h1">A day of creativity and connection</em>' +
      '<p class="ch-hao-tagline">Bring any medium you like and spend an afternoon creating and mingling with people who love to make things.</p>' +
      '<div class="ch-hao-chips">' +
        '<span class="ch-hao-chip"><strong>Sep 12:</strong>&nbsp; Saturday, September 12th</span>' +
        '<span class="ch-hao-chip"><strong>Oct 17:</strong>&nbsp; Saturday, October 17th</span>' +
        '<span class="ch-hao-chip"><strong>Time:</strong>&nbsp; 12pm to 4pm</span>' +
        '<span class="ch-hao-chip"><strong>Cost:</strong>&nbsp; Free</span>' +
        '<span class="ch-hao-chip"><strong>Format:</strong>&nbsp; Drop in anytime</span>' +
      '</div>' +
    '</section>' +

    '<section class="ch-hao-about">' +
      '<div class="ch-hao-about-inner">' +
        '<div>' +
          '<h2 class="ch-hao-about-h2">Come create with people who get it</h2>' +
          '<p class="ch-hao-about-p">The Art Hang Out is a casual drop-in event where artists of every kind come together to create, chat, and connect. Bring whatever you\'re working on — watercolours, acrylics, pencil, charcoal, markers, mixed media — and spend the afternoon doing what you love alongside others who feel the same way.</p>' +
          '<p class="ch-hao-about-p">There\'s no agenda, no skill level requirement, and no pressure. Just a welcoming space to make things, meet people, and pick up a trick or two from whoever\'s sitting next to you.</p>' +
          '<p class="ch-hao-about-p">The inaugural Art Hang Out in August was a hit, so we\'re doing it again — twice. Join us Saturday September 12th or Saturday October 17th, both 12pm to 4pm. Drop in for an hour or stay the whole afternoon.</p>' +
        '</div>' +
        '<div class="ch-hao-poster-card">' +
          '<p class="ch-hao-poster-title">The Art<br>Hang Out</p>' +
          '<div class="ch-hao-poster-divider"></div>' +
          '<p class="ch-hao-poster-date">Saturday, September 12th</p>' +
          '<p class="ch-hao-poster-date" style="margin-top:0">Saturday, October 17th</p>' +
          '<p class="ch-hao-poster-time">12pm &ndash; 4pm &nbsp;&middot;&nbsp; Drop in anytime</p>' +
          '<p class="ch-hao-poster-loc">Copper\'s Hobbies<br>935 Frederick Street<br>Kitchener, Ontario</p>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<section class="ch-hao-know">' +
      '<div class="ch-hao-know-inner">' +
        '<h2 class="ch-hao-know-h2">What to know before you come</h2>' +
        '<div class="ch-hao-know-grid">' +
          '<div class="ch-hao-know-card">' +
            '<p class="ch-hao-know-title">Any medium welcome</p>' +
            '<p class="ch-hao-know-body">Watercolour, acrylics, oils, pencil, charcoal, ink, markers, pastels, colouring — whatever you work in. If you make it by hand, bring it.</p>' +
          '</div>' +
          '<div class="ch-hao-know-card">' +
            '<p class="ch-hao-know-title">Drop in anytime</p>' +
            '<p class="ch-hao-know-body">Doors are open 12pm to 4pm. Stay for an hour or the whole afternoon — no registration, no commitment, just show up and create.</p>' +
          '</div>' +
          '<div class="ch-hao-know-card">' +
            '<p class="ch-hao-know-title">All skill levels</p>' +
            '<p class="ch-hao-know-body">Painting for decades or just picked up a sketchbook — this is a space for everyone. Come as you are, make what you make.</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<section class="ch-hao-cta">' +
      '<div class="ch-hao-cta-inner">' +
        '<h2 class="ch-hao-cta-h2">See you this fall</h2>' +
        '<p class="ch-hao-cta-p">Copper\'s Hobbies &nbsp;&middot;&nbsp; 935 Frederick Street, Kitchener, Ontario</p>' +
        '<p class="ch-hao-cta-contact">519-570-0001 &nbsp;&middot;&nbsp; coppershobbies@gmail.com</p>' +
        '<a href="/art-supplies" class="ch-hao-cta-btn">Browse Art Supplies</a>' +
      '</div>' +
    '</section>';

}());
