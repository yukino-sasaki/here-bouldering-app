import { Box, Button, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { RegisterBlock } from "../components/RegisterBlock";
import useFirebase from "../useFirebase";

type FormData = {
  email: string;
  password: string;
};

const LogInScreen = () => {
  const { login } = useFirebase();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = (value: { email: string; password: string }) => {
    const { email, password } = value;
    login(email, password);
  };
  return (
    <Box maxW={"60%"} mx="auto">
      <Text fontWeight={"bold"} my="10" fontSize={"2xl"}>
        ログイン
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <RegisterBlock navigatePass="/signIn" />
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          ログインする
        </Button>
      </form>
    </Box>
  );
};

export default LogInScreen;
