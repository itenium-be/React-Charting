import { shallowEqual, useSelector } from "react-redux";
import { createContainer, VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryTooltip } from "victory";
import { LibraryInfo } from "../components/LibraryInfo";
import { byKey } from "../data/libraries";

// Combines the voronoi container's nearest-point tooltip with the cursor
// container's vertical line, matching the hover interaction on other pages.
const VictoryVoronoiCursorContainer = createContainer("voronoi", "cursor");

export function Victory() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual
  );
  const data: any[] = persons.map((person) => {
    return { x: person.name, y: person.age };
  });

  return (
    <>
      <LibraryInfo lib={byKey.victory} />
      <VictoryChart
        height={300}
        width={500}
        padding={{ top: 20, right: 25, bottom: 50, left: 80 }}
        animate={{ duration: 800, onLoad: { duration: 800 } }}
        containerComponent={
          <VictoryVoronoiCursorContainer
            responsive={false}
            voronoiDimension="x"
            cursorDimension="x"
            labels={({ datum }: { datum: { x: string; y: number } }) => `${datum.x}: ${datum.y}`}
            labelComponent={<VictoryTooltip />}
          />
        }
      >
        <VictoryAxis label="name" />
        <VictoryAxis dependentAxis label="age" axisLabelComponent={<VictoryLabel dy={-48} />} />
        <VictoryLine data={data} />
      </VictoryChart>
    </>
  );
}
