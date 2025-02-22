
import { useEffect, useState } from "react";
import UserReportList from "../Tables/UserReportTable";
// import {
//   get_onboard_users,
//   get_users_details,
// } from "lib/store/user/action";
import cookies from "js-cookie";
import { Pagination, Spinner } from "@nextui-org/react";
import { useAllUsersData } from "lib/hooks/admin/users/useAllUsersData";

function UsersListReport() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [token, setToken] = useState(null);

  
  useEffect(() => {
    // Fetch the token only on the client side
    const accessToken = cookies.get("access");
    setToken(accessToken);
  }, []);



  const {
    isFetched: is_userList_fetched,
    data: userLists_state,
    error: userList_state_error,
    isLoading: userList_state_loading,
    isFetching: userList_state_fetching,
    refetch: refetch_userList,
  } = useAllUsersData(token, page, pageSize);


  console.log("userLists_state", userLists_state);
  console.log("userLists_state data ==>>", userLists_state?.data);


  if (userList_state_error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  if (userList_state_loading) {
    // Conditionally render a loading indicator
    return (
      <div className="text-center font-medium text-lg">
        {" "}
        <Spinner label="Loading..." color="warning" />
      </div>
    );
  }

  const shouldShowPagination = !userList_state_loading && (userLists_state?.data?.data?.length > 0 ?? false);

  const handleDetailsPage = async (id, user_type) => {
    console.log("user_type===>>", user_type, id);
    // const userDetails = await get_users_details(id, user_type);
    // console.log("userDetails=>", userDetails);
  };

  const setCurrentPage = (page_number) => {
    setPage(page_number);
    // refetch_userList();
  };

  return (
  <div>
<div className="overflow-x-auto relative shadow-md sm:rounded-lg p-8">
      <p className="text-lg font-semibold mb-2 text-gray-500 ">Users Details</p>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-md text-gray-700 uppercase bg-[#dde4eb] dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              S/L
            </th>
            <th scope="col" className="py-3 px-6">
              Name
            </th>
            <th scope="col" className="py-3 px-6">
              Type
            </th>
            <th scope="col" className="py-3 px-6">
              Address
            </th>
            <th scope="col" className="py-3 px-6">
              Phone
            </th>
            <th scope="col" className="py-3 px-6">
              Email
            </th>
            <th scope="col" className="py-3 px-6">
              Date
            </th>
            <th scope="col" className="py-3 px-6">
              Gender
            </th>
            <th scope="col" className="py-3 px-6">
              NID
            </th>
            <th scope="col" className="py-3 px-6">
              Status
            </th>
            <th scope="col" className="py-3 px-6">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {userLists_state?.data.data &&
            userLists_state?.data.data.map((user, index) => (
              <UserReportList
                key={user.id}
                userInfo={user}
                index={(page - 1) * pageSize + index + 1}
                handleDetailsPage={handleDetailsPage}
              />
            ))}
        </tbody>
      </table>

     
    </div>
    {shouldShowPagination && (
        <div className="flex justify-center items-center mt-4">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={userLists_state?.data?.current_page || 1}
            total={
              userLists_state?.data?.total_pages
                ? Math.ceil(userLists_state?.data?.total_pages)
                : 5
            }
            onChange={(page) => setCurrentPage(page)}
            className="overflow-x-visible"
          />
        </div>
      )}
  </div>
  
  );
}

export default UsersListReport;
