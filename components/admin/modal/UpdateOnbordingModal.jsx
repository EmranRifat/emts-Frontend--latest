import React, { useState, useEffect } from "react";
import cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import Image from "next/image";
import MaterialTextarea from "components/common/MaterialTextarea";
import MaterialSelect from "components/common/MaterialSelect";
import MaterialInput from "components/common/MaterialInput";
import { usePossData } from "lib/hooks/admin/users/usePossData";
import { useUpdateOnboardForm } from "lib/hooks/admin/users/useUpdatePostmaster";
import { toast, ToastContainer } from "react-toastify";

const UpdatePostMaster = ({
  isOpen,
  onOpenChange,
  refetch,
  user,
  isLoading,
  error,
}) => {
  const token = cookies.get("access");
  const genders = ["male", "female", "other"];

  const {
    data: poss_data,
    error: poss_state_error,
    isLoading: poss_state_loading,
    isFetching: poss_state_fetching,
  } = usePossData(token, user?.id);

  // console.log("poss_data >>>>>", poss_data);
  const { mutate } = useUpdateOnboardForm();

  const [formData, setFormData] = useState({
    user_id: "",
    user_type: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    nid: "",
    post_office: "",
    post_code: "",
    gender: "",
    address: "",
    daily_limit: "",
    max_operator: "",
    max_postman: "",
    comments: "",
  });

  // console.log("update form data----->>>", formData);

  useEffect(() => {
    if (user && poss_data) {
      const userLimitData = poss_data?.data.user_limit_data || [];
      const userDailyLimit = poss_data?.data.transaction_daily_limit_data || [];
      const userTypes = poss_data?.data.user_type_data[0].type || [];

      const maxOperator = userLimitData[0]?.max_operator || "";
      const maxPostman = userLimitData[0]?.max_postman || "";
      const daily_limit = userDailyLimit[0]?.daily_limit || "";

      // console.log("maxOperator,maxPostman,daily_limit----->>>", maxOperator,maxPostman,daily_limit);
      setFormData({
        user_id: user.id.toString() || "",
        user_type: userTypes,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone_number: user.phone_number ? user.phone_number.toString() : "",
        email: user.email || "",
        password: "",
        nid: user.nid || "",
        post_office: user.post_office || "",
        post_code: user.post_code || "",
        gender: user.gender || "",
        address: user.address || "",
        daily_limit: daily_limit.toString() || "",
        max_operator: maxOperator,
        max_postman: maxPostman,
      });
    }
  }, [user, poss_data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { user_id, daily_limit, max_operator, max_postman } = formData;

    const updateData = {
      user_id,
      daily_limit,
      max_operator,
      max_postman,
    };

    mutate(
      { formData:updateData, token },
      {
        onSuccess: (response) => {
          console.log("Form submitted successfully");
          console.log("response +++>>>", response);

          if (response.status === "success") {
            refetch();
            onOpenChange(false);
            console.log("Success Toast Triggered");
            toast.success(response.message);
          }

          if (response.status === "failed") {
            setError(response.message);
            setLoading(false);
          }
        },
        onError: (response) => {
          setLoading(false);
          console.log("An error occurred while submitting the form");
          setError(response.message);
        },
      }
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        radius="xl"
        size="4xl"
      >
        <ModalContent>
          <Card>
            <div className="border-b bg-slate-200 ">
              <CardHeader className=" gap-4 ml-8   ">
                <Image
                  src="/logo/logo-post.svg"
                  alt="image"
                  width={42}
                  height={42}
                />
                <h2 className="font-semibold text-gray-700 text-xl ">
                  Edit Onboarding Form
                </h2>
              </CardHeader>
            </div>

            <ModalBody>
              {error && (
                <div className="mb-4 pt-8 text-red-500 font-semibold">
                  {error}
                </div>
              )}

              <form onSubmit={handleFormSubmit} autoComplete="off">
                <CardBody className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
                  <MaterialInput
                    id="First Name"
                    name="first_name"
                    whenChange={handleChange}
                    whenBlur={() => {}}
                    error={""}
                    value={formData.first_name}
                    type="text"
                    label="First Name"
                    readOnly
                    showOnly
                  />

                  <MaterialInput
                    id="Last Name"
                    name="last_name"
                    whenChange={handleChange}
                    whenBlur={() => {}}
                    error={""}
                    type="text"
                    value={formData.last_name}
                    label="Last Name"
                    readOnly
                    showOnly
                  />

                  <MaterialInput
                    id="Phone Number"
                    name="phone_number"
                    whenChange={handleChange}
                    whenBlur={() => {}}
                    error={""}
                    type="tel"
                    value={formData.phone_number}
                    label="Phone Number"
                    readOnly
                    showOnly
                  />

                  <MaterialInput
                    id="Email"
                    name="email"
                    whenChange={handleChange}
                    whenBlur={() => {}}
                    error={""}
                    type="email"
                    value={formData.email}
                    label="Email"
                    readOnly
                    showOnly
                  />
                  {/* 
                  <MaterialInput
                    id="Password"
                    name="password"
                    whenChange={handleChange}
                    whenBlur={() => {}}
                    type="password"
                    value={formData.password}
                    label="Password"
                    readOnly
                    showOnly
                  /> */}

                  <MaterialInput
                    id="NID"
                    name="nid"
                    whenChange={handleChange}
                    whenBlur={() => {}}
                    error={""}
                    type="number"
                    value={formData.nid}
                    label="NID"
                    readOnly
                    showOnly
                  />

                  <MaterialInput
                    id="Post Office"
                    name="post_office"
                    whenChange={handleChange}
                    whenBlur={() => {}}
                    error={""}
                    value={formData.post_office}
                    type="text"
                    label="Post Office"
                    readOnly
                    showOnly
                  />

                  <MaterialInput
                    id="Post Code"
                    name="post_code"
                    whenChange={handleChange}
                    whenBlur={() => {}}
                    error={""}
                    value={formData.post_code}
                    type="number"
                    label="Post Code"
                    readOnly
                    showOnly
                  />
                 
                  <MaterialInput
                    id="Gender"
                    name="gender"
                    whenChange={handleChange}
                    whenBlur={() => {}}
                    error={""}
                    value={formData.gender}
                    type="text"
                    label="Gender"
                    readOnly
                    showOnly
                  />
                  <MaterialInput
                    id="Address"
                    name="address"
                    whenChange={handleChange}
                    whenBlur={() => {}}
                    error={""}
                    value={formData.address}
                    type="text"
                    label="Address"
                    readOnly
                    showOnly
                  />
                  <MaterialInput
                    id="Type"
                    name="type"
                    whenChange={handleChange}
                    whenBlur={() => {}}
                    error={""}
                    value={
                      formData.user_type === "accountant"
                        ? "Postmaster"
                        : formData.user_type
                    }
                    type="text"
                    label="User Type"
                    readOnly
                    showOnly
                   
                  />

                  <MaterialInput
                    id="Daily Limit (TK)"
                    name="daily_limit"
                    whenChange={handleChange}
                    whenBlur={() => {}}
                    error={""}
                    value={formData.daily_limit}
                    type="number"
                    label="Daily Limit (TK)"
                  />


              {formData.user_type !== "operator" && formData.user_type !== "postman" && (
                 <>
                  <MaterialInput
                    id="Max Operator"
                    name="max_operator"
                    whenChange={handleChange}
                    whenBlur={() => {}}
                    error={""}
                    value={formData.max_operator}
                    type="number"
                    label="Max Operator"
                  />

                     <MaterialInput
                        id="Max Postman"
                        name="max_postman"
                        whenChange={handleChange}
                        whenBlur={() => {}}
                        error={""}
                        value={formData.max_postman}
                        type="number"
                        label="Max Postman"
                      />
                   </>
                  )}


               
                </CardBody>

                <CardFooter className="justify-end gap-1">
                  <Button
                    className="font-semibold"
                    color="danger"
                    variant="light"
                    onPress={() => onOpenChange(false)}
                  >
                    Close
                  </Button>

                  <Button
                    className="font-semibold"
                    loading={isLoading}
                    type="submit"
                    color="primary"
                  >
                    Update
                  </Button>
                </CardFooter>
              </form>
            </ModalBody>
          </Card>
        </ModalContent>
      </Modal>
    </>
  );
};
export default UpdatePostMaster;
