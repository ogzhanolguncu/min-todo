import { Box, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  content: string;
  date: string;
  priorityColor: string;
  isCompleted?: boolean;
};

export const TodoItem = ({
  content,
  date,
  priorityColor,
  isCompleted = false,
}: Props) => {
  return (
    <Flex align="center" gap="1rem">
      <Flex flexDirection="column">
        <Text
          fontSize="2xl"
          noOfLines={1}
          textDecorationLine={isCompleted ? "line-through" : "unset"}
        >
          {content}
        </Text>
        <Text
          color="#5f708a"
          fontSize="md"
          textDecorationLine={isCompleted ? "line-through" : "unset"}
        >
          {date}
        </Text>
      </Flex>
      <Box
        backgroundColor={priorityColor}
        width="45px"
        height="45px"
        borderRadius="10px"
        backgroundSize="contain"
        backgroundImage={isCompleted ? "'/double-tick.png'" : "unset"}
      />
    </Flex>
  );
};
