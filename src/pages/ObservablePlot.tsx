import { useEffect, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import * as Plot from "@observablehq/plot";
import { LibraryInfo } from "../components/LibraryInfo";
import { byKey } from "../data/libraries";

export function ObservablePlot() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual
  );

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const chart = Plot.plot({
      width: 500,
      height: 300,
      marginLeft: 50,
      // Plot sorts ordinal domains alphabetically; the other libraries keep
      // insertion order, and the comparison is only fair if all nine match.
      x: { domain: persons.map(p => p.name), label: "name", labelArrow: "none" },
      y: { label: "age", labelArrow: "none" },
      marks: [
        Plot.line(persons, { x: "name", y: "age", stroke: "#8884d8" }),
        Plot.dot(persons, { x: "name", y: "age", fill: "#8884d8", title: d => `${d.name}: ${d.age}` }),
        Plot.ruleX(persons, Plot.pointerX({ x: "name", stroke: "#999" })),
        Plot.tip(persons, Plot.pointerX({ x: "name", y: "age", title: d => `${d.name}: ${d.age}` })),
      ],
    });

    container.current.append(chart);
    return () => chart.remove();
  }, [persons]);

  return (
    <>
      <LibraryInfo lib={byKey.observablePlot} />
      <div ref={container} />
    </>
  );
}
