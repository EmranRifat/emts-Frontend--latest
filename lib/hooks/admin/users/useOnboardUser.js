import { useMutation } from "@tanstack/react-query";

const post_Onboard_User = async ({ token, formData }) => {

  const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/user-onboard`;
  console.log("Form data in onboarding >>>>> ", formData);

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
    console.log("res onboarding", result);

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
      message: result.message || "User onboarded successfully!",
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

export const useOnboardUser = () => {
  return useMutation({ mutationFn: post_Onboard_User });
};
