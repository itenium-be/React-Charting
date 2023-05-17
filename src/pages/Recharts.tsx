import { shallowEqual, useSelector } from "react-redux";
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { LibraryInfo } from "../components/LibraryInfo";
import { LibraryInfos } from "../store/library-info";

export function Recharts() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual // checks that two different variables reference the same object
  );

  return (
    <>
      <LibraryInfo lib={LibraryInfos.recharts} />
      <LineChart width={500}
        height={300}
        data={persons}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="age" stroke="#8884d8" />
      </LineChart>
    </>
  );
}
