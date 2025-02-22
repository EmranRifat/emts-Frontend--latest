import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { usePOChallanData } from "lib/hooks/admin/requisition/usePOChallanData";
import Image from "next/image";

const VerifyAChallanModal = ({
  show,
  onClose,
  setIsModalOpen,
  handleApproveAChallan,
  setIsRejectModalOpen,
  isOpen,
  onOpenChange,
  requisitionId,
  token,
}) => {
  const {
    data: POChallan_state,
    isLoading: POChallan_state_loading,
    error: POChallan_state_error,
  } = usePOChallanData(token, requisitionId);

  const handleRejectPOChallan = () => {
    setIsRejectModalOpen(true);
    onOpenChange(false);
  };

  return (
    <Modal isOpen={show} onOpenChange={onClose}>
      <ModalContent className="text-gray-700 max-w-6xl">
        {(onClose) => (
          <>
            <ModalHeader className="flex gap-1">
              <Image
                height={18}
                width={18}
                src="/logo/requisition.svg"
                alt="logo"
              />
              <h1 className="text-success-300">Approve Requisition </h1>
            </ModalHeader>

            <ModalBody className="grid grid-cols-10 gap-4">
              {/* User Data Section (30% width) */}
              <div className="col-span-3 text-sm space-y-8">
                {/* Check if data is loading */}
                {POChallan_state_loading && <p>Loading...</p>}
                {POChallan_state_error && (
                  <p>Error: {POChallan_state_error.message}</p>
                )}

                {/* Display requisition data if available */}
                {POChallan_state?.data?.requisition_data && (
                  <>
                    {/* Map over requisition_data to display each post office's details */}
                    {POChallan_state?.data?.requisition_data.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="mb-4 grid grid-cols-2 space-y-1 "
                        >
                          <p>Post Office</p>
                          <p className="font-medium text-sm">
                            : {item.sender_post_office} -{" "}
                            {item.sender_post_code}
                          </p>
                          <p>Post Master </p>
                          <p>: {item.sender_name}</p>
                          <p>Requisition Type</p>
                          <p className="whitespace-nowrap text-sm text-fuchsia-500">
                            : {item.requisition_type} ({item.challan_type})
                          </p>
                          <p>Requisition Amount</p>
                          <p className="font-semibold">
                            <span className="flex">
                              :{" "}
                              {new Intl.NumberFormat("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(item.requisition_amount)}{" "}
                              ৳
                            </span>
                          </p>
                        </div>
                      )
                    )}

                    <div>
                      <p className="font-semibold">Verification</p>
                      <div className=" space-y-2">
                        {/* Organization Name Verification */}
                        <div className="flex">
                          <p>Organization Name </p>
                          <p className="font-medium text-sm  px-10">
                            <span className="text-left flex gap-2">
                              :{" "}
                              {POChallan_state?.data?.achallan_data?.[0]
                                ?.is_organization_name_matched ? (
                                <Image
                                  src="/icons/right.svg"
                                  width={20}
                                  height={20}
                                  alt="Matched"
                                />
                              ) : (
                                <Image
                                  src="/icons/wrong.svg"
                                  width={18}
                                  height={18}
                                  alt="Not Matched"
                                />
                              )}
                            </span>
                          </p>
                        </div>

                        {/* Account Code Verification */}
                        <div className="flex">
                          <p>Account Code: </p>
                          <p className="font-medium text-sm pt-1 px-7">
                            <span className="flex gap-2 pl-10 ">
                              :{" "}
                              {POChallan_state?.data?.achallan_data?.[0]
                                ?.is_account_code_matched ? (
                                <Image
                                  src="/icons/right.svg"
                                  width={20}
                                  height={20}
                                  alt="Matched"
                                />
                              ) : (
                                <Image
                                  src="/icons/wrong.svg"
                                  width={18}
                                  height={18}
                                  alt="Not Matched"
                                />
                              )}
                            </span>
                          </p>
                        </div>

                        {/* Amount Verification */}
                        <div className="flex">
                          <p>Amount: </p>
                          <p className="font-medium text-sm pt-1 px-7">
                            <span className="text-right  flex gap-2 pl-20">
                              :{" "}
                              {POChallan_state?.data?.achallan_data?.[0]
                                ?.is_amount_matched ? (
                                <Image
                                  src="/icons/right.svg"
                                  width={20}
                                  height={20}
                                  alt="Matched"
                                />
                              ) : (
                                <Image
                                  src="/icons/wrong.svg"
                                  width={18}
                                  height={18}
                                  alt="Not Matched"
                                />
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold ">Sender:</p>
                      <div className="text-gray-600">
                        {POChallan_state?.data?.achallan_data?.map(
                          (AChallan, index) => (
                            <div key={index}>
                              <p>{AChallan.sender}</p>
                              <p>{AChallan.sender_post_office}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Action Buttons */}

                <div className="flex gap-4 py-8 ml-12">
                  <Button
                    onClick={handleRejectPOChallan}
                    className="shadow-md transform translate-y-1"
                    color="danger"
                    variant="faded"
                  >
                    Reject
                    <Image
                      src="/icons/reject-red.svg"
                      width={14}
                      height={14}
                    ></Image>
                  </Button>

                  <Button
                    onClick={() => {
                      handleApproveAChallan(); // Call the passed function to trigger modal state change
                    }}
                    className="shadow-md transform translate-y-1"
                    color="primary"
                    variant="bordered"
                  >
                    Approve
                    <Image
                      src="/icons/right-green.svg"
                      width={14}
                      height={14}
                    />
                  </Button>
                </div>
              </div>

              {/* PDF Display Section (70% width) */}
              <div className="col-span-7 max-h-full pb-4">
                {POChallan_state?.data?.achallan_data?.[0]?.pdf_file ? (
                  <iframe
                    src={POChallan_state.data.achallan_data[0].pdf_file}
                    width="100%"
                    height="600px"
                    style={{ border: "none" }}
                    title="PDF Preview"
                  ></iframe>
                ) : (
                  <p>No PDF available.</p>
                )}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default VerifyAChallanModal;
