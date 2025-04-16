import Image from "next/image";

function Search({ search, setSearch }) {
  return (
    <div className="w-full">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Image src="/logo/search.svg" alt="Search" height={18} width={18} />
        </span>

        <input
          type="text"
          id="listSearch"
          placeholder="Search here..."
          className="w-full pl-10 pr-4 py-3 rounded-md border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-darkblack-600 text-sm text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Search;