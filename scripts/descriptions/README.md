# Product Description Backfill

One-time script that reads a Squarespace product CSV export, finds products
with a missing or junk description (under 10 words — catches empty fields,
"NEW!!!", "5m in length", etc.), and generates a real 2-sentence description
for those using Claude. Products with an existing real description are left
completely untouched, as are variant continuation rows.

## Setup (one time)

```bash
cd scripts/descriptions
npm install
```

## Usage

1. **Export products from Squarespace**: Admin → Products & Services →
   products list → export to CSV. Save it somewhere you can find it.

2. **Dry run first** (no API calls, no files written — just shows what
   would happen):
   ```bash
   node generate-descriptions.js /path/to/products.csv --dry-run
   ```

3. **Test on a small batch** (uses real API calls, costs a few cents):
   ```bash
   ANTHROPIC_API_KEY=sk-ant-your-key-here node generate-descriptions.js /path/to/products.csv --limit=10
   ```
   Check the `descriptions-cache.json` file it creates to see the
   generated text before running the full batch.

4. **Run the full batch**:
   ```bash
   ANTHROPIC_API_KEY=sk-ant-your-key-here node generate-descriptions.js /path/to/products.csv
   ```
   This writes `products-updated.csv` next to your input file.

5. **Import `products-updated.csv` back into Squarespace** via the same
   Products & Services import feature.

## Notes

- Safe to re-run if interrupted — `descriptions-cache.json` checkpoints
  progress by Product ID, so already-generated descriptions are reused
  instead of re-calling the API.
- Delete `descriptions-cache.json` if you want to force regeneration of
  everything from scratch.
- Get your Anthropic API key at https://console.anthropic.com (separate
  from a claude.ai Pro subscription).
