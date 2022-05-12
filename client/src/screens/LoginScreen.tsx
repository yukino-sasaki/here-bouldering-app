import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
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
    <div className="h-screen">
      <Center w="100%" h="100%">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>メールアドレス</FormLabel>
            <Input
              placeholder="xxxxxx@gmail.com"
              variant="flushed"
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
            ログインする
          </Button>
        </form>
      </Center>
    </div>
  );
};

export default LogInScreen;
