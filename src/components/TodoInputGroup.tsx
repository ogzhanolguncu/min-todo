import React, { useRef } from "react";
import { Flex, Input, Text, Button } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Priority } from "@prisma/client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { colorMapper } from "@app/utils/colorMapper";
import { sharedAddValidation } from "@app/shared";
import { trpc } from "@app/utils/trpc";

export type Form = {
  content: string;
  priority: Priority;
};

const TodoInputGroup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>({
    resolver: zodResolver(sharedAddValidation),
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useContext();
  const addTodo = trpc.useMutation("todo.add", {
    async onSuccess() {
      await utils.invalidateQueries(["todo.get-all"]);
    },
  });

  const onSubmit: SubmitHandler<Form> = async (data, event) => {
    await addTodo.mutateAsync(data);
    event?.target.reset();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mb="4rem"
        width={["250px", "250px", "650px", "650px"]}
        flexDirection={["column", "column", "row", "row"]}
      >
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <Flex flexDirection="column" gap="0.8rem">
              <Input
                ref={inputRef}
                variant="flushed"
                placeholder="Plan weekend outing"
                fontSize="2xl"
                color="gray.600"
                borderBottomColor={
                  errors.content?.message ? "red.300" : "gray.400"
                }
                borderBottom="2px solid"
                onChange={field.onChange}
                _focus={{
                  borderBottomColor: `${
                    errors.content?.message ? "red.300" : "gray.400"
                  }`,
                }}
                _placeholder={{
                  color: "gray.400",
                }}
              />
              <Text color="red.300" fontWeight="medium" height="20px">
                {errors.content?.message}
              </Text>
            </Flex>
          )}
        />

        <Flex
          flexDirection="column"
          gap="0.5rem"
        >
          <Flex gap="1rem">
            {Object.entries(colorMapper).map(([key]) => {
              return (
                <Controller
                  key={key}
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Button
                      onClick={() => {
                        field.onChange(key);
                        inputRef.current?.focus();
                      }}
                      width="50px"
                      height="50px"
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
          <Text color="red.300" fontWeight="medium" height="20px">
            {errors.priority?.message && "Pick a box!"}
          </Text>
        </Flex>
      </Flex>
    </form>
  );
};

export default TodoInputGroup;
