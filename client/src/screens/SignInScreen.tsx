import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useFirebase from "../useFirebase";

type FormData = {
  email: string;
  password: string;
};

const SignInScreen = () => {
  // TODO: google login is not practiced. it's not function
  const { registerUser, handleSignIn } = useFirebase();

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
    <>
      <div>sign in</div>
      <Button onClick={handleSignIn}>googleでサインインする</Button>
      <Button>メールアドレスでサインインする</Button>
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
          Submit
        </Button>
      </form>
    </>
  );
};

export default SignInScreen;
