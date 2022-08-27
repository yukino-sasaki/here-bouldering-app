import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { RegisterBlock } from "../components/RegisterBlock";
import useFirebase from "../firebase/useFirebase";

type FormData = {
  email: string;
  password: string;
};

const LogInScreen = () => {
  const { login, loginWithGoogle, auth } = useFirebase();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (value: { email: string; password: string }) => {
    const { email, password } = value;
    await login(email, password);
    if (auth.currentUser) {
      await auth.currentUser.reload();
      navigate("/");
    }
  };
  return (
    <Box maxW={"60%"} mx="auto">
      <Text fontWeight={"bold"} my="10" fontSize={"2xl"}>
        ログイン
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <RegisterBlock navigatePass="/signIn" register={register} />
        {errors && <Text color={"red"}> {errors.email?.message}</Text>}
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          ログインする
        </Button>
      </form>
      <Text>または</Text>
      <Button leftIcon={<Icon as={FcGoogle} />} onClick={loginWithGoogle}>
        Googleでログインする
      </Button>
    </Box>
  );
};

export default LogInScreen;
