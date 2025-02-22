
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";
import MainComponent from "components/MainComponent";
import Provider from "components/provider";


export default function Home() {


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
