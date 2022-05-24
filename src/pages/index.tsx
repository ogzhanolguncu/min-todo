import React from "react";

import { Box, Center, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";

import { trpc } from "@app/utils/trpc";
import { colorMapper } from "@app/utils/colorMapper";
import TodoInputGroup from "@app/components/TodoInputGroup";
import { TodoItem } from "@app/components/TodoItem";
import TodoSkeletonLoaders from "@app/components/TodoSkeletonLoaders";
import TodoTitle from "@app/components/TodoTitle";
import UserInfo from "@app/components/UserInfo";

const MotionBox = motion(Box);

export default function Home() {
  const { data, isLoading, isFetched } = trpc.useQuery(["todo.get-all"]);

  return (
    <Center
      height="100%"
      width="100%"
      color="gray.800"
      flexDir="column"
      lineHeight="1.7"
      css={{
        wordSpacing: "1.2px",
        letterSpacing: "0.1px",
      }}
      padding="2rem"
    >
      <Flex
        width={["350px", "350px", "750px", "750px"]}
        flexDir="column"
        gap="2rem"
      >
        <UserInfo />
        <Flex
          flexDir="column"
          alignItems="flex-start"
          padding="3rem"
          border="3px solid transparent"
          boxShadow="8px 8px #bfadad5e"
          borderRadius="10px"
          width={["350px", "350px", "750px", "750px"]}
          backgroundColor="#d2fff773"
        >
          <Flex gap="2rem" flexDirection="column" mb="2rem">
            <TodoInputGroup />
            <TodoTitle />
            <Stack w="100%" gap="1rem" fontWeight="medium">
              {isFetched && !data?.length && (
                <Text fontSize="2xl">No todos yet.</Text>
              )}
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
                  <Divider height='3px' backgroundColor='purple.400'/>
                </MotionBox>
              ))}
              {isLoading && <TodoSkeletonLoaders />}
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
}
