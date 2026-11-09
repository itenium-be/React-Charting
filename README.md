# React-Charting

[Github Pages](https://itenium-be.github.io/React-Charting/)

[itenium blog post](https://itenium.be/blog/javascript/what-chart-library-to-use-in-react/)

Sample project showcasing popular react charting libraries.

## Library comparison

<!-- metrics-date:start -->

Data collected on **2026-11-09**.

<!-- metrics-date:end -->

Setup time is no longer measured. The 2023 figures recorded a developer timing
themselves learning each library; this refresh was agent-implemented, so the
number is no longer comparable. Package size is now npm's unpacked tarball size,
which is not the metric the 2023 table used either.

### Overview

<!-- metrics-overview:start -->

| Library | Version | Package size | Weekly downloads | Rendering type | License | Documentation |
|---------|---------|--------------|------------------|----------------|---------|---------------|
| Recharts | 3.10.1 | 7.45 MB | 64,465,615 | Svg | MIT | Examples |
| Visx | 4.0.0 | 431 kB | 588,706 | Svg | MIT | Somewhat Interactive |
| Nivo | 0.99.0 + @nivo/core 0.99.0 | 371 kB + 254 kB | 1,188,644 + 2,035,958 | Svg / HTML / Canvas | MIT | Very Interactive |
| Victory | 38.0.1 | 30 kB | 764,353 | Svg | MIT | Gallery |
| React-chartjs-2 | 5.3.1 + chart.js 4.6.1 | 55 kB + 6.23 MB | 5,689,921 + 16,837,102 | Canvas | MIT | Gallery |
| ECharts | 3.0.6 + echarts 6.1.0 | 530 kB + 60.30 MB | 2,176,339 + 10,394,814 | Canvas / Svg | MIT | Very Interactive |
| Observable Plot | 0.6.19 | 1.74 MB | 1,262,970 | Svg | ISC | Gallery |
| Unovis | 1.8.0 | 220 kB | 15,777 | Svg / Canvas | Apache-2.0 | Gallery |
| React-vis | 1.12.1 | 2.18 MB | 130,415 | Svg / Canvas | MIT | Gallery |

`a + b` = React wrapper + underlying charting engine, for the three libraries that are wrappers around a separately published engine: ECharts, React-chartjs-2, Nivo.

<!-- metrics-overview:end -->

### Development activity

<!-- metrics-development:start -->

| Library | Stars | Last commit (total) | Issues open / closed | Charts | Storybook |
|---------|-------|---------------------|----------------------|--------|-----------|
| Recharts | 27,694 | 2026-11-09 (5,266) | 468 / 3,338 | 11 | WIP |
| Visx | 21,100 | 2026-06-22 (3,381) | 160 / 715 | 20+ | CodeSandbox |
| Nivo | 14,132 | 2026-07-21 (2,334) | 72 / 1,718 | 20 | YES |
| Victory | 11,245 | 2026-11-09 (8,703) | 98 / 1,842 | 10 | NO |
| React-chartjs-2 | 6,938 + 67,785 | 2026-11-08 (626) + 2026-11-09 (4,600) | 111 / 692 + 646 / 6,823 | 15 | CodeSandbox |
| ECharts | 5,009 + 67,696 | 2026-11-08 (40) + 2026-10-13 (10,403) | 45 / 488 + 1,475 / 18,144 | 20+ | NO |
| Observable Plot | 5,422 | 2026-11-05 (2,143) | 349 / 758 | 30+ | NO |
| Unovis | 2,867 | 2026-11-07 (1,521) | 109 / 192 | 20+ | NO |
| React-vis | 8,784 | 2024-12-18 (899) | 343 / 514 | 10 | Yes |

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
