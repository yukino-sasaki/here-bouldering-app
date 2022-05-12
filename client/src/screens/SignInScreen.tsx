import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useFirebase from "../useFirebase";

type FormData = {
  email: string;
  password: string;
};

const SignInScreen = () => {
  // TODO: google login is not practiced. it's not function
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
    <Box maxW={"60%"} m="auto">
      <Button>メールアドレスでサインインする</Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            variant="flushed"
            placeholder="xxxxxx@gmail.com"
            {...register("email", {
              required: "This is required",
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>パスワード</FormLabel>
          <Input
            placeholder="password"
            variant="flushed"
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
          サインインする
        </Button>
      </form>
    </Box>
  );
};

export default SignInScreen;
