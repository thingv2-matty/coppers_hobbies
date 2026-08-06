(function () {
  'use strict';
  if (window.location.pathname !== '/') return;

  // Auto-expire after Aug 15 end of day
  if (new Date() >= new Date('2026-08-16T00:00:00')) return;

  // Permanent dismiss check
  if (localStorage.getItem('ch_hao_popup') === 'done') return;

  var style = document.createElement('style');
  style.textContent = [
    '#ch-hao-pop{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px}',
    '#ch-hao-pop-inner{position:relative;max-width:460px;width:100%}',
    '#ch-hao-pop img{width:100%;display:block;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.4)}',
    '#ch-hao-pop-x{position:absolute;top:-13px;right:-13px;width:30px;height:30px;background:#fff;border:none;border-radius:50%;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.25);color:#1f1c18;line-height:1}',
    '#ch-hao-pop-x:hover{background:#f0ebe3}',
    '#ch-hao-pop-footer{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:14px}',
    '#ch-hao-pop-learn{background:#2a4a9c;color:#fff;padding:10px 26px;border-radius:6px;font-family:"Work Sans",sans-serif;font-weight:600;font-size:14px;text-decoration:none;display:inline-block}',
    '#ch-hao-pop-learn:hover{background:#1e3a82}',
    '#ch-hao-pop-dsa{background:transparent;color:rgba(255,255,255,.65);border:none;cursor:pointer;font-family:"Work Sans",sans-serif;font-size:13px;text-decoration:underline;padding:0}'
  ].join('');
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'ch-hao-pop';
  overlay.innerHTML =
    '<div id="ch-hao-pop-inner">' +
      '<button id="ch-hao-pop-x" aria-label="Close">&#x2715;</button>' +
      '<img src="https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/14dd76a6-b57b-435c-a8f3-dd30aa797372/art-hangout-info.png?content-type=image%2Fpng" alt="The Art Hang Out — Saturday August 15th, 12–4pm at Copper\'s Hobbies">' +
      '<div id="ch-hao-pop-footer">' +
        '<a href="/art-hangout" id="ch-hao-pop-learn">Learn More</a>' +
        '<button id="ch-hao-pop-dsa">Don\'t show again</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  document.getElementById('ch-hao-pop-x').addEventListener('click', function () {
    overlay.remove();
  });

  document.getElementById('ch-hao-pop-dsa').addEventListener('click', function () {
    localStorage.setItem('ch_hao_popup', 'done');
    overlay.remove();
  });
}());
