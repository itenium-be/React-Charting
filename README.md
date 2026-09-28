# React-Charting

[Github Pages](https://itenium-be.github.io/React-Charting/)

[itenium blog post](https://itenium.be/blog/javascript/what-chart-library-to-use-in-react/)

Sample project showcasing popular react charting libraries.

## Library comparison

<!-- metrics-date:start -->

Data collected on **2026-09-28**.

<!-- metrics-date:end -->

Setup time is no longer measured. The 2023 figures recorded a developer timing
themselves learning each library; this refresh was agent-implemented, so the
number is no longer comparable. Package size is now npm's unpacked tarball size,
which is not the metric the 2023 table used either.

### Overview

<!-- metrics-overview:start -->

| Library | Version | Package size | Weekly downloads | Rendering type | License | Documentation |
|---------|---------|--------------|------------------|----------------|---------|---------------|
| Recharts | 3.10.1 | 7.45 MB | 66,876,638 | Svg | MIT | Examples |
| Visx | 4.0.0 | 431 kB | 532,350 | Svg | MIT | Somewhat Interactive |
| Nivo | 0.99.0 + @nivo/core 0.99.0 | 371 kB + 254 kB | 1,098,604 + 1,863,531 | Svg / HTML / Canvas | MIT | Very Interactive |
| Victory | 37.3.6 | 2.28 MB | 514,432 | Svg | MIT | Gallery |
| React-chartjs-2 | 5.3.1 + chart.js 4.5.1 | 55 kB + 6.18 MB | 5,394,558 + 14,287,079 | Canvas | MIT | Gallery |
| ECharts | 3.0.6 + echarts 6.1.0 | 530 kB + 60.30 MB | 1,594,335 + 5,915,634 | Canvas / Svg | MIT | Very Interactive |
| Observable Plot | 0.6.17 | 1.53 MB | 792,956 | Svg | ISC | Gallery |
| Unovis | 1.7.0 | 206 kB | 13,252 | Svg / Canvas | Apache-2.0 | Gallery |
| React-vis | 1.12.1 | 2.18 MB | 102,693 | Svg / Canvas | MIT | Gallery |

`a + b` = React wrapper + underlying charting engine, for the three libraries that are wrappers around a separately published engine: ECharts, React-chartjs-2, Nivo.

<!-- metrics-overview:end -->

### Development activity

<!-- metrics-development:start -->

| Library | Stars | Last commit (total) | Issues open / closed | Charts | Storybook |
|---------|-------|---------------------|----------------------|--------|-----------|
| Recharts | 27,596 | 2026-09-28 (5,068) | 446 / 3,241 | 11 | WIP |
| Visx | 21,064 | 2026-06-22 (3,381) | 151 / 715 | 20+ | CodeSandbox |
| Nivo | 14,100 | 2026-07-21 (2,334) | 52 / 1,715 | 20 | YES |
| Victory | 11,240 | 2025-12-19 (8,649) | 92 / 1,834 | 10 | NO |
| React-chartjs-2 | 6,940 + 67,722 | 2026-09-25 (626) + 2026-09-14 (4,595) | 111 / 692 + 590 / 6,820 | 15 | CodeSandbox |
| ECharts | 5,007 + 67,408 | 2026-01-21 (37) + 2026-09-28 (10,397) | 53 / 479 + 1,491 / 18,087 | 20+ | NO |
| Observable Plot | 5,392 | 2026-09-01 (2,130) | 350 / 755 | 30+ | NO |
| Unovis | 2,855 | 2026-09-23 (1,362) | 108 / 188 | 20+ | NO |
| React-vis | 8,786 | 2024-12-18 (899) | 343 / 514 | 10 | Yes |

`a + b` = React wrapper + underlying charting engine repo, for ECharts and React-chartjs-2. Nivo's engine lives in the same repo as its wrapper, so it has no combined values here.

<!-- metrics-development:end -->


## Install

```sh
bun install
bun run dev
```

## Refresh the comparison data

```sh
GITHUB_TOKEN=$(gh auth token) bun run metrics
```

Rewrites `src/data/libraries.json` and the tables above.

## Deploy

Pushing to `main` builds and publishes to GitHub Pages via `.github/workflows/deploy.yml`.
