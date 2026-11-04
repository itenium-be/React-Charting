# React-Charting

[Github Pages](https://itenium-be.github.io/React-Charting/)

[itenium blog post](https://itenium.be/blog/javascript/what-chart-library-to-use-in-react/)

Sample project showcasing popular react charting libraries.

## Library comparison

<!-- metrics-date:start -->

Data collected on **2026-11-04**.

<!-- metrics-date:end -->

Setup time is no longer measured. The 2023 figures recorded a developer timing
themselves learning each library; this refresh was agent-implemented, so the
number is no longer comparable. Package size is now npm's unpacked tarball size,
which is not the metric the 2023 table used either.

### Overview

<!-- metrics-overview:start -->

| Library | Version | Package size | Weekly downloads | Rendering type | License | Documentation |
|---------|---------|--------------|------------------|----------------|---------|---------------|
| Recharts | 3.10.1 | 7.45 MB | 62,538,705 | Svg | MIT | Examples |
| Visx | 4.0.0 | 431 kB | 506,287 | Svg | MIT | Somewhat Interactive |
| Nivo | 0.99.0 + @nivo/core 0.99.0 | 371 kB + 254 kB | 1,201,475 + 2,031,197 | Svg / HTML / Canvas | MIT | Very Interactive |
| Victory | 38.0.0 | 30 kB | 721,094 | Svg | MIT | Gallery |
| React-chartjs-2 | 5.3.1 + chart.js 4.6.1 | 55 kB + 6.23 MB | 5,727,001 + 16,716,838 | Canvas | MIT | Gallery |
| ECharts | 3.0.6 + echarts 6.1.0 | 530 kB + 60.30 MB | 2,218,696 + 9,524,851 | Canvas / Svg | MIT | Very Interactive |
| Observable Plot | 0.6.18 | 1.74 MB | 1,706,071 | Svg | ISC | Gallery |
| Unovis | 1.7.1 | 206 kB | 17,061 | Svg / Canvas | Apache-2.0 | Gallery |
| React-vis | 1.12.1 | 2.18 MB | 122,406 | Svg / Canvas | MIT | Gallery |

`a + b` = React wrapper + underlying charting engine, for the three libraries that are wrappers around a separately published engine: ECharts, React-chartjs-2, Nivo.

<!-- metrics-overview:end -->

### Development activity

<!-- metrics-development:start -->

| Library | Stars | Last commit (total) | Issues open / closed | Charts | Storybook |
|---------|-------|---------------------|----------------------|--------|-----------|
| Recharts | 27,683 | 2026-11-04 (5,257) | 454 / 3,330 | 11 | WIP |
| Visx | 21,095 | 2026-06-22 (3,381) | 160 / 715 | 20+ | CodeSandbox |
| Nivo | 14,129 | 2026-07-21 (2,334) | 72 / 1,718 | 20 | YES |
| Victory | 11,245 | 2026-11-04 (8,689) | 99 / 1,841 | 10 | NO |
| React-chartjs-2 | 6,937 + 67,774 | 2026-10-29 (626) + 2026-10-23 (4,600) | 111 / 692 + 632 / 6,823 | 15 | CodeSandbox |
| ECharts | 5,011 + 67,680 | 2026-01-21 (37) + 2026-10-13 (10,403) | 52 / 480 + 1,485 / 18,126 | 20+ | NO |
| Observable Plot | 5,419 | 2026-11-03 (2,132) | 350 / 755 | 30+ | NO |
| Unovis | 2,863 | 2026-11-04 (1,496) | 107 / 192 | 20+ | NO |
| React-vis | 8,787 | 2024-12-18 (899) | 343 / 514 | 10 | Yes |

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
