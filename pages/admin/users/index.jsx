import { useEffect, useState } from "react";
import cookies from "js-cookie";
import UserFilter from "components/admin/forms/UserFilter";
import UsersList from "components/admin/user/UsersList";
import OnboardPostMasterTable from "components/admin/Tables/OnboardUserTable";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";
import { useAllUsersData } from "lib/hooks/admin/users/useAllUsersData";
import { ToastContainer } from "react-toastify";

const numbers = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];

function Users() {
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const token = cookies.get("access");
  const [inputPage, setInputPage] = useState("");
  const [selectedValue, setSelectedValue] = useState("10");
  const [search, setSearch] = useState("");
  const { isOpen, onOpenChange } = useDisclosure();

  const {
    data: onboardUsers_state,
    isLoading: onboardUsers_state_loading,
    error: onboardUsers_state_error,
    isFetching: onboardUsers_state_fetching,
    refetch: refetch_onboardUsers,

  } = useAllUsersData(token, search, page, pageSize);

  // console.log("onboardUsers_state !!!!!!!!!!!", onboardUsers_state?.data?.data);

  const current_page = onboardUsers_state?.data?.current_page;
  const handleInputPageChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (
      !isNaN(pageNumber) &&
      pageNumber > 0 &&
      pageNumber <= onboardUsers_state?.data?.total_pages
    ) {
      setCurrentPage(pageNumber);
    }
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);
    setPageSize(value);
    setPage(1);
  };

  const setCurrentPage = (page_number) => {
    setPage(page_number);
    refetch_onboardUsers();
  };

  const shouldShowPagination = !onboardUsers_state_loading && (onboardUsers_state?.data?.data?.length > 0 ?? false);

  
  
    useEffect(() => {
    refetch_onboardUsers();
  }, [page, pageSize, refetch_onboardUsers]);
  return (
    <div className="w-full rounded-lg mt-6 bg-white dark:bg-darkblack-600 ">
      <div>
        <div className="p-8 ">
          <UserFilter
            search={search}
            setSearch={setSearch}
            refetch={refetch_onboardUsers}
          />
        </div>

        <div className="px-10">
          <OnboardPostMasterTable
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            onboardUsers_state={onboardUsers_state?.data}
            isLoading={onboardUsers_state_loading}
            error={onboardUsers_state_error}
            setPage={setPage}
            page={page}
            pageSize={pageSize}
            currentPage={current_page}
            setPageSize={setPageSize}
            refetch={refetch_onboardUsers}
            isFetching={onboardUsers_state_fetching}
          />
        </div>
      </div>






      {shouldShowPagination && (
        <div className="mt-6 px-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            {/* Left-aligned controls */}
            <div className="flex justify-start items-start gap-4">
              <div className="flex items-center">
                <Autocomplete
                  defaultValue={selectedValue}
                  labelPlacement="outside-left"
                  label={<span className="text-gray-600">Show :</span>}
                  className="max-w-xs"
                  placeholder={selectedValue}
                  style={{ width: "80px", color: "black" }}
                  variant="bordered"
                >
                  {numbers.map((number) => (
                    <AutocompleteItem
                      key={number}
                      value={number}
                      className="text-black"
                      style={{ fontSize: "12px" }}
                      onClick={() => handleValueChange(number)}
                    >
                      {number}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>

              <div className="flex items-center space-x-2">
                <p className="text-gray-600 text-sm">Go to page :</p>
                <input
                  type="text"
                  className="border border-gray-300 bg-white dark:bg-darkblack-600 rounded px-2 py-1 w-12 md:w-16 text-center text-gray-600"
                  placeholder="1"
                  value={inputPage}
                  onChange={handleInputPageChange}
                />
                {inputPage && (
                  <Button
                    onClick={handleGoToPage}
                    color="primary"
                    variant="faded"
                    size="sm"
                  >
                    Go ≫
                  </Button>
                )}
              </div>
            </div>

            {/* Centered pagination */}
            <div className="flex justify-center items-center w-full md:w-auto mt-4 md:mt-0">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={current_page || 1}
                total={current_page?.data?.total_pages || 5}
                onChange={(page) => setCurrentPage(page)}
                className="overflow-x-auto"
              />
            </div>
            {/*/////////// this part make for centerize pagination so keep invisible */}

            <div className="invisible">
              <div className="flex justify-start items-start gap-4">
                <div className="flex items-center">
                  <Autocomplete
                    defaultValue={selectedValue}
                    labelPlacement="outside-left"
                    label={<span className="text-gray-600">Show :</span>}
                    className="max-w-xs"
                    placeholder={selectedValue}
                    style={{ width: "80px", color: "black" }}
                    variant="bordered"
                  >
                    {numbers.map((number) => (
                      <AutocompleteItem
                        key={number}
                        value={number}
                        className="text-black"
                        style={{ fontSize: "12px" }}
                        onClick={() => handleValueChange(number)}
                      >
                        {number}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>

                <div className="flex items-center space-x-2">
                  <p className="text-gray-600 text-sm">Go to page :</p>
                  <input
                    type="text"
                    className="border border-gray-300 bg-white dark:bg-darkblack-600 rounded px-2 py-1 w-12 md:w-16 text-center text-gray-600"
                    placeholder="1"
                    value={inputPage}
                    onChange={handleInputPageChange}
                  />
                  {inputPage && (
                    <Button
                      onClick={handleGoToPage}
                      color="primary"
                      variant="faded"
                      size="sm"
                    >
                      Go ≫
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Users.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};

export default Users;
