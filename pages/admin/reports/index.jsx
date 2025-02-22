import UsersListReport from "components/admin/user/UserListReport";
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";


function Users() {
  return (
    <>
      <div className="3xl:flex-1 w-full ">
        <UsersListReport />
      </div>

    </>
  );
}



Users.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  )
}

export default Users;

