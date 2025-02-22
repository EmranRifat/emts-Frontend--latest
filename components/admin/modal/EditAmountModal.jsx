import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import OtpModal from "./VerifyOTPModal";
import { toast } from "react-toastify";
import Image from "next/image";

function ApproveAmountRequisitionModal({ show,onCloseModal,amount,userId, requisitionId, postMaster, postOffice, onUpdate,token}) {
  // console.log("data modal 111111 ", postOffice, postMaster);

  const [editableAmount, setEditableAmount] = useState(amount);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setEditableAmount(amount);
  }, [amount]);

  const handleChangeAmount = (e) => {
    setEditableAmount(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onCloseModal();
  };

  const handleSendOtp = async () => {
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
            amount: amount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      const result = await response.json();

      console.log("OTP sent successfully:", result);
      setIsModalOpen(true);
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

  return (
    <div>
      <Modal isOpen={show} onClose={onCloseModal} placement="top-center ">
        <ModalContent className="max-w-lg ">
          <ModalHeader className="flex justify-center items-center text-success-500">
            <div className="flex items-center gap-2 ">
              <Image
                width={20}
                height={20}
                src="/logo/list-green.svg"
                alt="image"
              />
              <span>Approve Requisition</span>
            </div>
          </ModalHeader>

          <ModalBody className="text-black">
            <div className="flex flex-col space-y-4  px-4 ">
              {/* Post Office Row */}
              <div className="flex justify-between">
                <h1 className="">Post Office :</h1>

                <span className="flex">{postOffice}</span>
              </div>

              {/* Post Master Row */}
              <div className="flex justify-between">
                <h1 className="">Post Master :</h1>

                <span>{postMaster}</span>
              </div>

              {/* Requested Amount */}
              <div className="flex gap-2 justify-between">
                <h1>Requested Amount :</h1>

                <span className="flex font-semibold">
                  {new Intl.NumberFormat("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(amount)}{" "}
                  (৳)
                </span>
              </div>
              {/* Approving Amount */}
              <div className="flex justify-between items-center">
                <label className="font-semibold whitespace-nowrap">
                  Approving Amount (৳) :
                </label>
                <Input
                  clearable
                  value={editableAmount}
                  onChange={handleChangeAmount}
                  type="text"
                  variant="bordered"
                  placeholder="Enter amount"
                  className={`w-40 ${
                    editableAmount === amount
                      ? "text-green-500"
                      : parseFloat(editableAmount) > amount
                      ? "text-red-500"
                      : ""
                  }`}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onCloseModal}>
              Close
            </Button>
            <Button onClick={handleSendOtp} color="primary" auto>
              Approve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* call otp verify modal */}
      <OtpModal
        token={token}
        show={isModalOpen}
        amoeditableAmountunt={editableAmount}
        amount={amount}
        postMaster={postMaster}
        postOffice={postOffice}
        requisitionId={requisitionId}
        userId={userId}
        onClose={handleCloseModal}
        handleSendOtp={handleSendOtp}
      />
    </div>
  );
}

export default ApproveAmountRequisitionModal;
