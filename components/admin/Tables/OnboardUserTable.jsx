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
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white dark:bg-darkblack-600">
          <thead className="text-xs text-gray-700 uppercase bg-[#dde4eb] dark:bg-gray-700 dark:text-gray-400">
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
                <td className="py-2 font-semibold text-gray-700 dark:text-gray-200 flex gap-1">
                  <span
                    onClick={() => handleUpdateOpen(user)}
                    className="cursor-pointer hover:text-blue-500"
                  >
                    {user.first_name} {user.last_name}
                  </span>

                  {/* Wrapping the img inside a span or div */}
                  <span
                    className="cursor-pointer"
                    onClick={() => onOpenModal(user)}
                  >
                    <img src="/Tableicon/lock-closed.svg" alt="Lock Icon" />
                  </span>
                </td>

                <td className="py-2 text-gray-600 dark:text-gray-200">
                  {user.user_type === "Accountant"
                    ? "Postmaster"
                    : user.user_type}
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {user.post_office || "N/A"}
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {user.post_code || "N/A"}
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {user.phone_number || "N/A"}
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {user.email}
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {user.created_at}
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {user.nid || "N/A"}
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {user.gender || "N/A"}
                </td>
              </tr>
            ))}
            {(!onboardUsers_state?.data ||
              onboardUsers_state.data.length === 0) && (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-3 px-6 text-gray-500"
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
