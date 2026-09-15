/**
 * Regenerates src/data/libraries.json and the README comparison tables.
 *
 * GitHub's search API rate-limits hard without auth (10 req/min), so closed-issue
 * counts are the first thing to fail on a tokenless run. Set GITHUB_TOKEN to avoid it.
 */

// No @types/bun or @types/node in this project's devDependencies, so tsc
// (run standalone by `bun run build`) doesn't know these bun runtime globals.
declare const process: { env: Record<string, string | undefined> }
declare const Bun: {
  write(path: string, data: string): Promise<number>
  file(path: string): { text(): Promise<string> }
}

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
