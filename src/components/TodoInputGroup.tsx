import { Flex, Input, HStack, Button } from "@chakra-ui/react";
import React from "react";

const TodoInputGroup = () => {
  return (
    <Flex
      alignItems="flex-start"
      justifyContent="space-between"
      mb="6rem"
      width="650px"
    >
      <Input
        variant="flushed"
        placeholder="Plan weekend outing"
        fontSize="xl"
        color="gray.600"
        borderBottomColor="gray.500"
        borderBottom="2px solid"
        width="400px"
        _focus={{
          borderBottomColor: "gray.800",
        }}
        _placeholder={{
          color: "gray.500",
        }}
      />
      <HStack>
        <Button
          width="45px"
          height="45px"
          borderRadius="10px"
          backgroundColor="green.300"
          transition="background-color 0.4s ease"
          _hover={{
            backgroundColor: "green.400",
          }}
        />
        <Button
          width="45px"
          height="45px"
          borderRadius="10px"
          backgroundColor="red.300"
          transition="background-color 0.4s ease"
          _hover={{
            backgroundColor: "red.400",
          }}
        />
        <Button
          width="45px"
          height="45px"
          borderRadius="10px"
          backgroundColor="orange.300"
          transition="background-color 0.4s ease"
          _hover={{
            backgroundColor: "orange.400",
          }}
        />
      </HStack>
    </Flex>
  );
};

export default TodoInputGroup;
