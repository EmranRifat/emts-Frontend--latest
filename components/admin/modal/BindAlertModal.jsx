import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { toast } from "react-toastify";

const BindAlertModal = ({
  isOpen,
  onOpenChange,
  selectedPosData2,
  token,
  setIsUnbind,
  togglePosBindStatus,
}) => {
  const { pos_machine_id, sim_number, user_id } = selectedPosData2 || {};
  const [error, setError] = useState("");

  const handleConfirmBind = async () => {
    setError("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/posmachine-bind`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            posmachine_id: pos_machine_id,
            sim_number: sim_number,
            action: "bind",
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }

      if (result.status === "success") {
        togglePosBindStatus(pos_machine_id, "bind");
        toast.success("User Bind Successfully!");
        setIsUnbind(false); // Close the modal
      }
    } catch (error) {
      console.error("Failed to bind POS machine:", error);
      setError(error.message || "Failed to bind POS machine");
      toast.error(error.message || "Binding failed");
    }
  };


  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            {/* Header */}
            <ModalHeader className="flex flex-col gap-1 text-center text-gray-400 bg-red-300">
              Confirmation
            </ModalHeader>

            {/* Body */}
            <ModalBody className="flex flex-col justify-center items-center gap-4 text-center">
              <Image
                src={"/Tableicon/alert.svg"}
                height={86}
                width={86}
                alt="Alert icon"
              />
              <p className="text-gray-700">
                Do you want to bind the user with the selected POS Machine and
                SIM number combo?
              </p>
              {error && <p className="text-red-500">{error}</p>}
            </ModalBody>

            {/* Footer */}
            <ModalFooter className="flex justify-between">
              <Button
                color="danger"
                variant="light"
                onClick={() => setIsUnbind(false)}
              >
                No, Cancel
              </Button>
              <Button
                color="primary"
                onClick={handleConfirmBind}
                className="font-semibold"
              >
                Yes, Bind
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BindAlertModal;
