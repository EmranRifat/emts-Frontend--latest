import { Spinner } from "@nextui-org/react";
import TransactionDetailModal from "../modal/TransactionDetailsModal";
import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

function TransactionTable({
  transactions,
  isLoading,
  error,
  currentPage,
  pageSize,
}) {
  const [showModal, setShowModal] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [selectedTxType, setSelectedTxType] = useState("Tx Type");
  const [type, setType] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
    setType(transaction.transaction_type);

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
    setType("");
  };

  const handleSelect = (key) => {
    // Update state with the selected value
    setSelectedTxType(key);
  };

  const abbreviateId = (id) => {
    return id.length > 10 ? `${id.slice(0, 5)}...${id.slice(-5)}` : id;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedId(text);
        setTimeout(() => {
          setCopiedId(null);
        }, 2000);
      })

      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  if (isLoading) {
    return (
      <div className="text-center text-lg py-10">
        <Spinner color="default" />
      </div>
    );
  }

  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }
  const hasTransactions = transactions && transactions?.length > 0;

  // const capitalizeFirstLetter = (string) => {
  //   if (!string) return ""; // Handle empty string
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // };

  return (
    <div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-white dark:bg-darkblack-600">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-md text-gray-700 uppercase bg-[#dde4eb] dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" className="py-3 px-6">
                SL
              </th>
              <th scope="col" className="py-3 px-6">
                Date & Time
              </th>
              <th scope="col" className="py-3 px-6">
                Post Office
              </th>
              <th scope="col" className="py-3 px-6">
                Sender & Type
              </th>
              <th scope="col" className="py-3 px-6">
                Receiver & Type
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex items-center">Amount (৳)</div>
              </th>

              <th scope="col" className="py-3 px-6">
                Tx Fee (৳)
              </th>
              <th scope="col" className="py-3 px-6">
                Dlv Fee (৳)
              </th>
              <th scope="col" className="py-3 px-6">
                Tx ID
              </th>
              <th scope="col" className="py-3 px-6">
                <Dropdown>
                  <DropdownTrigger>
                    <h1 className="flex items-center cursor-pointer">
                      {selectedTxType}
                      <svg
                        className="ml-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </h1>
                  </DropdownTrigger>
                  <DropdownMenu
                    className="text-gray-500"
                    aria-label="Transaction Type"
                    onAction={handleSelect}
                  >
                    <DropdownItem key="All">All</DropdownItem>
                    <DropdownItem key="Opening">Opening</DropdownItem>
                    <DropdownItem key="Closing">Closing</DropdownItem>
                    <DropdownItem key="Sending">Sending</DropdownItem>
                    <DropdownItem key="Receiving">Receiving</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-darkblack-600">
            {hasTransactions ? (
              transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer 
                      ${
                        index % 2 === 0
                          ? transaction.type === "operator"
                            ? "bg-red-100 dark:bg-red-900"
                            : "bg-gray-100 dark:bg-darkblack-600"
                          : transaction.type === "operator"
                          ? "bg-red-50 dark:bg-red-700"
                          : "bg-white dark:bg-darkblack-500"
                      }`}
                  onClick={() => handleRowClick(transaction)}
                >
                  <td className="py-2 px-6 text-gray-700 dark:text-gray-300">
                    {index + 1 + (currentPage - 1) * pageSize}
                  </td>
                  <td className="py-2 px-6 text-gray-700 dark:text-gray-300">
                    {transaction.transaction_date}
                  </td>
                  <td className="py-2 px-6 text-gray-700 dark:text-gray-300">
                    {transaction.post_office}
                  </td>
                  <td className="py-2 px-6 text-gray-700 dark:text-gray-300">
                    {transaction.sender_name} ({transaction.sender_user_type})
                    <br />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {transaction.sender_phone}
                    </span>
                  </td>
                  <td className="py-2 px-6 text-gray-700 dark:text-gray-300">
                    {transaction.receiver_name} (
                    {transaction.receiver_user_type})
                    <br />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {transaction.receiver_phone}
                    </span>
                  </td>
                  <td className="py-2 px-6 text-gray-700 dark:text-gray-300">
                    <span className="flex">
                      {new Intl.NumberFormat("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(transaction.transaction_amount)}
                    </span>
                  </td>
                  <td className="py-2 px-6 text-gray-700 dark:text-gray-300">
                    {transaction.transaction_fee}
                  </td>
                  <td className="py-2 px-6 text-gray-700 dark:text-gray-300">
                    {transaction.delivery_fee}
                  </td>
                  <td className="py-2 px-6 text-sm text-gray-700 dark:text-gray-300">
                    <button
                      className="flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(transaction.transaction_id);
                      }}
                    >
                      {abbreviateId(transaction.transaction_id)}
                      <p className="opacity-0 hover:opacity-100 absolute -mt-6 text-white text-sm bg-gray-700 p-1 rounded">
                        Copy ID
                      </p>
                    </button>
                    {copiedId === transaction.transaction_id && (
                      <span className="text-green-500 absolute">Copied!</span>
                    )}
                  </td>
                  <td className="py-2 px-6 text-gray-700 dark:text-gray-300">
                    {transaction.transaction_type}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-3 px-6 text-gray-700 dark:text-gray-300"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TransactionDetailModal
        show={showModal}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
        type={type}
      />
    </div>
  );
}

export default TransactionTable;
