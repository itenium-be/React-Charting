import { Data } from "../pages/Data";
import { Nivo } from "../pages/Nivo";
import { ReactChartJS2 } from "../pages/ReactChartJS2";
import { ReactVis } from "../pages/ReactVis";
import { Recharts } from "../pages/Recharts";
import { Victory } from "../pages/Victory";
import { Visx } from "../pages/Visx";


export type Charts = 'home' | 'data' | 'recharts' | 'visx' | 'nivo' | 'victory' | 'reactvis' | 'reactchartjs2';


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
  case 'reactvis':
    return <ReactVis />
  case 'reactchartjs2':
    return <ReactChartJS2 />
  case 'home':
    return (
      <>
        <div className="col-6"><Recharts /></div>
        <div className="col-6"><Visx /></div>
        <div className="col-6"><Nivo /></div>
        <div className="col-6"><Victory /></div>
        <div className="col-6"><ReactVis /></div>
        <div className="col-6"><ReactChartJS2 /></div>
      </>
    )
  case 'data':
  default:
    return <Data />;
  }
}
