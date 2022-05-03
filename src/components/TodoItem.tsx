import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
    content: string
    date: string
    priorityColor: string
}

export const TodoItem = ({content, date, priorityColor}: Props) => {
  return (
    <Box>
      <Text fontSize="2xl">{content}</Text>
      <HStack>
        <Text color="#5f708a" fontSize="md">
          {date}
        </Text>
        <Box
          backgroundColor={priorityColor}
          width="30px"
          height="30px"
          borderRadius="10px"
        />
      </HStack>
    </Box>
  );
};


