import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { usePOChallanData } from "lib/hooks/admin/requisition/usePOChallanData";
import Image from "next/image";

const VerifyPOChallanModal = ({
  show,
  onClose,
  setIsModalOpen,
  handleApprovePOChallan,
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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
              <h1 className="text-success-300">Approve Requisition</h1>
            </ModalHeader>

            <ModalBody className="grid grid-cols-10 gap-4">
              {/* User Data Section (30% width) */}
              <div className="col-span-3 text-md space-y-2">
                {/* Check if data is loading */}
                {POChallan_state_loading && <p>Loading...</p>}
                {POChallan_state_error && (
                  <p>Error: {POChallan_state_error.message}</p>
                )}

                {/* Display requisition data if available */}
                {POChallan_state?.data?.requisition_data && (
                  <>
                    {/* <p>Requisition ID: {requisitionId}</p> */}

                    {/* Map over requisition_data to display each post office's details */}
                    {POChallan_state?.data?.requisition_data.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="mb-4 grid grid-cols-2 space-y-1"
                        >
                          <p>Post Office</p>
                          <p className="font-medium  text-sm">
                            : {item.sender_post_office} -{" "}
                            {item.sender_post_code}
                          </p>

                          <p>Post Master </p>
                          <p>: {item.sender_name}</p>

                          <p>Requisition Type</p>
                          <p className="whitespace-nowrap  text-sm text-blue-500">
                            : {item.requisition_type} (
                            {item.challan_type === "Post Office Challan"
                              ? "PO Challan"
                              : "Other Challan"}
                            )
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
                            </span>{" "}
                          </p>
                        </div>
                      )
                    )}
                  </>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-2 ml-12">
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
                    onClick={handleApprovePOChallan}
                    className="shadow-md transform translate-y-1"
                    color="primary"
                    variant="bordered"
                  >
                    Approve
                    <Image
                      src="/icons/right-green.svg"
                      width={14}
                      height={14}
                    ></Image>
                  </Button>
                </div>
              </div>

              {/* Image Preview Section (70% width) */}
              <div className="col-span-7">
                {POChallan_state?.data?.post_office_challan_data?.length >
                  0 && (
                  <Image
                    src={
                      POChallan_state?.data?.post_office_challan_data[0]
                        ?.pdf_file
                    } // Use the image path here
                    alt="PO Challan"
                    width={600}
                    height={500}
                    layout="responsive" // Ensures responsiveness
                  />
                )}
                {POChallan_state?.data?.post_office_challan_data?.length ===
                  0 && <p>No image available.</p>}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default VerifyPOChallanModal;
