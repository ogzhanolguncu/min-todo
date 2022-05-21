import React from "react";
import { Flex, Tooltip, Text, Image } from "@chakra-ui/react";
import { useUser, useAuth } from "@clerk/nextjs";

const UserInfo = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <Flex
      align="center"
      justifyContent="space-between"
      px="3rem"
      border="3px solid transparent"
      boxShadow="8px 8px #bfadad5e"
      backgroundColor="#d2fff773"
      borderRadius="10px"
    >
      <Text
        fontSize={["lg", "lg", "2xl", "2xl"]}
        letterSpacing="0.5px"
        color="#5f708a"
        fontWeight="medium"
      >
        {user?.fullName}
      </Text>
      <Tooltip
        label="Sign out"
        bg="#d2fff773"
        placement="top"
        hasArrow
        color="gray.800"
        borderRadius="5px"
        padding="0.5rem"
        fontWeight="500"
        fontSize="lg"
      >
        <Image
          width="80px"
          height="80px"
          src="/logout.png"
          alt="log-out"
          cursor="pointer"
          onClick={() => signOut()}
        />
      </Tooltip>
    </Flex>
  );
};

export default UserInfo;
