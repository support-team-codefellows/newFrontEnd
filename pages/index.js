import { useContext } from "react";
import { LoginContext } from "../components/auth/context";
import {
  Button,
  Flex,
  Box,
  Image,
  Heading,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Landing from "../components/landing";
import Welcome from "../components/welcome";
import { If, Then, Else } from "react-if";

export default function Home() {
  const Context = useContext(LoginContext);
  console.log("here ->>", Context);
  return (
    <>
      <Flex
        w={["100%", "100%", "90%", "90%", "85%"]}
        p="3%"
        flexDir="column"
        overflow="auto"
        minH="100vh"
      >
        <Flex
          align="center"
          justify={{ base: "center", md: "space-around", xl: "space-between" }}
          direction={{ base: "column-reverse", md: "row" }}
          wrap="no-wrap"
          minH="70vh"
          px={8}
          mb={16}
        >
          <If condition={Context.loggedIn}>
            <Then>
              <Welcome />
            </Then>
            <Else>
              <Landing />
            </Else>
          </If>
        </Flex>
      </Flex>
    </>
  );
}
