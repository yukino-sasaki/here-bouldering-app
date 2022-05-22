import {
  Button,
  forwardRef,
  Icon,
  IconButton,
  IconButtonProps,
  Popover as PopoverElement,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  StyleProps,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  onClick: () => void;
  header: string;
  body: string;
} & StyleProps;

const PopoverIcon = forwardRef<IconButtonProps, "button">((props, ref) => {
  return <IconButton ref={ref} {...props} />;
});

export const Popover: React.FC<Props> = (props) => {
  const { icon, onClick, header, body, ...styleProps } = props;

  return (
    <PopoverElement placement="bottom-end" closeOnBlur={true}>
      <PopoverTrigger>
        <PopoverIcon
          icon={<Icon as={icon} />}
          aria-label="remove or unregister gym"
          bg="white"
          {...styleProps}
        />
      </PopoverTrigger>
      <PopoverContent borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          {header}
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>{body}</PopoverBody>
        <PopoverFooter>
          <Button colorScheme="blue" onClick={onClick}>
            OK
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </PopoverElement>
  );
};
