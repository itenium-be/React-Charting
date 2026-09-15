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
        {lib.rating && (
          <span className="rating" title="Curated quality rating">
            {lib.rating}
          </span>
        )}{" "}
        <a href={`https://github.com/${lib.repo}`} aria-label={`${lib.name} on GitHub`}>
          <i className="fab fa-github" />
        </a>{" "}
        <a href={lib.docsUrl} aria-label={`${lib.name} documentation`}>
          <i className="fas fa-book" />
        </a>
      </h1>
      <div className="badge-row">
        <Badge label="version" value={lib.version} title="npm version" tone="primary" />
        <Badge label="released" value={lib.publishedAt} title="Last release date" />
        <Badge label="downloads" value={`${formatCompact(lib.weeklyDownloads)}/wk`} title="Weekly npm downloads" />
        <Badge label="stars" value={formatCompact(lib.stars)} title="GitHub stars" />
        <Badge label="size" value={formatSize(lib.packageSize)} title="npm unpacked size" />
        <Badge label="issues" value={`${formatCompact(lib.openIssues)} / ${formatCompact(lib.closedIssues)}`} title="Open / closed issues" />
        <Badge label="commits" value={formatCompact(lib.commitCount)} title="Total commits" />
        <Badge label="last commit" value={lib.lastCommit ?? "?"} title="Last commit date" />
        <Badge label="license" value={lib.license} title="License" />
        <Badge label="renders" value={lib.renderingType} title="Rendering type" />
        {lib.engineNpm && (
          <Badge
            label="engine"
            value={`${lib.engineNpm} ${formatSize(lib.enginePackageSize ?? null)}`}
            title={`Wrapper around ${lib.engineNpm}`}
            tone="info"
          />
        )}
      </div>
    </header>
  );
}
