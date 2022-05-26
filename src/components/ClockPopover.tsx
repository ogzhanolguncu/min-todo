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
  useToast,
  Text,
  Tooltip,
  Skeleton,
} from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import Countdown from "react-countdown";

import { clockMapper } from "@app/utils/colorMapper";
import { trpc } from "@app/utils/trpc";
import { TransitionImage } from "./TransitionImage";
import TickerRenderer from "./TickerRenderer";

export const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

const ClockPopover = ({ id }: { id: string }) => {
  const toast = useToast();
  const { user } = useUser();
  const utils = trpc.useContext();

  const handleReminder = trpc.useMutation("todo.set-reminder", {
    async onSuccess() {
      await utils.invalidateQueries(["todo.get", { todoId: id }]);
    },
  });
  const { data, isLoading } = trpc.useQuery(["todo.get", { todoId: id }]);

  const handleReminderTodo = async (reminderTime: keyof typeof clockMapper) => {
    const res = await handleReminder.mutateAsync({
      reminderTime,
      todoId: id,
      userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
    });

    toast({
      title: "Reminder",
      description: res?.message,
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "subtle",
      position: "top-left",
    });
  };


  if (!data || isLoading) {
    return (
      <Skeleton
        height="60px"
        startColor="#e9c7ed"
        endColor="#dbc4da"
        borderRadius="10px"
      />
    );
  }

  if (data.reminderScheduled) {
    return (
      <Tooltip
        label={
          <Countdown
            date={data?.reminderTime}
            autoStart
            renderer={TickerRenderer}
          />
        }
        bg="orange.300"
        placement="right"
        hasArrow
        borderRadius="5px"
        padding="0.5rem"
        fontWeight="500"
        fontSize="lg"
      >
        <TransitionImage
          hasTransition={data.reminderScheduled}
          alt="clock"
          width={["60px", "60px", "80px", "80px"]}
          height={["60px", "60px", "80px", "80px"]}
          src="/clock.png"
        />
      </Tooltip>
    );
  }

  return (
    <Popover placement="bottom" closeOnBlur={true} closeOnEsc>
      <PopoverTrigger>
        <TransitionImage
          hasTransition={false}
          alt="clock"
          width={["60px", "60px", "80px", "80px"]}
          height={["60px", "60px", "80px", "80px"]}
          src="/clock.png"
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
