import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { MdPlace } from "react-icons/md";

type Props = {
  place: string;
};
export const PlaceBlock: React.FC<Props> = ({ place }) => {
  return (
    <Flex my="auto">
      <Icon as={MdPlace} w={8} h={8} />
      <Text fontSize={"lg"}>{place}</Text>
    </Flex>
  );
};
