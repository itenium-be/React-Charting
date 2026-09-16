import { useEffect, useState } from "react";
import { Line } from "@nivo/line";
import { shallowEqual, useSelector } from "react-redux";
import { LibraryInfo } from "../components/LibraryInfo";
import { byKey } from "../data/libraries";

export function Nivo() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual
  );
  // Nivo springs on data transitions, not on mount, so the chart starts flat
  // and the real values are set once to produce a first-draw animation.
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const data: any[] = persons.map((person) => {
    return { x: person.name, y: drawn ? person.age : 0 };
  });

  return (
    <>
      <LibraryInfo lib={byKey.nivo} />
      <Line
        width={500}
        height={300}
        curve="monotoneX"
        margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
        enableSlices="x"
        animate
        motionConfig="gentle"
        data={[{ id: "persons", data: data }]}
        xScale={{ type: "point" }}
        yScale={{ type: "linear" }}
        axisLeft={{ legend: "age", legendOffset: -60, legendPosition: "middle" }}
        axisBottom={{ legend: "name", legendOffset: 40, legendPosition: "middle" }}
        sliceTooltip={({ slice }) => (
          <div className="nivo-tooltip">
            {slice.points.map((point) => (
              <div key={point.id}>
                <strong>{String(point.data.x)}</strong>: {String(point.data.y)}
              </div>
            ))}
          </div>
        )}
      />
    </>
  );
}
