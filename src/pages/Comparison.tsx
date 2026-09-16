import { useMemo, useState } from "react";
import { LibraryMetrics, collectedAt, formatCompact, formatSize, libraries } from "../data/libraries";

type Column = {
  key: string;
  label: string;
  numeric?: boolean;
  sortValue: (lib: LibraryMetrics) => string | number | null;
  render: (lib: LibraryMetrics) => React.ReactNode;
};

/** Wrapper libraries carry a second set of metrics for the engine they wrap. */
const withEngine = (wrapper: React.ReactNode, engine: React.ReactNode) =>
  engine === null ? wrapper : (
    <>
      {wrapper} <span className="engine-value">+ {engine}</span>
    </>
  );

const COLUMNS: Column[] = [
  {
    key: "name",
    label: "Library",
    sortValue: (l) => l.name.toLowerCase(),
    render: (l) => (
      <span className={l.status === "deprecated" ? "lib-deprecated" : undefined}>
        {l.name}
        <span className="cell-links">
          <a href={l.docsUrl} aria-label={`${l.name} documentation`}>
            <i className="fas fa-book" />
          </a>
          <a href={`https://github.com/${l.repo}`} aria-label={`${l.name} on GitHub`}>
            <i className="fab fa-github" />
          </a>
        </span>
      </span>
    ),
  },
  {
    key: "rating",
    label: "Rating",
    sortValue: (l) => (l.rating ? l.rating.length : -1),
    render: (l) => l.rating ?? <span className="muted">—</span>,
  },
  {
    key: "version",
    label: "Version",
    sortValue: (l) => l.version,
    render: (l) => withEngine(l.version, l.engineVersion ? `${l.engineNpm} ${l.engineVersion}` : null),
  },
  {
    key: "publishedAt",
    label: "Released",
    sortValue: (l) => l.publishedAt,
    render: (l) => l.publishedAt,
  },
  {
    key: "packageSize",
    label: "Size",
    numeric: true,
    sortValue: (l) => l.packageSize,
    render: (l) => withEngine(formatSize(l.packageSize), l.enginePackageSize ? formatSize(l.enginePackageSize) : null),
  },
  {
    key: "weeklyDownloads",
    label: "Downloads/wk",
    numeric: true,
    sortValue: (l) => l.weeklyDownloads,
    render: (l) =>
      withEngine(formatCompact(l.weeklyDownloads), l.engineWeeklyDownloads ? formatCompact(l.engineWeeklyDownloads) : null),
  },
  {
    key: "stars",
    label: "Stars",
    numeric: true,
    sortValue: (l) => l.stars,
    render: (l) => withEngine(formatCompact(l.stars), l.engineStars ? formatCompact(l.engineStars) : null),
  },
  {
    key: "openIssues",
    label: "Issues open / closed",
    numeric: true,
    sortValue: (l) => l.openIssues,
    render: (l) => `${formatCompact(l.openIssues)} / ${formatCompact(l.closedIssues)}`,
  },
  {
    key: "commitCount",
    label: "Commits",
    numeric: true,
    sortValue: (l) => l.commitCount,
    render: (l) => formatCompact(l.commitCount),
  },
  {
    key: "lastCommit",
    label: "Last commit",
    sortValue: (l) => l.lastCommit,
    render: (l) => l.lastCommit ?? <span className="muted">—</span>,
  },
  {
    key: "renderingType",
    label: "Renders",
    sortValue: (l) => l.renderingType,
    render: (l) => l.renderingType,
  },
  {
    key: "license",
    label: "License",
    sortValue: (l) => l.license,
    render: (l) => l.license,
  },
];

export function Comparison() {
  const [sortKey, setSortKey] = useState("stars");
  const [ascending, setAscending] = useState(false);

  const sorted = useMemo(() => {
    const column = COLUMNS.find((c) => c.key === sortKey)!;
    return [...libraries].sort((a, b) => {
      const av = column.sortValue(a);
      const bv = column.sortValue(b);
      // Missing values always sink, whichever direction is active.
      if (av === null) return 1;
      if (bv === null) return -1;
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return ascending ? cmp : -cmp;
    });
  }, [sortKey, ascending]);

  const toggle = (key: string) => {
    if (key === sortKey) {
      setAscending(!ascending);
    } else {
      setSortKey(key);
      setAscending(false);
    }
  };

  return (
    <div className="col-12">
      <h1>Library comparison</h1>
      <p className="muted">
        Collected on {collectedAt}. <span className="engine-value">+ value</span> is the underlying engine for
        libraries that are React wrappers.
      </p>
      <div className="table-responsive">
        <table className="table table-sm table-hover comparison-table">
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={c.numeric ? "numeric" : undefined}
                  aria-sort={sortKey === c.key ? (ascending ? "ascending" : "descending") : "none"}
                >
                  <button type="button" className="sort-button" onClick={() => toggle(c.key)}>
                    {c.label}
                    <span className="sort-arrow">{sortKey === c.key ? (ascending ? "▲" : "▼") : ""}</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((lib) => (
              <tr key={lib.key}>
                {COLUMNS.map((c) => (
                  <td key={c.key} className={c.numeric ? "numeric" : undefined}>
                    {c.render(lib)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
