import {
  Button,
  Icon,
  Menu as MenuBlock,
  MenuButton,
  MenuItem,
  MenuList,
  StyleProps,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

type Props = {
  menuItem: {
    onClick: () => void;
    title: string;
  }[];
} & StyleProps;

export const Menu: React.FC<Props> = (props) => {
  const { menuItem, ...styleProps } = props;
  return (
    <MenuBlock>
      <MenuButton as={Button} bg="white">
        <Icon as={BsThreeDotsVertical} {...styleProps} />
      </MenuButton>
      <MenuList>
        {menuItem.map(({ title, onClick }, index) => {
          return (
            <MenuItem key={index} onClick={onClick}>
              {title}
            </MenuItem>
          );
        })}
      </MenuList>
    </MenuBlock>
  );
};
