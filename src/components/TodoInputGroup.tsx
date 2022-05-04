import React, { useState } from "react";
import { Flex, Input, HStack, Button } from "@chakra-ui/react";

import { trpc } from "@app/utils/trpc";
import { Priority } from "@prisma/client";
import useKey from "../hooks/useKey";

const TodoInputGroup = () => {
  const addTodo = trpc.useMutation("add-todo");

  const [content, setContent] = useState("");
  const [priority, setPriority] = useState<Priority>();

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.currentTarget.value);

  const handlePriorityChange = (priorityFlag: Priority) =>
    setPriority(priorityFlag);

  const handleAddTodo = async () => {
    if (!priority || !content) return;
    await addTodo.mutateAsync({ priority, content });
  };

  useKey("Enter", handleAddTodo);

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
        onChange={handleContentChange}
        width="400px"
        _focus={{
          borderBottomColor: "gray.600",
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
          backgroundSize="contain"
          backgroundColor={priority === "GREEN" ? "green.400" : "green.300"}
          backgroundImage={
            priority === "GREEN" ? "'/double-tick.png'" : "unset"
          }
          transition="background-color 0.4s ease"
          _hover={{
            backgroundColor: "green.400",
          }}
          _active={{
            backgroundColor: "green.400",
          }}
          onClick={() => handlePriorityChange("GREEN")}
        />
        <Button
          width="45px"
          height="45px"
          borderRadius="10px"
          backgroundSize="contain"
          backgroundColor={priority === "RED" ? "red.400" : "red.300"}
          backgroundImage={priority === "RED" ? "'/double-tick.png'" : "unset"}
          transition="background-color 0.4s ease"
          _hover={{
            backgroundColor: "red.400",
          }}
          _active={{
            backgroundColor: "red.400",
          }}
          onClick={() => handlePriorityChange("RED")}
        />
        <Button
          width="45px"
          height="45px"
          borderRadius="10px"
          backgroundSize="contain"
          backgroundColor={priority === "ORANGE" ? "orange.400" : "orange.300"}
          backgroundImage={
            priority === "ORANGE" ? "'/double-tick.png'" : "unset"
          }
          transition="background-color 0.4s ease"
          _hover={{
            backgroundColor: "orange.400",
          }}
          onClick={() => handlePriorityChange("ORANGE")}
        />
      </HStack>
    </Flex>
  );
};

export default TodoInputGroup;
