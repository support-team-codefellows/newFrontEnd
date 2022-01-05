import React from "react";
import {
  Flex,
  Heading,
  Text,
  Icon,
  Link,
  Avatar,
  Box,
  SimpleGrid,
  Stack,
  Button,
  Badge,
  useColorModeValue,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
export default function About() {
  const members = [
    {
      name: "Rami Zaitoun",
      imageSrc:
        "https://cdn.discordapp.com/attachments/919609625488265250/928273838570106941/rami.png",
      githubLink: "https://github.com/MasteRminD6666",
      description: "The team leader",
      handler: "MasteRminD6666",
    },
    {
      name: "Marwan Zakia",
      imageSrc: "https://avatars.githubusercontent.com/u/84706279?v=4",
      githubLink: "https://github.com/Marwan-Zakia",
      description: " ",
      handler: "Marwan-Zakia",
    },
    {
      name: "Mohammad Haroun",
      imageSrc: "https://avatars.githubusercontent.com/u/85875172?v=4",
      githubLink: "https://github.com/Mohammad-Haroun-97",
      description: " ",
      handler: "Mohammad-Haroun-97",
    },
    {
      name: "Hassan Hamdan",
      imageSrc: "https://avatars.githubusercontent.com/u/77203363?v=4",
      githubLink: "https://github.com/HassanHamdanDev",
      description: "Software developer",
      handler: "HassanHamdanDev",
    },
    {
      name: "Hasnaa Habahbeh",
      imageSrc: "https://avatars.githubusercontent.com/u/86597086?v=4",
      githubLink: "https://github.com/hasnaa38",
      description: " ",
      handler: "hasnaa38",
    },
  ];
  return (
    <>
      <Flex
        w={["100%", "100%", "90%", "90%", "85%"]}
        p="3%"
        flexDir="column"
        overflow="auto"
        minH="100vh"
      >
        <Heading fontWeight="bold" mb={3} letterSpacing="tight">
          {" "}
          About
        </Heading>
        <br />
        <Heading as="h2" size="lg" letterSpacing="tight">
          Developers
        </Heading>
        <br />
        <br />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          {members.map((member, idx) => (
            <Box
              maxW={"320px"}
              w={"full"}
              bg={"whiteAlpha"}
              boxShadow={"2xl"}
              rounded={"lg"}
              p={6}
              textAlign={"center"}
              key={idx}
            >
              <Avatar
                size={"xl"}
                src={member.imageSrc}
                alt={"Avatar Alt"}
                mb={4}
                pos={"relative"}
                filter="brightness(80%)"
              />
              <Heading fontSize={"2xl"} fontFamily={"body"} marginBottom="2%">
                {member.name}
              </Heading>
              <hr />
              <br />
              <Text fontWeight={600} color={"gray.500"} mb={4}>
                <Link href={member.githubLink}>
                  <Icon as={BsGithub} /> {member.handler}
                </Link>
              </Text>
              <Text textAlign={"center"} color={"gray.700"} px={3}>
                {member.description}
              </Text>

              <Stack mt={8} direction={"row"} spacing={4}></Stack>
            </Box>
          ))}
        </SimpleGrid>
        <br />
        <br />
        <Heading as="h2" size="lg" letterSpacing="tight">
          Project Source Code
        </Heading>
        <br />
        <br />
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          <Link href="https://github.com/support-team-codefellows/newFrontEnd">
            <Icon width="2em" as={HiOutlineChevronDoubleRight} /> Front End Repo
          </Link>
        </Text>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          <Link href="https://github.com/support-team-codefellows/Tangled-back-end">
            <Icon width="2em" as={HiOutlineChevronDoubleRight} /> Back End Repo
          </Link>
        </Text>
      </Flex>
    </>
  );
}
