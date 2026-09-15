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
  docsUrl: string
  status: 'live' | 'deprecated'
  note?: string
  rating?: string
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
  engineNpm?: string
  engineRepo?: string
  engineVersion?: string
  enginePackageSize?: number | null
  engineWeeklyDownloads?: number | null
  engineStars?: number | null
  engineOpenIssues?: number | null
  engineClosedIssues?: number | null
  engineCommitCount?: number | null
  engineLastCommit?: string | null
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
