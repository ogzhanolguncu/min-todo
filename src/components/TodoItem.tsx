import React from "react";
import { Flex, Text, Image, HStack } from "@chakra-ui/react";

import { trpc } from "@app/utils/trpc";
import ClockPopover from "./ClockPopover";

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
    <Flex
      justifyContent="space-between"
      flexDirection={["column", "column", "row", "row"]}
      transition="opacity 0.4s ease"
      alignItems="center"
    >
      <Flex gap="0.8rem" alignItems="center" w="100%">
        <Image
          width={["40px", "40px", "60px", "60px"]}
          height={["40px", "40px", "60px", "60px"]}
          borderRadius="10px"
          alt="priority"
          backgroundSize="contain"
          src={isCompleted ? "/double-tick.png" : "/document.png"}
          backgroundColor={isCompleted ? "purple.300" : priorityColor}
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          onClick={handleCopleteTodo}
          transition="background-color 0.4s ease"
          _hover={{
            backgroundColor: "purple.300",
          }}
          _active={{
            backgroundColor: priorityColor,
          }}
        />
        <Flex flexDirection="column">
          <Text
            fontSize={["md", "lg", "2xl", "2xl"]}
            noOfLines={2}
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
      <HStack justifyContent="center" ml={[0, 0, 0, "4rem"]}>
        <Image
          alt="thrash"
          width={["60px", "60px", "70px", "70px"]}
          height={["60px", "60px", "70px", "70px"]}
          borderRadius="10px"
          backgroundSize="contain"
          src="/trash2.png"
          cursor="pointer"
          bgRepeat="no-repeat"
          onClick={handleDeleteTodo}
          _hover={{
            transform: "rotate(-3deg)",
          }}
        />
        <ClockPopover id={id} />
      </HStack>
    </Flex>
  );
};
