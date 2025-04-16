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
  
     <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
     <table className="w-full min-w-[800px] text-sm text-left text-gray-700 dark:text-gray-300">
     <thead className="text-xs font-semibold uppercase tracking-wider bg-gray-300 dark:bg-darkblack-500">
      <tr>
        {[
          "SL", "Date & Time", "Post Office", "Sender & Type", "Receiver & Type",
          "Amount (৳)", "Tx Fee (৳)", "Dlv Fee (৳)", "Tx ID", "Tx Type"
        ].map((header, idx) => (
          <th key={idx} className="px-4 py-3 whitespace-nowrap">
            {header === "Tx Type" ? (
              <Dropdown className=" dark:bg-darkblack-500">
                <DropdownTrigger>
                  <span className="flex items-center cursor-pointer">
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
                  </span>
                </DropdownTrigger>
                <DropdownMenu
                  className="text-gray-700 dark:text-gray-300"
                  aria-label="Transaction Type"
                  onAction={handleSelect}
                >
                  {["All", "Opening", "Closing", "Sending", "Receiving"].map(
                    (item) => (
                      <DropdownItem key={item}>{item}</DropdownItem>
                    )
                  )}
                </DropdownMenu>
              </Dropdown>
            ) : (
              header
            )}
          </th>
        ))}
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {hasTransactions ? (
        transactions.map((transaction, index) => {
          const rowClass = `hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${
            index % 2 === 0
              ? transaction.type === "operator"
                ? "bg-red-100 dark:bg-red-800"
                : "bg-white dark:bg-darkblack-600"
              : transaction.type === "operator"
              ? "bg-red-100 dark:bg-red-800"
              : "bg-gray-50 dark:bg-darkblack-500"
          }`;

          return (
            <tr
              key={index}
              className={rowClass}
              onClick={() => handleRowClick(transaction)}
            >
              <td className="px-4 py-3">{index + 1 + (currentPage - 1) * pageSize}</td>
              <td className="px-4 py-3">{transaction.transaction_date}</td>
              <td className="px-4 py-3">{transaction.post_office}</td>
              <td className="px-4 py-3">
                {transaction.sender_name} ({transaction.sender_user_type})
                <br />
                <span className="text-xs text-gray-500">{transaction.sender_phone}</span>
              </td>
              <td className="px-4 py-3">
                {transaction.receiver_name} ({transaction.receiver_user_type})
                <br />
                <span className="text-xs text-gray-500">{transaction.receiver_phone}</span>
              </td>
              <td className="px-4 py-3 font-medium">
                {new Intl.NumberFormat("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(transaction.transaction_amount)}
              </td>
              <td className="px-4 py-3">{transaction.transaction_fee}</td>
              <td className="px-4 py-3">{transaction.delivery_fee}</td>
              <td className="text-blue-600 dark:text-blue-400 relative px-4 py-3">
                
                <button
                  className="flex items-center gap-1 relative"
                  title={transaction.transaction_id} // ✅ Show full ID on hover
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
              <td className="px-4 py-3 capitalize">{transaction.transaction_type}</td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td
            colSpan="10"
            className="text-center py-6 text-gray-500 dark:text-gray-400"
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