import React from "react";
import { Flex, Heading, Skeleton, Text } from "@chakra-ui/react";

import { trpc } from "@app/utils/trpc";

const TodoTitle = () => {
  const { data, isFetching } = trpc.useQuery([
    "todo.get-all",
    { sortBy: "asc" },
  ]);
  const completedTodoCount = data?.filter((todo) => todo.isCompleted).length;

  return (
    <Flex flexDirection="column" gap="0.5rem" my="2rem">
      <Heading fontSize="6xl">Tokei</Heading>
      <Skeleton
        isLoaded={!isFetching}
        height="30px"
        startColor="#e9c7ed"
        endColor="#dbc4da"
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
