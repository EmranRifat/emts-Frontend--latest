import { useEffect, useState } from "react";
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";
import MainComponent from "components/MainComponent";
import Provider from "components/provider";
import Cookies from "js-cookie";

export default function Home() {
  // State to check if the user is verified
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("access");
    const refreshToken = Cookies.get("refresh");

    if (!accessToken || !refreshToken) {
      window.location.href = "/admin/login";
    } else {
      setIsVerified(true);
    }
  }, []);

  if (!isVerified) return null;






  return (
    <Provider>
      <MainComponent />
    </Provider>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};
