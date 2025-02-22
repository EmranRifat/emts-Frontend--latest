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

function OtpModal({
  show,
  onClose,
  token,
  userId,
  requisitionId,
  handleSendOtp,
  amount,
  amoeditableAmountunt,
  postMaster,
  postOffice,
}) {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);

  // console.log("verify data setttt", amount,
  //   amoeditableAmountunt,
  //   postMaster,
  //   postOffice,);

  useEffect(() => {
    if (show) {
      setTimeLeft(180);
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [show]);

  useEffect(() => {
    if (timeLeft === 0) {
      // Optionally handle state when countdown reaches 0
      // handleSendOtp();
    }
  }, [timeLeft]);

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
              amount: amount,
              otp: otp,
              requisition_id: requisitionId,
            }),
          }
        );
        console.log("response OTP ===>>>", response);

        const result = await response.json();

        console.log("OTP res data :::", result);

        if (!response.ok) {
          throw new Error(`Failed to verify OTP: ${result.message}`);
        }
        if (result.status_code === 400) {
          setError(result.message);
        }

        if (result.status_code === 200) {
          toast.success(result.message, {
            position: "top-right",
          });

          onClose();
        } else {
          toast.error("OTP verification failed: " + result.error_message);
        }
      } catch (error) {
        console.error("Error verifying OTP:", error.message);
        setError(error.message || "Failed to verify OTP.");
        // onClose();
      } finally {
        setIsVerifying(false);
      }
    } else {
      setError("Please enter a 6-digit OTP.");
    }
    // onClose();
  };

  const onResendClick = () => {
    handleSendOtp();
    setTimeLeft(180);
  };

  return (
    <Modal isOpen={show} onClose={onClose} placement="top-center">
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
          <div className="flex flex-col space-y-2">
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
            {/* Requested Amount */}
            <div className="flex gap-2 justify-between">
              <h1>Approving Amount :</h1>

              <span className="flex font-semibold bg-lime-200">
                {new Intl.NumberFormat("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(amoeditableAmountunt)}{" "}
                (৳)
              </span>
            </div>

            {/* Approving Amount */}
           
            <div className="flex justify-between items-center">
              <label className="font-semibold whitespace-nowrap">
                Enter OTP to approve :
              </label>
                

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
                className="w-40"
              />


            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <p className="text-danger justify-end flex">
              Time remaining:{" "}
              {`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? "0" : ""}${
                timeLeft % 60
              }`}
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          {timeLeft > 0 ? (
            <Button color="danger" variant="light" onClick={onClose}>
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
            color="primary"
            auto
            onClick={handleVerify}
            loading={isVerifying}
          >
            Approve
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default OtpModal;
