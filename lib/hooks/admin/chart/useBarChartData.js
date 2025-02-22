import { useQuery } from "@tanstack/react-query";

let weekly_categories = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let daily_categories = [
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
  "8pm",
];
let monthly_categories = ["Week1", "Week2", "Week3", "Week4", "Week5"];
let yearly_categories = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let hourly_categories = ["10min", "20min", "30min", "40min", "50min", "60min"];
let fortnightly_categories = ["Week1", "Week2"];

function formatCurrentDate(date) {
  const currentDate = date;

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const TIMEFRAME_OPTIONS = {
  monthly: 5,
  weekly: 7,
  daily: 12,
  hourly: 6,
  fortnightly: 2,
  yearly: 12,
};

const getTimeRangeData = (timeFrame) => {
  let end_date = formatCurrentDate(new Date());
  let start_date = "";

  let initial_barchart_data = {
    categories: [],
    series: [],
  };

  const transactionData = new Array(TIMEFRAME_OPTIONS[timeFrame]).fill(0);
  const deliveryData = new Array(TIMEFRAME_OPTIONS[timeFrame]).fill(0);
  initial_barchart_data.series = [
    {
      name: "Transactions Fee",
      data: transactionData,
    },
    {
      name: "Delivery Fee",
      data: deliveryData,
    },
  ];

  // Set start_date based on timeFrame
  switch (timeFrame) {
    case "monthly":
      start_date = formatCurrentDate(
        new Date(new Date().setMonth(new Date().getMonth() - 1))
      );
      initial_barchart_data.categories = monthly_categories;

      break;
    case "weekly":
      start_date = formatCurrentDate(
        new Date(new Date().setDate(new Date().getDate() - 7))
      );
      initial_barchart_data.categories = weekly_categories;
      break;
    case "daily":
      start_date = formatCurrentDate(
        new Date(new Date().setDate(new Date().getDate() - 1))
      );
      initial_barchart_data.categories = daily_categories;
      break;
    case "hourly":
      start_date = formatCurrentDate(
        new Date(new Date().setHours(new Date().getHours() - 1))
      );
      initial_barchart_data.categories = hourly_categories;
      break;
    case "fortnightly":
      start_date = formatCurrentDate(
        new Date(new Date().setDate(new Date().getDate() - 15))
      );
      initial_barchart_data.categories = fortnightly_categories;
      break;
    case "yearly":
      start_date = formatCurrentDate(
        new Date(new Date().setFullYear(new Date().getFullYear() - 1))
      );
      initial_barchart_data.categories = yearly_categories;
      break;
    default:
      break;
  }

  return { start_date, end_date, initial_barchart_data };
};

const getBarChartData = async (token, time_range) => {
  const { start_date, end_date, initial_barchart_data } =
    getTimeRangeData(time_range);

  let barchart_data = {
    categories: initial_barchart_data.categories,
    series: initial_barchart_data.series,
  };
  let url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/total-received-chart`;

  if (start_date) {
    url += `?start_date=${start_date}`;
  }
  if (end_date) {
    url += `&end_date=${end_date}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(
        `Error fetching barcharts details: ${response.statusText}`
      );
    }

    const barcharts = await response.json();
    // console.log("barcharts ==>> ", barcharts);0
    let transactions = barcharts.transactions || []; 

    console.log("transactions barcharts ==>> ", transactions);

    if (transactions.length === 0) {
      return {
        status: "success",
        message: "No transactions found.",
        data: barchart_data,
      };
    }

    let startDate = new Date(start_date);
    let endDate = new Date(end_date);
    console.log("startDate ==>> ", startDate);
    console.log("endDate ==>> ", endDate);

    // Determine the start and end date of transactions
    const firstTransactionDate = new Date(
      Math.min(...transactions.map((item) => new Date(item.transaction_date)))
    );

    const lastTransactionDate = new Date(
      Math.max(...transactions.map((item) => new Date(item.transaction_date)))
    );

    console.log("firstTransactionDate ==>> ", firstTransactionDate);
    console.log("lastTransactionDate ==>> ", lastTransactionDate);

    // Calculate the time range in milliseconds
    const timeDifference = endDate - startDate;
    console.log("timeDifference ==>> ", timeDifference);
    console.log("timeSlot ==>> ", TIMEFRAME_OPTIONS[time_range]);
    const interval = timeDifference / TIMEFRAME_OPTIONS[time_range];

    console.log("timeRange ==>> ", time_range);
    console.log("interval ==>> ", interval);

    // Initialize data arrays
    const transactionData = new Array(TIMEFRAME_OPTIONS[time_range]).fill(0);
    const deliveryData = new Array(TIMEFRAME_OPTIONS[time_range]).fill(0);
    const newCategories = [];

    const options = { day: "numeric", month: "short", year: "2-digit" };
    for (let i = 0; i < TIMEFRAME_OPTIONS[time_range]; i++) {
      const start = new Date(firstTransactionDate.getTime() + i * interval);
      const end = new Date(firstTransactionDate.getTime() + (i + 1) * interval);

      // Create categories for the time slots
      newCategories.push(
        `${start.toLocaleDateString(
          "en-GB",
          options
        )} - ${end.toLocaleDateString("en-GB", options)}`
      );

      // Sum the amounts for each time slot
      transactions?.forEach((item) => {
        const transactionDate = new Date(item.transaction_date);

        if (transactionDate >= start && transactionDate < end) {
          transactionData[i] += parseFloat(item.transaction_fee);
        } else if (item.delivery_fee) {
          deliveryData[i] += parseFloat(item.delivery_fee);
        }
      });
    }

    barchart_data.categories = newCategories;
    barchart_data.series = [
      {
        name: "Transactions Fee",
        data: transactionData,
      },
      {
        name: "Delivery Fee",
        data: deliveryData,
      },
    ];

    console.log("barChartData ==>> ", barchart_data);

    return {
      status: "success",
      message: "barcharts fetched successfully.",
      data: barchart_data || [],
    };
  } catch (error) {
    return {
      status: "failed",
      message: error.message || "Failed to fetch barcharts.",
      data: [],
    };
  }
};

export const useBarChartData = (token, time_frame) => {
  return useQuery({
    queryKey: ["get_BarChart_Data", token, time_frame],
    queryFn: () => getBarChartData(token, time_frame),
  });
};
