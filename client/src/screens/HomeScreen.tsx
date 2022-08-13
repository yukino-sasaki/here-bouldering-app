import {
  Avatar,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Icon,
  Input,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import "focus-visible/dist/focus-visible";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Menu } from "../components/Menu";
import { Modal } from "../components/Modal";
import useFirebase from "../firebase/useFirebase";
import {
  GymDocument,
  MeDocument,
  useAddGymsMutation,
  useEditMeMutation,
  useMeQuery,
  UserInput,
  useUnregisterGymMutation,
} from "../generated/graphql";
import { useShowToast } from "../hooks/useShowToast";

type AddGymsInput = {
  name: string;
  place: string;
};

const HomeScreen = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<AddGymsInput>();
  const { register: editMeRegister, handleSubmit: editMeHandleSubmit } =
    useForm<UserInput>();

  const { logout } = useFirebase();
  const { showToast } = useShowToast();
  const [addGymsMutation] = useAddGymsMutation();
  const [editMeMutation] = useEditMeMutation();
  const [unregisterGymMutation] = useUnregisterGymMutation();
  const { data, loading, error } = useMeQuery();
  const me = data?.me;

  const createGym = useDisclosure();
  const userSetting = useDisclosure();
  const drawer = useDisclosure();

  if (loading) {
    <Box pt="5" w="100%">
      <Text fontFamily={"bold"} align="center">
        しばらくお待ちください
      </Text>
      <Spinner size="xl" mx="auto" />
    </Box>;
  }
  if (error || !me)
    return (
      <Box p="5" maxW={"60%"} mx="auto">
        <Text mb="6">
          こちらのサービスを利用するためにログインまたはサインアップをお願いいたします。
        </Text>
        <Button colorScheme={"blue"} onClick={() => navigate("/signIn")}>
          サインアップ
        </Button>
        <Button colorScheme={"blue"} onClick={() => navigate("/logIn")} ml="5">
          ログイン
        </Button>
      </Box>
    );

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
      showToast(response.data?.addGyms);
    } catch (error) {
      throw error;
    }
  };

  const editMeSubmit: SubmitHandler<UserInput> = async (data) => {
    const { nickname } = data;
    try {
      const response = await editMeMutation({
        variables: {
          input: { nickname, avatarImage },
        },
        refetchQueries: [MeDocument, GymDocument],
      });

      showToast(response.data?.editMe);
    } catch (error) {
      throw error;
    }
  };

  const onClickUnregisterGym = async (gymId: string) => {
    try {
      const response = await unregisterGymMutation({
        variables: { gymId },
        refetchQueries: [MeDocument],
      });
      showToast(response.data?.unregisterGym);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Box bg="headerBg" alignItems={"center"}>
        <Flex direction={"column"} justifyContent="space-between">
          <Flex justify="space-between" px="8">
            <Icon
              as={HiOutlineMenu}
              color="white"
              w={8}
              h={8}
              my="auto"
              onClick={drawer.onOpen}
            />
            <Text fontSize={"3xl"} color="white">
              Here!Bouldering!
            </Text>
            <Box>
              <Flex justify={"center"}>
                <Avatar bg={avatarImage} size="sm" />
              </Flex>
              <Text color="white" fontSize="sm" align="center">
                {nickname}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>

      <div className="bg-white w-full min-h-screen px-5 pt-8 relative">
        {registerGyms.length === 0 ? (
          <Text fontWeight={"bold"} fontSize="xl" align="center">
            ジムがまだ登録されていません！メニューのジムをダッシュボードに登録するから登録をするか、新規でジムの作成をお願いします！
          </Text>
        ) : (
          <Grid
            gap={5}
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(4, 1fr)",
            ]}
          >
            {registerGyms.map((registerGym, i) => {
              const { name, place, gymId } = registerGym;
              const menuItem = [
                {
                  title: "登録を解除",
                  onClick: () => onClickUnregisterGym(gymId),
                },
              ];
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
                  <Flex
                    align={"center"}
                    bg="white"
                    h="10"
                    borderBottomRadius={"md"}
                    pl="1"
                  >
                    <Text>{place}</Text>
                    <Spacer />
                    <Menu menuItem={menuItem} borderBottomRightRadius="md" />
                  </Flex>
                </GridItem>
              );
            })}
          </Grid>
        )}

        <Drawer
          placement="left"
          onClose={drawer.onClose}
          isOpen={drawer.isOpen}
          size="xs"
        >
          <div className="bg-menuBg z-50 h-screen absolute top-0 left-0">
            <DrawerCloseButton color="white" />
            <DrawerHeader color="white">メニュー</DrawerHeader>
            <DrawerBody>
              <Button
                colorScheme="white"
                isFullWidth
                onClick={userSetting.onOpen}
              >
                ユーザー名を変更する
              </Button>
              <Button
                colorScheme="white"
                isFullWidth
                onClick={createGym.onOpen}
              >
                新規でジムを作成する
              </Button>
              <Button
                colorScheme="white"
                isFullWidth
                onClick={() => navigate("/gymsList")}
              >
                ジムをダッシュボードに登録する
              </Button>
              <Button
                colorScheme="white"
                isFullWidth
                onClick={async () => {
                  try {
                    await logout();
                    // await client.resetStore();
                    navigate("/logIn");
                  } catch (error) {
                    throw error;
                  }
                }}
              >
                ログアウト
              </Button>
            </DrawerBody>
          </div>
        </Drawer>
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
        handleSubmit={editMeHandleSubmit}
        onSubmit={editMeSubmit}
      >
        <FormControl>
          <FormLabel>変更後のユーザー名</FormLabel>
          <Input
            id="nickname"
            {...editMeRegister("nickname", {
              required: "変更後のニックネームを記入してください。",
            })}
          />
        </FormControl>
      </Modal>
    </>
  );
};

export default HomeScreen;
