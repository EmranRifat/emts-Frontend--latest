import totalEarn from "/public/static/images/icons/total-earn.svg";
import memberImg from "/public/static/images/avatar/members-2.png";
import TotalWidgetCard from "./TotalWidgetCard";
import CartOne from "../carts/CartOne";
import CartTwo from "../carts/CartTwo";
import CartThree from "../carts/CartThree";
import CartFour from "../carts/CartFour";
import CartFive from "../carts/CartFive";
import Cookies from "js-cookie";
// import { useAllTransactiuonCount } from "lib/hooks/admin/transaction/fetchAllTransactionCount";
import { useAllTransactionCount } from "lib/hooks/admin/transaction/fetchAllTransactionCount";

function CartsWidget({ timeFrame }) {
  const token = Cookies.get("access");

  // console.log("timeFrame one===>>", timeFrame, token);
  function formatCurrentDate(date) {
    const currentDate = date;
  
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); 
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
  let end_date = formatCurrentDate(new Date());
  let start_date = "2024-01-1 12:30:45";

  if (timeFrame === "monthly") {
    start_date = formatCurrentDate(
      new Date(new Date().setMonth(new Date().getMonth() - 1))
    );
  } else if (timeFrame === "weekly") {
    start_date = formatCurrentDate(
      new Date(new Date().setDate(new Date().getDate() - 7))
    );
  } else if (timeFrame === "daily") {
    start_date = formatCurrentDate(
      new Date(new Date().setDate(new Date().getDate() - 1))
    );
  } else if (timeFrame === "hourly") {
    start_date = formatCurrentDate(
      new Date(new Date().setHours(new Date().getHours() - 1))
    );
  } else if (timeFrame === "fortnightly") {
    start_date = formatCurrentDate(
      new Date(new Date().setDate(new Date().getDate() - 15))
    );
  } else if (timeFrame === "yearly") {
    start_date = formatCurrentDate(
      new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    );
  }

  const {
    data: transactionCount_state,
    isLoading: transactionCount_state_loading,
    error: transactionCount_state_error,
    isFetching: transactionCount_state_fetching,
    refetch: refetch_transactionCount,
  } = useAllTransactionCount(token, timeFrame,start_date, end_date);

  // console.log("transactionCount_state///////------", transactionCount_state?.data);

  return (
    <div className="mb-[24px] w-full relative">
      <div className="grid grid-cols-1 gap-[10px] lg:grid-cols-5">
        <CartOne
          transactionCount_state={transactionCount_state}
          transactionCount_state_loading={transactionCount_state_loading}
          transactionCount_state_fetching={transactionCount_state_fetching}
          // className="bg-primary"
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          timeFrame={timeFrame}
          title="Total Issued"
          amount="7,245.00"
          groth="+ 3.5%"
          id="totalIssued"
        />
        <CartThree
          transactionCount_state={transactionCount_state}
          transactionCount_state_loading={transactionCount_state_loading}
          transactionCount_state_fetching={transactionCount_state_fetching}
          totalEarnImg={totalEarn}
          timeFrame={timeFrame}
          memberImg={memberImg}
          title="Total Paid"
          amount="5,245.00"
          groth="+ 3.5%"
          id="totalPaid"
        />
        <CartFive
          transactionCount_state={transactionCount_state}
          transactionCount_state_loading={transactionCount_state_loading}
          transactionCount_state_fetching={transactionCount_state_fetching}
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          timeFrame={timeFrame}
          title="Total UnPaid"
          amount="275.00"
          groth="+ 3.5%"
          id="Total UnPaid"
        />
        <CartTwo
          transactionCount_state={transactionCount_state}
          transactionCount_state_loading={transactionCount_state_loading}
          transactionCount_state_fetching={transactionCount_state_fetching}
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          timeFrame={timeFrame}
          title="Total Charges"
          amount="3,246.00"
          groth="+ 3.5%"
          id="totalSpending"
        />

        <CartFour
          transactionCount_state={transactionCount_state}
          transactionCount_state_loading={transactionCount_state_loading}
          transactionCount_state_fetching={transactionCount_state_fetching}
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          timeFrame={timeFrame}
          title="Total Transaction"
          amount="245.00"
          groth="+ 3.5%"
          id="totalGoal"
        />
      </div>
    </div>
  );
}

export default CartsWidget;
