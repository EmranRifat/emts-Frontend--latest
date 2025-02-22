import { useState, useEffect } from "react";
import { Button, Pagination, Spinner } from "@nextui-org/react";
import UserData from "./UserData";

function UsersList({
  onboardUsers_state,
  isLoading,
  error,
  refetch,
  setPage,
  page,
  pageSize,
  setPageSize,
  currentPage,
  isFetching,
}) {
  console.log("onboardUsers_state", onboardUsers_state);
  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (isLoading) {
    return <div  color="primary" className="flex justify-center items-center">
        <Spinner />
    </div>;
  }
  // refetch()
  // Effect to refetch data when page or pageSize changes
  useEffect(() => {
    refetch(); // Call refetch when the page or pageSize changes
  }, [page, pageSize, refetch]);
  return (
    <div className="container mx-auto px-4">
      <div className="overflow-x-auto relative shadow-lg sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 pl-4">
                SL
              </th>
              <th scope="col" className="py-3">
                Name 
              </th>
              <th scope="col" className="py-3">
                User Type 
              </th>
              <th scope="col" className="py-3">
                Post Office
              </th>
              <th scope="col" className="py-3">
                Post-Code
              </th>
              <th scope="col" className="py-3">
                Phone
              </th>
              <th scope="col" className="py-3">
                Email
              </th>
              <th scope="col" className="py-3">
                Created At
              </th>
              <th scope="col" className="py-3">
                NID Number
              </th>
              <th scope="col" className="py-3">
                Gender
              </th>
              {/* <th scope="col" className="py-3">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {(onboardUsers_state?.data || []).map((user, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer ${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                }`}
              >
                <td className="py-2 px-6 font-medium text-gray-900 dark:text-gray-200">
                  {index + 1 + (page - 1) * pageSize}
                </td>
                <td className="py font-semibold text-gray-700 dark:text-gray-200">
                  {user.first_name} {user.last_name}
                  {/* <span className="text-[#395ed4]"> ({user.user_type === "accountant" ? "Postmaster": user.user_type})</span> */}
                </td>
                <td className="py  text-gray-600 dark:text-gray-200">
                {user.user_type === "accountant" ? "Postmaster": user.user_type}
                  {/* <span className="text-[#395ed4]"> ({user.user_type === "accountant" ? "Postmaster": user.user_type})</span> */}
                </td>

                <td className=" text-gray-700 dark:text-gray-300">
                  {user.post_office ? user.post_office : "N/A"}
                </td>
                <td className=" text-gray-700 dark:text-gray-300">
                  {user.post_code ? user.post_code : "N/A"}
                </td>
                <td className=" text-gray-700 dark:text-gray-300">
                  {user.phone_number ? user.phone_number : "N/A"}
                </td>
                <td className=" text-gray-700 dark:text-gray-300">
                  {user.email}
                </td>
                <td className=" text-gray-700 dark:text-gray-300">
                  {user.created_at}
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {" "}
                  {user.nid ? user.nid : "N/A"}
                </td>
                <td className=" text-gray-700 dark:text-gray-300">
                  {user.gender ? user.gender : "N/A"}
                </td>
                <td className=" text-gray-700 dark:text-gray-300">
                  {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-xs rounded">
                    Action
                  </button> */}
                </td>
              </tr>
            ))}
            {(!onboardUsers_state?.data ||
              onboardUsers_state.data.length === 0) && (
              <tr>
                <td colSpan="8" className="text-center py-3 px-6 text-gray-500">
                  No Postmaster data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;
