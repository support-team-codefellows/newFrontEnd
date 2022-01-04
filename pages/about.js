/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/link-passhref */
import {
  Button,
  Flex,
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Text,
  Stack,
  useColorModeValue,
  Stat,
  StatLabel,
  Textarea,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Divider,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaLinkedinIn, AiFillGithub } from "react-icons/fa";
export default function About() {
  return (
    <Center>
      <Flex
   
        w="2000px"
        p="3%"
        alignItems="center"
        flexDir="column"
        overflow="auto"
        minH="100vh"
        H="100vh"
      >
        <Stack>
          <Flex
         
          >
            <Stack spacing={4}>
              <Heading
                as="h1"
                size="2xl"
                fontWeight="bold"
                color="gray.800"
                textAlign="center"
                mb="10px"
              >
                About Us
              </Heading>
              <Heading
                fontSize="xl"
                color="gray.800"
                textAlign="center"
                mb="10px"
              >
                Our Team
              </Heading>
              <Text fontSize="xl" color="gray.800" textAlign="center" mb="10px">
                We are a team of developers who are passionate about creating
                software that helps people.
              </Text>
            </Stack>
          </Flex>

          {"card1"}

     
          <Flex
            w="800%"
            flexDirection={["column", "column", "row", "row"]}
            
              >
          
              <Flex
              
              >
                <Box
                  maxW={"200px"}
                  w={"full"}
                  h={"400px"}
                  bg={useColorModeValue("white", "gray.800")}
                  boxShadow={"2xl"}
                  rounded={"md"}
                  overflow={"hidden"}
                >
                  <Image
                    h={"120px"}
                    w={"full"}
                    src={
                      "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                    }
                    objectFit={"cover"}
                  />
                  <Flex justify={"center"} mt={-12}>
                    <Avatar
                      size={"xl"}
                      src={
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                      }
                      alt={"Author"}
                      css={{
                        border: "2px solid white",
                      }}
                    />
                  </Flex>

                  <Box p={6}>
                    <Stack spacing={2} align={"center"} mb={5}>
                      <Heading
                        fontSize={"2xl"}
                        fontWeight={500}
                        fontFamily={"body"}
                      >
                        John Doe
                      </Heading>
                      <Text color={"gray.500"}>Frontend Developer</Text>
                      <Text color={"gray.500"} textAlign=" center ">
                        is a software developer who is passionate about creating
                        software
                      </Text>
                    </Stack>

                    <Stack direction={"row"} justify={"center"} spacing={6}>
                      <Stack spacing={0} align={"center"}>
                        <Link href="https://i.imgur.com/qJfQ8Zu.jpg">
                          <Icon as={AiFillGithub} size="2xl" color="gray.800" />
                        </Link>
                      </Stack>
                      <Stack spacing={0} align={"center"}>
                        <Link href="https://i.imgur.com/qJfQ8Zu.jpg">
                          <Icon as={FaLinkedinIn} size="2xl" color="gray.800" />
                        </Link>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </Flex>

              {"card2"}
              <Flex
               
              >
                <Box
                  maxW={"200px"}
                  w={"full"}
                  h={"400px"}
                  bg={useColorModeValue("white", "gray.800")}
                  boxShadow={"2xl"}
                  rounded={"md"}
                  overflow={"hidden"}
                >
                  <Image
                    h={"120px"}
                    w={"full"}
                    src={
                      "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                    }
                    objectFit={"cover"}
                  />
                  <Flex justify={"center"} mt={-12}>
                    <Avatar
                      size={"xl"}
                      src={
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                      }
                      alt={"Author"}
                      css={{
                        border: "2px solid white",
                      }}
                    />
                  </Flex>

                  <Box p={6}>
                    <Stack spacing={2} align={"center"} mb={5}>
                      <Heading
                        fontSize={"2xl"}
                        fontWeight={500}
                        fontFamily={"body"}
                      >
                        John Doe
                      </Heading>
                      <Text color={"gray.500"}>Frontend Developer</Text>
                      <Text color={"gray.500"} textAlign=" center ">
                        is a software developer who is passionate about creating
                        software
                      </Text>
                    </Stack>

                    <Stack direction={"row"} justify={"center"} spacing={6}>
                      <Stack spacing={0} align={"center"}>
                        <Link href="https://i.imgur.com/qJfQ8Zu.jpg">
                          <Icon as={AiFillGithub} size="2xl" color="gray.800" />
                        </Link>
                      </Stack>
                      <Stack spacing={0} align={"center"}>
                        <Link href="https://i.imgur.com/qJfQ8Zu.jpg">
                          <Icon as={FaLinkedinIn} size="2xl" color="gray.800" />
                        </Link>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </Flex>
      
            {"card3"}
            <Flex
            
            >
              <Box
                maxW={"200px"}
                w={"full"}
                h={"400px"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
              >
                <Image
                  h={"120px"}
                  w={"full"}
                  src={
                    "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  }
                  objectFit={"cover"}
                />
                <Flex justify={"center"} mt={-12}>
                  <Avatar
                    size={"xl"}
                    src={
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                    }
                    alt={"Author"}
                    css={{
                      border: "2px solid white",
                    }}
                  />
                </Flex>

                <Box p={6}>
                  <Stack spacing={2} align={"center"} mb={5}>
                    <Heading
                      fontSize={"2xl"}
                      fontWeight={500}
                      fontFamily={"body"}
                    >
                      John Doe
                    </Heading>
                    <Text color={"gray.500"}>Frontend Developer</Text>
                    <Text color={"gray.500"} textAlign=" center ">
                      is a software developer who is passionate about creating
                      software
                    </Text>
                  </Stack>

                  <Stack direction={"row"} justify={"center"} spacing={6}>
                    <Stack spacing={0} align={"center"}>
                      <Link href="https://i.imgur.com/qJfQ8Zu.jpg">
                        <Icon as={AiFillGithub} size="2xl" color="gray.800" />
                      </Link>
                    </Stack>
                    <Stack spacing={0} align={"center"}>
                      <Link href="https://i.imgur.com/qJfQ8Zu.jpg">
                        <Icon as={FaLinkedinIn} size="2xl" color="gray.800" />
                      </Link>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Flex>
            {"card4"}
            <Flex
             
            >
              <Box
                maxW={"200px"}
                w={"full"}
                h={"400px"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
              >
                <Image
                  h={"120px"}
                  w={"full"}
                  src={
                    "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  }
                  objectFit={"cover"}
                />
                <Flex justify={"center"} mt={-12}>
                  <Avatar
                    size={"xl"}
                    src={
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                    }
                    alt={"Author"}
                    css={{
                      border: "2px solid white",
                    }}
                  />
                </Flex>

                <Box p={6}>
                  <Stack spacing={2} align={"center"} mb={5}>
                    <Heading
                      fontSize={"2xl"}
                      fontWeight={500}
                      fontFamily={"body"}
                    >
                      John Doe
                    </Heading>
                    <Text color={"gray.500"}>Frontend Developer</Text>
                    <Text color={"gray.500"} textAlign=" center ">
                      is a software developer who is passionate about creating
                      software
                    </Text>
                  </Stack>

                  <Stack direction={"row"} justify={"center"} spacing={6}>
                    <Stack spacing={0} align={"center"}>
                      <Link href="https://i.imgur.com/qJfQ8Zu.jpg">
                        <Icon as={AiFillGithub} size="2xl" color="gray.800" />
                      </Link>
                    </Stack>
                    <Stack spacing={0} align={"center"}>
                      <Link href="https://i.imgur.com/qJfQ8Zu.jpg">
                        <Icon as={FaLinkedinIn} size="2xl" color="gray.800" />
                      </Link>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Flex>

            {"card5"}
            <Flex
             
            >
              <Box
                maxW={"200px"}
                w={"full"}
                h={"400px"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
              >
                <Image
                  h={"120px"}
                  w={"full"}
                  src={
                    "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  }
                  objectFit={"cover"}
                />
                <Flex justify={"center"} mt={-12}>
                  <Avatar
                    size={"xl"}
                    src={
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                    }
                    alt={"Author"}
                    css={{
                      border: "2px solid white",
                    }}
                  />
                </Flex>

                <Box p={6}>
                  <Stack spacing={2} align={"center"} mb={5}>
                    <Heading
                      fontSize={"2xl"}
                      fontWeight={500}
                      fontFamily={"body"}
                    >
                      John Doe
                    </Heading>
                    <Text color={"gray.500"}>Frontend Developer</Text>
                    <Text color={"gray.500"} textAlign=" center ">
                      is a software developer who is passionate about creating
                      software
                    </Text>
                  </Stack>

                  <Stack direction={"row"} justify={"center"} spacing={6}>
                    <Stack spacing={0} align={"center"}>
                      <Link href="https://i.imgur.com/qJfQ8Zu.jpg">
                        <Icon as={AiFillGithub} size="2xl" color="gray.800" />
                      </Link>
                    </Stack>
                    <Stack spacing={0} align={"center"}>
                      <Link href="https://i.imgur.com/qJfQ8Zu.jpg">
                        <Icon as={FaLinkedinIn} size="2xl" color="gray.800" />
                      </Link>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Flex>
            </Flex>
        </Stack>
      </Flex>
    </Center>
  );
}
/* 

     {/* 
              <IconButton
                textAlign="center"
                borderRadius="100px"
                w="70px"
                h="70px"
                as={AiFillGithub}
                _hover={{ transform: "scale(1.5)" }}
              /> */

{
  /* <Button
                leftIcon={<FaLinkedinIn />}
                w={"full"}
                mt={8}
                bg={useColorModeValue("#151f21", "gray.900")}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Follow on LinkedIn
              </Button> */
}
{
  /* <Button
                  leftIcon={<FaLinkedinIn />}
                w={"full"}
                mt={8}
                bg={useColorModeValue("#151f21", "gray.900")}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Follow on LinkedIn
//               </Button> */
}
//   <Center>
//         {" "}
//         <Flex
//         margin='20vw'
//             align='center'
//             direction='column'
//             w='100%'
//           h={[null, null, "100vh"]}

//           maxW="2000px"
//           flexDir={["column"]}
//           overflow="hidden"
//         >
//           <Stack spacing={4}>
//             <Heading
//               as="h1"
//               size="2xl"
//               fontWeight="bold"
//               color="gray.800"
//               textAlign="center"
//               mb="10px"
//             >
//               About Us
//             </Heading>
//             <Heading
//               fontSize="xl"
//               color="gray.800"
//               textAlign="center"
//               mb="10px"
//             >
//               Our Team
//             </Heading>
//             <Text fontSize="xl" color="gray.800" textAlign="center" mb="10px">
//               We are a team of developers who are passionate about creating
//               software that helps people.
//             </Text>
//           </Stack>

//           <Divider />
//           <Divider />
//           <Stack spacing={2}>
//             <Flex>
//               <Stack spacing={4}>
//                 <Box
//                   bg="red"
//                   h={[null, null, "40vh"]}
//                   maxW="400vw"
//                   flexDir={["row", "row", "row", "row"]}
//                   overflow="hidden"
//                 >
//                   <Heading
//                     as="h1"
//                     size="2xl"
//                     fontWeight="bold"
//                     color="gray.800"
//                     textAlign="center"
//                     mb="10px"
//                   >
//                     rami khan
//                   </Heading>
//                   <Image src="https://i.imgur.com/qJfQ8Zu.jpg" alt="rami" />
//                   <Text
//                     fontSize="xl"
//                     color="gray.800"
//                     textAlign="center"
//                     mb="10px"
//                   >
//                     is a software developer who is passionate about creating
//                     software
//                   </Text>
//                   <Link href="https://i.imgur.com/qJfQ8Zu.jpg">
//                     <Icon as={AiFillGithub} size="2xl" color="gray.800" />
//                   </Link>
//                   <Link href="https://i.imgur.com/qJfQ8Zu.jpg">
//                     <Icon as={FaLinkedinIn} size="2xl" color="gray.800" />
//                   </Link>
//                 </Box>
//               </Stack>
//             </Flex>
//           </Stack>
//         </Flex>
//       </Center>
//     </>
