import { useState, useEffect } from "react";
import { Button, Spinner, useDisclosure } from "@nextui-org/react";
import AmountModal from "../modal/EditAmountModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyPOChallanModal from "../modal/VerifyPOChallanModal";
import VerifyAChallanModal from "../modal/VerifyAChallanModal";
import VerifyOTPforPOChallanModal from "../modal/VerifyOTPforPOChallanModal";
import RejectModal from "../modal/RejectRequisitionModal";
import VerifyOTPforAChallanModal from "../modal/VerifyOTPforAchallanModal";

function RequisitionTable({
  search,
  rowsPerPage,
  page_number,
  setFilterData,
  pageSize,
  requisitions_state,
  refetch_requisitions,
  token,
  page,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [requisitionId, setRequisitionId] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [postOffice, setPostOffice] = useState(null);
  const [postMaster, setPostMaster] = useState(null);
  const [POrequisition_choice, setPORequisition_choice] = useState(null);
  const [POchallan_choice, setPOChallan_choice] = useState(null);
  const [POAmount, setPOAmount] = useState(null);
  const [POPost_office, setPOPost_office] = useState(null);
  const [POUser, setPOUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAChallanModalOpen, setIsAChallanModalOpen] = useState(false);
  const [isApprovingAChallan, setIsApprovingAChallan] = useState(false);

  const handleApprove = (
    requesting_user_id,
    amount,
    requisition_id,
    requesting_user_post_office,
    requesting_user_username
  ) => {
    setUserId(requesting_user_id);
    setRequisitionId(requisition_id);
    setSelectedAmount(amount);
    setModalOpen(true);
    setPostOffice(requesting_user_post_office);
    setPostMaster(requesting_user_username);
  };

  const handleCloseEditModal = () => {
    refetch_requisitions();
    setModalOpen(false);
  };

  const handlePOChallanVerify = (
    requesting_user_id,
    amount,
    requisition_id,
    requesting_user_post_office,
    requesting_user_username,
    requisition_choice,
    challan_choice
  ) => {
    setPORequisition_choice(requisition_choice);
    setPOChallan_choice(challan_choice);
    setPOAmount(amount);
    setPOPost_office(requesting_user_post_office);
    setPOUser(requesting_user_username);
    setUserId(requesting_user_id);
    setRequisitionId(requisition_id);
    onOpenChange(false);

    isOpen;
  };

  const handleApprovePOChallan = async () => {
    onOpenChange(false);
    setIsModalOpen(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/send-otp-acceptance-requisitions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
            amount: POAmount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      const result = await response.json();

      console.log("OTP sent result >>>", result);
      // onCloseModal();

      if (result.status_code === 200) {
        toast.success(result.message, {
          position: "top-right",
        });
        // onUpdate()
      }
    } catch (error) {
      console.error("Error sending OTP:", error.message);
    }
  };

  const handleAChallanVerify = (
    requisition_id,
    amount,
    requesting_user_post_office,
    requesting_user_username
  ) => {
    setIsAChallanModalOpen(true);
    setRequisitionId(requisition_id);
    setPOAmount(amount);
    setPOPost_office(requesting_user_post_office);
    setPOUser(requesting_user_username);
  };

  const handleApproveAChallan = () => {
    setIsAChallanModalOpen(false);
    setIsApprovingAChallan(true);
  };

  const handleCloseOTPModal = () => {
    setIsModalOpen(false);
  };
  const handleCloseOTPAChallanModal = () => {
    setIsApproving(false);
  };

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
  };
  const handleCloseAChallanModal = () => {
    setIsAChallanModalOpen(false);
  };

  return (
    <div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-md text-gray-700 uppercase bg-[#BCCAD9] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-2 px-6">
                SL
              </th>
              <th scope="col" className="py-2 px-6">
                Date & Time
              </th>
              <th scope="col" className="py-2 px-6">
                Post Office
              </th>
              <th scope="col" className="py-2 px-6">
                Post-Master
              </th>
              <th scope="col" className="py-2 px-6">
                Phone
              </th>

              <th scope="col" className="py-2 px-6">
                Amount (৳)
              </th>

              <th scope="col" className="py-2  relative">
                <div className="flex items-center">
                  <div className="relative ml-2">
                    <select className="py-1 pl-3  bg-[#BCCAD9] dark:bg-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none hover:bg-blue-200 cursor-pointer">
                      <option value="" disabled selected hidden>
                        Requisition Type
                      </option>
                      <option
                        className="bg-slate-100 hover:bg-blue-300"
                        value="all"
                      >
                        All
                      </option>
                      <option
                        className="bg-slate-100 hover:bg-blue-300"
                        value="pending"
                      >
                        Post Paid
                      </option>
                      <option
                        className="bg-slate-100 hover:bg-blue-300"
                        value="approve"
                      >
                        Prepaid (A Challan)
                      </option>
                      <option
                        className="bg-slate-100 hover:bg-blue-300"
                        value="reject"
                      >
                        Prepaid (Post Office Challan)
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06 0l3.75 3.75 3.75-3.75a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </th>

              <th scope="col" className="py-2 px-6 relative">
                <div className="flex items-center">
                  <div className="relative ml-2">
                    <select className="py-1 pl-3 pr-8 bg-[#BCCAD9] dark:bg-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none hover:bg-blue-100 ">
                      <option value="" disabled selected hidden>
                        Status
                      </option>
                      <option
                        className="bg-slate-100 hover:bg-blue-200"
                        value="all"
                      >
                        All
                      </option>
                      <option
                        className="bg-slate-100 hover:bg-blue-200"
                        value="pending"
                      >
                        Pending
                      </option>
                      <option
                        className="bg-slate-100 hover:bg-blue-200"
                        value="approve"
                      >
                        Approve
                      </option>
                      <option
                        className="bg-slate-100 hover:bg-blue-200 mb-2"
                        value="reject"
                      >
                        Reject
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06 0l3.75 3.75 3.75-3.75a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {(requisitions_state?.data?.data || []).map(
              (requisition, index) => {
                const rowIndex = (page - 1) * pageSize + index + 1;
                return (
                  <tr
                    key={index}
                    className={`hover:bg-gray-200  cursor-pointer ${
                      index % 2 === 0 ? "bg-white" : "bg-[#F1F8FF] "
                    }`}
                  >
                    <td className="py-2 px-6">{rowIndex}</td>
                    <td className="py-2 px-6">{requisition.request_date}</td>
                    <td className="py-2 px-6">
                      {requisition.requesting_user_post_office}
                    </td>
                    <td className="py-2 px-6">
                      {requisition.requesting_user_username}
                    </td>
                    <td className="py-2 px-6">
                      {requisition.requesting_user_phone_number}
                    </td>
                    {/* <td className="py-2 px-6">{requisition.amount} </td> */}
                    <td className="py-1 px-6">
                      <span className="flex">
                        {new Intl.NumberFormat("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(requisition.amount)}
                      </span>
                    </td>
                    <td
                      className={`py-2 px-6 ${
                        requisition.requisition_choice === "Prepaid" &&
                        requisition.challan_choice === "A Challan"
                          ? "text-fuchsia-500"
                          : requisition.requisition_choice === "Prepaid" &&
                            requisition.challan_choice === "Post Office Challan"
                          ? "text-blue-500"
                          : requisition.requisition_choice === "Postpaid"
                          ? "text-green-500"
                          : ""
                      }`}
                    >
                      {requisition.requisition_choice}{" "}
                      {requisition.challan_choice !== "No Challan" &&
                        `(${
                          requisition.challan_choice === "Post Office Challan"
                            ? "PO Challan"
                            : requisition.challan_choice
                        })`}
                    </td>

                    <td className="py-2 pl-10">
                      {requisition.status === "pending" ? (
                        <Button
                          size="sm"
                          color="primary"
                          style={{
                            fontSize: "14px",
                            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.15)",
                          }}
                          variant="faded"
                          onClick={() => {
                            // Call the appropriate function based on conditions
                            if (
                              requisition.requisition_choice === "Prepaid" &&
                              requisition.challan_choice === "A Challan"
                            ) {
                              handleAChallanVerify(
                                requisition.requisition_id,
                                requisition.amount,
                                requisition.requesting_user_post_office,
                                requisition.requesting_user_username
                              );
                            } else if (
                              requisition.requisition_choice === "Prepaid" &&
                              requisition.challan_choice ===
                                "Post Office Challan"
                            ) {
                              handlePOChallanVerify(
                                requisition.requesting_user_id,
                                requisition.amount,
                                requisition.requisition_id,
                                requisition.requesting_user_post_office,
                                requisition.requesting_user_username,
                                requisition.requisition_choice,
                                requisition.challan_choice
                              );
                            } else {
                              handleApprove(
                                requisition.requesting_user_id,
                                requisition.amount,
                                requisition.requisition_id,
                                requisition.requesting_user_post_office,
                                requisition.requesting_user_username
                              );
                            }
                          }}
                        >
                          Verify
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            color="#19C964"
                            fill="none"
                          >
                            <path
                              d="M15 2.5H12C7.52166 2.5 5.28249 2.5 3.89124 3.89124C2.5 5.28249 2.5 7.52166 2.5 12C2.5 16.4783 2.5 18.7175 3.89124 20.1088C5.28249 21.5 7.52166 21.5 12 21.5C16.4783 21.5 18.7175 21.5 20.1088 20.1088C21.5 18.7175 21.5 16.4783 21.5 12V10"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M8.5 10L12 13.5L21.0002 3.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>
                      ) : (
                        <span
                          className={`${
                            requisition.status === "approved"
                              ? "text-green-500"
                              : requisition.status === "rejected"
                              ? "text-red-500"
                              : requisition.status === "pending"
                              ? "text-blue-500"
                              : ""
                          }`}
                        >
                          <span className="px-2">{requisition.status}</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              }
            )}
            {(!requisitions_state?.data?.data ||
              requisitions_state.data.data.length === 0) && (
              <tr>
                <td colSpan="8" className="text-center py-2 px-6 text-gray-500">
                  No requisitions data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <AmountModal
          show={modalOpen}
          onCloseModal={handleCloseEditModal}
          userId={userId}
          postOffice={postOffice}
          postMaster={postMaster}
          requisitionId={requisitionId}
          amount={selectedAmount}
          token={token}
          onUpdate={refetch_requisitions}
        />
      )}

      <VerifyOTPforPOChallanModal
        handleApprovePOChallan={handleApprovePOChallan}
        handleSendOtp={handleApprovePOChallan}
        token={token}
        show={isModalOpen}
        postOffice={postOffice}
        postMaster={postMaster}
        requisitionId={requisitionId}
        amount={selectedAmount}
        POPost_office={POPost_office}
        POAmount={POAmount}
        POUser={POUser}
        userId={userId}
        requisition_choice={POrequisition_choice}
        challan_choice={POchallan_choice}
        handleCloseOTPModal={handleCloseOTPModal}
      />

      <VerifyPOChallanModal
        handleApprovePOChallan={handleApprovePOChallan}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        postOffice={postOffice}
        postMaster={postMaster}
        requisitionId={requisitionId}
        amount={selectedAmount}
        POPost_office={POPost_office}
        POAmount={POAmount}
        POUser={POUser}
        requisition_choice={POrequisition_choice}
        challan_choice={POchallan_choice}
        token={token}
        show={isRejectModalOpen}
        onClose={handleCloseRejectModal}
        setIsRejectModalOpen={setIsRejectModalOpen} // pass this prop
      />

      <VerifyAChallanModal
        show={isAChallanModalOpen}
        onClose={handleCloseAChallanModal} // Add a function to handle closing
        handleApproveAChallan={handleApproveAChallan}
        setIsModalOpen={setIsAChallanModalOpen}
        token={token}
        requisitionId={requisitionId}
        POPost_office={POPost_office}
        POAmount={POAmount}
        POUser={POUser}
        requisition_choice={POrequisition_choice}
        challan_choice={POchallan_choice}
      />

      <VerifyOTPforAChallanModal
        show={isApprovingAChallan} // This prop will control the visibility of the modal
        onClose={() => setIsApprovingAChallan(false)} // Close the modal when needed
      />

      <RejectModal
        show={isRejectModalOpen}
        POPost_office={POPost_office}
        POAmount={POAmount}
        POUser={POUser}
        requisition_choice={POrequisition_choice}
        challan_choice={POchallan_choice}
        onClose={handleCloseRejectModal}
        setIsModalOpen={setIsRejectModalOpen}
      />

      <ToastContainer position="top-right" />
    </div>
  );
}

export default RequisitionTable;
