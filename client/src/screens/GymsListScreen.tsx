import {
  Box,
  Button,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { MdPlace } from "react-icons/md";
import { CreaterBlock } from "../components/CreaterBlock";
import {
  Gym,
  MeDocument,
  MeQuery,
  MutateStatus,
  useGymsQuery,
  useRegisterGymMutation,
} from "../generated/graphql";

type MutationResponse = {
  status: MutateStatus;
  message?: string | null;
};

const GymsListScreen = () => {
  const [registerGymMutation] = useRegisterGymMutation();
  const { data } = useGymsQuery({ fetchPolicy: "network-only" });
  const gyms = data?.gyms;

  const toast = useToast();

  function showToast<T extends MutationResponse>(
    response?: T | null,
    title?: string
  ) {
    toast({
      title: title ? title : response?.message,
      status: response?.status,
      duration: 5000,
      isClosable: true,
    });
  }

  const registerGym = async (gym: Gym) => {
    try {
      const { creater, __typename, climbingUser, ...gymInput } = gym;
      const response = await registerGymMutation({
        variables: {
          GymInput: { ...gymInput },
        },
        update(cache, { data }) {
          const newRegisterGyms = data?.registerGym?.registerGyms;
          const meQuery = cache.readQuery<MeQuery>({
            query: MeDocument,
            variables: null,
          });
          const existMe = meQuery?.me;
          cache.writeQuery({
            query: MeDocument,
            data: {
              me: {
                ...existMe,
                registerGyms: newRegisterGyms,
              },
            },
          });
        },
      });

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
      } else {
        showToast(registerGym);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  if (!gyms) return <></>;
  return (
    <div className="p-5 bg-white min-h-screen">
      <Text fontSize={"2xl"} mb="10" fontWeight="bold">
        作成されたジム一覧
      </Text>
      <SimpleGrid column={1} spacing={1} maxW="600px" m="auto">
        {gyms &&
          gyms.map((gym, index) => {
            return (
              <Box
                bg="white"
                p="4"
                borderRadius="lg"
                key={index}
                mb="4"
                boxShadow="md"
              >
                <Flex justifyContent={"space-between"}>
                  <div>
                    <Flex mb="5">
                      <Text fontSize="2xl">{gym.name}</Text>
                      <Flex>
                        <Icon as={MdPlace} w={6} h={6} />
                        <Text fontSize="lg">{gym.place}</Text>
                      </Flex>
                    </Flex>
                    <CreaterBlock
                      nickname={gym?.creater.nickname}
                      avatarImage={gym.creater.avatarImage}
                    />
                  </div>
                  <Button
                    colorScheme="blue"
                    my="auto"
                    onClick={() => registerGym(gym)}
                  >
                    登録する
                  </Button>
                </Flex>
              </Box>
            );
          })}
      </SimpleGrid>
    </div>
  );
};

export default GymsListScreen;
