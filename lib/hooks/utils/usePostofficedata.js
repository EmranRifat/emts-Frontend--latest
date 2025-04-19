import { useQuery } from "@tanstack/react-query";

const token = "Token 2843d5e2131498eccc565e4d7cab3ea809b2b2c7";

const getAllPostofficeData = async (q) => {

  const url = `https://ekdak.com/thikana/pocode/post-offices-search?q=${encodeURIComponent(q)}&l=50`;

  try {
   
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token, 
        Accept: "application/json",
      },
    });


    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(`Error fetching post office data: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data?.data || data?.data.length === 0) {
      return {
        status: "failed",
        message: "No post office data available",
        data: [],
      };
    }

    return {
      status: "success",
      message: "Post office data fetched successfully.",
      data: data.data, 
    };

  }

  
   catch (error) {
    console.error("Error fetching post office data:", error.message);
    return {
      status: "failed",
      message: error.message || "Failed to fetch post office data.",
      data: [],
    };
  }
};


export const useAllPostOfficeData = (q) => {
  return useQuery({
    queryKey: ["get-post-office-data", q],
    queryFn: () => getAllPostofficeData(q),
    enabled: !!q,
  });
};
