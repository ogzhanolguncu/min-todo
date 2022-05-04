import React, { useState } from "react";
import { Flex, Input, HStack, Button, Box } from "@chakra-ui/react";

import { trpc } from "@app/utils/trpc";
import { Priority } from "@prisma/client";
import useKey from "../hooks/useKey";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { colorMapper } from "@app/utils/colorMapper";

export type Form = {
  content: string;
  priority: Priority;
};

const TodoInputGroup = () => {
  const { control, handleSubmit, watch } = useForm<Form>();

  const utils = trpc.useContext();
  const addTodo = trpc.useMutation("todo.add", {
    async onSuccess() {
      await utils.invalidateQueries(["todo.get-all"]);
    },
  });

  // const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setContent(e.currentTarget.value);

  // const handlePriorityChange = (priorityFlag: Priority) =>
  //   setPriority(priorityFlag);

  // const handleAddTodo = async () => {
  //   if (!priority || !content) return;
  //   await addTodo.mutateAsync({ priority, content });
  //   setContent("");
  //   setPriority(undefined);
  // };

  const onSubmit: SubmitHandler<Form> = (data) => {
    console.log(data);
  };
  useKey("Enter", onSubmit);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        mb="6rem"
        width="650px"
      >
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <Input
              variant="flushed"
              placeholder="Plan weekend outing"
              fontSize="xl"
              value={field.value}
              color="gray.600"
              borderBottomColor="gray.400"
              borderBottom="2px solid"
              onChange={field.onChange}
              width="300px"
              _focus={{
                borderBottomColor: "gray.600",
              }}
              _placeholder={{
                color: "gray.400",
              }}
            />
          )}
        />

        <Flex gap="0.5rem">
          {Object.entries(colorMapper).map(([key, _]) => {
            return (
              <Controller
                key={key}
                name="priority"
                control={control}
                render={({ field }) => (
                  <Button
                    onClick={() => field.onChange(key)}
                    width="45px"
                    height="45px"
                    borderRadius="10px"
                    backgroundSize="contain"
                    backgroundColor={
                      field.value === key
                        ? `${key.toLowerCase().toString()}.400`
                        : `${key.toLowerCase().toString()}.300`
                    }
                    backgroundImage={
                      field.value === key ? "'/double-tick.png'" : "unset"
                    }
                    transition="background-color 0.4s ease"
                    _hover={{
                      backgroundColor: `${key.toLowerCase().toString()}.400`,
                    }}
                    _active={{
                      backgroundColor: `${key.toLowerCase().toString()}.400`,
                    }}
                  />
                )}
              />
            );
          })}
        </Flex>
      </Flex>
    </form>
  );
};

export default TodoInputGroup;
