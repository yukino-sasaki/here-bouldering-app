import {
  Button,
  Modal as ModalRNE,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type ModalType = {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  submit: string;
};

export const Modal: React.FC<ModalType> = ({
  isOpen,
  onClose,
  children,
  header,
  submit,
}) => {
  return (
    <ModalRNE isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {submit}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalRNE>
  );
};
