import { useQuery } from "@tanstack/react-query";

const getPOChallanData = async (token, id) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/requisition-details`;

  if (id) {
    url += `?requisition_id=${id}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log("POChallan response --->", response);

    if (!response.ok) {
      const errorMsg = response.status === 401
        ? "Unauthorized: Invalid token or expired session."
        : `Error fetching POChallan details: ${response.statusText}`;
      throw new Error(errorMsg);
    }

    const POChallan = await response.json();
    console.log("POChallan res data ==>>", POChallan);

    if (!POChallan.requisition_data
    ) {
      return {
        status: "failed",
        message: "No POChallan available",
        data: [],
      };
    }

    return {
      status: "success",
      message: "POChallan fetched successfully.",
      data: POChallan, // Return only the relevant data
    };
  } catch (error) {
    console.error("Error fetching POChallan:", error.message);
    return {
      status: "failed",
      message: error.message || "Failed to fetch POChallan.",
      data: [],
    };
  }
};

export const usePOChallanData = (token, id) => {
  return useQuery({
    queryKey: ["get-POChallan-Data", token, id],
    queryFn: () => getPOChallanData(token, id),
    enabled: !!token, // Ensure the query only runs if a token is provided
  });
};
