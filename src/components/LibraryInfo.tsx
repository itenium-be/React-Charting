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
