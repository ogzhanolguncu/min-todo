import React from "react";
import { Flex, Skeleton } from "@chakra-ui/react";

const TodoSkeletonLoaders = () => {
  return (
    <Flex gap="1rem" flexDirection="column">
      <Skeleton
        height="50px"
        startColor="green.300"
        endColor="red.300"
        borderRadius="10px"
      />
      <Skeleton
        height="50px"
        startColor="green.300"
        endColor="red.300"
        borderRadius="10px"
      />
      <Skeleton
        height="50px"
        startColor="green.300"
        endColor="red.300"
        borderRadius="10px"
      />
      <Skeleton
        height="50px"
        startColor="green.300"
        endColor="red.300"
        borderRadius="10px"
      />
    </Flex>
  );
};

export default TodoSkeletonLoaders;
