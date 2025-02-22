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
  Input,
} from "@nextui-org/react";

function ApproveAmountModal({ show, onClose, userId, token, action, refetch }) {
  const [inputAmount, setInputAmount] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputAmount(e.target.value);
    if (e.target.value.trim() === "") {
      setError("Amount cannot be empty..!");
    } else {
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!inputAmount.trim()) {
      setError("Amount cannot be empty..!");
      return;
    }

    setError(""); // Clear previous errors

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/update-self-assigned`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            id: userId,
            action: action,
            daily_limit: inputAmount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve the amount.");
      }
      console.log("api response ---> ", response);

      const result = await response.json();
      console.log("API result", result);

      if (result.status_code === 200) {
        toast.success("Self-Operator approved successfully by DPMG.");
      }

      refetch(); // Refetch the data after successful update
      onClose(); // Close modal after action
    } catch (error) {
      console.error("Error approving amount:", error.message);
      // toast.error("Failed to approve amount. Please try again.", {
      //   position: "top-center",
      //   autoClose: 3000,
      // });
    }
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
        <ModalHeader>
          <h3 className="text-2xl font-semibold text-gray-700">
            Approve Amount
          </h3>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col space-y-4">
            <p className="text-gray-500">
              Please enter the daily limit amount to approve.
            </p>
            <p className="text-danger-500">{error} </p>
            <Input
              autoFocus
              clearable
              bordered
              labelPlaceholder="Enter Amount"
              value={inputAmount}
              onChange={handleChange}
              placeholder="e.g., 5000.00"
              fullWidth
              type="number"
              status={error ? "error" : "default"}
              color="primary"
              helperText={error && error}
              helperColor="error"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" auto flat onClick={onClose}>
            Close
          </Button>
          <Button color="primary" auto onClick={handleSubmit}>
            Approve
          </Button>
        </ModalFooter>
      </ModalContent>
      <ToastContainer position="top-right" />
    </Modal>
  );
}

export default ApproveAmountModal;
