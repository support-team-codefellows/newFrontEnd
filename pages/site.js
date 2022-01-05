import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import useInterval from "../components/hooks/useInterval";
import {
  Flex,
  Heading,
  Avatar,
  Text,
  Icon,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Box,
  Container,
  Td,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  IconButton
} from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'

import { LoginContext } from "../components/auth/context";
import axios from "axios";
import { connect } from "react-redux";

function Site({ onSite }) {
  const Context = useContext(LoginContext);
  const [display, changeDisplay] = useState("hide");
  const [resData, setResData] = useState({
    username: Context.user.username,
    response: {
      date: "",
      time: "",
    },
  });

  const [data, setData] = useState(null);
  const [siteData, setSiteData] = useState([]);
  const [newTickets, setNewTickets] = useState([]);
  const [processedTickets, setProcessedTickets] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const SelectorData = useSelector((state) => state.onSite);
  const [unprocessedFlag, setUnprocessedFlag] = useState(true);
  const [processedFlag, setProcessedFlag] = useState(false);
  const [allFlag, setAllFlag] = useState(false);
  const [currentTicket, setCurrentTicket] = useState({});

  function handleChange(item) {
    console.log(item);
  }

  useEffect(() => {
    setResData({ ...resData, username: Context.user.username });
  }, [resData,Context.user.username]);

  const inputsHandler = (e) => {
    setResData({ ...resData, [e.target.name]: e.target.value });
  };

  const inputsHandler2 = (e) => {
    setResData({
      ...resData,
      response: {
        ...resData.response,
        [e.target.name]: e.target.value,
      },
    });
  };

  function switchToNew() {
    setProcessedFlag(false);
    setAllFlag(false);
    setUnprocessedFlag(true);
  }

  function switchToProcessed() {
    setUnprocessedFlag(false);
    setAllFlag(false);
    setProcessedFlag(true);
  }

  function switchToAll() {
    setUnprocessedFlag(false);
    setProcessedFlag(false);
    setAllFlag(true);
  }

  function responseForm(item) {
    let obj = {
      ...item,
      status: "processed",
      customerName: "marwan",
      username: resData.username,
      response: JSON.stringify(resData.response),
    };
    console.log("OBJECT -> ", obj);
    axios
      .put(`https://test-401.herokuapp.com/onSiteTicket/${obj.id}`, obj)
      .then((res) => {
        axios.get("https://test-401.herokuapp.com/onSiteTicket").then((res) => {
          setSiteData(res.data);
          setNewTickets(
            res.data.filter((item) => item.status === "unprocessed")
          );
          setProcessedTickets(
            res.data.filter((item) => item.status === "processed")
          );
        });
      });
  }

  function handleDelete(item) {
    axios
      .delete(`https://test-401.herokuapp.com/onSiteTicket/${item.id}`)
      .then((res) => {
        axios.get("https://test-401.herokuapp.com/onSiteTicket").then((res) => {
          setSiteData(res.data);
          setNewTickets(
            res.data.filter((item) => item.status === "unprocessed")
          );
          setProcessedTickets(
            res.data.filter((item) => item.status === "processed")
          );
        });
      });
  }

  // short polling:
  useInterval(() => {
    console.log("short polling is working");
    axios.get("https://test-401.herokuapp.com/onSiteTicket").then((res) => {
      if (res.data?.length !== siteData?.length) {
        console.log(">> the on-site department has received new data");
        setSiteData(res.data);
        setNewTickets(res.data.filter((item) => item.status === "unprocessed"));
        setProcessedTickets(
          res.data.filter((item) => item.status === "processed")
        );
      }
    });
  }, 6000);

  useEffect(() => {
    axios.get("https://test-401.herokuapp.com/onSiteTicket").then((res) => {
      setSiteData(res.data);
      setNewTickets(res.data.filter((item) => item.status === "unprocessed"));
      setProcessedTickets(
        res.data.filter((item) => item.status === "processed")
      );
    });
  }, [onSite]);

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
          The On-Site Department
        </Heading>
        <Text fontSize="small" color="gray" ml={1}>
          {new Date().toLocaleDateString(undefined, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            weekday: "short",
          })}
        </Text>
        {/* The Cards */}
        <Box maxW="7xl" mx={"50%"} pt={5} ml={1}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <Stat
              px={{ base: 2, md: 4 }}
              py={"5"}
              shadow={"xl"}
              border={"1px solid"}
              borderColor={("gray.800", "gray.500")}
              rounded={"lg"}
              onClick={switchToNew}
              cursor={"pointer"}
            >
              <Flex justifyContent={"space-between"}>
                <Box pl={{ base: 2, md: 4 }}>
                  <StatLabel fontWeight={"medium"} isTruncated>
                    New
                  </StatLabel>
                  <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                    {newTickets.length}
                  </StatNumber>
                </Box>
              </Flex>
            </Stat>
            <Stat
              px={{ base: 2, md: 4 }}
              py={"5"}
              shadow={"xl"}
              border={"1px solid"}
              borderColor={("gray.800", "gray.500")}
              rounded={"lg"}
              onClick={switchToProcessed}
              cursor={"pointer"}
            >
              <Flex justifyContent={"space-between"}>
                <Box pl={{ base: 2, md: 4 }}>
                  <StatLabel fontWeight={"medium"} isTruncated>
                    Processed
                  </StatLabel>
                  <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                    {processedTickets.length}
                  </StatNumber>
                </Box>
              </Flex>
            </Stat>
            <Stat
              px={{ base: 2, md: 4 }}
              py={"5"}
              shadow={"xl"}
              border={"1px solid"}
              borderColor={("gray.800", "gray.500")}
              rounded={"lg"}
              onClick={switchToAll}
              cursor={"pointer"}
            >
              <Flex justifyContent={"space-between"}>
                <Box pl={{ base: 2, md: 4 }}>
                  <StatLabel fontWeight={"medium"} isTruncated>
                    Total
                  </StatLabel>
                  <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                    {siteData.length}
                  </StatNumber>
                </Box>
              </Flex>
            </Stat>
          </SimpleGrid>
        </Box>
        {/* The New Tickets Table */}
        {/* The Table's Header */}
        {unprocessedFlag && (
          <>
            <Flex justifyContent="space-between" mt={8}>
              <Flex align="flex-end">
                <Heading as="h2" size="lg" letterSpacing="tight">
                  New Tickets
                </Heading>
              </Flex>
            </Flex>
            {/* The Table's code */}
            <Flex flexDir="column">
              <Flex overflow="auto">
                <Table variant="unstyled" mt={4}>
                  <Thead>
                    <Tr color="gray">
                      <Th>Subject</Th>
                      <Th>Customer Name</Th>
                      <Th>State</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {newTickets?.map((item, i) => {
                      return (
                        <>
                          <Tr key={i}>
                            <Td maxW="200px">
                              <Flex flexDir="column">
                                <b>{item.subject}</b>
                                <Text fontSize="sm" color="gray">
                                  {item.createdAt}
                                </Text>
                              </Flex>
                            </Td>
                            <Td>
                              <Flex align="center">
                                <Flex flexDir="column">
                                  {item.customerName}
                                </Flex>
                              </Flex>
                            </Td>
                            <Td>
                              <Flex align="center">
                                <Flex flexDir="column">{item.status}</Flex>
                              </Flex>
                            </Td>
                            <Td>
                              <Button
                                onClick={() => {
                                  setCurrentTicket(item);
                                  onOpen();
                                }}
                                colorScheme="blackAlpha"
                                bgColor="blackAlpha.900"
                                color="#fff"
                              >
                                Claim
                              </Button>
                            </Td>
                          </Tr>
                        </>
                      );
                    })}
                  </Tbody>
                </Table>
              </Flex>
            </Flex>{" "}
          </>
        )}
        {/* The New Tickets Table End */}

        {/* The Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {currentTicket.subject}
              <br />
              <Text fontSize="sm" color="gray">
                {currentTicket.createdAt}
              </Text>
              <hr />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                <b>Customer Name:</b> {currentTicket.customerName}{" "}
              </Text>
              <Text>
                <b>Description:</b> {currentTicket.description}{" "}
              </Text>
              <br />
              <FormControl>
                <FormLabel>Claimed by:</FormLabel>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  onChange={inputsHandler}
                  defaultValue={resData.username}
                />
              </FormControl>
              <FormControl>
                <FormLabel  marginTop={"2vh"}>Appointment Details</FormLabel>
                <Input type="date" name="date" onChange={inputsHandler2} marginBottom={"1vh"}/>
                <Input
                  type="time"
                  name="time"
                  min="09:00"
                  max="15:00"
                  onChange={inputsHandler2}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => {
                  responseForm(currentTicket);
                  onClose();
                }}
                size="md"
                bgColor="blackAlpha.900"
                color="#fff"
                marginRight={"1vw"}
              >
                Submit
              </Button>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* The Processed Tickets Table */}
        {/* The Table's Header */}
        {processedFlag && (
          <>
            <Flex justifyContent="space-between" mt={8}>
              <Flex align="flex-end">
                <Heading as="h2" size="lg" letterSpacing="tight">
                  Processed Tickets
                </Heading>
              </Flex>
            </Flex>
            {/* The Table's code */}
            <Flex flexDir="column">
              <Flex overflow="auto">
                <Table variant="unstyled" mt={4}>
                  <Thead>
                    <Tr color="gray">
                      <Th>Subject</Th>
                      <Th>Customer Name</Th>
                      <Th>State</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {processedTickets?.map((item, i) => {
                      return (
                        <>
                          <Tr key={i}>
                            <Td maxW="200px">
                              <Flex flexDir="column">
                                <b>{item.subject}</b>
                                <Text fontSize="sm" color="gray">
                                  {item.createdAt}
                                </Text>
                              </Flex>
                            </Td>
                            <Td>
                              <Flex align="center">
                                <Flex flexDir="column">
                                  {item.customerName}
                                </Flex>
                              </Flex>
                            </Td>
                            <Td>
                              <Flex align="center">
                                <Flex flexDir="column">{item.status}</Flex>
                              </Flex>
                            </Td>
                            <Td>
                              <IconButton onClick={() => handleDelete(item)}>
                                <DeleteIcon />
                              </IconButton>
                            </Td>
                          </Tr>
                        </>
                      );
                    })}
                  </Tbody>
                </Table>
              </Flex>
            </Flex>{" "}
          </>
        )}
        {/* The Processed Tickets Table End */}

        {/* All Tickets Table */}
        {/* The Table's Header */}
        {allFlag && (
          <>
            <Flex justifyContent="space-between" mt={8}>
              <Flex align="flex-end">
                <Heading as="h2" size="lg" letterSpacing="tight">
                  All Tickets
                </Heading>
              </Flex>
            </Flex>
            {/* The Table's code */}
            <Flex flexDir="column">
              <Flex overflow="auto">
                <Table variant="unstyled" mt={4}>
                  <Thead>
                    <Tr color="gray">
                      <Th>Subject</Th>
                      <Th>Customer Name</Th>
                      <Th>State</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {siteData?.map((item, i) => {
                      return (
                        <>
                          <Tr key={i}>
                            <Td maxW="200px">
                              <Flex flexDir="column">
                                <b>{item.subject}</b>
                                <Text fontSize="sm" color="gray">
                                  {item.createdAt}
                                </Text>
                              </Flex>
                            </Td>
                            <Td>
                              <Flex align="center">
                                <Flex flexDir="column">
                                  {item.customerName}
                                </Flex>
                              </Flex>
                            </Td>
                            <Td>
                              <Flex align="center">
                                <Flex flexDir="column">{item.status}</Flex>
                              </Flex>
                            </Td>
                          </Tr>
                        </>
                      );
                    })}
                  </Tbody>
                </Table>
              </Flex>
            </Flex>{" "}
          </>
        )}
        {/* All Tickets Table End */}
      </Flex>
    </>
  );
}
export default connect((state) => {
  return {
    onSite: state.onSite,
  };
}, null)(Site);
