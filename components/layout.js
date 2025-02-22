// import Navbar from './navbar'
import Cookies from "js-cookie";
import { useLoginSsoRedirectToken } from "lib/hooks/useLoginSsoRedirectToken";
import Provider from "components/provider";

export default function Layout({ children }) {

    return (
        <Provider>
            <main>{children}</main>
        </Provider>
    )
}