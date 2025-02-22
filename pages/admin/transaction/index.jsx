import Layout from "components/layout";
import AdminLayout from "components/admin/layout";
import TransactionComponent from "components/TransactionComponent";

function Transactions() {
  return (
    <TransactionComponent />
  );
}

Transactions.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};

export default Transactions;
