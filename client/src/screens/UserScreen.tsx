import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../generated/graphql";

type UserFormValue = {
  nickname: string;
};

const UserScreen = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [selectAvatarImage, setSelectAvatarImage] = useState<
    string | undefined
  >();

  const [createUserMutation] = useCreateUserMutation();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<UserFormValue>();

  const onSubmit: SubmitHandler<UserFormValue> = async (data) => {
    const { nickname } = data;

    try {
      if (!selectAvatarImage) {
        toast({
          title: "アイコンを選択してください",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await createUserMutation({
          variables: {
            nickname,
            avatarImage: selectAvatarImage,
          },
        });

        navigate("/");
      }
    } catch (error) {
      throw error;
    }
  };

  const avatarBg = [
    "teal.500",
    "red.500",
    "orange.500",
    "yellow.500",
    "green.500",
    "blue.500",
    "cyan.500",
    "purple.500",
    "pink.500",
  ];
  return (
    <Box maxW={["100%", "60%"]} m="auto">
      <Text fontWeight={"bold"} my={["20px", "36px"]} fontSize="2xl">
        プロフィール設定
      </Text>
      <Text my="12px">
        アイコンを選択してください（横にスクロールできます）
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex justify="center" alignItems={"center"}>
          <Icon as={FaChevronLeft} />
          <Box w="360px">
            <ScrollMenu>
              {avatarBg.map((bg, i) => (
                <Avatar
                  key={i}
                  bg={bg}
                  size="2xl"
                  mr="4"
                  borderColor={
                    selectAvatarImage === bg ? "blue.200" : undefined
                  }
                  borderWidth={selectAvatarImage === bg ? "4px" : undefined}
                  onClick={() => setSelectAvatarImage(bg)}
                />
              ))}
            </ScrollMenu>
          </Box>
          <Icon as={FaChevronRight} />
        </Flex>
        <FormLabel mt="36px" mb="12px">
          ニックネームを入れてください
        </FormLabel>
        <Input
          id="nickname"
          {...register("nickname", {
            required: "ニックネームは必須です！",
          })}
        />
        <Button
          type="submit"
          isLoading={isSubmitting}
          colorScheme="blue"
          mt="20px"
        >
          ユーザーを作成する
        </Button>
      </form>
    </Box>
  );
};

export default UserScreen;
