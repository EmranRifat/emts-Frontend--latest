import { useMutation, useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"


export const useLogoutAdmin = () => {
    return useMutation({ mutationFn: () => logout_user() })
}


const logout_user = async () => {

    const accessToken = Cookies.get("access");
    const refreshToken = Cookies.get('refresh');

    if (!accessToken || !refreshToken) {
        console.error("Tokens are missing from cookies");
        return;
    }

    const response = await fetchLogoutUser(accessToken, refreshToken);

    if (response.status == "failed") {
        Cookies.remove('access', { path: '' })
        Cookies.remove('refresh', { path: '' })
        Cookies.remove('userType', { path: '' })
        Cookies.remove('username', { path: '' })
        return {
            status: response.status,
            message: response.message,
            data: response.data

        }
    }
    else if (response.status == "success" && response.data) {
        Cookies.remove('access', { path: '' })
        Cookies.remove('refresh', { path: '' })
        Cookies.remove('userType', { path: '' })
        Cookies.remove('username', { path: '' })
        console.log("login response", response)
        return {
            status: response.status,
            message: response.message,
            data: response.data
        }
    }
    else {
        return {
            status: response.status,
            message: response.message,
            data: response.data
        }
    }

}


const fetchLogoutUser = async (accessToken, refreshToken) => {

    const access = accessToken;
    const refresh = refreshToken;

    console.log("access ==>>", access);
    console.log("refresh ==>>", refresh);
    // Create FormData and append the refresh token
    const formdata = new FormData();
    formdata.append("refresh", refresh);

    try {

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/dashboard/user-logout-view-dashboard`,
            {
                cache: "no-cache",
                method: "POST",
                headers: {
                    Accept: "application/json",
                    // Authorization: `Bearer ${access}`,
                },
                body: refresh,
            }
        );

        const data = await response.json();
        console.log("admin logOut res-->> ", data);

        if (!response.ok) {
            console.log("response logOut ", response);
            return {
                status: "failed",
                token: "",
                message: data.message,
                data: null,
            };
        }

        return {
            status: "success",
            token: data.token,
            message: data.message,
            data: data.user,
        };
    } catch (err) {
        console.log("error log out user", err);
        return {
            status: "failed",
            token: "",
            message: "Error occurred while submitting the form",
            data: null,
        };
    }
}