import { Button, divider } from "@nextui-org/react";
import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import AddPostMaster from "components/admin/modal/AddPostMaster";
import { ToastContainer } from "react-toastify";

function UserFilter({ search, setSearch, refetch }) {
  const [Filter, setActiveFilter] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const { isOpen, onOpenChange } = useDisclosure();
  const handleActiveFilter = (e) => {
    setActiveFilter(e.target.innerText);
  };

  return (
    <div>
      <Button
        color="primary"
        variant="faded"
        className="rounded-lg  mx-4 font-bold  "
        onPress={() => onOpenChange(true)}
      >
        + Add Postmaster
      </Button>
      <div className="bg-white dark:bg-darkblack-600 rounded-lg p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Search Box */}
        <div className="flex items-center flex-1 min-w-0 pl-4 border border-gray-300 dark:border-darkblack-400 py-2.5 rounded-md text-gray-500 bg-white dark:bg-darkblack-600 shadow-sm">
          <span className="flex-shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400 dark:text-gray-500"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L17 17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <input
            type="text"
            className="ml-3 flex-1 min-w-0 bg-transparent text-sm text-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Search Button (hidden on mobile) */}
        <div className="sm:pl-6 sm:block hidden">
          <button
            aria-label="Search"
            className="py-3 px-6 bg-bgray-600 dark:bg-darkblack-500 rounded-lg text-white font-medium text-sm w-full sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>

      <div>
        <AddPostMaster
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          refetch={refetch}
        />
      </div>
    </div>
  );
}

export default UserFilter;
