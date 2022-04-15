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
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

type ModalType<T> = {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  submit: string;
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
};

export function Modal<T>(props: ModalType<T>) {
  const { isOpen, onClose, children, header, submit, handleSubmit, onSubmit } =
    props;
  return (
    <ModalRNE isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose} type="submit">
              {submit}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalRNE>
  );
}
