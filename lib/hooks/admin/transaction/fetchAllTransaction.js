import { useQuery } from "@tanstack/react-query";

const getAllTransactions = async (token, search, date, page, page_size) => {
  if (!token) {
    throw new Error("No token provided");
  }

  let url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/all-transactions`;

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

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(`Error fetching transactions: ${response.statusText}`);
    }

    const transaction = await response.json();

    return transaction?.data?.length > 0
      ? { status: "success", message: "Fetched successfully", data: transaction }
      : { status: "failed", message: "No transactions available", data: [] };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { status: "failed", message: error.message, data: [] };
  }
};

export const useAllTransactionData = (token, search, date, page, page_size) => {
  return useQuery({
    queryKey: ["get-all-transactions", token, search, date, page, page_size],
    queryFn: () => getAllTransactions(token, search, date, page, page_size),
    enabled: !!token, // ✅ Prevents the query from running without a token
  });
};
