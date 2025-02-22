
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LinearScale,
} from "chart.js";

ChartJS.register(Filler);
import { Bar } from "react-chartjs-2";

function BarChart({ options, data }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  return <Bar options={options} data={data} />;
}

export default BarChart;
