
import React, { useEffect, useState } from "react";
import { get_users_details } from "../path/to/your/function"; // Correctly import your function
import { Button } from "@nextui-org/react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Cookies from "js-cookie";

export default function UserDetailsTable() {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data using the correct function
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setLoading(true);
  //       const id = 7;  // Substitute with actual ID
  //       const user_type = "operator";  // Substitute with actual user type

  //       const result = await get_users_details(id, user_type);
  //       if (result.status === "success") {
  //         setUserData(result.data);
  //       } else {
  //         console.error("Failed to fetch user data:", result.message);
  //       }
  //       setLoading(false);
  //     };

  //     fetchData();
  //   }, []);

  const columns = [
    { header: "User ID", accessorKey: "id" },
    { header: "Transaction IDs", accessorKey: "emts_transaction_ids" },
    { header: "Operator Transaction", accessorKey: "operator_transaction" },
    { header: "Requisition IDs", accessorKey: "requisition_ids" },
    { header: "User", accessorKey: "user" },
    { header: "Date", accessorKey: "date" },
    { header: "Transaction Amount", accessorKey: "operator_transaction_amount" },
  ];

  const table = useReactTable({
    data: userData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: rowsPerPage,
      },
    },
  });

  if (loading) {
    return <div className="flex justify-center items-center"><Button color="primary" isLoading>Loading...</Button></div>;
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
