import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  ResponsiveValue,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Union } from "@chakra-ui/styled-system/dist/declarations/src/utils";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { MdPlace } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useGymQuery } from "../generated/graphql";

const HereDetailScreen = () => {
  const location = useLocation();
  const { gymId } = location.state as { gymId: string };

  const [value, setValue] = useState(new Date());

  const GymQueryResponse = useGymQuery({ variables: { gymId } });
  const gym = GymQueryResponse.data?.gym;
  console.log(gym);

  if (!gym) return <></>;
  const { name, place, creater, climbingUser } = gym;
  const { avatarImage, nickname } = creater;

  return (
    <div className="mx-auto">
      <Box maxW="760px" mx="auto">
        <Text my="5" fontSize="4xl">
          {name}
        </Text>
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
          if (!user) return <></>;
          const {
            nickname,
            avatarImage,
            finishClimbingTime,
            startClimbingTime,
          } = user;
          return (
            <Box>
              <Flex>
                <Avatar
                  bg={avatarImage as ResponsiveValue<Union<"current">>}
                  mr="5"
                />
                <Box>
                  <Text>{nickname}</Text>
                  <Flex>
                    <Badge colorScheme="teal" rounded="md">
                      登っています！
                    </Badge>
                    <Text>
                      {finishClimbingTime} ~ {startClimbingTime}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
              <Divider colorScheme="gray.100" mt="10px" />
            </Box>
          );
        })}
      </Box>
      <DateTimePicker onChange={setValue} value={value} />
      <Box
        pos="fixed"
        w="100%"
        h="20%"
        bottom="0"
        zIndex={2}
        borderTop="1px"
        borderColor="lightgray"
      >
        <Center h="100%">
          <Button colorScheme="blue">登る！</Button>
        </Center>
      </Box>
    </div>
  );
};

export default HereDetailScreen;
