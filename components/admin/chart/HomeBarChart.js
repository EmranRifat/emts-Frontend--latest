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
      toolbar: { show: true },
      zoom: { enabled: true },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
   
    xaxis: {
      categories: categories,
      labels: {
       
      },
    },
   
    yaxis: {
      title: {
        text: "$ (thousands)",
       className: "dark:text-white",
      },
     
      
      labels: {
        className: "dark:text-white",
        style: {
          // colors: ["var(--text-color)"],
        },
      },
    },


    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => "$ " + val + " thousands",
      },
    },
  };
  
  return (
    <div className="rounded-md shadow-lg md:w-3/5 w-full bg-white dark:bg-darkblack-600 p-4 transition-all duration-300">
      <div id="chart">
        <h1 className="text-gray-600 dark:text-white text-xl px-4 py-2">
          Revenue Flow
        </h1>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
          className="w-full dark:bg-darkblack-500 dark:text-gray-400 p-2 rounded-md "
        />
      </div>
    </div>
  );
};

export default ApexChart;
