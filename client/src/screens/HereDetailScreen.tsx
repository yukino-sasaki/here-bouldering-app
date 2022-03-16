import { Box, Center, Divider } from "@chakra-ui/react";
import { gymInformation } from "../dummy";

const HereDetailScreen = () => {
  const { name, creater, member } = gymInformation;
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
        {name}
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
