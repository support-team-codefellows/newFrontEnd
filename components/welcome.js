import { useContext } from "react";
import { LoginContext } from "./auth/context";
import {
  Button,
  Flex,
  Link,
  Image,
  Heading,
  Stack,
  Text,
  Stat,
  StatLabel,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { If, Then, Else } from "react-if";

export default function Hero() {
  const Context = useContext(LoginContext);
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

        <If condition={Context.user?.capabilities?.length > 2}>
          <Then>
            <br />
            <br />
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={{ base: 5, lg: 8 }}
            >
              <Link href="/telephone">
                <Stat
                  px={{ base: 2, md: 0 }}
                  py={"5"}
                  shadow={"xl"}
                  border={"1px solid"}
                  borderColor={("gray.800", "gray.500")}
                  rounded={"lg"}
                >
                  <Flex justifyContent={"space-between"}>
                    <Box pl={{ base: 2, md: 4 }} pr={{ base: 2, md: 4 }}>
                      <StatLabel fontWeight={"medium"} isTruncated>
                        <Text fontSize="md" fontWeight="bold">
                          Telephone <br /> Department
                        </Text>
                      </StatLabel>
                    </Box>
                  </Flex>
                </Stat>
              </Link>{" "}
              <Link href="/site">
                <Stat
                  px={{ base: 2, md: 0 }}
                  py={"5"}
                  shadow={"xl"}
                  border={"1px solid"}
                  borderColor={("gray.800", "gray.500")}
                  rounded={"lg"}
                >
                  <Flex justifyContent={"space-between"}>
                    <Box pl={{ base: 2, md: 4 }} pr={{ base: 2, md: 4 }}>
                      <StatLabel fontWeight={"medium"} isTruncated>
                        <Text fontSize="md" fontWeight="bold">
                          On-Site <br /> Department
                        </Text>
                      </StatLabel>
                    </Box>
                  </Flex>
                </Stat>
              </Link>
            </SimpleGrid>
          </Then>

          <Else>
            <br />
            <br />
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={{ base: 5, lg: 8 }}
            >
              <Link href="/customer">
                <Stat
                  px={{ base: 2, md: 0 }}
                  py={"5"}
                  shadow={"xl"}
                  border={"1px solid"}
                  borderColor={("gray.800", "gray.500")}
                  rounded={"lg"}
                >
                  <Flex justifyContent={"space-between"}>
                    <Box pl={{ base: 2, md: 4 }} pr={{ base: 2, md: 4 }}>
                      <StatLabel fontWeight={"medium"} isTruncated>
                        <Text fontSize="md" fontWeight="bold">
                          Submit a Ticket
                        </Text>
                      </StatLabel>
                    </Box>
                  </Flex>
                </Stat>
              </Link>{" "}
            </SimpleGrid>
          </Else>
        </If>
        <br />
        <br />
        <Button
          colorScheme="pink"
          bgColor="#b57295"
          borderRadius="8px"
          py="4"
          px="4"
          lineHeight="1"
          size="md"
          onClick={Context.logout}
        >
          Logout
        </Button>
        <Link href="/about">
          <Text
            fontSize="14px"
            mt={2}
            textAlign="left"
            color="primary.800"
            opacity="0.6"
          >
            More About Tangled
          </Text>
        </Link>
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
