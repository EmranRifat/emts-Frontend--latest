import { useQuery } from "@tanstack/react-query";

const getAllTransactions = async (token,search, date, page, page_size) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/all-transactions`;

  // Construct query params dynamically
  const params = new URLSearchParams();
  if (search) params.append("search", search); 
  if (date) params.append("date", date);
  if (page) params.append("page", page);
  if (page_size) params.append("page_size", page_size);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log("transaction response ---> ", response);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(
        `Error fetching transaction details: ${response.statusText}`
      );
    }

    const transaction = await response.json();
    console.log("transactions res data  ==>>", transaction);



    if (!transaction?.data || transaction?.data.length === 0) {
      return {
        status: "failed",
        message: "No transaction available",
        data: [],
      };
    }

    return {
      status: "success",
      message: "Transaction fetched successfully.",
      data: transaction,
    };
  } 
  catch (error) {
    console.error("error", error.message);
    return {
      status: "failed",
      message: error.message || "Failed to fetch transaction.",
      data: [],
    };
  }
};

export const useAllTransactionData = (token, search, date, page, page_size) => {
  return useQuery({
    queryKey: ["get-all-transactions", token,search, date, page, page_size],
    queryFn: () => getAllTransactions(token, search, date, page, page_size),
    enabled: !!token, // Prevent the query from running if the token is not available
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes
  });
};
