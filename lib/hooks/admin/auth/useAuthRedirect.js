import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get("access");
    console.log("accessToken >>> ", accessToken);
    if (!accessToken) {
      router.push('/login');
    }
  }, [router]);
}

export default useAuthRedirect;
