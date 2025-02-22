import { useQuery } from "@tanstack/react-query";

const getAllTransactionCount = async (token, filter, start_date, end_date) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/total-transactions`;
  const params = new URLSearchParams(); // Create a URLSearchParams object

  // Append the filter if it exists
  if (filter) {
    params.append("filter", filter);
  }

  // Append start_date if it exists
  if (start_date) {
    params.append("start_date", start_date);
  }

  // Append end_date if it exists
  if (end_date) {
    params.append("end_date", end_date);
  }

  // If there are any parameters, append them to the URL
  if (params.toString()) {
    url += `?${params}`;
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
      throw new Error(
        `Error fetching transaction count details: ${response.statusText}`
      );
    }

    const transactionCount = await response.json();

    if (!transactionCount || transactionCount?.status_code === 400) {
      return {
        status: "failed",
        message: "No transaction count available",
        data: [],
      };
    }

    return {
      status: "success",
      message: "Transaction count fetched successfully.",
      data: transactionCount,
    };
  } catch (error) {
    return {
      status: "failed",
      message: error.message || "Failed to fetch transaction count.",
      data: [],
    };
  }
};

export const useAllTransactionCount = (token, filter, start_date, end_date) => {
  return useQuery({
    queryKey: ["get_All_Trans_Count", token, filter, start_date, end_date],
    queryFn: () => getAllTransactionCount(token, filter, start_date, end_date),
  });
};

