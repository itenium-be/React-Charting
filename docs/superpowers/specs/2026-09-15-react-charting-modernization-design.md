# React-Charting Modernization — Design

**Date:** 2026-09-15
**Repo:** https://github.com/itenium-be/React-Charting
**Blog post:** https://itenium.be/blog/javascript/what-chart-library-to-use-in-react/

## Context

The repo dates from 2023-05 and still runs CRA 5 / React 18 / npm / TypeScript 4.9.
Its companion blog post carries two comparison tables stamped "Data as of 19/04/2023".
Both are stale: react-vis has been deprecated by Uber, and three significant
libraries have appeared since.

The library-selection question that prompted this work is already settled
(Recharts). This modernization is therefore about the repo and post as a
public artifact, not about reaching a verdict.

## Goals

1. Run on a current toolchain (Vite, bun, React 19, TS 7).
2. Refresh the library lineup: upgrade the survivors, add newcomers, mark the dead.
3. Regenerate both comparison tables from live data, into README and site alike,
   stamped with a collection date.
4. Surface the comparison data on the site itself, not only in the README.
5. Publish to GitHub Pages from CI on push.

## Non-goals

- Re-deciding which charting library to use.
- Rewriting the Redux store, the demo data model, or the page components beyond
  what the migration requires.
- Updating the blog post itself (separate piece of work; this repo feeds it).

## Decisions

### Toolchain

| From                      | To                                |
|---------------------------|-----------------------------------|
| CRA / react-scripts 5.0.1 | Vite 8 + `@vitejs/plugin-react` 6 |
| npm                       | bun                               |
| React 18.2                | React 19.3                        |
| TypeScript 4.9            | TypeScript 7.x                    |
| `gh-pages` package deploy | GitHub Actions                    |

- `vite.config.ts` sets `base: '/React-Charting/'` to match the Pages URL.
- `public/index.html` moves to the project root; `%PUBLIC_URL%` becomes `/`.
- Removed: `react-scripts`, `gh-pages`, `web-vitals`, `src/reportWebVitals.ts`,
  `src/setupTests.ts`, `@testing-library/*`, `@types/jest`.
- Redux, redux-thunk and react-redux are kept, version-bumped only.

### Lineup — 9 libraries

Eight live demos:

| Library           | Package            | Latest (2026-09-15) |
|-------------------|--------------------|---------------------|
| Recharts          | `recharts`         | 3.10.1              |
| visx              | `@visx/xychart`    | 4.0.0               |
| Nivo              | `@nivo/line`       | 0.99.0              |
| Victory           | `victory`          | 37.3.6              |
| React-chartjs-2   | `react-chartjs-2`  | 5.3.1               |
| ECharts (new)     | `echarts-for-react`| 3.0.6               |
| Observable Plot (new) | `@observablehq/plot` | 0.6.17         |
| unovis (new)      | `@unovis/react`    | 1.7.0               |

One skeleton: **react-vis** (1.12.1, published 2023-06-08, peer-pinned to React 16).
Its dependency is removed from `package.json` entirely — it cannot install against
React 19. The page keeps its nav slot and renders a greyed shimmer in the shape of
the chart, plus a card giving last release date, Uber's deprecation notice, and a
pointer to alternatives.

visx was initially suspected of lagging on React 19. Verified against the registry:
`@visx/xychart@4.0.0` (2026-06-11) declares `react@^18 || ^19`. It stays a live demo.

Observable Plot ships no React bindings; it needs a `useEffect` + ref wrapper.
Accepted — the extra glue is itself a fair comparison result.

### Data layer

`scripts/collect-metrics.ts`, run manually under bun, writes `src/data/libraries.json`.

| Field                            | Source                                          |
|----------------------------------|-------------------------------------------------|
| version, license, packageSize    | npm registry (`dist.unpackedSize`)              |
| weeklyDownloads                  | `api.npmjs.org/downloads/point/last-week`       |
| stars, openIssues, lastCommit    | GitHub repo API                                 |
| closedIssues                     | GitHub search API                               |
| commitCount                      | GitHub commits API, Link-header last page       |
| renderingType, charts, storybook, docs | hand-curated static table in the script   |
| `collectedAt`                    | stamped at run time                             |

All endpoints verified reachable unauthenticated on 2026-09-15. The GitHub search
API is the one that rate-limits hard; the script reads `GITHUB_TOKEN` when present
and degrades gracefully when absent.

The same script rewrites the two markdown tables in `README.md` between
`<!-- metrics:start -->` and `<!-- metrics:end -->` markers. One command regenerates
README and site together, so their dates cannot drift apart.

**Setup time is dropped.** The 2023 column recorded a human timing themselves
learning each library. This refresh is agent-implemented, so the figure is no
longer comparable. The README carries a one-line note saying so rather than nine
blank cells.

### Site changes

- Header, far right: GitHub icon linking to the repo.
- Header, itenium logo: links to the blog post, not itenium.be.
- Footer (new): "Data as of `collectedAt`" plus repo and blog links.
- Each library page: a badge row rendered from `libraries.json`, above the chart.

Badge row design is settled empirically: built for one library first, reviewed by
Wouter on the dev server, then applied to the other eight.

### CI

`.github/workflows/deploy.yml`, on push to `main`: bun install → build →
`actions/deploy-pages`.

**Manual step required:** the repo's Pages source must be switched from the
`gh-pages` branch to "GitHub Actions" in repo settings. This cannot be done from
the codebase. The `gh-pages` branch becomes dead afterwards and can be deleted.

### Tests

None. Wouter explicitly instructed skipping them for this work.

This is a deliberate deviation from the standing "TDD always, tests mandatory"
rule in CLAUDE.md, recorded here so it is not mistaken for an oversight. The
generator script is the part that would most have warranted tests.

## Risks

- **GitHub search API rate limits** can make a tokenless run return partial data.
  Mitigation: the script reports which fields it could not collect instead of
  writing silent zeroes.
- **`dist.unpackedSize` is not the 2023 metric.** The old table's "package size"
  came from a bundle-size service. Numbers will not be directly comparable to
  2023; the README notes the changed methodology.
- **TypeScript 7 is the native-Go rewrite**, not an incremental 5.x bump. If any
  lint/build plugin in the chain has not caught up, fall back to the latest 6.x.
- **Nine libraries is a lot of surface.** If the build runs long, unovis and
  Observable Plot are the two to cut — they are the least-established of the set.
