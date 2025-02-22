import { useMutation, useQuery } from "@tanstack/react-query"



export const useUserDetail = (id, user_type, token) => {
    return useMutation({ mutationFn: () => get_users_details(id, user_type, token) })
}


const get_users_details = async (id, user_type, token) => {
    console.log(id, user_type);

    console.log("token==>>", token);
    if (!token) {
        return {
            status: "failed",
            message: "No access token found",
            data: null,
        };
    }

    const users_res = await fetchUserDetailsDb(token, id, user_type);
    console.log("users_res from action-->>", users_res.data);
    if (users_res.status == "success" && users_res.data) {
        return users_res;
    } else {
        return users_res;
    }
}


const fetchUserDetailsDb = async (token, id, user_type) => {
    console.log("fetch details >>>>", token, id, user_type);

    // Prepare the URL with dynamic parameters
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/user-handover-records-dashboard?user_id=${id}&view_as=${user_type}`;

    try {
        const response = await fetch(apiUrl, {
            cache: "no-cache",
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        const users = await response.json();
        console.log("users fetch  data==>>", users);

        if (response.status == 401) {
            // Unauthorized or token expired
            // Potentially log out the user here
            console.log("Unauthorized: Session expired or invalid token");
            return {
                status: "failed",
                message: "Unauthorized: Token expired or invalid",
                data: null,
            };
        }
        if (!response.ok) {
            console.log("Response from fetchUserDb", response);
            return {
                status: "failed",
                message: "Failed to list Users",
                data: null,
            };
        }

        return {
            status: "success",
            message: "Users fetched successfully",
            data: users,
        };
    } catch (err) {
        console.log("Error fetchUserDb", err);
        return {
            status: "failed",
            message: err.message,
            data: null,
        };
    }
}
