import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const VerifyOTPforAChallanModal = ({ show, onClose }) => {
  return (
    <Modal isOpen={show} onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>OTP Verification</ModalHeader>
            <ModalBody>
              <p>Please verify the OTP to proceed with the approval.</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Confirm OTP
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default VerifyOTPforAChallanModal;
