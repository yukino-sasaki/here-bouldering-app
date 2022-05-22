import { Box, Button, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { RegisterBlock } from "../components/RegisterBlock";
import useFirebase from "../firebase/useFirebase";

type FormData = {
  email: string;
  password: string;
};

const SigninScreen = () => {
  const { registerUser } = useFirebase();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = (value: { email: string; password: string }) => {
    const { email, password } = value;
    console.log(email, password);
    registerUser(email, password);
  };

  return (
    <Box maxW={"60%"} mx="auto">
      <Text fontWeight={"bold"} my="10" fontSize={"2xl"}>
        新規登録
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RegisterBlock navigatePass="/logIn" register={register} />
        {errors && <Text color={"red"}> {errors.email?.message}</Text>}
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          サインアップ
        </Button>
      </form>
    </Box>
  );
};

export default SigninScreen;
