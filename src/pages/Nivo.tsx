import { Line } from "@nivo/line";
import { shallowEqual, useSelector } from "react-redux";
import { LibraryInfo } from "../components/LibraryInfo";
import { LibraryInfos } from "../store/library-info";

export function Nivo() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual
  );
  const data: any[] = persons.map((person) => {
    return { x: person.name, y: person.age };
  });

  return (
    <>
      <LibraryInfo lib={LibraryInfos.nivo} />
      <Line
        width={500}
        height={300}
        curve="monotoneX"
        margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
        enableSlices="x"
        data={[{ id: "persons", data: data }]}
        xScale={{
          type: "band",
        }}
        yScale={{ type: "linear" }}
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
