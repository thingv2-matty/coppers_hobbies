# Squarespace Code Injection

Paste the following into:
**Squarespace Admin → Settings → Advanced → Code Injection → Footer**

## Current (commit-pinned — use this to avoid CDN cache delays)

```html
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/thingv2-matty/coppers_hobbies@dee2dc0/custom-code/cart-drawer.js"></script>
<script src="https://cdn.jsdelivr.net/gh/thingv2-matty/coppers_hobbies@5d0c7bc/custom-code/search-engine.js"></script>
<script src="https://cdn.jsdelivr.net/gh/thingv2-matty/coppers_hobbies@7f95ebb/custom-code/art-classes.js"></script>
<script src="https://cdn.jsdelivr.net/gh/thingv2-matty/coppers_hobbies@9f440f3/custom-code/about-page.js"></script>
<script src="https://cdn.jsdelivr.net/gh/thingv2-matty/coppers_hobbies@01a6361/custom-code/location-page.js"></script>
<script src="https://cdn.jsdelivr.net/gh/thingv2-matty/coppers_hobbies@45d387e/custom-code/build-night.js"></script>
```

## Latest @main (may be delayed by CDN cache after a push)

```html
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/thingv2-matty/coppers_hobbies@main/custom-code/cart-drawer.js"></script>
<script src="https://cdn.jsdelivr.net/gh/thingv2-matty/coppers_hobbies@main/custom-code/search-engine.js"></script>
```

---

## Notes

- After each push, update the commit hash above to the new SHA from `git log --oneline -1`
- To force CDN refresh on @main, hit:
  `https://purge.jsdelivr.net/gh/thingv2-matty/coppers_hobbies@main/custom-code/search-engine.js`
  `https://purge.jsdelivr.net/gh/thingv2-matty/coppers_hobbies@main/custom-code/cart-drawer.js`
- cart-drawer.js last significant change: `876d4ef` (Canadian-only geo-restriction)
- search-engine.js last significant change: `5d0c7bc` (localStorage v5; normalizeCat; sequential fetch; nextPageOffset guard)
- art-classes.js last significant change: `7f95ebb` (painting→art workshop; copy tweak)
- about-page.js last significant change: `9f440f3` (swap placeholder images)
- location-page.js last significant change: `01a6361` (reduce header top padding)
- build-night.js last significant change: `45d387e` (single image in page; table close-up on homepage card)
