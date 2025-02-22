import { useQuery } from "@tanstack/react-query";

const getAllSelfOperators = async (token, page, pageSize , search) => {

  let url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/pending-self-assigned`;
  
  if (page) {
    url += `?page=${page}`;
  }
  if (pageSize) {
    url += `&page_size=${pageSize}`;
  }
  if (search) {
    url += `&search=${search}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log("operators response ---> ", response);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(
        `Error fetching operators details: ${response.statusText}`
      );
    }

    const operators = await response.json();
    console.log("operatorss res data  ==>>", operators);



    if (!operators?.data || operators?.data.length === 0) {
      return {
        status: "failed",
        message: "No operators available",
        data: [],
      };
    }

    return {
      status: "success",
      message: "operators fetched successfully.",
      data: operators,
    };
  } 
  catch (error) {
    // console.error("error", error.message);
    return {
      status: "failed",
      message: error.message || "Failed to fetch operators.",
      data: [],
    };
  }
};

export const useAllSelfOperators = (token,page,pageSize,search) => {
  return useQuery({
    queryKey: ["get_All_Self_Operatopss", token,page,pageSize,search],
    queryFn: () => getAllSelfOperators(token,page,pageSize,search),
    
  });
};
