# Copper's Hobbies — Claude Handoff

Pro bono Squarespace 7.1 redesign for Copper's Hobbies (coppershobbies.com), a local hobby shop at 935 Frederick Street, Kitchener, ON. Owners: Richard and Nancy Zajac. Now officially supported by **Off Grid Digital**.

GitHub repo: `thingv2-matty/coppers_hobbies`

---

## Deployment flow

1. Edit files in `custom-code/`
2. Commit and push to GitHub
3. Get the new commit hash from `git log --oneline -1`
4. Update the hash for the changed file in `injection-code.md`
5. Paste the updated injection block into **Squarespace Admin → Settings → Advanced → Code Injection → Footer**

**Always use commit-hash-pinned jsDelivr URLs — never `@main`.** CDN caches `@main` aggressively; hash pins are instant.

`injection-code.md` is the source of truth for what's currently live.

---

## Architecture

All custom JS is loaded via jsDelivr CDN in the Squarespace footer injection. Each script is a self-contained IIFE.

**Every page script starts with a URL guard:**
```javascript
if (window.location.pathname !== '/page-slug') return;
```

**Container IDs follow `ch-XXX` pattern** (ch-hao, ch-gb, ch-bn, etc.)  
**CSS class prefix matches the page** (ch-hao-, ch-gb-, ch-bn-, etc.)

The page pattern is always:
1. Inject a `<style>` tag into `<head>`
2. Create a `div#ch-xxx` container
3. Insert it before Squarespace's first section in `<main>`
4. Hide all sibling Squarespace sections with `display:none !important`
5. Set `container.style.marginTop = headerH + 'px'` to clear the fixed header

---

## Known Squarespace gotchas

**SectionWrapperController:** Squarespace's own JS sets `style="padding-top: Xpx"` on `section[data-sqsp-section="product-detail"]` as an inline style *after* our code runs. Inline JS can't fight this. Fix: inject a `<style>` block with `!important`.

**innerHTML replacement:** `renderCollectionPage()` in `search-engine.js` replaces `#ch-col` innerHTML when Fuse.js loads, wiping anything we inserted. Fix: `MutationObserver` on the container to re-insert after each wipe.

**`!important` in a `<style>` tag beats Squarespace inline styles** regardless of script execution order.

---

## `scripts/` vs `custom-code/`

- `custom-code/` — production files, deployed via jsDelivr
- `scripts/` — console test versions only (paste into DevTools, never injected). They use `sessionStorage` and a distinct cache key (e.g. `ch_search_v8_ct`) instead of `localStorage`, and have a console test header comment at top.

`js-strip.md` in the root has a console command to temporarily reveal the raw Squarespace page underneath (useful for before/after screenshots).

---

## Security rules

- **Never** paste the Anthropic API key in chat or write it to any file. Pass via environment variable only.
- The `ipinfo.io` token `b32d41bcb9bac9` in `search-engine.js` is intentionally client-side — it is domain-restricted to coppershobbies.com.

---

## Key files

| File | Purpose |
|------|---------|
| `injection-code.md` | Live injection block + hash history |
| `js-strip.md` | Console command to reveal raw Squarespace |
| `custom-code/search-engine.js` | Homepage, search, collection pages, all community cards |
| `custom-code/art-hangout.js` | /art-hangout page |
| `custom-code/art-classes.js` | /art-classes page |
| `custom-code/build-night.js` | /build-night page |
| `custom-code/group-build.js` | /group-build page |
| `custom-code/kwsa-page.js` | /kwsa page |
| `custom-code/scale-model-happenings.js` | /scale-model-happenings page |
| `custom-code/amps-page.js` | /amps page |
| `custom-code/many-minis.js` | /manyminis page |
| `custom-code/about-page.js` | /about page |
| `custom-code/location-page.js` | /location page |
| `custom-code/cart-drawer.js` | Sitewide cart drawer (Canadian geo-restricted) |
| `custom-code/related-products.js` | Related products on product pages |

---

## Memory note

If migrating from another machine, check whether `~/.claude/projects/.../memory/` has project memory files worth copying over. They contain Squarespace-specific lessons learned that won't be obvious from the code alone.
