import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import Image from "next/image";

function VerifyOTPforPOChallanModal({
  show,
  onClose,
  token,
  userId,
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
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (show) {
      setTimeLeft(180);
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [show]);

  const handleChange = (e) => {
    const newOtp = e.target.value.slice(0, 6);
    setOtp(newOtp.replace(/[^0-9]/g, ""));
  };

  const handleVerify = async () => {
    if (!otp) {
      setError("Please enter Your OTP.");
      return;
    }
    if (otp.length === 6) {
      setIsVerifying(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/verify-otp-requisition`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: userId,
              amount: POAmount,
              otp: otp,
              requisition_id: requisitionId,
            }),
          }
        );
        const result = await response.json();
        if (response.ok && result.status_code === 200) {
          toast.success(result.message, { position: "top-left" });
          onClose();
        } else {
          setError(result.message || "OTP verification failed");
        }
      } catch (error) {
        setError("Failed to verify OTP. Please try again.");
      } finally {
        setIsVerifying(false);
      }
    } else {
      setError("Please enter a 6-digit OTP.");
    }
  };

  const onResendClick = async () => {
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
      if (result.status_code === 200) {
        setTimeLeft(180);
        toast.success(result.message, { position: "top-left" });
      }
    } catch (error) {
      console.error("Error sending OTP:", error.message);
    }
  };

  return (
    <Modal isOpen={show} onClose={handleCloseOTPModal} placement="top-center">
      <ModalContent className="max-w-lg p-6 ">
        <ModalHeader className="flex justify-center items-center text-success-500">
          <div className="flex items-center gap-2">
            <Image
              width={20}
              height={20}
              src="/logo/list-green.svg"
              alt="logo"
            />
            <span>Approve Requisition</span>
          </div>
        </ModalHeader>

        <ModalBody className="text-black">
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
            <p className="font-semibold   rounded text-left">
              :{" "}
              {new Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(POAmount)}{" "}
              ৳
            </p>

            {/* OTP Input */}
            <p className="font-semibold">Enter OTP </p>
            <div>
              <Input
                autoFocus
                clearable
                value={otp}
                onChange={handleChange}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                pattern="\\d{6}"
                type="text"
                variant="bordered"
                className="w-36 bg-gray-200 rounded-md text-lg font-medium text-left"
              />
            </div>
          </div>

          {/* Countdown Timer */}
          <p className="text-danger text-right text-sm mr-16 ">
            Time remaining :{" "}
            {`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? "0" : ""}${
              timeLeft % 60
            }`}
          </p>

          {/* Error Message */}
          {error && <p className="text-red-500 text-md mt-2">{error}</p>}
        </ModalBody>






        <ModalFooter className="flex justify-center items-center gap-10">
          {timeLeft > 0 ? (
            <Button
              color="danger"
              variant="faded"
              className="px-10 shadow-lg"
              onClick={handleCloseOTPModal}
            >
              Close
            </Button>
          ) : (
            <Button
              auto
              onClick={onResendClick}
              style={{ backgroundColor: "#0070f3", color: "white" }}
            >
              Resend OTP
            </Button>
          )}
          <Button
            onClick={handleVerify}
            loading={isVerifying}
            color="primary"
            variant="faded"
            className="shadow-lg"
          >
            Approve
            <Image
              src="/icons/right-green.svg"
              width={14}
              height={14}
              alt="Approve"
            />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default VerifyOTPforPOChallanModal;
