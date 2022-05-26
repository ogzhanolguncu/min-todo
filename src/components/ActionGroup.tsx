import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useAtom } from "jotai";

import { trpc } from "@app/utils/trpc";
import { sortByAtom } from "@app/atoms";
import ActionGroupButton from "./ActionGroupButton";

const ActionGroup = () => {
  const [_, setSortBy] = useAtom(sortByAtom);

  const utils = trpc.useContext();
  const deleteAll = trpc.useMutation(["todo.delete-all"], {
    async onSuccess() {
      await utils.invalidateQueries([
        "todo.get-all",
        {
          sortBy: "asc",
        },
      ]);
    },
  });

  const handleDeleteTodo = async () => {
    await deleteAll.mutateAsync();
  };
  const handleSortBy = async () => {
    setSortBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  };

  return (
    <Flex gap="1rem" justifyContent="flex-end">
      <ActionGroupButton
        isLoading={deleteAll.isLoading}
        onClick={handleDeleteTodo}
        text={"Delete All"}
        color="red"
      />
      <ActionGroupButton
        isLoading={deleteAll.isLoading}
        onClick={handleSortBy}
        text={"Sort By Priority"}
        color="orange"
      />
    </Flex>
  );
};

export default ActionGroup;
