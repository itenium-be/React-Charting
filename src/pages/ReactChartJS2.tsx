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
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export function ReactChartJS2() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual // checks that two different variables reference the same object
  );
  console.log(persons);
  const labels: string[] = persons.map((person) => person.name);
  const ages: number[] = persons.map((person) => person.age);
  console.log(labels);
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: ages,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line width={500} height={300} options={options} data={data} />
    </>
  );
}
