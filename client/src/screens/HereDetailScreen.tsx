import { Center, Divider } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useGymQuery } from "../generated/graphql";

const HereDetailScreen = () => {
  const location = useLocation();
  const { gymId } = location.state as { gymId: string };

  const GymQueryResponse = useGymQuery({ variables: { gymId } });
  const gym = GymQueryResponse.data?.gym;

  return (
    <div className="mx-auto">
      <div>detail screen</div>
      <Center
        w="100%"
        h="40"
        borderWidth="1px"
        borderRadius="lg"
        color="white"
        maxW="lg"
      >
<<<<<<< Updated upstream
        {name}
=======
        <div>detail screen</div>
        <Divider />
>>>>>>> Stashed changes
      </Center>
      {member.map((member, index) => {
        return (
          <>
            <Box>{member}</Box>
            <Divider />
          </>
        );
      })}
    </div>
  );
};

export default HereDetailScreen;
