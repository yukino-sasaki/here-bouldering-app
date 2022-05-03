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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Union } from "@chakra-ui/styled-system/dist/declarations/src/utils";
import { format } from "date-fns";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { useLocation } from "react-router-dom";
import {
  GymDocument,
  MeDocument,
  RegisterClimbingUserInput,
  useAddClimbingUserMutation,
  useGymQuery,
  useMeQuery,
  useRemoveGymMutation,
} from "../generated/graphql";
import { useShowToast } from "../hooks/useShowToast";

const HereDetailScreen = () => {
  const location = useLocation();
  const { showToast } = useShowToast();
  const { gymId } = location.state as { gymId: string };
  const nowDateTime = new Date();

  const [startTime, setStartTime] = useState<string>(
    format(nowDateTime, "HH:mm")
  );
  const [finishTime, setFinishTime] = useState<string>(
    format(nowDateTime, "HH:mm")
  );

  const { register, handleSubmit } = useForm<RegisterClimbingUserInput>();

  const { onOpen, onClose, isOpen } = useDisclosure();

  const [removeGymMutation] = useRemoveGymMutation();
  const [addClimbingUserMutation] = useAddClimbingUserMutation();
  const meQuery = useMeQuery();
  const GymQueryResponse = useGymQuery({ variables: { gymId } });
  const gym = GymQueryResponse.data?.gym;
  const me = meQuery.data?.me;

  if (!me) return <></>;
  if (!gym) return <Text>このジムは作成者によって削除されました</Text>;
  const { name, place, creater, climbingUser } = gym;
  const { avatarImage, nickname } = creater;

  const compareTime = (value: string) => {
    let hour_min = value.split(":");
    const hour = Number(hour_min[0]);
    const min = Number(hour_min[1]);
    return hour * 3600 + min * 60;
  };

  const onSubmit: SubmitHandler<RegisterClimbingUserInput> = async (data) => {
    const { startClimbingTime, finishClimbingTime } = data;
    console.log(data);

    const today = new Date().toISOString();
    const startClimbingTimeInput =
      today.slice(0, 11) + `${startClimbingTime}:00.000+09:00`;
    const finishClimbingTimeInput =
      today.slice(0, 11) + `${finishClimbingTime}:00.000+09:00`;
    const response = await addClimbingUserMutation({
      variables: {
        input: {
          gymId,
          name,
          finishClimbingTime: finishClimbingTimeInput,
          startClimbingTime: startClimbingTimeInput,
          nickname: me.nickname,
          avatarImage: me.avatarImage,
          userId: me.userId,
        },
      },
      refetchQueries: [GymDocument],
    });

    showToast(response.data?.addClimbingUser);
  };

  const onClickRemoveGym = async () => {
    try {
      const response = await removeGymMutation({
        variables: { gymId },
        refetchQueries: [GymDocument, MeDocument],
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const changeBadge = (
    startTime?: string | null,
    finishTime?: string | null
  ) => {
    if (!startTime || !finishTime) return null;
    const start =
      new Date(startTime).getHours() * 3600 +
      new Date(startTime).getMinutes() * 60;
    const finish =
      new Date(finishTime).getHours() * 3600 +
      new Date(finishTime).getMinutes() * 60;
    const now = nowDateTime.getHours() * 3600 + nowDateTime.getMinutes() * 60;

    if (now >= start && now <= finish) {
      return { color: "teal", message: "登っています！" };
    } else if (now < start) {
      return { color: "orange", message: "これから登る予定" };
    } else if (now > finish) {
      return { color: "purple", message: "帰宅" };
    } else return null;
  };

  const findMe = gym.climbingUser?.find(
    (user) => user?.startClimbingTime && user?.userId === me.userId
  );

  return (
    <div className="mx-auto">
      <Box maxW="760px" mx="auto">
        <Flex>
          <Text my="5" fontSize="4xl">
            {name}
          </Text>
          <Spacer />
          <FaTrashAlt onClick={onClickRemoveGym} />
        </Flex>
        <Flex>
          <Flex>
            <MdPlace />
            <Text>{place}</Text>
          </Flex>
          <Spacer />
          <Text>作成者:</Text>
          <Avatar bg={avatarImage as ResponsiveValue<Union<"current">>} />
          <Text>{nickname}</Text>
        </Flex>
        <Divider colorScheme="darkgray" mb="20px" />
        <Text my="20px">登録をしている人</Text>
        {climbingUser?.map((user, index) => {
          if (!user || !user?.finishClimbingTime || !user.startClimbingTime)
            return <></>;
          const {
            nickname,
            avatarImage,
            finishClimbingTime,
            startClimbingTime,
          } = user;
          const ISOtoHourMin = (time?: string | null) => {
            if (!time) return null;
            const dt = new Date(time);
            return format(dt, "HH:mm");
          };
          return (
            <Box key={index}>
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
              </Flex>
              <Divider colorScheme="gray.100" mt="10px" />
            </Box>
          );
        })}
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
          <Button colorScheme="blue" onClick={onOpen}>
            {findMe ? "登る時間帯を変更する" : "登る！"}
          </Button>
        </Center>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            本日登り始める時間帯と帰る時間帯を入力してください！
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
                  <Text>or</Text>
                  <Button colorScheme="blue">時間指定なし</Button>
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
              {findMe && (
                <Button colorScheme="red">今日はもう登らない！</Button>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default HereDetailScreen;
