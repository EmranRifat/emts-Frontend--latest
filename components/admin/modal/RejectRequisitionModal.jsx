import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";

function RejectModal({
  show,
  onClose,
  error,
  requisitionId,
  handleSendOtp,
  amount,
  POPost_office,
  POUser,
  requisition_choice,
  challan_choice,
  POAmount,
  handleCloseOTPModal,
}) {
  const [reason, setReason] = useState("");

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const handleReject = () => {
    if (!reason) {
      toast.error("Please provide a reason for rejection.");
      return;
    }
    // Handle rejection logic here
    console.log("Rejected with reason:", reason);
    onClose();
    setReason(""); // Reset the reason after rejection
  };

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      placement="top-center"
      className={show ? "backdrop-blur-md" : ""}
      width="450px"
      aria-labelledby="modal-title"
    >
      <ModalContent>
        <ModalHeader className="flex justify-center items-center">
          <Image
            src="/icons/requisition red .svg"
            height="20"
            width="20"
            alt="logo"
          ></Image>
          <h3 className="text-xl font-semibold text-red-700 ml-2">
            Reject Requisition
          </h3>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col space-y-4 text-gray-700">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {/* Post Office */}
              <p>Post Office </p>
              <p className="font-medium text-left">: {POPost_office}</p>

              {/* Post Master */}
              <p>Post Master </p>
              <p className="font-medium text-left">: {POUser}</p>

              {/* Requisition Type */}
              <p>Requisition Type </p>
              <p className="text-blue-600 font-medium text-left">
                : {requisition_choice} (
                {challan_choice === "Post Office Challan"
                  ? "PO Challan"
                  : "Other Challan"}
                )
              </p>

              {/* Requested Amount */}
              <p>Requested Amount </p>
              <p className="font-semibold text-md  rounded text-left">
                :{" "}
                {new Intl.NumberFormat("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(POAmount)}{" "}
                ৳
              </p>

        
            </div>
         <div className="text-center ">
         <p className="text-gray-500 pb-2" > Reason of Rejection</p>
            <Textarea
              autoFocus
              clearable
              bordered
              labelPlaceholder="Enter Reason"
              value={reason}
              onChange={handleChange}
              outline
              placeholder="Write a reason for rejection"
              fullWidth
              status={error ? "error" : "default"}
              color="black"
              helperText={error && error}
              helperColor="error"
            />
         </div>
          </div>
          <p className="text-danger-500">{error}</p>

        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="faded" auto flat onClick={onClose}>
            Close
          </Button>
          <Button color="danger" variant="faded" auto onClick={handleReject}>
            Reject
            <Image
                      src="/icons/reject-red.svg"
                      width={14}
                      height={14}
                    ></Image>
          </Button>
        </ModalFooter>
      </ModalContent>
      <ToastContainer position="top-right" />
    </Modal>
  );
}

export default RejectModal;
