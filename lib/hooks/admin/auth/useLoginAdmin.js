import { useMutation } from "@tanstack/react-query";

const loginUser = async (user) => {
  console.log("got user", user);
  const formData = new FormData();
  formData.append("phone_number", `+88${user.phone}`);
  formData.append("password", user.password);

  if (user.redirect) formData.append("redirect", user.redirect);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/login_dashboard`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
    console.log("response loginUser---->", response);
   
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("response loginUser---->", data);
    return data.data;
  } catch (error) {
    console.error("error", error);
    return {
      status: "FAILED",
      token_post_url: "",
      user: {
        id: "",
        uuid: "",
        username: "",
        email: "",
        email_verified: false,
        phone_number: "",
        phone_number_verified: false,
        permissions: [],
      },
      error: error.message || "Unknown error occurred",
      access: "",
      refresh: "",
    };
  }
};
export const useUserLogin = () => {
  return useMutation({ mutationFn: loginUser });
};
