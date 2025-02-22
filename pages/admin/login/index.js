
import LoginForm from 'components/admin/login/LoginForm';
import Layout from 'components/layout'

export default function Login() {
    return (
        <section className="bg-gradient-to-r from-red-200 via-red-600 to-blue-300 dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-900 dark:to-black">
            <div className="flex lg:flex-row justify-center min-h-screen items-center">
                <LoginForm />
            </div>
        </section>
    );
}


Login.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
