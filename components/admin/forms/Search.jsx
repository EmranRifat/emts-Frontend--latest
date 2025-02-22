import Image from "next/image";

function Search({ search, setSearch}) {

  return (

    <div className="hidden h-12 rounded-lg border bg-bgray-100 px-[18px]  focus-within:border-success-300 dark:bg-darkblack-500 sm:block sm:w-full ">
      <div className="flex h-full w-full items-center space-x-[15px]">
      
       <span>
          {/* <svg
            className="stroke-bgray-900 dark:stroke-white"
            width="21"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="9.80204"
              cy="10.6761"
              r="8.98856"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.0537 17.3945L19.5777 20.9094"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg> */}
          
          <Image height={22} width={22}  src="/logo/search.svg" alt="" />
        </span>


        
        <label htmlFor="listSearch" className="w-full">

          <input
            type="text"
            id="listSearch"
            placeholder="Search here ..."
            className="search-input w-full border-none bg-bgray-100 px-0 text-sm tracking-wide text-bgray-600 placeholder:text-sm placeholder:font-medium placeholder:text-primary-500 focus:outline-none focus:ring-0 dark:bg-darkblack-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
          />
        </label>
      </div>
    </div>
  );
}

export default Search;
