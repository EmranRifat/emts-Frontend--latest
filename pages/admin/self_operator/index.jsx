import { useState, useEffect } from "react";
import Search from "components/admin/forms/Search";
import Filter from "components/admin/forms/Filter";
import { Autocomplete, AutocompleteItem, Button, Pagination } from "@nextui-org/react";
import cookies from "js-cookie";
import { useAllSelfOperators } from "lib/hooks/admin/self_operator/fetchSelfOperators";
import OperatorTable from "components/admin/Tables/OperatorTable";
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";



const numbers = ["10","20", "30", "40", "50", "60", "70", "80", "90", "100"];

function Operators() {
  const [token, setToken] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [inputPage, setInputPage] = useState("");
  const [selectedValue, setSelectedValue] = useState("10");
  
  useEffect(() => {
    const accessToken = cookies.get("access");
    setToken(accessToken);
  }, []);

  const handleInputPageChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (
      !isNaN(pageNumber) &&
      pageNumber > 0 &&
      pageNumber <= operators_state?.data?.total_pages
    ) {
      setCurrentPage(pageNumber);
    }
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);
    setPageSize(value);
    // console.log("selectedValue---->>>",selectedValue);
  };





  const {
    isFetched: is_transaction_fetched,
    data: operators_state,
    error: operators_state_error,
    isLoading: operators_state_loading,
    isFetching: operators_state_fetching,
    refetch: refetch_operators,
  } = useAllSelfOperators(token, page, pageSize,search);



  const current_page = operators_state?.data?.current_page;
  // Log for debugging

  // console.log("current_page ", operators_state?.data.current_page);

  if (!token) {
    return null;
  }

  const shouldShowPagination =!operators_state_loading && operators_state?.data?.data?.length > 0;

  const setCurrentPage = (page_number) => {
    setPage(page_number);
    refetch_operators();
  };

  return (
    <div className="w-full rounded-lg bg-white dark:bg-darkblack-600 p-8">
      <p className="text-gray-400 py-3 font-semibold">All operators Data:</p>
      <div className=" space-y-5">
        <div className="flex h-[56px] w-full space-x-4 justify-between">
          <Search search={search} setSearch={setSearch} />
       <span>
       <Filter options={["Operator", "Emts", "Postman"]} />
       </span>
        </div>

        <div className="dark:bg-darkblack-600 dark:text-gray-400">
          <OperatorTable
            operators={operators_state?.data}
            isLoading={operators_state_loading || operators_state_fetching}
            error={operators_state_error}
            refetch={refetch_operators}
          />
        </div>

        {/* {shouldShowPagination && (
          <div>
            <div className="flex gap-6">
              <div>
                <Autocomplete
                  defaultValue={selectedValue}
                  labelPlacement="outside-left"
                  label={<span className="text-gray-600">Show :</span>}
                  className="max-w-xs"
                  placeholder={selectedValue}
                  style={{ width: "30px", color: "black" }}
                  variant="bordered"
                >
                  {numbers.map((number) => (
                    <AutocompleteItem
                      className="text-black"
                      key={number}
                      value={selectedValue}
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
                  className="border bg-white dark:bg-darkblack-600 border-gray-300 rounded px-2 py-1 w-16 text-center text-gray-600"
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
            <div className="flex justify-center items-center  ">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={operators_state?.data?.current_page || 1}
              total={
                operators_state?.data?.total_pages
                  ? Math.ceil(operators_state?.data?.total_pages)
                  : 5
              }
              onChange={(page) => setCurrentPage(page)}
              className="overflow-x-visible"
            />
          </div>
          </div>
        )}
        */}
            {shouldShowPagination && (
          <div className="mt-6">
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
                  total={operators_state?.data?.total_pages || 5}
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




Operators.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  )
}

export default Operators;

