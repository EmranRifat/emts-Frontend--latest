import { useState } from "react";
import { Pagination, Spinner, useDisclosure } from "@nextui-org/react";
import PosDataModal from "../modal/PossMatchineDataModal";
import UpdatePostMaster from "../modal/UpdateOnbordingModal";

function OnboardPostMasterTable({
  onOpenChange,
  isOpen,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const onOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const handleUpdateOpen = (user) => {
    setSelectedUser(user);
    onOpenChange(true);
  };

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-white dark:bg-darkblack-600">
        <table className="min-w-[900px] w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white dark:bg-darkblack-600">
          <thead className="text-xs text-gray-700 uppercase bg-[#dde4eb] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {[
                "SL",
                "Name",
                "User Type",
                "Post Office",
                "Post-Code",
                "Phone",
                "Email",
                "Created At",
                "NID Number",
                "Gender",
              ].map((heading, i) => (
                <th key={i} className="px-4 py-3 whitespace-nowrap">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(onboardUsers_state?.data || []).map((user, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-900"
                    : "bg-white dark:bg-gray-800"
                }`}
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-200">
                  {index + 1 + (page - 1) * pageSize}
                </td>

                <td className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200 flex gap-2 items-center">
                  <span
                    onClick={() => handleUpdateOpen(user)}
                    tabIndex={0}
                    className="hover:text-primary-500 focus:outline-none"
                  >
                    {user.first_name} {user.last_name}
                  </span>

                  <span
                    className="cursor-pointer flex items-center justify-center w-6 h-6"
                    onClick={() => onOpenModal(user)}
                    tabIndex={0}
                  >
                    <img
                      src="/Tableicon/lock-closed.svg"
                      alt="Lock Icon"
                      className="w-4 h-4 object-contain"
                    />
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {user.user_type === "Accountant"
                    ? "Postmaster"
                    : user.user_type}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  {user.post_office || "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {user.post_code || "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {user.phone_number || "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                  {user.email}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {user.created_at}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {user.nid || "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {user.gender || "N/A"}
                </td>
              </tr>
            ))}
            {(!onboardUsers_state?.data ||
              onboardUsers_state.data.length === 0) && (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-4 px-6 text-gray-500 dark:text-gray-400"
                >
                  No Postmaster data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <PosDataModal
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          user={selectedUser}
        />
      )}
      {selectedUser && (
        <UpdatePostMaster
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          refetch={refetch}
          user={selectedUser}
          error={error}
        />
      )}
    </div>
  );
}

export default OnboardPostMasterTable;
