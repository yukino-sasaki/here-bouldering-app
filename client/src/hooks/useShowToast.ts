import { useToast } from "@chakra-ui/react";
import { MutateStatus } from "../generated/graphql";

type MutationResponse = {
  status: MutateStatus;
  message?: string | null;
};

export const useShowToast = () => {
  const toast = useToast();
  function showToast<T extends MutationResponse>(
    response?: T | null,
    title?: string
  ) {
    toast({
      title: title ? title : response?.message,
      status: response?.status,
      duration: 5000,
      isClosable: true,
    });
  }
  return {
    showToast,
  };
};
