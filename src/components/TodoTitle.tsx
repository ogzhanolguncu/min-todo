import React from "react";
import { Flex, Heading, Skeleton, Text } from "@chakra-ui/react";

import { trpc } from "@app/utils/trpc";

const TodoTitle = () => {
  const { data, isLoading, isRefetching } = trpc.useQuery(["todo.get-all"]);
  const completedTodoCount = data?.filter((todo) => todo.isCompleted).length;

  return (
    <Flex flexDirection="column" gap="0.5rem">
      <Heading fontSize="6xl">My Tasks</Heading>
      <Skeleton
        isLoaded={!isLoading}
        height="30px"
        startColor="#C7EDE6"
        endColor="#C7EDE6"
        borderRadius="10px"
      >
        <Text color="#5f708a" fontWeight="medium" fontSize="2xl" mb="2rem">
          {`${completedTodoCount} of ${data?.length} Completed`}
        </Text>
      </Skeleton>
    </Flex>
  );
};

export default TodoTitle;
