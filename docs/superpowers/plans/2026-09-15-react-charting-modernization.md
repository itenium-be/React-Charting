# React-Charting Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize the 2023 React-Charting demo onto Vite/bun/React 19, refresh the library lineup to nine (eight live, one skeleton), and regenerate both comparison tables from live npm/GitHub data into the README and the site.

**Architecture:** A bun script collects metrics from the npm registry and GitHub API into `src/data/libraries.json`; the site renders badge rows from that file and the same script rewrites the README tables between HTML markers, so both carry one shared `collectedAt` date. Chart pages stay one-file-per-library behind the existing `AppFormFactory` switch.

**Tech Stack:** Vite 8, bun, React 19.3, TypeScript 7, Redux 5, Bootstrap 5 (CDN), GitHub Actions + Pages.

**No tests.** Wouter explicitly instructed skipping them for this work — a deliberate deviation from the CLAUDE.md "TDD always" rule, recorded in the spec. Verification steps below are builds, script runs and dev-server checks instead.

**Spec:** `docs/superpowers/specs/2026-09-15-react-charting-modernization-design.md`

---

### Task 1: Migrate toolchain to Vite + bun + React 19

**Files:**
- Create: `vite.config.ts`, `index.html`, `src/vite-env.d.ts`
- Modify: `package.json`, `tsconfig.json`, `src/index.tsx`, `.gitignore`
- Delete: `public/index.html`, `public/manifest.json`, `src/reportWebVitals.ts`, `src/setupTests.ts`, `package-lock.json`

- [ ] **Step 1: Replace `package.json`**

```json
{
  "name": "react-charting",
  "version": "0.2.0",
  "private": false,
  "type": "module",
  "homepage": "https://itenium-be.github.io/React-Charting",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "metrics": "bun run scripts/collect-metrics.ts"
  },
  "dependencies": {
    "@nivo/core": "^0.99.0",
    "@nivo/line": "^0.99.0",
    "react": "^19.3.0",
    "react-chartjs-2": "^5.3.1",
    "chart.js": "^4.5.0",
    "react-dom": "^19.3.0",
    "react-redux": "^9.3.0",
    "recharts": "^3.10.1",
    "redux": "^5.0.1",
    "redux-thunk": "^3.1.0",
    "victory": "^37.3.6"
  },
  "devDependencies": {
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@visx/xychart": "^4.0.0",
    "@vitejs/plugin-react": "^6.1.1",
    "typescript": "^7.0.2",
    "vite": "^8.3.0"
  }
}
```

Note what left: `react-scripts`, `gh-pages`, `web-vitals`, `react-vis`, `@react-spring/web`, `@types/react-vis`, `@types/redux`, `@types/redux-thunk`, `@types/node`, `@types/jest`, all `@testing-library/*`. `react-vis` is dropped because it peer-depends on React 16 and will not install against React 19 — its page becomes a skeleton in Task 5.

- [ ] **Step 2: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Must match the GitHub Pages sub-path, or built asset URLs 404.
  base: '/React-Charting/',
})
```

- [ ] **Step 3: Create `index.html` in the project root**

Vite serves `index.html` from the root, not from `public/`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#e78200" />
    <meta name="description" content="Demo app with several React Charting frameworks" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
    <title>React Charting</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Delete the CRA leftovers**

```bash
rm public/index.html public/manifest.json src/reportWebVitals.ts src/setupTests.ts package-lock.json
```

`public/favicon.png` stays — Vite copies `public/` to the build root.

- [ ] **Step 5: Create `src/vite-env.d.ts`**

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 6: Replace `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "scripts"]
}
```

- [ ] **Step 7: Update `src/index.tsx` for Redux 5 + no web-vitals**

Redux 5 removed the default export of `redux-thunk` (now a named `thunk`) and marks `createStore` deprecated in favour of `legacy_createStore`.

```tsx
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { Store, applyMiddleware, legacy_createStore as createStore } from "redux";
import reducer from "./store/reducer";
import { thunk } from "redux-thunk";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store: Store<PersonState, PersonAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

- [ ] **Step 8: Remove the react-vis page from the factory for now**

In `src/components/AppFormFactory.tsx`, delete the `import { ReactVis } from "../pages/ReactVis";` line, the `case 'reactvis':` branch, and the `<div className="col-6"><ReactVis /></div>` line in the `home` case. Leave `'reactvis'` in the `Charts` union — Task 5 restores the page as a skeleton.

Then delete the old implementation:

```bash
rm src/pages/ReactVis.tsx
```

Also remove the React-Vis `<li>` from the navbar in `src/App.tsx` — Task 5 puts it back.

- [ ] **Step 9: Update `.gitignore`**

`.gitignore` becomes:

```
node_modules
dist
```

(`build` → `dist`, Vite's output directory. Keep bun's lockfile — `bun.lock` on bun 1.3 — tracked; CI's `--frozen-lockfile` needs it.)

- [ ] **Step 10: Install and verify the build**

```bash
rm -rf node_modules
bun install
bun run build
```

Expected: `tsc --noEmit` reports no errors, then Vite writes `dist/` with `index.html` and hashed assets. Any type error here is almost certainly a React 19 `@types` change in a chart page — fix it in Task 2, which upgrades those libraries anyway.

- [ ] **Step 11: Verify the dev server**

```bash
bun run dev
```

Open `http://localhost:5173/React-Charting/`. Expected: the navbar, the Data page with seven persons, and each remaining chart page rendering. Stop the server before continuing.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "Migrate from CRA to Vite, bun and React 19"
```

---

### Task 2: Upgrade the five surviving chart libraries

Each of these crossed a major version since 2023. Work one page at a time and keep the dev server running so you see breakage immediately.

**Files:**
- Modify: `src/pages/Recharts.tsx`, `src/pages/Visx.tsx`, `src/pages/Nivo.tsx`, `src/pages/Victory.tsx`, `src/pages/ReactChartJS2.tsx`

- [ ] **Step 1: Start the dev server and leave it running**

```bash
bun run dev
```

- [ ] **Step 2: Check each page against its library's migration notes**

| Page | 2023 → now | What to watch |
|---------------------|-----------------|--------------------------------------------------|
| `Recharts.tsx` | 2.5 → 3.10 | v3 dropped defaultProps; explicit `width`/`height` still fine |
| `Visx.tsx` | 3.1 → 4.0 | v4 is the React 19 release; check `@visx/xychart` prop names |
| `Nivo.tsx` | 0.80 → 0.99 | Many prop renames across 19 minors |
| `Victory.tsx` | 36 → 37 | v37 restructured packages |
| `ReactChartJS2.tsx` | 5.2 → 5.3 | Minor; Chart.js 4 registration unchanged |

For each page: open it in the browser, fix what throws or renders blank, move to the next. Do not restyle or add features — the goal is parity with the 2023 demo.

- [ ] **Step 3: Verify the build is clean**

```bash
bun run build
```

Expected: no TypeScript errors, build succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Upgrade chart libraries to current major versions"
```

---

### Task 3: Metrics collector script

**Files:**
- Create: `scripts/collect-metrics.ts`, `src/data/libraries.json` (generated)

- [ ] **Step 1: Create `scripts/collect-metrics.ts`**

```ts
/**
 * Regenerates src/data/libraries.json and the README comparison tables.
 *
 * GitHub's search API rate-limits hard without auth (10 req/min), so closed-issue
 * counts are the first thing to fail on a tokenless run. Set GITHUB_TOKEN to avoid it.
 */

type Status = 'live' | 'deprecated'

interface LibrarySource {
  key: string
  name: string
  npm: string
  repo: string
  renderingType: string
  charts: string
  storybook: string
  docs: string
  status: Status
  note?: string
}

const SOURCES: LibrarySource[] = [
  { key: 'recharts', name: 'Recharts', npm: 'recharts', repo: 'recharts/recharts',
    renderingType: 'Svg', charts: '11', storybook: 'WIP', docs: 'Examples', status: 'live' },
  { key: 'visx', name: 'Visx', npm: '@visx/xychart', repo: 'airbnb/visx',
    renderingType: 'Svg', charts: '20+', storybook: 'CodeSandbox', docs: 'Somewhat Interactive', status: 'live' },
  { key: 'nivo', name: 'Nivo', npm: '@nivo/line', repo: 'plouc/nivo',
    renderingType: 'Svg / HTML / Canvas', charts: '20', storybook: 'YES', docs: 'Very Interactive', status: 'live' },
  { key: 'victory', name: 'Victory', npm: 'victory', repo: 'FormidableLabs/victory',
    renderingType: 'Svg', charts: '10', storybook: 'NO', docs: 'Gallery', status: 'live' },
  { key: 'reactChartJs2', name: 'React-chartjs-2', npm: 'react-chartjs-2', repo: 'reactchartjs/react-chartjs-2',
    renderingType: 'Canvas', charts: '15', storybook: 'CodeSandbox', docs: 'Gallery', status: 'live' },
  { key: 'echarts', name: 'ECharts', npm: 'echarts-for-react', repo: 'hustcc/echarts-for-react',
    renderingType: 'Canvas / Svg', charts: '20+', storybook: 'NO', docs: 'Very Interactive', status: 'live' },
  { key: 'observablePlot', name: 'Observable Plot', npm: '@observablehq/plot', repo: 'observablehq/plot',
    renderingType: 'Svg', charts: '30+', storybook: 'NO', docs: 'Gallery', status: 'live' },
  { key: 'unovis', name: 'Unovis', npm: '@unovis/react', repo: 'f5/unovis',
    renderingType: 'Svg / Canvas', charts: '20+', storybook: 'NO', docs: 'Gallery', status: 'live' },
  { key: 'reactVis', name: 'React-vis', npm: 'react-vis', repo: 'uber/react-vis',
    renderingType: 'Svg / Canvas', charts: '10', storybook: 'Yes', docs: 'Gallery', status: 'deprecated',
    note: 'Deprecated by Uber. No longer maintained and does not support React 17 or later.' },
]

export interface LibraryMetrics extends LibrarySource {
  version: string
  publishedAt: string
  license: string
  packageSize: number | null
  weeklyDownloads: number | null
  stars: number | null
  openIssues: number | null
  closedIssues: number | null
  commitCount: number | null
  lastCommit: string | null
}

const warnings: string[] = []

const ghHeaders: Record<string, string> = {
  'Accept': 'application/vnd.github+json',
  'User-Agent': 'itenium-react-charting',
}
if (process.env.GITHUB_TOKEN) {
  ghHeaders.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
}

async function getJson(url: string, headers: Record<string, string> = {}): Promise<any | null> {
  const res = await fetch(url, { headers })
  if (!res.ok) {
    warnings.push(`${res.status} ${res.statusText} for ${url}`)
    return null
  }
  return res.json()
}

async function npmInfo(pkg: string) {
  const d = await getJson(`https://registry.npmjs.org/${encodeURIComponent(pkg)}`)
  if (!d) return { version: '?', publishedAt: '?', license: '?', packageSize: null }
  const version = d['dist-tags'].latest
  const meta = d.versions[version]
  return {
    version,
    publishedAt: (d.time?.[version] ?? '?').slice(0, 10),
    license: typeof meta.license === 'string' ? meta.license : '?',
    packageSize: meta.dist?.unpackedSize ?? null,
  }
}

async function weeklyDownloads(pkg: string): Promise<number | null> {
  const d = await getJson(`https://api.npmjs.org/downloads/point/last-week/${pkg}`)
  return d?.downloads ?? null
}

async function repoInfo(repo: string) {
  const d = await getJson(`https://api.github.com/repos/${repo}`, ghHeaders)
  return {
    stars: d?.stargazers_count ?? null,
    openIssues: d?.open_issues_count ?? null,
    lastCommit: d?.pushed_at ? d.pushed_at.slice(0, 10) : null,
  }
}

async function closedIssues(repo: string): Promise<number | null> {
  const url = `https://api.github.com/search/issues?q=repo:${repo}+type:issue+state:closed&per_page=1`
  const d = await getJson(url, ghHeaders)
  return d?.total_count ?? null
}

/** GitHub has no total-commits field; the trick is the last page number of a per_page=1 listing. */
async function commitCount(repo: string): Promise<number | null> {
  const res = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, { headers: ghHeaders })
  if (!res.ok) {
    warnings.push(`${res.status} for commits of ${repo}`)
    return null
  }
  const link = res.headers.get('link')
  const match = link?.match(/[?&]page=(\d+)>; rel="last"/)
  return match ? Number(match[1]) : null
}

async function collect(src: LibrarySource): Promise<LibraryMetrics> {
  const [npm, downloads, repo, closed, commits] = await Promise.all([
    npmInfo(src.npm),
    weeklyDownloads(src.npm),
    repoInfo(src.repo),
    closedIssues(src.repo),
    commitCount(src.repo),
  ])
  return { ...src, ...npm, weeklyDownloads: downloads, ...repo, closedIssues: closed, commitCount: commits }
}

export const fmtBytes = (n: number | null): string =>
  n === null ? '?' : n >= 1_000_000 ? `${(n / 1_000_000).toFixed(2)} MB` : `${Math.round(n / 1000)} kB`

export const fmtNumber = (n: number | null): string =>
  n === null ? '?' : n.toLocaleString('en-US')

export function overviewTable(libs: LibraryMetrics[]): string {
  const rows = libs.map(l =>
    `| ${l.name} | ${l.version} | ${fmtBytes(l.packageSize)} | ${fmtNumber(l.weeklyDownloads)} | ${l.renderingType} | ${l.license} | ${l.docs} |`
  )
  return [
    '| Library | Version | Package size | Weekly downloads | Rendering type | License | Documentation |',
    '|---------|---------|--------------|------------------|----------------|---------|---------------|',
    ...rows,
  ].join('\n')
}

export function developmentTable(libs: LibraryMetrics[]): string {
  const rows = libs.map(l =>
    `| ${l.name} | ${fmtNumber(l.stars)} | ${l.lastCommit ?? '?'} (${fmtNumber(l.commitCount)}) | ${fmtNumber(l.openIssues)} / ${fmtNumber(l.closedIssues)} | ${l.charts} | ${l.storybook} |`
  )
  return [
    '| Library | Stars | Last commit (total) | Issues open / closed | Charts | Storybook |',
    '|---------|-------|---------------------|----------------------|--------|-----------|',
    ...rows,
  ].join('\n')
}

function replaceBetween(text: string, marker: string, body: string): string {
  const re = new RegExp(`(<!-- ${marker}:start -->)[\\s\\S]*?(<!-- ${marker}:end -->)`)
  if (!re.test(text)) throw new Error(`Missing <!-- ${marker}:start --> / :end markers in README.md`)
  return text.replace(re, `$1\n\n${body}\n\n$2`)
}

async function main() {
  const libraries: LibraryMetrics[] = []
  for (const src of SOURCES) {
    console.log(`collecting ${src.name}...`)
    libraries.push(await collect(src))
  }

  const collectedAt = new Date().toISOString().slice(0, 10)
  const payload = { collectedAt, libraries, warnings }

  await Bun.write('src/data/libraries.json', JSON.stringify(payload, null, 2) + '\n')
  console.log(`wrote src/data/libraries.json (${libraries.length} libraries)`)

  let readme = await Bun.file('README.md').text()
  readme = replaceBetween(readme, 'metrics-overview', overviewTable(libraries))
  readme = replaceBetween(readme, 'metrics-development', developmentTable(libraries))
  readme = replaceBetween(readme, 'metrics-date', `Data collected on **${collectedAt}**.`)
  await Bun.write('README.md', readme)
  console.log('updated README.md tables')

  if (warnings.length) {
    console.warn(`\n${warnings.length} field(s) could not be collected:`)
    for (const w of warnings) console.warn(`  - ${w}`)
    console.warn('Set GITHUB_TOKEN to avoid search API rate limits.')
  }
}

await main()
```

- [ ] **Step 2: Add the README markers before running**

Add to `README.md`, replacing the current `## Libraries` list:

```markdown
## Library comparison

<!-- metrics-date:start -->
<!-- metrics-date:end -->

Setup time is no longer measured. The 2023 figures recorded a developer timing
themselves learning each library; this refresh was agent-implemented, so the
number is no longer comparable. Package size is now npm's unpacked tarball size,
which is not the metric the 2023 table used either.

### Overview

<!-- metrics-overview:start -->
<!-- metrics-overview:end -->

### Development activity

<!-- metrics-development:start -->
<!-- metrics-development:end -->
```

- [ ] **Step 3: Run the collector**

```bash
mkdir -p src/data
bun run metrics
```

Expected: nine `collecting ...` lines, `wrote src/data/libraries.json (9 libraries)`, `updated README.md tables`. If warnings appear about the search API, re-run with a token:

```bash
GITHUB_TOKEN=$(gh auth token) bun run metrics
```

- [ ] **Step 4: Verify the output**

```bash
cat src/data/libraries.json | head -30
grep -A 14 "metrics-overview:start" README.md
```

Expected: `collectedAt` is today's date, every library has a non-null `weeklyDownloads` and `stars`, and the README tables are populated with nine rows each.

- [ ] **Step 5: Commit**

```bash
git add scripts/collect-metrics.ts src/data/libraries.json README.md
git commit -m "Add metrics collector generating libraries.json and README tables"
```

---

### Task 4: App-side data layer

**Files:**
- Create: `src/data/libraries.ts`
- Modify: `src/components/LibraryInfo.tsx`
- Delete: `src/store/library-info.ts`

- [ ] **Step 1: Create `src/data/libraries.ts`**

```ts
import data from './libraries.json'

export interface LibraryMetrics {
  key: string
  name: string
  npm: string
  repo: string
  renderingType: string
  charts: string
  storybook: string
  docs: string
  status: 'live' | 'deprecated'
  note?: string
  version: string
  publishedAt: string
  license: string
  packageSize: number | null
  weeklyDownloads: number | null
  stars: number | null
  openIssues: number | null
  closedIssues: number | null
  commitCount: number | null
  lastCommit: string | null
}

export const collectedAt: string = data.collectedAt

export const libraries = data.libraries as LibraryMetrics[]

export const byKey: Record<string, LibraryMetrics> = Object.fromEntries(
  libraries.map(l => [l.key, l])
)

export const formatCompact = (n: number | null): string =>
  n === null ? '?' : Intl.NumberFormat('en', { notation: 'compact' }).format(n)

export const formatSize = (n: number | null): string =>
  n === null ? '?' : n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)} MB` : `${Math.round(n / 1000)} kB`
```

- [ ] **Step 2: Replace `src/components/LibraryInfo.tsx` with a badge row**

```tsx
import { LibraryMetrics, formatCompact, formatSize } from "../data/libraries";

type BadgeProps = {
  label: string;
  value: string;
  title: string;
  tone?: string;
};

function Badge({ label, value, title, tone = "secondary" }: BadgeProps) {
  return (
    <span className="badge-pair" title={title}>
      <span className={`badge text-bg-${tone} rounded-0 rounded-start`}>{label}</span>
      <span className="badge text-bg-dark rounded-0 rounded-end">{value}</span>
    </span>
  );
}

export function LibraryInfo({ lib }: { lib: LibraryMetrics }) {
  return (
    <header className="library-info">
      <h1>
        {lib.name}{" "}
        <a href={`https://github.com/${lib.repo}`} aria-label={`${lib.name} on GitHub`}>
          <i className="fab fa-github" />
        </a>
      </h1>
      <div className="badge-row">
        <Badge label="version" value={lib.version} title={`Published ${lib.publishedAt}`} tone="primary" />
        <Badge label="downloads" value={`${formatCompact(lib.weeklyDownloads)}/wk`} title="Weekly npm downloads" />
        <Badge label="stars" value={formatCompact(lib.stars)} title="GitHub stars" />
        <Badge label="size" value={formatSize(lib.packageSize)} title="npm unpacked size" />
        <Badge label="issues" value={`${formatCompact(lib.openIssues)} open`} title={`${formatCompact(lib.closedIssues)} closed`} />
        <Badge label="license" value={lib.license} title="License" />
        <Badge label="renders" value={lib.renderingType} title="Rendering type" />
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Add badge styles to `src/styles.css`**

```css
.library-info h1 {
  font-size: 1.6rem;
}

.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.badge-pair {
  display: inline-flex;
  font-size: 0.72rem;
}
```

- [ ] **Step 4: Point every page at the new data**

In each of `src/pages/Recharts.tsx`, `Visx.tsx`, `Nivo.tsx`, `Victory.tsx`, `ReactChartJS2.tsx`, replace:

```tsx
import { LibraryInfos } from "../store/library-info";
```

with:

```tsx
import { byKey } from "../data/libraries";
```

and `<LibraryInfo lib={LibraryInfos.recharts} />` with `<LibraryInfo lib={byKey.recharts} />` (key per page: `recharts`, `visx`, `nivo`, `victory`, `reactChartJs2`).

Then:

```bash
rm src/store/library-info.ts
```

- [ ] **Step 5: Verify**

```bash
bun run build && bun run dev
```

Open `http://localhost:5173/React-Charting/` and check a chart page shows the badge row.

**This is the review point for the badge design.** Report the URL to Wouter and stop here for his visual verdict before applying anything further. Do not screenshot for self-verification.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Render library metrics as badge rows from generated data"
```

---

### Task 5: React-vis skeleton page

**Files:**
- Create: `src/pages/ReactVis.tsx`
- Modify: `src/components/AppFormFactory.tsx`, `src/App.tsx`, `src/styles.css`

- [ ] **Step 1: Create `src/pages/ReactVis.tsx`**

```tsx
import { LibraryInfo } from "../components/LibraryInfo";
import { byKey } from "../data/libraries";

export function ReactVis() {
  const lib = byKey.reactVis;

  return (
    <>
      <LibraryInfo lib={lib} />
      <div className="chart-skeleton" role="img" aria-label="No chart: library is deprecated">
        <div className="chart-skeleton-plot" />
        <div className="chart-skeleton-axis" />
      </div>
      <div className="alert alert-warning" role="alert">
        <strong>Deprecated.</strong> {lib.note}
        <br />
        Last release <code>{lib.version}</code> on {lib.publishedAt}.
        Use Recharts or ECharts instead.
      </div>
    </>
  );
}
```

- [ ] **Step 2: Add skeleton styles to `src/styles.css`**

```css
.chart-skeleton {
  width: 500px;
  max-width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.chart-skeleton-plot {
  flex: 1;
}

.chart-skeleton-axis {
  height: 12px;
}

.chart-skeleton-plot,
.chart-skeleton-axis {
  border-radius: 6px;
  background: linear-gradient(90deg, #eceff1 25%, #f6f8f9 50%, #eceff1 75%);
  background-size: 200% 100%;
  animation: chart-skeleton-shimmer 1.6s infinite;
}

@keyframes chart-skeleton-shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .chart-skeleton-plot,
  .chart-skeleton-axis { animation: none; }
}
```

- [ ] **Step 3: Restore it in the factory and navbar**

In `src/components/AppFormFactory.tsx` re-add `import { ReactVis } from "../pages/ReactVis";`, the `case 'reactvis': return <ReactVis />;` branch, and `<div className="col-6"><ReactVis /></div>` in the `home` case.

In `src/App.tsx` re-add the navbar item:

```tsx
<li className="nav-item">
  <button className="btn btn-link nav-link active" onClick={() => setPage('reactvis')}>React-Vis</button>
</li>
```

- [ ] **Step 4: Verify**

```bash
bun run dev
```

Navigate to React-Vis. Expected: badge row, shimmering grey chart placeholder, amber deprecation alert. No console errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Show deprecation skeleton for React-vis"
```

---

### Task 6: ECharts page

**Files:**
- Create: `src/pages/ECharts.tsx`
- Modify: `src/components/AppFormFactory.tsx`, `src/App.tsx`, `package.json`

- [ ] **Step 1: Add the dependency**

```bash
bun add echarts@^6.1.0 echarts-for-react@^3.0.6
```

- [ ] **Step 2: Create `src/pages/ECharts.tsx`**

Same dataset and shape as every other page: persons on the X axis, age as a line.

```tsx
import { shallowEqual, useSelector } from "react-redux";
import ReactECharts from "echarts-for-react";
import { LibraryInfo } from "../components/LibraryInfo";
import { byKey } from "../data/libraries";

export function ECharts() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual
  );

  const option = {
    tooltip: { trigger: "axis" },
    legend: { data: ["age"] },
    xAxis: { type: "category", data: persons.map(p => p.name) },
    yAxis: { type: "value" },
    series: [{ name: "age", type: "line", data: persons.map(p => p.age), itemStyle: { color: "#8884d8" } }],
  };

  return (
    <>
      <LibraryInfo lib={byKey.echarts} />
      <ReactECharts option={option} style={{ width: 500, height: 300 }} />
    </>
  );
}
```

- [ ] **Step 3: Wire it into the factory**

In `src/components/AppFormFactory.tsx`: add `'echarts'` to the `Charts` union, `import { ECharts } from "../pages/ECharts";`, a `case 'echarts': return <ECharts />;` branch, and `<div className="col-6"><ECharts /></div>` in the `home` case.

In `src/App.tsx` add the navbar item:

```tsx
<li className="nav-item">
  <button className="btn btn-link nav-link active" onClick={() => setPage('echarts')}>ECharts</button>
</li>
```

- [ ] **Step 4: Verify**

```bash
bun run build && bun run dev
```

Expected: the ECharts page draws a line chart matching the other pages' data.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add ECharts demo page"
```

---

### Task 7: Observable Plot page

Observable Plot ships no React bindings — it returns a DOM node that must be mounted by hand and replaced on every data change.

**Files:**
- Create: `src/pages/ObservablePlot.tsx`
- Modify: `src/components/AppFormFactory.tsx`, `src/App.tsx`, `package.json`

- [ ] **Step 1: Add the dependency**

```bash
bun add @observablehq/plot@^0.6.17
```

- [ ] **Step 2: Create `src/pages/ObservablePlot.tsx`**

```tsx
import { useEffect, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import * as Plot from "@observablehq/plot";
import { LibraryInfo } from "../components/LibraryInfo";
import { byKey } from "../data/libraries";

export function ObservablePlot() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual
  );

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const chart = Plot.plot({
      width: 500,
      height: 300,
      marginLeft: 50,
      marks: [
        Plot.line(persons, { x: "name", y: "age", stroke: "#8884d8" }),
        Plot.dot(persons, { x: "name", y: "age", fill: "#8884d8", title: d => `${d.name}: ${d.age}` }),
      ],
    });

    container.current.append(chart);
    return () => chart.remove();
  }, [persons]);

  return (
    <>
      <LibraryInfo lib={byKey.observablePlot} />
      <div ref={container} />
    </>
  );
}
```

- [ ] **Step 3: Wire it into the factory**

In `src/components/AppFormFactory.tsx`: add `'observableplot'` to the `Charts` union, `import { ObservablePlot } from "../pages/ObservablePlot";`, a `case 'observableplot': return <ObservablePlot />;` branch, and `<div className="col-6"><ObservablePlot /></div>` in the `home` case.

In `src/App.tsx`:

```tsx
<li className="nav-item">
  <button className="btn btn-link nav-link active" onClick={() => setPage('observableplot')}>Observable Plot</button>
</li>
```

- [ ] **Step 4: Verify**

```bash
bun run build && bun run dev
```

Expected: a line-and-dot chart. Add a person on the Data page and return — the chart must redraw once, not stack duplicates. A second chart appearing means the `chart.remove()` cleanup is missing.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add Observable Plot demo page"
```

---

### Task 8: Unovis page

**Files:**
- Create: `src/pages/Unovis.tsx`
- Modify: `src/components/AppFormFactory.tsx`, `src/App.tsx`, `package.json`

- [ ] **Step 1: Add the dependency**

```bash
bun add @unovis/ts@^1.7.0 @unovis/react@^1.7.0
```

- [ ] **Step 2: Create `src/pages/Unovis.tsx`**

```tsx
import { shallowEqual, useSelector } from "react-redux";
import { VisXYContainer, VisLine, VisAxis, VisScatter, VisTooltip } from "@unovis/react";
import { LibraryInfo } from "../components/LibraryInfo";
import { byKey } from "../data/libraries";

export function Unovis() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual
  );

  const x = (_d: IPerson, i: number) => i;
  const y = (d: IPerson) => d.age;

  return (
    <>
      <LibraryInfo lib={byKey.unovis} />
      <VisXYContainer data={persons} width={500} height={300}>
        <VisLine x={x} y={y} color="#8884d8" />
        <VisScatter x={x} y={y} color="#8884d8" />
        <VisAxis type="x" tickFormat={(i: number) => persons[i]?.name ?? ""} />
        <VisAxis type="y" />
        <VisTooltip />
      </VisXYContainer>
    </>
  );
}
```

- [ ] **Step 3: Wire it into the factory**

In `src/components/AppFormFactory.tsx`: add `'unovis'` to the `Charts` union, `import { Unovis } from "../pages/Unovis";`, a `case 'unovis': return <Unovis />;` branch, and `<div className="col-6"><Unovis /></div>` in the `home` case.

In `src/App.tsx`:

```tsx
<li className="nav-item">
  <button className="btn btn-link nav-link active" onClick={() => setPage('unovis')}>Unovis</button>
</li>
```

- [ ] **Step 4: Verify**

```bash
bun run build && bun run dev
```

Expected: a line chart with person names on the X axis.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add unovis demo page"
```

---

### Task 9: Header links and footer

**Files:**
- Modify: `src/App.tsx`, `src/styles.css`

- [ ] **Step 1: Point the itenium logo at the blog post and add the GitHub icon**

In `src/App.tsx`, the logo anchor becomes:

```tsx
<a href="https://itenium.be/blog/javascript/what-chart-library-to-use-in-react/">
  <img
    src={`${import.meta.env.BASE_URL}favicon.png`}
    style={{marginRight: 18, width: 24}}
    alt="itenium logo"
  />
</a>
```

Immediately after the closing `</div>` of `collapse navbar-collapse` and before `</div>` of `container-fluid`, add the GitHub link:

```tsx
<a
  className="navbar-github"
  href="https://github.com/itenium-be/React-Charting"
  aria-label="View this project on GitHub"
>
  <i className="fab fa-github" />
</a>
```

The `me-auto` already on the `<ul>` pushes this to the right edge.

- [ ] **Step 2: Add a footer component in `src/App.tsx`**

Add the import at the top:

```tsx
import { collectedAt } from "./data/libraries";
```

Add the component at the bottom of the file:

```tsx
function Footer() {
  return (
    <footer className="app-footer">
      <span>Data as of <strong>{collectedAt}</strong></span>
      <span>
        <a href="https://github.com/itenium-be/React-Charting">Source</a>
        {" · "}
        <a href="https://itenium.be/blog/javascript/what-chart-library-to-use-in-react/">Blog post</a>
        {" · "}
        <a href="https://itenium.be">itenium</a>
      </span>
    </footer>
  );
}
```

and render it inside `App`, after the `container` div:

```tsx
      </div>
      <Footer />
    </div>
```

- [ ] **Step 3: Add styles to `src/styles.css`**

```css
.navbar-github {
  font-size: 1.5rem;
  color: #212529;
}

.navbar-github:hover {
  color: #e78200;
}

.app-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  padding: 1.5rem;
  border-top: 1px solid #dee2e6;
  font-size: 0.85rem;
  color: #6c757d;
}
```

- [ ] **Step 4: Verify**

```bash
bun run dev
```

Expected: GitHub icon at the right of the navbar linking to the repo; the itenium logo links to the blog post; the footer shows the same date as `libraries.json`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add GitHub header link and data-date footer"
```

---

### Task 10: GitHub Actions deployment

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `README.md`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - run: bun install --frozen-lockfile
      - run: bun run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v4
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Document the install/run commands in `README.md`**

Replace the existing `## Install` section:

```markdown
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
```

- [ ] **Step 3: Commit and push**

```bash
git add -A
git commit -m "Deploy to GitHub Pages from CI"
git push
```

- [ ] **Step 4: Switch the Pages source — Wouter must do this**

This cannot be done from the codebase. In `github.com/itenium-be/React-Charting` → Settings → Pages → Build and deployment → Source, change from "Deploy from a branch" (`gh-pages`) to **GitHub Actions**.

Until this is switched the workflow will run but the site keeps serving the old `gh-pages` content.

- [ ] **Step 5: Verify the deployment**

```bash
gh run watch
```

Expected: both jobs green. Then open `https://itenium-be.github.io/React-Charting/` and confirm the new navbar, badges and footer date.

- [ ] **Step 6: Delete the dead branch once the site is confirmed working**

```bash
git push origin --delete gh-pages
```

---

## Notes for the executor

- **The badge design has a human review gate in Task 4 Step 5.** Stop there, give Wouter the URL, wait for his verdict.
- **No screenshots for self-verification** — assert via the build, the dev server console, or `browser_evaluate`. Visual judgement is Wouter's.
- **Ask before adding dependencies** beyond the ones listed here, and before any `git push` not in this plan.
- Every chart page renders the same persons dataset as a line of age by name. Keep it that way — the comparison only means something if the charts are equivalent.
