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
  Input,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import Image from "next/image";
import { useOnboardUser } from "lib/hooks/admin/users/useOnboardUser";
import MaterialTextarea from "components/common/MaterialTextarea";
import MaterialSelect from "components/common/MaterialSelect";
import MaterialInput from "components/common/MaterialInput";
import { toast, ToastContainer } from "react-toastify";
import { useAllPostOfficeData } from "../../../lib/hooks/utils/usePostofficedata";

export default function AddPostMaster({ isOpen, onOpenChange, refetch }) {
  const { mutate } = useOnboardUser();
  const token = cookies.get("access");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const genders = ["Male", "Female", "Other"];
  const ac_types = ["prepaid", "postpaid"];

  const [formData, setFormData] = useState({
    user_type: "accountant",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    post_office: "",
    post_code: "",
    nid: "",
    gender: "",
    daily_limit: "",
    address: "",
    max_postman: "1",
    max_operator: "1",
    comments: "",
    nid_front_image: null,
    ac_balance_type: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        user_type: "accountant",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        password: "",
        post_office: "",
        post_code: "",
        nid: "",
        gender: "",
        daily_limit: "",
        address: "",
        max_postman: "1",
        max_operator: "1",
        comments: "",
        nid_front_image: null,
        ac_balance_type: "",
      });

      setQuery(""); // <--clear query too when modal closes
      setError("");
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenderChange = (value) => {
    // console.log("Selected Gender:", value);
    setFormData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };

  const handleAC_TypeChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      ac_balance_type: value,
      daily_limit: value === "prepaid" ? "0.00" : prevData.daily_limit,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      console.log("Selected file:", file);
    }

    setFormData((prevData) => ({
      ...prevData,
      nid_front_page: file,
    }));
  };

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Form data before submission:", formData);

    mutate(
      { formData, token },
      {
        onSuccess: (response) => {
          console.log("Form submitted successfully");
          console.log("response +++>>>", response);

          if (response.status === "success") {
            refetch();
            onOpenChange(false);
            toast.success(response.message);
          }

          if (response.status === "failed") {
            setError(response.message);
            setLoading(false);
          }
        },
        onError: (error) => {
          setLoading(false);
          console.log("An error occurred while submitting the form");
          setError(error.message);
          toast.error(error.message);
        },
      }
    );
  };

  // ******************implimenting post office search**********************

  const [query, setQuery] = useState("");
  const [filteredPostoffice, setFilteredPostoffice] = useState([]);
  const { data, status } = useAllPostOfficeData(query);
  console.log("query data ---->>", query);

  useEffect(() => {
    if (status === "success" && data?.data) {
      setFilteredPostoffice(data.data);
    } else {
      setFilteredPostoffice([]);
    }
  }, [data, status]);

  const handlePostofficeChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSelect = (postOffice) => {
    const formatted = `${postOffice.en_name},${postOffice.police_station.en_name} (${postOffice.code})`;
    setQuery(formatted);
    setFilteredPostoffice([]);

    // Optionally sync to formData right here
    setFormData((prev) => ({
      ...prev,
      post_office: postOffice.en_name,
      post_code: postOffice.code,
    }));
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
            <div className="border-b bg-gradient-to-r from-gray-300 to-indigo-400 dark:from-postDark dark:to-gray-800">
              <CardHeader className="gap-4 ml-8 mt-4">
                <Image
                  src="/logo/logo-post.svg"
                  alt="image"
                  width={42}
                  height={42}
                />
                <h2 className="font-semibold text-gray-700 dark:text-white text-xl">
                  Post-Master Onboarding Form
                </h2>
              </CardHeader>
            </div>

            <ModalBody>
              {error && (
                <div className="mb-4 text-red-500 font-semibold">{error}</div>
              )}

              <form onSubmit={handleFormSubmit} autoComplete="off">
                <CardBody className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
                  <MaterialInput
                    id="First Name"
                    name="first_name"
                    whenChange={handleInputChange}
                    whenBlur={() => {}}
                    error={""}
                    value={formData.first_name}
                    type="text"
                    label="First Name"
                  />

                  <MaterialInput
                    id="Last Name"
                    name="last_name"
                    whenChange={handleInputChange}
                    whenBlur={() => {}}
                    error={""}
                    type="text"
                    label="Last Name"
                  />

                  <MaterialInput
                    id="Phone Number"
                    name="phone_number"
                    whenChange={handleInputChange}
                    whenBlur={() => {}}
                    error={""}
                    type="number"
                    autoComplete="off"
                    label="Phone Number"
                  />

                  <MaterialInput
                    id="Email"
                    name="email"
                    whenChange={handleInputChange}
                    whenBlur={() => {}}
                    error={""}
                    type="email"
                    label="Email"
                  />

                  <MaterialInput
                    id="Password"
                    name="password"
                    whenChange={handleInputChange}
                    whenBlur={() => {}}
                    type="password"
                    label="Password"
                  />

                  <MaterialInput
                    id="NID"
                    name="nid"
                    whenChange={handleInputChange}
                    whenBlur={() => {}}
                    error={""}
                    type="number"
                    label="NID"
                  />

                  {/* <MaterialInput
                    id="Post Office"
                    name="post_office"
                    whenChange={handleInputChange}
                    whenBlur={() => {}}
                    error={""}
                    type="text"
                    label="Post Office"
                  /> */}

                  <div className="relative w-full max-w-md mx-auto ">
                    <label
                      htmlFor="division"
                      className="block text-md font-medium dark:text-white text-gray-700 mb-1"
                    >
                      Select Post-Office
                    </label>
                    <input
                      id="division"
                      type="text"
                      value={query}
                      onChange={handlePostofficeChange}
                      placeholder="Start typing..."
                      className="w-full rounded-md border bg-white dark:bg-gray-900 border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      autoComplete="off"
                    />

                    {/* {filteredPostoffice.length > 0 && (
                      <ul className="absolute z-10 mt-1 w-full bg-slate-100 dark:bg-gray-900 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredPostoffice.map((item, index) => (
                          <li
                            key={index}
                            onClick={() => handleSelect(item)}
                            className="cursor-pointer px-4 py-2 hover:bg-indigo-600 hover:text-white"
                          >
                            {`${item.en_name}, ${item.code}`}
                          </li>
                        ))}

                      </ul>
                    )} */}

                    {filteredPostoffice.length > 0 && (
                      <ul className="absolute z-10 mt-1 w-full bg-slate-100 dark:bg-gray-900 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredPostoffice.map((item, index) => {
                          // console.log("item", item);
                          const fullText = `${item.en_name}, ${item.police_station.en_name}, ${item.code}`;
                          const parts = fullText.split(
                            new RegExp(`(${query})`, "gi")
                          );

                          return (
                            <li
                              key={index}
                              onClick={() => handleSelect(item)}
                              className="cursor-pointer px-4 py-2 hover:bg-indigo-600 hover:text-white border-b border-dashed border-gray-300"
                            >
                              {parts.map((part, i) =>
                                part.toLowerCase() === query.toLowerCase() ? (
                                  <span
                                    key={i}
                                    className="bg-yellow-300 rounded px-1 text-black"
                                  >
                                    {part}
                                  </span>
                                ) : (
                                  <span key={i}>{part}</span>
                                )
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  {/* <MaterialInput
                    id="Post Code"
                    name="post_code"
                    whenChange={handleInputChange}
                    whenBlur={() => {}}
                    error={""}
                    type="number"
                    label="Post Code"
                  /> */}

                  <MaterialSelect
                    isRequired={true}
                    name="gender"
                    id="gender"
                    label="Gender"
                    items={genders || []}
                    value={formData.gender}
                    onSelectionChange={handleGenderChange}
                  />

                  <MaterialInput
                    id="Address"
                    name="address"
                    whenChange={handleInputChange}
                    whenBlur={() => {}}
                    error={""}
                    type="text"
                    label="Address"
                  />

                  <MaterialInput
                    id="Daily Limit (TK)"
                    name="daily_limit"
                    whenChange={handleInputChange}
                    whenBlur={() => {}}
                    error={""}
                    type="number"
                    label="Cash Holding Limit (TK)"
                    disabled={formData.ac_balance_type === "prepaid"}
                  />

                  <MaterialInput
                    id="Max Operator"
                    name="max_operator"
                    whenChange={handleInputChange}
                    whenBlur={() => {}}
                    error={""}
                    type="number"
                    label="Max Operator"
                    value={formData.max_operator}
                  />

                  <MaterialInput
                    id="Max Postman"
                    name="max_postman"
                    whenChange={handleInputChange}
                    whenBlur={() => {}}
                    value={formData.max_postman}
                    error={""}
                    type="number"
                    label="Max Postman"
                  />

                  <MaterialSelect
                    isRequired={true}
                    name="ac_types"
                    id="ac_types"
                    label="Account Type"
                    items={ac_types || []}
                    value={formData.ac_types}
                    onSelectionChange={handleAC_TypeChange}
                  />

                  <div className="">
                    <label
                      htmlFor="nid_front_page"
                      className=" block text-md text-gray-600  dark:text-white"
                    >
                      NID Front Page
                    </label>
                    <input
                      id="nid_front_page"
                      name="nid_front_page"
                      type="file"
                      onChange={handleFileChange}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-lg border bg-[#b0cfe470] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none text-gray-600  dark:text-white"
                    />
                  </div>

                  {/* <MaterialTextarea
                    id="Comments"
                    name="comments"
                    whenChange={handleInputChange}
                    whenBlur={() => {}}
                    error={""}
                    type="text"
                    label="Comments"
                  /> */}
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
                    loading={loading}
                    type="submit"
                    color="primary"
                  >
                    Submit
                  </Button>
                </CardFooter>
              </form>
            </ModalBody>
          </Card>
        </ModalContent>
      </Modal>

      <ToastContainer />
    </>
  );
}
