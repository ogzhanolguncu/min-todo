import { Button } from "@chakra-ui/react";
import React from "react";

type Props = {
  isLoading: boolean;
  onClick: () => void;
  text: string;
  color: "orange" | "red";
};

const ActionGroupButton = ({ isLoading, onClick, text, color }: Props) => {
  return (
    <Button
      border="3px solid transparent"
      boxShadow="8px 8px #8080805e"
      isDisabled={isLoading}
      isLoading={isLoading}
      backgroundColor={`${color}.300`}
      _hover={{
        backgroundColor: `${color}.400`,
      }}
      _active={{
        backgroundColor: `${color}.400`,
      }}
      color="whitesmoke"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default ActionGroupButton;
