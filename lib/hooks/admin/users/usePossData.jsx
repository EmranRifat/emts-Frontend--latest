import { useQuery } from "@tanstack/react-query";

const getPossData = async (token,id) => {
  const params = new URLSearchParams();
  if (id) params.append("user_id", id);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/user-details?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log("possData response ---> ", response);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(`Error fetching possData details: ${response.statusText}`);
    }


    const possData = await response.json();
    console.log("possData res data ==>>", possData);

    if (!possData ) {
      return {
        status: "failed",
        message: "No possData available",
        data: [],
      };
    }

    return {
      status: "success",
      message: "possData fetched successfully.",
      data: possData,
    };
  } catch (error) {
    console.error("error", error.message);
    return {
      status: "failed",
      message: error.message || "Failed to fetch possData.",
      data: [],
    };
  }
};

export const usePossData = (token,id ) => {
  return useQuery({
    queryKey: ["get-all-possData", token,id],
    queryFn: () => getPossData(token,id),
  });
};
