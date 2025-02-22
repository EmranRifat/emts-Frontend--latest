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

const UnbindAlartModal = ({
  isOpen,
  onOpenChange,
  selectedPosData,
  token,

  togglePosBindStatus,
}) => {
  const { pos_machine_id, sim_number, user_id } = selectedPosData || {};
  const [error, setError] = useState("");

  const handleConfirmUnBind = async () => {
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
            action: "unbind",
          }),
        }
      );

      const result = await response.json();
      console.log("unbind result", result);
      if (!response.ok) {
        throw new Error(result.message);
      }

      if (result.status === "success") {
        toast.success("User Unbind Successfully..!");
        togglePosBindStatus(pos_machine_id, "unbind");

        onOpenChange(false);
      }
    } catch (error) {
      console.error("Failed to bind POS machine:", error);
      setError(error.message || "Failed to Unbind POS machine");
      toast.error(error.message || "Unbinding failed");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            {/* Header */}
            <ModalHeader className="flex flex-col gap-1 text-center text-gray-400">
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
                Do you want to{" "}
                <span className="text-primary font-bold underline text-xl">
                  Unbind
                </span>{" "}
                the user with the selected POS Machine and SIM number combo?
              </p>
              {error && <p className="text-red-500">{error}</p>}
            </ModalBody>

            {/* Footer */}
            <ModalFooter className="flex justify-between">
              <Button color="danger" variant="light" onClick={onClose}>
                No, Cancel
              </Button>
              <Button
                color="primary"
                onClick={handleConfirmUnBind}
                className="font-semibold"
              >
                Yes, Unbind
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UnbindAlartModal;
