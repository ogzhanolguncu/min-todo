import React from "react";
import {
  Popover,
  PopoverTrigger as OrigPopoverTrigger,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";

import { clockMapper } from "@app/utils/colorMapper";
import { trpc } from "@app/utils/trpc";

export const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

const ClockPopover = ({ id }: { id: string }) => {
  const { user } = useUser();

  const handleReminder = trpc.useMutation("todo.set-reminder");

  const handleReminderTodo = async (reminderTime: keyof typeof clockMapper) => {
    await handleReminder.mutateAsync({
      reminderTime,
      todoId: id,
      userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
    });
  };

  return (
    <Popover placement="bottom" closeOnBlur={true} autoFocus={false} closeOnEsc>
      <PopoverTrigger>
        <Image
          alt="clock"
          width={["60px", "60px", "80px", "80px"]}
          height={["60px", "60px", "80px", "80px"]}
          borderRadius="10px"
          backgroundSize="contain"
          src="/clock.png"
          cursor="pointer"
          bgRepeat="no-repeat"
          _hover={{
            transform: "rotate(-3deg)",
          }}
        />
      </PopoverTrigger>
      <PopoverContent color="white" bg="purple.500" borderColor="purple.400">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Choose a time for reminder!
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          A mail will be sent out about the task you chose.
          <Flex flexDirection="row" gap="1rem" mt="1rem">
            {Object.entries(clockMapper).map(([key, value]) => (
              <Button
                onClick={() =>
                  handleReminderTodo(key as keyof typeof clockMapper)
                }
                key={key}
                variant="outline"
                _hover={{
                  backgroundColor: "purple.600",
                }}
              >
                {value}
              </Button>
            ))}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ClockPopover;
