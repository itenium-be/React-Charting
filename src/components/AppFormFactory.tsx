import type { ComponentType } from "react";
import { Comparison } from "../pages/Comparison";
import { Data } from "../pages/Data";
import { ECharts } from "../pages/ECharts";
import { Nivo } from "../pages/Nivo";
import { ObservablePlot } from "../pages/ObservablePlot";
import { ReactChartJS2 } from "../pages/ReactChartJS2";
import { ReactVis } from "../pages/ReactVis";
import { Recharts } from "../pages/Recharts";
import { Unovis } from "../pages/Unovis";
import { Victory } from "../pages/Victory";
import { Visx } from "../pages/Visx";
import { rankedLibraries } from "../data/libraries";


export type Charts = 'home' | 'data' | 'comparison' | 'recharts' | 'visx' | 'nivo' | 'victory' | 'reactvis' | 'reactchartjs2' | 'echarts' | 'observableplot' | 'unovis';


type ChartPage = {
  page: Charts;
  label: string;
  Component: ComponentType;
  deprecated?: boolean;
};

/** Keyed by the library keys in libraries.json, so rankedLibraries drives the order. */
const PAGES: Record<string, ChartPage> = {
  recharts: { page: 'recharts', label: 'Recharts', Component: Recharts },
  visx: { page: 'visx', label: 'Visx', Component: Visx },
  nivo: { page: 'nivo', label: 'Nivo', Component: Nivo },
  victory: { page: 'victory', label: 'Victory', Component: Victory },
  reactChartJs2: { page: 'reactchartjs2', label: 'React-ChartJS-2', Component: ReactChartJS2 },
  echarts: { page: 'echarts', label: 'ECharts', Component: ECharts },
  observablePlot: { page: 'observableplot', label: 'Observable Plot', Component: ObservablePlot },
  unovis: { page: 'unovis', label: 'Unovis', Component: Unovis },
  reactVis: { page: 'reactvis', label: 'React-Vis', Component: ReactVis, deprecated: true },
};

export const chartPages: ChartPage[] = rankedLibraries
  .map((lib) => PAGES[lib.key])
  .filter(Boolean);


type AppFormFactoryProps = {
  page: Charts;
};


export function AppFormFactory({ page }: AppFormFactoryProps) {
  return (
    <ComponentFactory page={page} />
  )
};




function ComponentFactory({ page }: AppFormFactoryProps) {
  if (page === 'comparison') {
    return <Comparison />;
  }

  if (page === 'home') {
    return (
      <>
        {chartPages.map(({ page: key, Component }) => (
          <div className="col-6" key={key}>
            <div className="chart-card"><Component /></div>
          </div>
        ))}
      </>
    );
  }

  const match = chartPages.find((p) => p.page === page);
  if (match) {
    return <match.Component />;
  }

  return <Data />;
}
