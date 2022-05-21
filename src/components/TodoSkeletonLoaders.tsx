import React from "react";
import { Flex, Skeleton } from "@chakra-ui/react";

const TodoSkeletonLoaders = () => {
  return (
    <Flex gap="1rem" flexDirection="column">
      <Skeleton
        height="300px"
        startColor="#e9c7ed"
        endColor="#dbc4da"
        borderRadius="10px"
      />
    </Flex>
  );
};

export default TodoSkeletonLoaders;
