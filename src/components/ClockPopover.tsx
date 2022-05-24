import {
  Popover,
  PopoverTrigger as OrigPopoverTrigger,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Image,
  Flex,
} from "@chakra-ui/react";
import React from "react";

export const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

const ClockPopover = () => {
  return (
    <Popover placement="bottom" closeOnBlur={true} autoFocus={false} closeOnEsc>
      <PopoverTrigger>
        <Image
          alt="clock"
          width={["60px", "60px", "80px", "80px"]}
          height={["60px", "60px", "80px", "80px"]}
          borderRadius="10px"
          backgroundSize="contain"
          src="/clock.png"
          cursor="pointer"
          bgRepeat="no-repeat"
          _hover={{
            transform: "rotate(-3deg)",
          }}
        />
      </PopoverTrigger>
      <PopoverContent
        color="white"
        bg="purple.500"
        borderColor="purple.400"
      >
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Choose a time for reminder!
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          A mail will be sent out about the task you chose.
          <Flex flexDirection="row" gap="1rem" mt="1rem">
            <Button
              variant="outline"
              _hover={{
                backgroundColor: "purple.600",
              }}
            >
              1 Hour
            </Button>
            <Button
              variant="outline"
              _hover={{
                backgroundColor: "purple.600",
              }}
            >
              2 Hour
            </Button>
            <Button
              variant="outline"
              _hover={{
                backgroundColor: "purple.600",
              }}
            >
              3 Hour
            </Button>
            <Button
              variant="outline"
              _hover={{
                backgroundColor: "purple.600",
              }}
            >
              4 Hour
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ClockPopover;
