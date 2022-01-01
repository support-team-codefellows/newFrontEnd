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
  Select,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const SelectorData = useSelector((state) => state.onSite);

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
          });
      });
  }

  useEffect(() => {
    axios.get("https://project401.herokuapp.com/onSiteTicket").then((res) => {
      setSiteData(res.data);
    });
  }, [onSite]);

  return (
    <>
      <Flex flexDir="column" algin="center" w="150vw">
        <Flex
          h={[null, null, "100vh"]}
          maxW="100vw"
          algin="center"
          flexDir={["column", "column", "column", "column"]}
          overflow="scroll"
        >
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
                              {item.subject}
                              <Text fontSize="sm" color="gray">
                                {item.createdAt}
                              </Text>
                            </Flex>
                          </Td>
                          <Td>
                            <Flex align="center">
                              <Flex flexDir="column">{item.customerName}</Flex>
                            </Flex>
                          </Td>
                          <Td>
                            <Button
                              onClick={() => {
                                handleChange(item);
                                onOpen();
                              }}
                            >
                              {item.status}
                            </Button>
                            <Button onClick={() => handleDelete(item)}>
                              delete
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
                                <Text><b>Customer Name:</b> {item.customerName} </Text>
                                <Text><b>Description:</b> {item.description} </Text><br/>
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
                                {/* <Input
                                  type="text"
                                  name="response"
                                  id="response"
                                  onChange={() => {
                                    inputsHandler;
                                    onClose();
                                  }}
                                  value={resData.response}
                                /> */}
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
                                onClick={()=>responseForm(item)}
                                colorScheme="blue"
                                size="md"
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
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
export default connect((state) => {
  return {
    onSite: state.onSite,
  };
}, null)(Site);
