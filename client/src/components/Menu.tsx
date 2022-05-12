import {
  Button,
  Menu as MenuRNE,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

type Props = {
  onClick: () => void;
  menuItem: string;
};

export const Menu: React.FC<Props> = ({ onClick, menuItem }) => {
  return (
    <MenuRNE>
      <MenuButton as={Button}>
        <BsThreeDotsVertical />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={onClick}>{menuItem}</MenuItem>
      </MenuList>
    </MenuRNE>
  );
};
