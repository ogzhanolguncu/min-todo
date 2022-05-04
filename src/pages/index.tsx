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
import TodoTitle from "@app/components/TodoTitle";

const MotionBox = motion(Box);

export default function Home() {
  const { data, isLoading } = trpc.useQuery(["todo.get-all"]);

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
        <Flex gap="2rem" flexDirection="column">
          <TodoInputGroup />
          <TodoTitle />
          <Stack w="100%" gap="0.5rem" fontWeight="medium">
            {!data?.length && <Text fontSize="2xl">No todos yet.</Text>}
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
                  id={todo.id}
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
