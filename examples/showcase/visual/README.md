# Showcase visual coverage

The visual suite renders every showcase route across all five theme models, three responsive projects, and reduced-motion mode. It uses Playwright snapshots so CSS drift becomes a reviewable image diff.

Install the showcase dependencies, install Chromium, then seed or refresh snapshots:

```bash
npm install
npx playwright install chromium
npm run test:visual:update
```

Commit the generated `visual/__snapshots__` files with the intentional UI change. Run `npm run test:visual` for the comparison pass.

The suite keeps animations disabled during capture and writes one stable snapshot per route/theme/project combination.

The snapshot suite is a local review gate until its baseline images are committed. Seed the first baseline after reviewing the showcase in a browser; do not accept snapshots generated from a broken build.
