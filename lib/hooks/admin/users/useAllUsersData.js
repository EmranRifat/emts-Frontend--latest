import { useQuery } from "@tanstack/react-query";

const getAllUsers = async (token,search, page, page_size) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/user-list`;

   // Construct query params dynamically
   const params = new URLSearchParams();
   if (page) params.append("page", page);
   if (page_size) params.append("page_size", page_size);
   if (search) params.append("search", search);
 
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

    console.log("UserList  response ---> ", response);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(
        `Error fetching UserList details: ${response.statusText}`
      );
    }

    const UserList = await response.json();
    console.log("UserList res data  ==>>", UserList);



    if (!UserList?.data || UserList?.data.length === 0) {
      return {
        status: "failed",
        message: "No UserList available",
        data: [],
      };
    }

    return {
      status: "success",
      message: "UserList fetched successfully.",
      data: UserList,
    };
  } 
  catch (error) {
    console.error("error", error.message);
    return {
      status: "failed",
      message: error.message || "Failed to fetch UserList.",
      data: [],
    };
  }
};

export const useAllUsersData = (token,search, page, page_size) => {
  return useQuery({
    queryKey: ["get-all-UsersList", token,search, page, page_size],
    queryFn: () => getAllUsers(token,search,  page, page_size),

  });
};
