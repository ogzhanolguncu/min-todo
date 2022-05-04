import TodoInputGroup from "@app/components/TodoInputGroup";
import { TodoItem } from "@app/components/TodoItem";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { trpc } from "../utils/trpc";

export default function Home() {
  //   const { data, isLoading } = trpc.useQuery(["get-all-todos"]);

  return (
    <Center
      height="100vh"
      color="gray.800"
      backgroundColor="#F9F7F7"
      flexDir="column"
      lineHeight="1.7"
      css={{
        wordSpacing: "1.2px",
        letterSpacing: "0.1px",
      }}
    >
      <Flex
        flexDir="column"
        alignItems="flex-start"
        padding="3rem"
        border="3px solid transparent"
        boxShadow="8px 8px #8080805e"
        borderRadius="10px"
        width="750px"
        backgroundColor="#e9f5f3"
      >
        <Flex gap="0.5rem" flexDirection="column">
          <TodoInputGroup />
          <Heading fontSize="6xl">My Tasks</Heading>
          <Text color="#5f708a" fontWeight="medium" fontSize="2xl" mb="2rem">
            1 of 4 Completed
          </Text>
          <Stack w="100%" gap="0.5rem" fontWeight="medium">
            <TodoItem
              content="Buy Milk"
              date=" Mon, Mar 05"
              priorityColor="green.300"
              isCompleted
            />
            <TodoItem
              content="Plan weekend outing Plan weekend outing."
              date=" Mon, Mar 05"
              priorityColor="red.300"
              isCompleted
            />
            <TodoItem
              content="Wash clothes"
              date="Mon, Mar 05"
              priorityColor="green.300"
            />
            <TodoItem
              content="Walk 10 kilometers"
              date=" Mon, Mar 05"
              priorityColor="orange.300"
            />
          </Stack>
        </Flex>
      </Flex>
    </Center>
  );
}
