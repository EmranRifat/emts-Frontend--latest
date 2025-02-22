import { useQuery } from "@tanstack/react-query";

const getTopTransList = async (token, filter, start_date, end_date) => {
  // Construct the base URL
  let url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/top-transactions`;
  const params = new URLSearchParams();

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
    
    console.log("topTransaction response", response);
    
    // Check if the response is OK
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(
        `Error fetching top transaction details: ${response.statusText}`
      );
    }

    const topTransaction = await response.json();
    console.log("topTransaction data !!!!!", topTransaction);

    return {
      status: "success",
      message: topTransaction.message || "Data fetched successfully",
      data: topTransaction || [],
    };
  } catch (error) {
    console.error("Error fetching top transactions:", error.message);
    return {
      status: "failed",
      message: error.message || "Failed to fetch top transaction.",
      data: [],
    };
  }
};

export const useTopTransList = (token, filter, start_date, end_date) => {
  return useQuery({
    queryKey: ["get-Top-Transaction", token, filter, start_date, end_date],
    queryFn: () => getTopTransList(token, filter, start_date, end_date),
    staleTime: 60000, // 1 minute
    cacheTime: 300000, // 5 minutes
  });
};
