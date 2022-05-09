import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useFirebase from "../useFirebase";

type FormData = {
  email: string;
  password: string;
};

const LogInScreen = () => {
  const { login } = useFirebase();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = (value: { email: string; password: string }) => {
    const { email, password } = value;
    login(email, password);
  };
  return (
    <Box maxW={"60%"} mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            {...register("email", {
              required: "This is required",
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>パスワード</FormLabel>
          <Input
            {...register("password", {
              required: "This is required",
            })}
          />
        </FormControl>
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
