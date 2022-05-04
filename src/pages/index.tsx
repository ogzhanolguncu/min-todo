import React from "react";

import {
  Box,
  Center,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { trpc } from "@app/utils/trpc";
import { colorMapper } from "@app/utils/colorMapper";
import TodoInputGroup from "@app/components/TodoInputGroup";
import { TodoItem } from "@app/components/TodoItem";
import TodoSkeletonLoaders from "@app/components/TodoSkeletonLoaders";

const MotionBox = motion(Box);

export default function Home() {
  const { data, isLoading } = trpc.useQuery(["todo.get-all-todos"]);

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
            {data?.map((todo) => (
              <MotionBox
                key={todo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TodoItem
                  content={todo.content}
                  date={dayjs(todo.createdAt).format("dddd, MMMM D")}
                  priorityColor={colorMapper[todo.priority]}
                  isCompleted={todo.isCompleted}
                />
              </MotionBox>
            ))}
            {isLoading && <TodoSkeletonLoaders />}
          </Stack>
        </Flex>
      </Flex>
    </Center>
  );
}
