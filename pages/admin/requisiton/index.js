import { useEffect, useState } from "react";
import { debounce } from "lodash";
import Search from "components/admin/forms/Search";
import Cookies from "js-cookie";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { useRequisitionWithPendingCount } from "lib/hooks/admin/requisition/useRequisitionWithPendingCount";
import RequisitionTable from "components/admin/Tables/RequisitonTable";
import Filter from "components/admin/forms/Filter";
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";

function Requisiton() {
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const token = Cookies.get("access");
  const [inputPage, setInputPage] = useState("");
  const [selectedValue, setSelectedValue] = useState("10");

  const numbers = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];

  const handleInputPageChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (
      !isNaN(pageNumber) &&
      pageNumber > 0 &&
      pageNumber <= requisitions_state?.data?.total_pages
    ) {
      setCurrentPage(pageNumber);
    }
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);
    setPageSize(parseInt(value, 10));
    setPage(1);
    refetch_requisitions();
  };

  const {
    requisitions_state,
    requisitions_state_loading,
    requisitions_state_fetching,
    refetch_requisitions,
    requisitions_state_error,
  } = useRequisitionWithPendingCount(page, pageSize, search);



  const current_page = requisitions_state?.data?.current_page;

  const debouncedSearch = debounce((value) => {
    setSearch(value);
    setPage(1); // Reset to page 1 on search
    refetch_requisitions();
  }, 300);

  const setCurrentPage = (page_number) => {
    setPage(page_number);
    refetch_requisitions();
  };

  const shouldShowPagination =
    !requisitions_state_loading &&
    (requisitions_state?.data?.data?.length > 0 ?? false);

  return (
    <div className="w-full rounded-lg bg-white dark:bg-darkblack-600 p-8">
      <p className="text-gray-400 py-3 font-semibold">All Requisitions Data: </p>
      <div className="space-y-5">
        <div className="flex h-[56px] justify-between space-x-4">
          <Search
            search={search}
            setSearch={(value) => debouncedSearch(value)}
          />
          <div className="hidden md:block">
            <Filter
              options={["All", "pending", "approved", "rejected"]}
              Filter={Filter}
            />
          </div>
        </div>

        {requisitions_state_loading || requisitions_state_fetching ? (
          <div className="flex justify-center items-center">
            <Spinner label="Loading..." color="warning" />
          </div>
        ) : (
          <RequisitionTable
            setFilterData={setFilterData}
            token={token}
            refetch_requisitions={refetch_requisitions}
            search={search}
            page={page}
            pageSize={pageSize}
            requisitions_state={requisitions_state}
            state_loading={requisitions_state_loading}
          />
       
       )}

{shouldShowPagination && (
          <div className="mt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
              {/* Left-aligned controls */}
              <div className="flex justify-start items-start gap-4">
                <div className="flex items-center">
                  <Autocomplete
                    defaultValue={selectedValue}
                    labelPlacement="outside-left"
                    label={<span className="text-gray-600">Show:</span>}
                    className="max-w-xs"
                    placeholder={selectedValue}
                    style={{ width: "25px", color: "black" }}
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
                  <p className="text-gray-600 text-sm">Go to page:</p>
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
                  total={requisitions_state?.data?.total_pages || 5}
                  onChange={(page) => setCurrentPage(page)}
                  className="overflow-x-auto"
                />
              </div>
              {/*/////////// this part make for center pagination so keep invsible */}
              
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
    </div>
  );
}

Requisiton.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};

export default Requisiton;