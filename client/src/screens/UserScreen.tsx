import { Avatar, Button, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../generated/graphql";

type UserFormValue = {
  nickname: string;
};

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <Button disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      <FaChevronLeft />
    </Button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <Button disabled={isLastItemVisible} onClick={() => scrollNext()}>
      <FaChevronRight />
    </Button>
  );
}

const UserScreen = () => {
  const navigate = useNavigate();
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
        throw new Error("アイコンを選択してください");
      }
      console.log(nickname, selectAvatarImage);
      const response = await createUserMutation({
        variables: {
          nickname,
          avatarImage: selectAvatarImage,
        },
      });
      console.log("res", response);

      navigate("/");
    } catch (error) {
      console.log(error);
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
    <div className="w-72 h-80 m-auto">
      <Text fontWeight={"bold"} my={["20px", "36px"]} fontSize="2xl">
        プロフィール設定
      </Text>
      <Text my="12px">アイコンを選択してください</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {avatarBg.map((bg, i) => (
            <Avatar
              key={i}
              bg={bg}
              size="2xl"
              mr="4"
              borderColor={selectAvatarImage === bg ? "blue.200" : undefined}
              borderWidth={selectAvatarImage === bg ? "4px" : undefined}
              onClick={() => setSelectAvatarImage(bg)}
            />
          ))}
        </ScrollMenu>
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
    </div>
  );
};

export default UserScreen;
