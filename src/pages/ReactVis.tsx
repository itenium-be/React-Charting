import { LibraryInfo } from "../components/LibraryInfo";
import { byKey } from "../data/libraries";

export function ReactVis() {
  const lib = byKey.reactVis;

  return (
    <>
      <LibraryInfo lib={lib} />
      <div className="alert alert-warning" role="alert">
        <strong>Deprecated.</strong> {lib.note}
        <br />
        Last release <code>{lib.version}</code> on {lib.publishedAt}.
        Use Recharts or ECharts instead.
      </div>
    </>
  );
}
