import React from "react";

import {
  Box,
  Center,
  Flex,
  Image,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { trpc } from "@app/utils/trpc";
import { colorMapper } from "@app/utils/colorMapper";
import TodoInputGroup from "@app/components/TodoInputGroup";
import { TodoItem } from "@app/components/TodoItem";
import TodoSkeletonLoaders from "@app/components/TodoSkeletonLoaders";
import TodoTitle from "@app/components/TodoTitle";
import { useUser, useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/clerk-react";

const MotionBox = motion(Box);

export default function Home() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const { data, isLoading } = trpc.useQuery(["todo.get-all"]);

  return (
    <Center
      height="100vh"
      color="gray.800"
      backgroundColor="hsl(0deg 50% 97%)"
      flexDir="column"
      lineHeight="1.7"
      css={{
        wordSpacing: "1.2px",
        letterSpacing: "0.1px",
      }}
    >
      <Flex width="750px" flexDir="column" gap="2rem">
        <Flex
          align="center"
          justifyContent="space-between"
          px="3rem"
          border="3px solid transparent"
          boxShadow="8px 8px #8080805e"
          backgroundColor="#d2fff773"
          borderRadius="10px"
        >
          <Text
            textAlign="end"
            fontSize="2xl"
            fontWeight="600"
            letterSpacing="0.5px"
          >
            {user?.fullName}
          </Text>
          <Tooltip
            label="Sign out"
            bg="#d2fff773"
            placement="top"
            hasArrow
            color="gray.800"
            borderRadius="5px"
            padding='0.5rem'
            fontWeight='500'
            fontSize='lg'
          >
            <Image
              src="/logout.png"
              alt="log-out"
              cursor="pointer"
              onClick={() => signOut()}
            />
          </Tooltip>
        </Flex>
        <Flex
          flexDir="column"
          alignItems="flex-start"
          padding="3rem"
          border="3px solid transparent"
          boxShadow="8px 8px #8080805e"
          borderRadius="10px"
          width="750px"
          backgroundColor="#d2fff773"
        >
          <Flex gap="2rem" flexDirection="column" mb="2rem">
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
      </Flex>
    </Center>
  );
}
