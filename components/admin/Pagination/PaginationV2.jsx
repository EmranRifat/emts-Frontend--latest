import React from "react";

function PaginationV2({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  // Generate page numbers dynamically
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center space-x-5 sm:space-x-[35px]">
      <button aria-label="previous" type="button" onClick={handlePreviousPage} disabled={currentPage === 1}>
        <span>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327"
              stroke={currentPage === 1 ? "#E2E8F0" : "#A0AEC0"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div className="flex items-center">
        {pageNumbers.map((number) => (
          <button
            key={number}
            aria-label={`Page ${number}`}
            type="button"
            className={`rounded-lg px-4 py-1.5 text-xs font-bold ${
              currentPage === number
                ? "bg-success-50 text-success-300 dark:bg-darkblack-500 dark:text-bgray-50"
                : "text-bgray-500 transition duration-300 ease-in-out hover:bg-success-50 hover:text-success-300 dark:hover:bg-darkblack-500"
            } lg:px-6 lg:py-2.5 lg:text-sm`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <button aria-label="next" type="button" onClick={handleNextPage} disabled={currentPage === totalPages}>
        <span>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327"
              stroke={currentPage === totalPages ? "#E2E8F0" : "#A0AEC0"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default PaginationV2;
