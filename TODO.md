# Copper's Hobbies Website — To-Do

## Search Engine

- [ ] Filter pills row on desktop — show active filters as dismissible pills above the grid (× to remove individually)
- [ ] Add more brands as they surface in the Category filter (check brands.md)
- [ ] Consider "Sort by" option (price low→high, high→low, name A→Z)

## Cart Drawer

- [ ] (nothing pending)

## General / Polish

- [ ] (add notes here)

---

## How to temporarily disable custom JS (see original Squarespace)

**Homepage only — no refresh needed.** Paste in DevTools console:
```javascript
var home = document.getElementById('ch-home');
if (home) {
  var sib = home.nextElementSibling;
  while (sib) { sib.style.removeProperty('display'); sib = sib.nextElementSibling; }
  home.remove();
  console.log('Restored.');
} else { console.log('Not on custom homepage.'); }
```

**All pages — block scripts entirely.** Requires a refresh:
1. Open DevTools → **Network** tab
2. Right-click the `search-engine.js` request → **Block request URL**
3. Refresh — custom code won't run

To re-enable: Network tab → Request Blocking panel → uncheck or delete the rule → refresh.
To block everything at once: add pattern `cdn.jsdelivr.net/gh/thingv2-matty/*` in Request Blocking.

---

## How to push changes live

1. Edit `custom-code/search-engine-console-test.js` and test in console on coppershobbies.com
2. When happy, sync changes to `custom-code/search-engine.js` (same code, clean header)
3. `git add` → `git commit` → `git push`
4. Wait ~2 min for jsDelivr CDN to pick up, or purge manually:
   `https://purge.jsdelivr.net/gh/thingv2-matty/coppers_hobbies@main/custom-code/search-engine.js`

## Squarespace Code Injection (Footer)

```html
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/thingv2-matty/coppers_hobbies@main/custom-code/cart-drawer.js"></script>
<script src="https://cdn.jsdelivr.net/gh/thingv2-matty/coppers_hobbies@main/custom-code/search-engine.js"></script>
```



MATTY'S TODO LIST (claude you can read this too, but I'll handle managing it.)

about us (built — inject about-page.js at /about, swap placeholder images)
build night
art classes
/location page (map + hours + address — already have all the content, just needs its own JS injection)


Change Friends and Cohorts to "Friends of Copper's"
Remove richards art from there.
link to Many Minis (manyminis.ca)


Page for many minis (waiting for email for him with info)

happenings link up/build

check if we can do related natively or need injection. we are injecting the recommended accessories

dspiae nippers
godhand sanding sticks
tamiya paints
tamiya cement
dpsiae tweezer
excel knife
tamiya panel line
princeton brushes
