import { shallowEqual, useSelector } from "react-redux";
import { VictoryChart, VictoryContainer, VictoryLine } from "victory";

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
