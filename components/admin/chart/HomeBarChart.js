import { useBarChartData } from "lib/hooks/admin/chart/useBarChartData";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";

// Dynamically import ReactApexChart to prevent SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexChart = ({ timeFrame }) => {
  const token = Cookies.get("access");
  const {
    data: barCharts_state = { data: { series: [], categories: [] } },
    isLoading: barCharts_state_loading,
    error: barCharts_state_error,
  } = useBarChartData(token, timeFrame);

  const [series, setSeries] = useState([
    { name: "Transactions Fee", data: [] },
    { name: "Delivery Fee", data: [] },
  ]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (barCharts_state?.data && barCharts_state?.data?.series?.length > 0) {
      const { series = [], categories = [] } = barCharts_state.data;
      setSeries(series);
      setCategories(categories);
    }
  }, [barCharts_state]);

  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: false,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  };

  // if (barCharts_state_loading) return <p>Loading...</p>;
  // if (barCharts_state_error) return <p>Error: {barCharts_state_error.message}</p>;

  return (
    <div className="rounded-md shadow-lg md:w-3/5 w-full dark:bg-darkblack-600 bg-white p-4">
      <div id="chart">
        <h1 className="text-gray-600 dark:text-white text-xl px-4 py-2">Revenue Flow</h1>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
          className=" w-full "
        />
      </div>
    </div>
  );
};

export default ApexChart;
