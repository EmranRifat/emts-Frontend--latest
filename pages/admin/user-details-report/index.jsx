import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Pagination,
} from "@nextui-org/react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";

function UserDetailsReport() {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
 
 
  useEffect(() => {
    async function fetchData() {
      // No need for destructuring here since it's not returning an array
      // const result = await get_users_details();
      // if (result.status === "success") {
      //   setData(result.data);
      // } else {
      //   console.error("Failed to fetch user data:", result.message);
      // }
      // setLoading(false);
    }

    fetchData();
  }, []);

  const columns = [
    { header: "User ID", accessorKey: "id" },
    { header: "Transaction IDs", accessorKey: "emts_transaction_ids" },
    { header: "Operation", accessorKey: "operator_transaction" },
    { header: "Requisition IDs", accessorKey: "requisition_ids" },
    { header: "User", accessorKey: "user" },
    { header: "Date", accessorKey: "date" },
    {
      header: "Transaction Amount",
      accessorKey: "operator_transaction_amount",
    },
  ];

  const table = useReactTable({
    data,
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


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        total={Math.ceil(data.length / rowsPerPage)}
        initialPage={1}
        page={page}
        onChange={handlePageChange}
        className="my-4"
      />
    </div>
  );
}





UserDetailsReport.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};

export default UserDetailsReport;
