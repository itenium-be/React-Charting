import { shallowEqual, useSelector } from "react-redux";
import ReactECharts from "echarts-for-react";
import { LibraryInfo } from "../components/LibraryInfo";
import { byKey } from "../data/libraries";

export function ECharts() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual
  );

  const option = {
    tooltip: { trigger: "axis" },
    legend: { data: ["age"] },
    xAxis: { type: "category", data: persons.map(p => p.name) },
    yAxis: { type: "value" },
    series: [{ name: "age", type: "line", data: persons.map(p => p.age), itemStyle: { color: "#8884d8" } }],
  };

  return (
    <>
      <LibraryInfo lib={byKey.echarts} />
      <ReactECharts option={option} style={{ width: 500, height: 300 }} />
    </>
  );
}
