import LineChart from "../chart/LineChart";
import { useEffect } from "react";
import { useRef } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { Spinner } from "@nextui-org/react";

const createGradient = (ctx) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 450);
  gradient.addColorStop(0, "rgba(34, 197, 94,0.41)");
  gradient.addColorStop(0.2, "rgba(255, 255, 255, 0)");
  return gradient;
};

function CartOne({
  title,
  amount,
  groth,
  memberImg,
  totalEarnImg,
  timeFrame,
  transactionCount_state,
  transactionCount_state_loading,
  transactionCount_state_fetching,
}) {
  const chartRef = useRef(null);
  const token = Cookies.get("access");

  // console.log("timeFrame one===>>", timeFrame, token);

  // const {
  //   data: transactionCount_state,
  //   isLoading: transactionCount_state_loading,
  //   error: transactionCount_state_error,
  //   isFetching: transactionCount_state_fetching,
  //   refetch: refetch_transactionCount,
  // } = useAllTransactiuonCount(token, timeFrame);

  //   console.log("transactionCount_state///////",transactionCount_state);

  useEffect(() => {
    // // Get canvas context and create gradient
    const ctx = chartRef?.current?.getContext("2d")?.chart.ctx;
    if (ctx) {
      const gradient = createGradient(ctx);
      // Update chart data and options
      chartRef.current.data.datasets[0].backgroundColor = gradient;
      chartRef.current.update();
    }
  }, []);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Visitor: 2k",
      },
      tooltip: {
        enabled: false,
      },
    },
  };
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Afril",
    "May",
    "Jan",
    "Feb",
    "Mar",
    "Afril",
    "May",
    "Feb",
    "Mar",
    "Afril",
    "May",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: [0, 10, 0, 65, 0, 25, 0, 35, 20, 100, 40, 75, 50, 85, 60],
        label: "Visitor",
        borderColor: "#22C55E",
        pointRadius: 0,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#22C55E",
        borderWidth: 1,
        fill: true,
        fillColor: "#fff",
        tension: 0.4,
      },
    ],
  };
  return (
    <div className="rounded-lg p-5 shadow-lg bg-gradient-to-b from-[#7FB0FF] to-[#E9F2FC] dark:bg-darkblack-600">
      <div className="mb-5  flex items-center justify-between">
        <div className="flex items-center space-x-[7px]">
          <div className="icon">
            <span>
              <Image
                priority={true}
                height={32}
                width={32}
                src="/logo/cart/cart1.svg"
                alt="icon"
              />
            </span>
          </div>
          <span className="text-lg font-semibold text-[#223C55] dark:text-white">
            {title}
          </span>
        </div>
        {/* <div>
          <Image
            priority={true}
            height={memberImg.height}
            width={memberImg.width}
            src={memberImg.src}
            alt="members"
          />
        </div> */}
      </div>
      <div className="flex items-end justify-between">
        <div className="flex-1">
          <div className=" ">
            <div className="text-3xl font-bold leading-[48px] ml-4 text-[#223C55] dark:text-white  flex">
              {transactionCount_state_loading &&
              transactionCount_state_fetching ? (
                <Spinner size="sm" color="success" />
              ) : // transactionCount_state?.data?.total_received?.toFixed(2)
              !isNaN(
                  parseFloat(transactionCount_state?.data?.total_received)
                ) ? (
                parseFloat(
                  transactionCount_state?.data?.total_received
                ).toFixed(2)
              ) : (
                "0.00"
              )}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 30"
                x="0px"
                y="0px"
                className="w-8 h-8 mt-2.5 "
              >
                <title>taka_bangladesh_trade_BDT</title>
                <path d="M17,14a2,2,0,0,0-.18,4,3.09,3.09,0,0,1-.8,1.24A3,3,0,0,1,13.7,20,3.13,3.13,0,0,1,11,16.83V12h4a1,1,0,0,0,0-2H11V6A3,3,0,0,0,5,6,1,1,0,0,0,7,6,1,1,0,0,1,9,6v4H7a1,1,0,0,0,0,2H9v4.83A5.14,5.14,0,0,0,13.51,22L14,22a5,5,0,0,0,5-5V16A2,2,0,0,0,17,14Z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center space-x-1  mt-4 whitespace-nowrap">
            <span>
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4318 0.522827L12.4446 0.522827L8.55575 0.522827L7.56859 0.522827C6.28227 0.522827 5.48082 1.91818 6.12896 3.02928L9.06056 8.05489C9.7037 9.1574 11.2967 9.1574 11.9398 8.05489L14.8714 3.02928C15.5196 1.91818 14.7181 0.522828 13.4318 0.522827Z"
                  fill="#22C55E"
                />
                <path
                  opacity="0.4"
                  d="M2.16878 13.0485L3.15594 13.0485L7.04483 13.0485L8.03199 13.0485C9.31831 13.0485 10.1198 11.6531 9.47163 10.542L6.54002 5.5164C5.89689 4.41389 4.30389 4.41389 3.66076 5.5164L0.729153 10.542C0.0810147 11.6531 0.882466 13.0485 2.16878 13.0485Z"
                  fill="#22C55E"
                />
              </svg>
            </span>
            <span className="text-sm font-medium text-success-300">
              {groth}
            </span>
            <p className="text-sm font-medium text-bgray-700 dark:text-bgray-50 inline whitespace-nowrap">
              from last {timeFrame}
            </p>
          </div>
        </div>
         <div className="w-[106px] h-[68px] ">
          <LineChart option={options} dataSet={data} refer={chartRef} />
        </div>
      </div>
    </div>
  );
}

export default CartOne;
