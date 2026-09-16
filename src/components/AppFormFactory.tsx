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


export type Charts = 'home' | 'data' | 'recharts' | 'visx' | 'nivo' | 'victory' | 'reactvis' | 'reactchartjs2' | 'echarts' | 'observableplot' | 'unovis';


type AppFormFactoryProps = {
  page: Charts;
};


export function AppFormFactory({ page }: AppFormFactoryProps) {
  return (
    <ComponentFactory page={page} />
  )
};




function ComponentFactory({ page }: AppFormFactoryProps) {
  switch (page) {
  case 'recharts':
    return <Recharts />;
  case 'visx':
    return <Visx />;
  case 'nivo':
    return <Nivo />;
  case 'victory':
    return <Victory />
  case 'reactchartjs2':
    return <ReactChartJS2 />
  case 'reactvis':
    return <ReactVis />;
  case 'echarts':
    return <ECharts />;
  case 'observableplot':
    return <ObservablePlot />;
  case 'unovis':
    return <Unovis />;
  case 'home':
    return (
      <>
        <div className="col-6"><div className="chart-card"><Recharts /></div></div>
        <div className="col-6"><div className="chart-card"><Visx /></div></div>
        <div className="col-6"><div className="chart-card"><Nivo /></div></div>
        <div className="col-6"><div className="chart-card"><Victory /></div></div>
        <div className="col-6"><div className="chart-card"><ReactChartJS2 /></div></div>
        <div className="col-6"><div className="chart-card"><ReactVis /></div></div>
        <div className="col-6"><div className="chart-card"><ECharts /></div></div>
        <div className="col-6"><div className="chart-card"><ObservablePlot /></div></div>
        <div className="col-6"><div className="chart-card"><Unovis /></div></div>
      </>
    )
  case 'data':
  default:
    return <Data />;
  }
}
