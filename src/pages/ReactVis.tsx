import { shallowEqual, useSelector } from "react-redux";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
} from "react-vis";

export function ReactVis() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual
  );
  const data: any[] = persons.map((person) => {
    return { x: person.name, y: person.age };
  });

  return (
    <>
      <XYPlot width={500} height={300} xType="ordinal">
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries
          color='red'
          data={data}
        />
      </XYPlot>
    </>
  );
}
