import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ResponsiveValue,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Union } from "@chakra-ui/styled-system/dist/declarations/src/utils";
import { format } from "date-fns";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { CreaterBlock } from "../components/CreaterBlock";
import { Menu } from "../components/Menu";
import { PlaceBlock } from "../components/PlaceBlock";
import { Popover } from "../components/Popover";
import {
  GymDocument,
  MeDocument,
  RegisterClimbingUserInput,
  useAddClimbingUserMutation,
  useEditClimbingUserMutation,
  useGymQuery,
  useMeQuery,
  useRemoveClimbingUserMutation,
  useRemoveGymMutation,
} from "../generated/graphql";
import { useShowToast } from "../hooks/useShowToast";

const HereDetailScreen = () => {
  const location = useLocation();
  const { showToast } = useShowToast();
  const { gymId } = location.state as { gymId: string };
  const nowDateTime = new Date();
  const now = nowDateTime.getHours() * 3600 + nowDateTime.getMinutes() * 60;

  const [startTime, setStartTime] = useState<string>(
    format(nowDateTime, "HH:mm")
  );
  const [finishTime, setFinishTime] = useState<string>(
    format(nowDateTime, "HH:mm")
  );
  const [climbingId, setClimbingId] = useState<string>();
  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit } = useForm<RegisterClimbingUserInput>();

  const { onOpen, onClose, isOpen } = useDisclosure();

  const [removeGymMutation] = useRemoveGymMutation();
  const [editClimbingUserMutation] = useEditClimbingUserMutation();
  const [addClimbingUserMutation] = useAddClimbingUserMutation();
  const [removeClimbingUserMutation] = useRemoveClimbingUserMutation();
  const meQuery = useMeQuery();
  const GymQueryResponse = useGymQuery({ variables: { gymId } });
  const gym = GymQueryResponse.data?.gym;
  const me = meQuery.data?.me;

  if (!me) return <></>;
  if (!gym)
    return (
      <Text fontWeight={"bold"} fontSize="xl" align="center">
        このジムは作成者によって削除されました。ダッシュボードから登録解除をしてください。
      </Text>
    );
  const { name, place, creater, climbingUser } = gym;
  const { avatarImage, nickname } = creater;

  const compareTime = (value: string) => {
    let hour_min = value.split(":");
    const hour = Number(hour_min[0]);
    const min = Number(hour_min[1]);
    return hour * 3600 + min * 60;
  };

  const calcTime = (time: string) => {
    return new Date(time).getHours() * 3600 + new Date(time).getMinutes() * 60;
  };

  const findMe = gym.climbingUser?.find((user) => {
    if (user?.finishClimbingTime) {
      return (
        calcTime(user.finishClimbingTime) > now &&
        user?.startClimbingTime &&
        user?.userId === me.userId
      );
    } else {
      return false;
    }
  });

  const today = nowDateTime.toISOString();
  const climbingTimeInput = (climbingTime: string) =>
    today.slice(0, 11) + `${climbingTime}:00.000+09:00`;

  const onSubmit: SubmitHandler<RegisterClimbingUserInput> = async (data) => {
    const { startClimbingTime, finishClimbingTime } = data;

    if (findMe && isEdit) {
      const response = await editClimbingUserMutation({
        variables: {
          input: {
            gymId,
            climbingId,
            startClimbingTime: climbingTimeInput(startClimbingTime),
            finishClimbingTime: climbingTimeInput(finishClimbingTime),
          },
        },
        refetchQueries: [GymDocument],
      });
      showToast(response.data?.editClimbingUser);
    } else {
      const response = await addClimbingUserMutation({
        variables: {
          input: {
            gymId,
            name,
            startClimbingTime: climbingTimeInput(startClimbingTime),
            finishClimbingTime: climbingTimeInput(finishClimbingTime),
            nickname: me.nickname,
            avatarImage: me.avatarImage,
            userId: me.userId,
          },
        },
        refetchQueries: [GymDocument],
      });

      showToast(response.data?.addClimbingUser);
    }
  };

  const onClickRemoveGym = async () => {
    try {
      const response = await removeGymMutation({
        variables: { gymId },
        refetchQueries: [GymDocument, MeDocument],
      });
      console.log(response);
    } catch (error) {
      throw error;
    }
  };

  const onClickRemoveClimbingUser = async (climbingId: string) => {
    try {
      const response = await removeClimbingUserMutation({
        variables: {
          climbingId,
        },
        refetchQueries: [GymDocument],
      });
      showToast(response.data?.removeClimbingUser);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const changeBadge = (
    startTime?: string | null,
    finishTime?: string | null
  ) => {
    if (!startTime || !finishTime) return null;
    const start = calcTime(startTime);
    const finish = calcTime(finishTime);

    if (now >= start && now <= finish) {
      return { color: "teal", message: "登っています！" };
    } else if (now < start) {
      return { color: "orange", message: "これから登る予定" };
    } else if (now > finish) {
      return { color: "purple", message: "帰宅" };
    } else return null;
  };

  if (meQuery.loading)
    return (
      <Box pt="5" w="100%">
        <Text fontFamily={"bold"} align="center">
          しばらくお待ちください
        </Text>
        <Spinner size="xl" mx="auto" />
      </Box>
    );

  return (
    <Box mx="auto" p="5">
      <Box maxW="760px" mx="auto" pb="50">
        <Flex>
          <Text my="5" fontSize="4xl">
            {name}
          </Text>
          <Spacer />
          {me.userId === creater.userId && (
            <Popover
              icon={FaTrashAlt}
              onClick={onClickRemoveGym}
              body="作成したジムを削除します。取り消せません。よろしいですか？"
              header="ジムを削除"
              color="red.700"
              w={6}
              h={6}
              my="auto"
            />
          )}
        </Flex>
        <Flex>
          <PlaceBlock place={place} />
          <Spacer />
          <CreaterBlock nickname={nickname} avatarImage={avatarImage} />
        </Flex>
        <Divider colorScheme="darkgray" mb="5" mt="2" />
        <Text my="20px">登録をしている人</Text>
        <Box overflow={"auto"} h={`${window.innerHeight - 335}px`}>
          {climbingUser?.map((user, index) => {
            if (!user || !user?.finishClimbingTime || !user.startClimbingTime)
              return null;
            const {
              nickname,
              avatarImage,
              finishClimbingTime,
              startClimbingTime,
              climbingId,
            } = user;

            const menuItem = [
              {
                title: "この予定を編集する",
                onClick: () => {
                  setClimbingId(climbingId);
                  setIsEdit(true);
                  onOpen();
                },
              },
              {
                title: "この予定を削除する",
                onClick: () => onClickRemoveClimbingUser(climbingId),
              },
            ];

            const ISOtoHourMin = (time?: string | null) => {
              if (!time) return null;
              const dt = new Date(time);
              return format(dt, "HH:mm");
            };
            return (
              <Box key={index} mb="4" onClick={() => setClimbingId(climbingId)}>
                <Flex>
                  <Avatar
                    bg={avatarImage as ResponsiveValue<Union<"current">>}
                    mr="5"
                  />
                  <Box>
                    <Text>{nickname}</Text>
                    <Flex>
                      <Badge
                        colorScheme={
                          changeBadge(startClimbingTime, finishClimbingTime)
                            ?.color
                        }
                        rounded="md"
                        py="auto"
                      >
                        {
                          changeBadge(startClimbingTime, finishClimbingTime)
                            ?.message
                        }
                      </Badge>
                      <Text>
                        {ISOtoHourMin(startClimbingTime)} ~
                        {ISOtoHourMin(finishClimbingTime)}
                      </Text>
                    </Flex>
                  </Box>
                  <Spacer />
                  <Menu menuItem={menuItem} />
                </Flex>
                <Divider color="#CBD5E0" mt="10px" />
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        pos="fixed"
        w="100%"
        h="20%"
        bottom="0"
        zIndex={2}
        borderTop="1px"
        borderColor="lightgray"
        bg={"white"}
      >
        <Center h="100%">
          <Button
            colorScheme="blue"
            onClick={() => {
              setIsEdit(false);
              onOpen();
            }}
          >
            登る予定を追加する
          </Button>
        </Center>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            本日登り始める時間帯と帰る時間帯を入力してください
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Flex>
                <Input
                  type="time"
                  defaultValue={format(new Date(), "HH:mm")}
                  {...register("startClimbingTime", {
                    required: "この項目は必須です！",
                  })}
                  onChange={(e) => setStartTime(e.target.value)}
                  w="160px"
                  max="23:59"
                  min={format(new Date(), "HH:mm")}
                />
                <Spacer />
                <Text>~</Text>
                <Spacer />
                <Box>
                  <Input
                    type="time"
                    defaultValue={format(new Date(), "HH:mm")}
                    max="23:59"
                    {...register("finishClimbingTime", {
                      required: "この項目は必須です！",
                    })}
                    onChange={(e) => setFinishTime(e.target.value)}
                    w="160px"
                  />
                </Box>
              </Flex>
              {compareTime(startTime) > compareTime(finishTime) && (
                <Text color="red">
                  登り始めの時間は終わりの時間よりも前に設定してください！
                </Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                この時間帯に登る！
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HereDetailScreen;
