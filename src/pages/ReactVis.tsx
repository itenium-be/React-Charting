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
