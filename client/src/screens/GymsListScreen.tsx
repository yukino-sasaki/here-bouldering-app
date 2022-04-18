import {
  Avatar,
  Box,
  Button,
  ResponsiveValue,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Union } from "@chakra-ui/styled-system/dist/declarations/src/utils";
import React from "react";
import { MdPlace } from "react-icons/md";
import {
  Gym,
  MeDocument,
  useGymsQuery,
  useRegisterGymMutation,
} from "../generated/graphql";

const GymsListScreen = () => {
  const [registerGymMutation] = useRegisterGymMutation();
  const { data } = useGymsQuery({ fetchPolicy: "network-only" });
  const gyms = data?.gyms;

  const toast = useToast();
  console.log(gyms);

  const registerGym = async (gym: Gym) => {
    try {
      const { creater, __typename, ...gymInput } = gym;
      const response = await registerGymMutation({
        variables: {
          GymInput: { ...gymInput },
        },
        update(cache, { data }) {
          const newRegisterGyms = data?.registerGym?.me;
          cache.writeQuery({
            query: MeDocument,
            data: {
              me: newRegisterGyms,
            },
          });
        },
      });

      console.log("register gym!", response.data);

      const { errors, data } = response;
      const registerGym = data?.registerGym;

      if (errors) {
        toast({
          title: "エラーが発生しました",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        throw new Error(`${errors}`);
      } else if (registerGym?.success) {
        toast({
          title: "ジムを登録しました",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else if (registerGym?.statusMessage) {
        toast({
          title: `${registerGym?.statusMessage}`,
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  if (!gyms) return <></>;
  return (
    <div className="p-5 bg-white h-screen">
      <SimpleGrid column={1} spacing={1} maxW="600px" m="auto">
        {gyms &&
          gyms.map((gym, index) => {
            return (
              <div key={index}>
                <Box bg="white" height="112px" p="2" borderRadius="md">
                  <div className="flex justify-between h-27">
                    <div>
                      <div className="flex flex-rwo justify-start">
                        <Text fontSize="4xl">{gym.name}</Text>
                        <div className="flex flex-row justify-start">
                          <MdPlace />
                          <Text fontSize="lg">{gym.place}</Text>
                        </div>
                      </div>
                      <div className="flex flex-row items-end">
                        <Text>作成者:</Text>
                        <Avatar
                          bg={
                            gym.creater.avatarImage as ResponsiveValue<
                              Union<"current">
                            >
                          }
                          size="sm"
                        />
                        <Text>{gym?.creater.nickname}</Text>
                      </div>
                    </div>
                    <Button
                      colorScheme="blue"
                      my="auto"
                      onClick={() => registerGym(gym)}
                    >
                      登録する
                    </Button>
                  </div>
                </Box>
              </div>
            );
          })}
      </SimpleGrid>
    </div>
  );
};

export default GymsListScreen;
