import Link from "next/link";
import PasswordResetModal from "../modal/PasswordResetModal";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
// import { login_Admin } from "lib/store/admin/action";
import { Button, Input, Checkbox } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useUserLogin } from "lib/hooks/admin/auth/useLoginAdmin";
import Cookies from "js-cookie";

function LoginForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { mutate } = useUserLogin();
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    phone: Yup.string()
      .required("The field is required")
      .matches(/^[0-9]+$/, "Only numeric values are allowed")
      .length(11, "Phone number must be exactly 11 digits"),
    password: Yup.string().required("The field is required"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      setLoading(true);
      console.log("login values==>>", values);

      mutate(values, {
     
        onSuccess: (response) => {
          console.log("login User Response == >>>", response);
        
          if (response.access && response.refresh) {
            Cookies.set("access", response.access, { expires: 1 });
            Cookies.set("refresh", response.refresh, { expires: 7 });
            Cookies.set("userName", response.user_name, { expires: 1 });
            Cookies.set("userType", response.user_type, { expires: 1 });
        
            setError("");
            setLoading(false);
        
            router.push("/");
          } else {
            setError(response.message || "Login failed. Please try again.");
            setLoading(false);
          }
        },
        
        onError: (response) => {
          setLoading(false);
          console.log("An error occured while submiting the form");
          console.log(response);
          setError("An error occured while submiting the form");
        },
      });
    },
  });

  return (
    <div className="w-full lg:w-1/2 px-4 md:px-8  xl:pl-12 pt-10">
      <PasswordResetModal
        isActive={modalOpen}
        modalData={modalData}
        handelModalData={setModalData}
        handleActive={setModalOpen}
      />

      <div className="flex items-center justify-center ">
        <div className="flex items-center justify-center h-full w-2/3 border-2 rounded-2xl shadow-xl py-10 bg-white">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large pb-10 pt-6 md:px-0 px-4 ">
            <div className=" flex justify-center items-center">
              <Image
                src="/logo/EMTS Only Bird.svg"
                alt="image"
                width={80}
                height={80}
              />
            </div>

            <p className="pb-4 text-left md:text-xl text-black font-poppins font-semibold justify-center flex items-center">
              EMTS Dashboard Login
              <span aria-label="emoji" className="ml-2" role="img"></span>
            </p>

            <form
              className="flex flex-col gap-4 text-black"
              onSubmit={formik.handleSubmit}
            >
              <Input
                label="Phone"
                labelPlacement="outside"
                name="phone"
                placeholder="Enter your phone number"
                type="text"
                variant="bordered"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="text-black"
              />

              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-600">{formik.errors.phone}</div>
              ) : null}



              <Input
                endContent={
                  <button type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                
                label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />

              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600">{formik.errors.password}</div>
              ) : null}
              {/* <div className="flex items-center justify-between px-1 py-2">
                <Checkbox defaultSelected name="remember" size="sm">
                  Remember me
                </Checkbox>
                <Link
                  onClick={() => setModalOpen(true)}
                  className="text-default-500"
                  href="#"
                  size="sm"
                >
                  Forgot password?
                </Link>
              </div> */}
              <Button color="primary" type="submit" isLoading={loading}>
                Sign In
              </Button>
              {/* <Image  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png" alt="Google G Logo"/> */}

              <p className="pb-2 text-danger mt-2">{error}</p>
            </form>
            {/* <p className="text-center text-small text-default-500">
              <Link href="/signup" size="sm">
                Create an account
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
