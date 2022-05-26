import React from "react";
import { Text } from "@chakra-ui/react";
import { zeroPad } from "react-countdown";

const TickerRenderer = ({
  hours,
  minutes,
  seconds,
}: {
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <Text fontSize="xl" color="whitesmoke" p="0.1rem" letterSpacing="0.20px">
      Remaining Time: {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </Text>
  );
};

export default TickerRenderer;
