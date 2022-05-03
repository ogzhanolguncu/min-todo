import { TodoItem } from "@app/components/TodoItem";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
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
      <Flex width="760px" flexDir="column" alignItems="center">
        <Input
          variant="flushed"
          placeholder="Plan weekend outing"
          fontSize="xl"
          mb="7rem"
          color="gray.600"
          borderBottomColor="gray.300"
          borderBottom="2px solid"
          _focus={{
            borderBottomColor: "gray.400",
          }}
        />
        <Stack gap="0.5rem" width="760px">
          <Heading fontSize="6xl">My Tasks</Heading>
          <Text color="#5f708a" fontWeight="medium" fontSize="2xl">
            2 of 7 Completed
          </Text>
          <Stack w="100%" gap="0.5rem" fontWeight="medium">
            <TodoItem
              content="Buy Milk"
              date=" Mon, Mar 05"
              priorityColor="green.400"
              isCompleted
            />
            <TodoItem
              content="Plan weekend outing Plan weekend outing."
              date=" Mon, Mar 05"
              priorityColor="red.400"
            />
            <TodoItem
              content="Wash clothes"
              date="Mon, Mar 05"
              priorityColor="green.400"
            />
            <TodoItem
              content="Walk 10 kilometers"
              date=" Mon, Mar 05"
              priorityColor="orange.400"
            />
          </Stack>
        </Stack>
      </Flex>
    </Center>
  );
}
