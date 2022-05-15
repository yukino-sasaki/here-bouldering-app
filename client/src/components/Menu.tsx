import {
  Button,
  Menu as MenuBlock,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

type Props = {
  menuItem: {
    onClick: () => void;
    title: string;
  }[];
};

export const Menu: React.FC<Props> = ({ menuItem }) => {
  return (
    <MenuBlock>
      <MenuButton as={Button}>
        <BsThreeDotsVertical />
      </MenuButton>
      {menuItem.map(({ title, onClick }, index) => {
        return (
          <MenuList key={index}>
            <MenuItem onClick={onClick}>{title}</MenuItem>
          </MenuList>
        );
      })}
    </MenuBlock>
  );
};
