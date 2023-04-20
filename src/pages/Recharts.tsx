import { shallowEqual, useSelector } from "react-redux";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function Recharts() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual // checks that two different variables reference the same object
  );
  console.log(persons);

  return (
    <>
    <LineChart width={500}
          height={300}
          data={persons}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}> 
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="age" stroke="#8884d8" />
    </LineChart>
    </>
  );
}