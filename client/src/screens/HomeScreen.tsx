import {
  Avatar,
  Button,
  Center,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import "focus-visible/dist/focus-visible";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";
import { gym } from "../dummy";
import { useMeQuery } from "../generated/graphql";

const HomeScreen = () => {
  const navigate = useNavigate();

  const { data } = useMeQuery();
  const me = data?.me;

  const createGym = useDisclosure();
  const userSetting = useDisclosure();

  const navigatePage = () => {
    // wish to navigate each id. it's tentative
    navigate("/detail");
  };
  if (!me)
    return (
      <div>
        情報を取得できませんでした。お手数ですが、再読み込みかもう一度サインインをし直してください
      </div>
    );
  const { avatarImage, nickname } = me;
  return (
    <>
      <div className="bg-darkgray flex-col justify-between h-16 flex">
        <div className="flex flex-row justify-between px-8">
          <h2 className="text-3xl text-white h-9 my-auto">Here!Bouldering!</h2>
          <div className="w-28">
            <div className="flex flex-row justify-center">
              <Avatar bg={avatarImage} size="sm" />
            </div>
            <Text color="white" fontSize="sm" align="center">
              {nickname}
            </Text>
          </div>
        </div>
      </div>
      <div className="flex h-full">
        <div className="bg-gray w-1/5 h-screen">
          <Button colorScheme="white" isFullWidth onClick={userSetting.onOpen}>
            ユーザー名を変更する
          </Button>
          <Button colorScheme="white" isFullWidth onClick={createGym.onOpen}>
            新規でジムを作成する
          </Button>
        </div>
        <div className="bg-white w-4/5 px-5 pt-8">
          <Grid gap={5} templateColumns="repeat(4, 1fr)">
            {gym.map(({ name, place }, i) => {
              return (
                <GridItem
                  w="100%"
                  h="28"
                  bg="white"
                  borderRadius="md"
                  boxShadow="md"
                  onClick={navigatePage}
                  key={i}
                >
                  <Center w="100%" bg="blue.500" h="20" borderTopRadius="md">
                    <div className="text-white text-2xl">{name}</div>
                  </Center>
                  <div className="px-3 leading-8">{place}</div>
                </GridItem>
              );
            })}
          </Grid>
        </div>
      </div>

      <Modal
        isOpen={createGym.isOpen}
        onClose={createGym.onClose}
        header="ジムを新規作成する"
        submit="作成する"
      >
        <FormControl>
          <FormLabel>ジムの名前</FormLabel>
          <Input />
        </FormControl>
        <FormControl>
          <FormLabel>ジムの場所</FormLabel>
          <Input />
        </FormControl>
      </Modal>

      <Modal
        isOpen={userSetting.isOpen}
        onClose={userSetting.onClose}
        header={"ユーザー名を変更する"}
        submit="変更する"
      >
        <FormControl>
          <FormLabel>変更後のユーザー名</FormLabel>
          <Input />
        </FormControl>
      </Modal>
    </>
  );
};

export default HomeScreen;
