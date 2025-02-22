
import Filter from "../forms/Filter";
import Search from "../forms/Search";
import TransactionTable from "../Tables/TransactionTable";
import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { get_all_transaction } from "lib/store/transaction/action";

function ListTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);



  // Fetch all transactions from the server and update the state
  useEffect(() => {
    setIsLoading(true);
    get_all_transaction(search, date, page, pageSize)
      .then((response) => {
        console.log("Transaction Response--->>", response);
        if (response.status === "success" && response.data) {
          setTransactions(response.data.transactions);
        } else {
          setError(response.message || "Failed to fetch transactions");
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch transactions");
        console.error("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [search, date, page, pageSize]);


  const totalPages = Math.ceil(transactions?.total / pageSize);



  return (
    <div className="w-full rounded-lg bg-white  dark:bg-darkblack-600">
      <p className="text-gray-400 py-3 font-semibold">All Transactions Data :</p>
      <div className="flex flex-col space-y-5">
        <div className="flex h-[56px] w-full space-x-4">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Filter options={["Operator ", "Emts", "Postman"]} />
        </div>
        <TransactionTable
          transactions={transactions}
          isLoading={isLoading}
          error={error}
          currentPage={currentPage}
          pageSize={pageSize}
          searchTerm={searchTerm} />



        <div className="flex text-center justify-center">
          <Pagination
            total={totalPages || 1}
            initialPage={page}
            onChange={setPage}
            disabled={isLoading}

          />
        </div>
      </div>
    </div>
  );
}



export default ListTab;
