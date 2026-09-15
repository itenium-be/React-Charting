import { shallowEqual, useSelector } from "react-redux";
import { VictoryChart, VictoryContainer, VictoryLine } from "victory";
import { LibraryInfo } from "../components/LibraryInfo";
import { byKey } from "../data/libraries";

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
        containerComponent={<VictoryContainer responsive={false} />}
      >
        <VictoryLine data={data} />
      </VictoryChart>
    </>
  );
}
