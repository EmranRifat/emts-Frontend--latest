import { useMutation } from "@tanstack/react-query";

const update_Onboard_User = async ({ token, formData }) => {

  const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/update-user-limits`;

  // console.log("Form data in onboarding >>>>> ", formData);
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });


    const result = await response.json();
    console.log("res update...", result);

    if (!response.ok) {
      // Handle specific status codes
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      if (response.status === 400) {
        return {
          status: "failed",
          message: result.message || "Bad request: Missing or incorrect data.",
          data: null,
        };
      }


      // Default error for other statuses
      throw new Error(result.message || `Error: ${response.statusText}`);
    }

    // Successful response handling
    return {
      status: "success",
      message: result.message || "User update data  successfully!",
      data: result,
    };
  } catch (err) {
    console.error("Error occurred while submitting the form", err);
    return {
      status: "failed",
      message: err.message || "Unknown error occurred during onboarding.",
      data: null,
    };
  }
};

export const useUpdateOnboardForm = () => {
  return useMutation({ mutationFn: update_Onboard_User });
};
