import { useContext } from "react";
import { LoginContext } from "../components/auth/context";
import {
  Button,
  Flex,
  Box,
  Spacer,
  PopoverAnchor,
  Image,
  Heading,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";
import { If, Then, Else } from "react-if";

export default function Hero() {
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
              color="primary.800"
              fontWeight="normal"
              textAlign={["center", "center", "left", "left"]}
            >
              Welcome Back, <b>{Context.user.username}</b>
            </Heading>
            <Text fontSize="small" color="gray" ml={1}>
          {new Date().toLocaleDateString(undefined, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            weekday: "short",
          })}
        </Text>
            
          </Stack>
          <Box
            w={{ base: "80%", sm: "60%", md: "50%" }}
            mb={{ base: 12, md: 0 }}
          >
            {/* TODO: Make this change every X secs */}
            <Image
              src="https://7dfairs.com/web/wp-content/uploads/2021/03/shutterstock_1753698680.jpg"
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
