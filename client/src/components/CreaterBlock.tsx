import { Avatar, Center, Flex, ResponsiveValue, Text } from "@chakra-ui/react";
import { Union } from "@chakra-ui/styled-system/dist/declarations/src/utils";
import React from "react";
import { CreaterInput } from "../generated/graphql";

type Props = Partial<CreaterInput>;
export const CreaterBlock: React.FC<Props> = ({ nickname, avatarImage }) => {
  return (
    <Flex>
      <Center h="32px">
        <Text>作成者:</Text>
      </Center>
      <Avatar
        bg={avatarImage as ResponsiveValue<Union<"current">>}
        size="sm"
        mx="2"
      />
      <Center h="32px">
        <Text>{nickname}</Text>
      </Center>
    </Flex>
  );
};
