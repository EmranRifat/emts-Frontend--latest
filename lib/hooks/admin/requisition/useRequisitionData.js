import { useQuery } from "@tanstack/react-query";

const getRequisitionsList = async (token, page, page_size, search) => {
  // console.log("page,page_size", page, page_size );

  let url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/pending-all-requisitions`;

  if (page) {
    url += `?page=${page}`;
  }
  if (page_size) {
    url += `&page_size=${page_size}`;
  }

  if (search && search.length > 0) {
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

    console.log("requisions response --->", response);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(
        `Error fetching transaction details: ${response.statusText}`
      );
    }

    const requisitions = await response.json();
    console.log("requisitions res data ==>>", requisitions);

    if (!requisitions?.data || requisitions?.data.length === 0) {
      return {
        status: "failed",
        message: "No requisitions available",
        data: [],
      };
    }

    // const requisitionTableData = requisitions?.data.map((requisition) => ({
    //   requisition_id: requisition.requisition_id,
    //   requesting_user_id: requisition.requesting_user_id,
    //   requesting_user_username: requisition.requesting_user_username,
    //   requesting_user_type: requisition.requesting_user_type,
    //   requesting_user_phone_number: requisition.requesting_user_phone_number,
    //   requesting_user_post_office: requisition.requesting_user_post_office,
    //   amount: requisition.amount,
    //   request_reason: requisition.request_reason,
    //   request_date: requisition.request_date,
    //   status: requisition.status,
    // }));

    return {
      status: "success",
      message: "requisitions fetched successfully.",
      data: requisitions,
    };
  } catch (error) {
    console.error("error", error.message);
    return {
      status: "failed",
      message: error.message || "Failed to fetch requisitions.",
      data: [],
    };
  }
};

export const useRequisitionData = (token, page_number, page_size, search) => {
  // console.log(page_number,page_size);
  return useQuery({
    queryKey: ["get-all-requisitions", token, page_number, page_size, search],
    queryFn: () => getRequisitionsList(token, page_number, page_size, search),
  });
};
