import {
  Box,
  Button,
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
  console.log(gyms);

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
          const existRegisterGyms = existMe?.registerGyms ?? [];
          console.log("exist", meQuery);
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
      } else {
        showToast(registerGym);
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
              <Box key={index}>
                <Box bg="white" height="112px" p="2" borderRadius="md">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex-row justify-start">
                        <Text fontSize="4xl">{gym.name}</Text>
                        <div className="flex flex-row justify-start">
                          <Icon as={MdPlace} w={6} h={6} />
                          <Text fontSize="lg">{gym.place}</Text>
                        </div>
                      </div>
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
                  </div>
                </Box>
              </Box>
            );
          })}
      </SimpleGrid>
    </div>
  );
};

export default GymsListScreen;
