import { useQuery } from "@tanstack/react-query";

const getTransactionDetail = async (token, id, transactionType) => {
  // Construct the API URL with parameters
  let url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/get-transaction-details`;
  const params = new URLSearchParams();

  if (id) {
    params.append("id", encodeURIComponent(id));
  }

  if (transactionType) {
    params.append("transaction_type", encodeURIComponent(transactionType));
  }

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

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`Error fetching transaction details: ${response.statusText}`);
    }

    const details = await response.json();

    // Check if transaction data exists
    if (!details.transaction || details.transaction.length === 0) {
      return {
        status: "failed",
        message: "No details available for this transaction.",
        data: {},
      };
    }

    // Map the transaction details to a usable format
    const detailTableData = details.transaction.map((detail) => ({
      first_trans_id: detail.first_trans_id,
      first_id: detail.first_id,
      first_trans_date: detail.first_trans_date,
      first_amount: detail.first_amount,
      first_trans_amount: detail.first_trans_amount,
      first_trans_fee: detail.first_trans_fee,
      first_delivery_fee: detail.first_delivery_fee,
      first_sender_name: detail.first_sender_name,
      first_receiver_name: detail.first_receiver_name,
      first_sender_phone: detail.first_sender_phone,
      first_receiver_phone: detail.first_receiver_phone,
      first_delivery_type: detail.first_delivery_type,
      first_balance_type: detail.first_balance_type,
      first_post_office: detail.first_post_office,
      first_sender_user_type: detail.first_sender_user_type,
      first_receiver_user_type: detail.first_receiver_user_type,
      first_type: detail.first_type,
      second_delivery_type: detail.second_delivery_type,
      second_post_office: detail.second_post_office,
      second_receiver_name: detail.second_receiver_name,
      second_receiver_phone: detail.second_receiver_phone,
      second_sender_name: detail.second_sender_name,
      second_sender_phone: detail.second_sender_phone,
      second_trans_id: detail.second_trans_id,
      second_id: detail.second_id,
      second_amount: detail.second_amount,
      second_trans_amount: detail.second_trans_amount,
      second_trans_date: detail.second_trans_date,
      second_trans_fee: detail.second_trans_fee,
      second_type: detail.second_type,
      second_balance_type: detail.second_balance_type,
      second_sender_user_type: detail.second_sender_user_type,
      second_receiver_user_type: detail.second_receiver_user_type,
    }));

    // Return the first transaction detail (if there are multiple)
    return {
      status: "success",
      message: "Detail fetched successfully.",
      data: detailTableData[0],
    };
  } catch (error) {
    console.error("Error fetching transaction details:", error.message);
    return {
      status: "failed",
      message: error.message,
      data: {},
    };
  }
};

// Hook to use transaction details
export const useTransactionDetails = (token, id, transactionType) => {
  return useQuery({
    queryKey: ["get-transaction-details", token, id, transactionType],
    queryFn: () => getTransactionDetail(token, id, transactionType),
    enabled: !!token && !!id && !!transactionType, // Ensure query is only run when these values are present
  });
};
  