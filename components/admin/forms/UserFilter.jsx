import { Button, divider } from "@nextui-org/react";
import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import AddPostMaster from "components/admin/modal/AddPostMaster";
import { ToastContainer } from "react-toastify";

function UserFilter({ search, setSearch, refetch  }) {
  const [Filter, setActiveFilter] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const { isOpen, onOpenChange } = useDisclosure();
  const handleActiveFilter = (e) => {
    setActiveFilter(e.target.innerText);
  };

  return (
    <div>
       <Button
        color="primary" variant="faded"
          className="rounded-lg  mx-4 font-bold  moving-border-btn
"
          onPress={() => onOpenChange(true)}
        >
          + Add Postmaster
        </Button>
      <div className="bg-white dark:bg-darkblack-600 rounded-lg p-4  items-center flex ">
        <div
          className="flex items-center flex-1 pl-4 xl:border-r outline  outline-gray-300 py-3 rounded-md text-gray-500 border-1 border-bgray-400 dark:border-darkblack-400 "
          style={{ outlineWidth: "1px" }}
        >
          <span className="">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L17 17"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <input
            type="text"
            className="border-0 w-full ml-2 bg-white dark:bg-darkblack-600 dark:text-white focus:outline-none focus:ring-0 focus:border-none"
            placeholder="Search here .... "
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
       

       
        <div className="pl-10 md:block hidden">
          <button
            aria-label="none"
            className="py-3 px-10 bg-bgray-600 dark:bg-darkblack-500 rounded-lg text-white font-medium text-sm"
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
