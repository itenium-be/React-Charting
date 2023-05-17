import { shallowEqual, useSelector } from "react-redux";
import { VictoryChart, VictoryContainer, VictoryLine } from "victory";
import { LibraryInfo } from "../components/LibraryInfo";
import { LibraryInfos } from "../store/library-info";

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
      <LibraryInfo lib={LibraryInfos.victory} />
      <VictoryChart
        height={300}
        width={500}
        containerComponent={<VictoryContainer responsive={false} />}
      >
        <VictoryLine data={data} />
      </VictoryChart>
    </>
  );
}
