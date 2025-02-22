import { useQuery } from "@tanstack/react-query";

const loginUserSsoRedirectToken = async () => {
    const body = {
        internal_identifier: 'emts',
        user_type: 'admin',
        redirect_url: `${process.env.NEXT_PUBLIC_API_URL}/dashboard/sso-emts-land`
    };
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SSO_API_URL}/sso/service-user-request/`, {
        cache: "no-cache",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const res = await response.json();
    console.log("res ----> ", res)

    if (res.error && res.error.length > 0) {
        console.error("error", res.error);
        return null
    }
    return res.redirect_token;

};

export const useLoginSsoRedirectToken = () => {
    return useQuery({
        queryKey: ["get_login_sso_redirect_token"],
        queryFn: () => loginUserSsoRedirectToken(),
    });
};
