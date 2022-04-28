import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import "focus-visible/dist/focus-visible";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";
import {
  MeDocument,
  useAddGymsMutation,
  useMeQuery,
  useUnregisterGymMutation,
} from "../generated/graphql";

type AddGymsInput = {
  name: string;
  place: string;
};

const HomeScreen = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<AddGymsInput>();

  const [addGymsMutation] = useAddGymsMutation();
  const [unregisterGymMutation] = useUnregisterGymMutation();
  const { data, loading, error } = useMeQuery();
  const me = data?.me;
  console.log(data);

  const createGym = useDisclosure();
  const userSetting = useDisclosure();

  if (loading || error)
    return (
      <div>
        loading:{loading}, error: {error}
        情報を取得できませんでした。お手数ですが、再読み込みかもう一度サインインをし直してください
      </div>
    );
  if (!me) return <div>me is null</div>;

  const { userId, nickname, avatarImage, registerGyms } = me;

  const addGymsSubmit: SubmitHandler<AddGymsInput> = async (data) => {
    const { name, place } = data;
    try {
      const response = await addGymsMutation({
        variables: {
          name,
          place,
          CreaterInput: {
            userId,
            nickname,
            avatarImage,
          },
        },
      });
      console.log(response);
    } catch (error) {
      throw console.log(error);
    }
  };

  const onClickUnregisterGym = async (gymId: string) => {
    try {
      const response = await unregisterGymMutation({
        variables: { gymId },
        refetchQueries: [MeDocument],
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
          <Button
            colorScheme="white"
            isFullWidth
            onClick={() => navigate("/gymsList")}
          >
            ジムをダッシュボードに登録する
          </Button>
        </div>
        <div className="bg-white w-4/5 px-5 pt-8">
          <Grid gap={5} templateColumns="repeat(4, 1fr)">
            {registerGyms &&
              registerGyms.map((registerGym, i) => {
                if (!registerGym) return <></>;
                const { name, place, gymId } = registerGym;
                return gymId === "" ? (
                  <GridItem
                    w="100%"
                    h="28"
                    bg="white"
                    borderRadius="md"
                    boxShadow="md"
                    key={i}
                  >
                    <Center w="100%" bg="gray.500" h="20" borderTopRadius="md">
                      <Text color="whiteAlpha.300">
                        このジムは作成者によって削除されました
                      </Text>
                    </Center>
                  </GridItem>
                ) : (
                  <GridItem
                    w="100%"
                    h="28"
                    bg="white"
                    borderRadius="md"
                    boxShadow="md"
                    key={i}
                  >
                    <Center
                      w="100%"
                      bg="blue.500"
                      h="20"
                      borderTopRadius="md"
                      onClick={() => navigate("/detail", { state: { gymId } })}
                    >
                      <div className="text-white text-2xl">{name}</div>
                    </Center>
                    <Flex>
                      <div className="px-3 leading-8">{place}</div>
                      <Spacer />
                      <Menu>
                        <MenuButton as={Button}>
                          <BsThreeDotsVertical />
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={() => onClickUnregisterGym(gymId)}>
                            登録を解除
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
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
        handleSubmit={handleSubmit}
        onSubmit={addGymsSubmit}
      >
        <FormControl>
          <FormLabel>ジムの名前</FormLabel>
          <Input
            id="name"
            {...register("name", {
              required: "This is required",
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>ジムの場所</FormLabel>
          <Input
            id="place"
            {...register("place", {
              required: "This is required",
            })}
          />
        </FormControl>
      </Modal>

      <Modal
        isOpen={userSetting.isOpen}
        onClose={userSetting.onClose}
        header={"ユーザー名を変更する"}
        submit="変更する"
        // templary
        handleSubmit={handleSubmit}
        onSubmit={addGymsSubmit}
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
