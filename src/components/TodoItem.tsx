import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import { trpc } from "@app/utils/trpc";

type Props = {
  content: string;
  date: string;
  priorityColor: string;
  isCompleted?: boolean;
  id: string;
};

export const TodoItem = ({
  content,
  date,
  priorityColor,
  isCompleted = false,
  id,
}: Props) => {
  const utils = trpc.useContext();
  const deleteTodo = trpc.useMutation("todo.delete", {
    async onSuccess() {
      await utils.invalidateQueries(["todo.get-all"]);
    },
  });
  const completeTodo = trpc.useMutation("todo.complete", {
    async onSuccess() {
      await utils.invalidateQueries(["todo.get-all"]);
    },
  });

  const handleDeleteTodo = async () => {
    await deleteTodo.mutateAsync({ id });
  };

  const handleCopleteTodo = async () => {
    await completeTodo.mutateAsync({ id });
  };

  return (
    <Flex justifyContent="space-between" transition="opacity 0.4s ease">
      <Flex gap="0.8rem" align="center">
        <Box
          width="40px"
          height="40px"
          borderRadius="10px"
          backgroundSize="contain"
          backgroundImage={isCompleted ? "'/double-tick.png'" : "unset"}
          backgroundColor={isCompleted ? "purple.300" : priorityColor}
          onClick={handleCopleteTodo}
          transition="background-color 0.4s ease"
          _hover={{
            backgroundImage: "/double-tick.png",
            backgroundColor: "purple.300",
          }}
        />
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
      </Flex>
      <Box
        width="65px"
        height="65px"
        borderRadius="10px"
        backgroundSize="contain"
        backgroundImage="/trash1.png"
        cursor="pointer"
        transition="width 0.1s ease"
        onClick={handleDeleteTodo}
        _hover={{
          width: "67px",
          height: "67px",
        }}
      />
    </Flex>
  );
};
