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
import ChatFrom from "../components/chat/ChatForm";
import { If, Then, Else } from "react-if";

export default function Home() {
 
  const Context = useContext(LoginContext);
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
          <Stack
            spacing={4}
            w={{ base: "80%", md: "40%" }}
            align={["center", "center", "flex-start", "flex-start"]}
          >
            <Heading
              as="h1"
              size="xl"
              fontWeight="bold"
              color="primary.800"
              textAlign={["center", "center", "left", "left"]}
            >
              Tangled
            </Heading>
            <Heading
              as="h2"
              size="md"
              color="primary.800"
              opacity="0.8"
              fontSize="16px"
              fontWeight="normal"
              lineHeight={1.5}
              textAlign={["center", "center", "left", "left"]}
            >
              Customers value time and convenience, and while you can’t always
              physically meet your customers where they’re at, you can use
              omni-channel feedback and multiple customer support options to
              allow customers to contact your support team in the way that’s
              most convenient for them.
              <br />
              <br />
              Tangled is a customer service platform that offers quality, fast,
              and reliable customer service for your business.
            </Heading>
            {Context.logout ? (
              <span>
                <Link href="/signup">
                  <Button
                    colorScheme="pink"
                    bgColor="#b57295"
                    borderRadius="8px"
                    py="4"
                    px="4"
                    lineHeight="1"
                    size="md"
                  >
                    Signup
                  </Button>{" "}
                </Link>
                <Link href="/login">
                  <Button
                    colorScheme="pink"
                    bgColor="#b57295"
                    borderRadius="8px"
                    py="4"
                    px="4"
                    lineHeight="1"
                    size="md"
                  >
                    Login
                  </Button>
                </Link>
              </span>
            ) : (
              <></>
            )}
          </Stack>
          <Box
            w={{ base: "80%", sm: "60%", md: "50%" }}
            mb={{ base: 12, md: 0 }}
          >
            {/* TODO: Make this change every X secs */}
            <Image
              src="https://7dfairs.com/web/wp-content/uploads/2021/03/shutterstock_1753698680.jpg"
              //   src="https://y26uq11r8xr1zyp0d3inciqv-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/41-1-1024x597.jpg"
              alt="hero image"
              size="100%"
              objectFit="cover"
            />
          </Box>
        </Flex>
      </Flex>
      {/* <Text
                  fontSize="xs"
                  mt={2}
                  textAlign="center"
                  color="primary.800"
                  opacity="0.6"
                >
                  No credit card required.
                </Text>{" "} */}
    </>
  );
}


