import { Center } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useGymQuery } from "../generated/graphql";

const HereDetailScreen = () => {
  const location = useLocation();
  const { gymId } = location.state as { gymId: string };

  const { data } = useGymQuery({ variables: { gymId } });
  console.log(data);
  return (
    <div className="mx-auto">
      <Center
        w="100%"
        h="40"
        borderWidth="1px"
        borderRadius="lg"
        color="white"
        bg="blue.500"
        maxW="lg"
      >
        <div>detail screen</div>
      </Center>
    </div>
  );
};

export default HereDetailScreen;
