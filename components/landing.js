import React from "react";
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

export default function landing() {
  return (
    <>
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
          omni-channel feedback and multiple customer support options to allow
          customers to contact your support team in the way that’s most
          convenient for them.
          <br />
          <br />
          Tangled is a customer service platform that offers quality, fast, and
          reliable customer service for your business.
        </Heading>

        <span>
          <Link href="/signup" textDecoration= "none !important">
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
          <Link href="/login" textDecoration= "none !important">
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
      </Stack>
      <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
        <Image
          src="https://7dfairs.com/web/wp-content/uploads/2021/03/shutterstock_1753698680.jpg"
          //   src="https://y26uq11r8xr1zyp0d3inciqv-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/41-1-1024x597.jpg"
          alt="hero image"
          size="100%"
          objectFit="cover"
        />
      </Box>
    </>
  );
}
