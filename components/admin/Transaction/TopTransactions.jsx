import { useTopTransList } from "lib/hooks/admin/transaction/fetchTopTransaction"; // Ensure this path is correct
import Cookies from "js-cookie";
import Image from "next/image";

function TopTransactions({ filter }) {
  const token = Cookies.get("access");

  function formatCurrentDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  let end_date = formatCurrentDate(new Date());
  let start_date = "2024-01-01 12:30:45";

  if (filter === "monthly") {
    start_date = formatCurrentDate(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  } else if (filter === "weekly") {
    start_date = formatCurrentDate(new Date(new Date().setDate(new Date().getDate() - 7)));
  } else if (filter === "daily") {
    start_date = formatCurrentDate(new Date(new Date().setDate(new Date().getDate() - 1)));
  } else if (filter === "hourly") {
    start_date = formatCurrentDate(new Date(new Date().setHours(new Date().getHours() - 1)));
  } else if (filter === "fortnightly") {
    start_date = formatCurrentDate(new Date(new Date().setDate(new Date().getDate() - 15)));
  } else if (filter === "yearly") {
    start_date = formatCurrentDate(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
  }

  const {
    data: topTransState,
    isLoading: topTransStateLoading,
    error: topTransStateError,
  } = useTopTransList(token, filter, start_date, end_date);

  const topTransactions = topTransState?.data?.transactions || [];
  console.log("topTransactions>>>>", topTransactions);

  return (
    <div className="flex-1 xl:block">
      <div className="rounded-lg bg-[#0055d471] dark:!bg-darkblack-600 shadow-lg ">
        <div className="flex items-center justify-between border-b border-gray-300 dark:border-darkblack-400 px-5">
          <h3 className="text-lg md:text-xl font-bold text-bgray-900 dark:text-white py-3 flex gap-2">
            <Image width={20} height={20} src="/logo/topTransLogo.svg" alt="logo" />
            Top Transactions
          </h3>
        </div>

        {/* Ensure dark mode background applies */}
        <div className="overflow-x-auto shadow-md bg-gray-200 dark:!bg-darkblack-800">
          {topTransStateLoading ? (
            <div className="py-4 text-center">Loading...</div>
          ) : topTransStateError ? (
            <div className="py-4 text-center text-red-600">
              Error fetching data: {topTransStateError.message}
            </div>
          ) : (
            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-2 pl-3 md:pl-5">SL</th>
                  <th scope="col" className="py-2 px-3 md:px-5">Post Office</th>
                  <th scope="col" className="py-2 px-3 md:px-5">Sent (৳)</th>
                  <th scope="col" className="py-2 px-3 md:px-5">Receive (৳)</th>
                  <th scope="col" className="py-2 px-3 md:px-5"></th>
                </tr>
              </thead>

              <tbody className="text-center bg-gray-200 dark:!bg-darkblack-700">
                {topTransactions.length > 0 ? (
                  topTransactions.map((topTransaction, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-300 transition duration-200 ${
                        index % 2 === 0 ? "bg-white dark:!bg-darkblack-400" : "bg-gray-100 dark:!bg-darkblack-500"
                      }`}
                    >
                      <td className="py-1.5 px-3 md:px-4">{index + 1}</td>
                      <td className="py-1.5 px-3 md:px-4 text-left">
                        {topTransaction.post_office} - {topTransaction.post_code}
                      </td>
                      <td className="py-1.5 px-3 md:px-5 text-left">
                        {new Intl.NumberFormat("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(topTransaction.total_sent)}
                      </td>
                      <td className="py-1.5 px-3 md:px-5 text-left">
                        {new Intl.NumberFormat("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(topTransaction.total_received)}
                      </td>
                      <td className="py-1.5 px-3 md:px-5 text-left"></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-3 font-semibold">
                      No top transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopTransactions;
