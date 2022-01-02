import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
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
} from "@chakra-ui/react";
import { LoginContext } from "../components/auth/context";
import axios from "axios";
import { connect } from "react-redux";

function Site({ onSite }) {
  const Context = useContext(LoginContext);
  const [display, changeDisplay] = useState("hide");
  const [resData, setResData] = useState({
    username: Context.user.username,
    response: {
      customername: "",
      message: {
        date: "",
        time: "",
      },
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

  function handleChange(item) {
    console.log(item);
  }

  useEffect(() => {
    setResData({ ...resData, username: Context.user.username });
  }, [Context.user.username]);

  const inputsHandler = (e) => {
    setResData({ ...resData, [e.target.name]: e.target.value });
  };

  const inputsHandler2 = (e) => {
    setResData({
      ...resData,
      response: {
        ...resData.response,
        message: {
          ...resData.response.message,
          [e.target.name]: e.target.value,
        },
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
    };
    axios
      .put(`https://project401.herokuapp.com/onSiteTicket/${obj.id}`, obj)
      .then((res) => {
        axios
          .get("https://project401.herokuapp.com/onSiteTicket")
          .then((res) => {
            setSiteData(res.data);
            setNewTickets(res.data.filter((item) => item.status === "unprocessed"));
            setProcessedTickets(res.data.filter((item) => item.status === "processed"));
          });
      });
    let responseObj = {
      username: resData.username,
      response: JSON.stringify({
        // customername: item.customerName,
        customername: "marwan", // REMOVE THIS AND KEEP THE ABOVE, I JUST DID IT FOR TESTING PURPOSES //
        message: resData.response,
      }),
    };
    axios
      .post(`https://project401.herokuapp.com/response`, responseObj)
      .then((res) => {
        console.log(res.data);
        //  console.log(JSON.parse(res.data.response));
      });
  }

  function handleDelete(item) {
    axios
      .delete(`https://project401.herokuapp.com/onSiteTicket/${item.id}`)
      .then((res) => {
        axios
          .get("https://project401.herokuapp.com/onSiteTicket")
          .then((res) => {
            setSiteData(res.data);
            setNewTickets(res.data.filter((item) => item.status === "unprocessed"));
            setProcessedTickets(res.data.filter((item) => item.status === "processed"));
          });
      });
  }

  useEffect(() => {
    axios.get("https://project401.herokuapp.com/onSiteTicket").then((res) => {
      setSiteData(res.data);
      setNewTickets(res.data.filter((item) => item.status === "unprocessed"));
      setProcessedTickets(res.data.filter((item) => item.status === "processed"));
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
            <Flex justifyContent="space-between" mt={8} >
              <Flex align="flex-end" >
                <Heading as="h2" size="lg" letterSpacing="tight" >
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
                                onClick={onOpen}
                                colorScheme="blackAlpha"
                                bgColor="blackAlpha.900"
                                color="#fff"
                              >
                                Claim
                              </Button>
                            </Td>
                          </Tr>
                          <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>
                                {item.subject}
                                <br />
                                <Text fontSize="sm" color="gray">
                                  {item.createdAt}
                                </Text>
                                <hr />
                              </ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <Text>
                                  <b>Customer Name:</b> {item.customerName}{" "}
                                </Text>
                                <Text>
                                  <b>Description:</b> {item.description}{" "}
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
                                  <FormLabel>Appointment Details</FormLabel>
                                  <Input
                                    type="date"
                                    name="date"
                                    onChange={inputsHandler2}
                                  />
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
                                  onClick={() => responseForm(item)}
                                  size="md"
                                  bgColor="blackAlpha.900"
                                  color="#fff"
                                >
                                  Submit
                                </Button>
                                <Button
                                  colorScheme="blackAlpha"
                                  mr={3}
                                  onClick={onClose}
                                >
                                  Close
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
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
                              <Button onClick={() => handleDelete(item)}>
                                delete
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
