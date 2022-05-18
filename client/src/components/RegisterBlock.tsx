import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Props = {
  navigatePass: "/signIn" | "/logIn";
  register: UseFormRegister<FormData>;
};

type FormData = {
  email: string;
  password: string;
};

export const RegisterBlock: React.FC<Props> = ({ navigatePass, register }) => {
  const navigate = useNavigate();

  return (
    <>
      <FormControl>
        <FormLabel mt="12px">メールアドレス</FormLabel>
        <Input
          placeholder="xxxxxx@gmail.com"
          variant="flushed"
          {...register("email", {
            required: "This is required",
          })}
        />
      </FormControl>
      <FormControl>
        <FormLabel mt="12px">パスワード</FormLabel>
        <Input
          placeholder="password"
          variant="flushed"
          {...register("password", {
            required: "This is required",
          })}
        />
      </FormControl>
      <Text
        _hover={{ color: "blue.300", borderBottomColor: "blue.300" }}
        color="blue.400"
        mt="20px"
        w="128px"
        cursor="pointer"
        fontSize="xs"
        borderBottom="1px"
        borderBottomColor={"blue.400"}
        onClick={() => navigate(navigatePass)}
      >
        {navigatePass === "/signIn"
          ? "新規登録はこちらから"
          : "ログインはこちらから"}
      </Text>
    </>
  );
};
