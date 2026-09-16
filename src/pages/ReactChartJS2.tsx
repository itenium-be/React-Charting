import { shallowEqual, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { LibraryInfo } from "../components/LibraryInfo";
import { byKey } from "../data/libraries";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: false,
  // Chart.js core ships no crosshair; index mode is the closest it gets to the
  // hover-anywhere tooltip the other libraries provide out of the box.
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    x: {
      title: { display: true, text: "name" },
    },
    y: {
      title: { display: true, text: "age" },
    },
  },
};

export function ReactChartJS2() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual
  );
  const labels: string[] = persons.map((person) => person.name);
  const ages: number[] = persons.map((person) => person.age);
  const data = {
    labels,
    datasets: [
      {
        label: "age",
        data: ages,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <LibraryInfo lib={byKey.reactChartJs2} />
      <Line width={500} height={300} options={options} data={data} />
    </>
  );
}
