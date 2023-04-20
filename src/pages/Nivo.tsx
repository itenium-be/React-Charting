import { Line } from "@nivo/line";
import { type } from "os";
import { shallowEqual, useSelector } from "react-redux";

export function Nivo() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual // checks that two different variables reference the same object
  );
  console.log(persons);
  const data: any[] = persons.map(person => {return {x: person.name, y: person.age}});
  console.log(data)

  return (
    <>
      <Line
        width={500}
        height={300}
        curve="monotoneX"
        margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
        enableSlices= 'x'
        data={[{ id: "persons", data: data}]}
        xScale={{
          type: "band",
        }}
        yScale={{type: "linear"}}
        axisLeft={{
          legend: "linear scale",
          legendOffset: 12,
        }}
        axisBottom={{
          legend: "linear scale",
          legendOffset: -12,
        }}
      />
    </>
  );
}
