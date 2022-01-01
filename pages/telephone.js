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
} from "@chakra-ui/react";
import { LoginContext } from "../components/auth/context";
import axios from "axios";
import { connect } from "react-redux";
function Telephone({ newData }) {
  const Context = useContext(LoginContext);
  const [display, changeDisplay] = useState("hide");
  const [resData, setResData] = useState({
    username: Context.user.username,
    response: {},
  });
  const [data, setdata] = useState(null)
  const [telephoneData, setTelephoneData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const SelectorData = useSelector((state) => state.newData);
  function handleChange(item) {
    console.log(item);
    let obj = {
      ...item,
      status: "processed",
    };

    axios
      .put(`https://project401.herokuapp.com/telephoneTicket/${obj.id}`, obj)
      .then((res) => {
        axios
          .get("https://project401.herokuapp.com/telephoneTicket")
          .then((res) => {
            setTelephoneData(res.data);
          });
      });
      setdata(item);
  }
  useEffect(() => {
    setResData({ username: Context.user.username, response: "" });
  }, [Context.user.username]);

  const inputsHandler = (e) => {
    setResData({ ...resData, [e.target.name]: e.target.value });
  };
  function responseForm() {
    let obj = {
      username: resData.username,
      response:JSON.stringify({customername: data.customerName, message: resData.response}),
    };
    axios.post(`https://project401.herokuapp.com/response`, obj).then((res) => {
       console.log(res.data)
      //  console.log(JSON.parse(res.data.response));
    });
    console.log(data.customerName)
  }

  function handleDelete(item) {
    axios
      .delete(`https://project401.herokuapp.com/telephoneTicket/${item.id}`)
      .then((res) => {
        axios
          .get("https://project401.herokuapp.com/telephoneTicket")
          .then((res) => {
            setTelephoneData(res.data);
          });
      });
  }

  useEffect(() => {
    axios
      .get("https://project401.herokuapp.com/telephoneTicket")
      .then((res) => {
        setTelephoneData(res.data);
      });
  }, [newData]);

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
                    <Th>Subject </Th>
                    <Th>Customer Name</Th>
                    <Th>Phone Number</Th>
                    <Th>State</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {telephoneData?.map((item, i) => {
                    return (
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
                          {" "}
                          <Flex align="center"> {item.phoneNumber} </Flex>
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
                    );
                  })}
                </Tbody>
              </Table>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>username</FormLabel>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  onChange={inputsHandler}
                  defaultValue={resData.username}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Response</FormLabel>
                <Input
                  type="text"
                  name="response"
                  id="response"
                  onChange={()=> {
                    inputsHandler
                    onClose()
                  }}
                  value={resData.response}
                />
              </FormControl>
              <Button onClick={responseForm} colorScheme="teal" size="md">
                Submit
              </Button>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
}
export default connect((state) => {
  return {
    newData: state.newData,
  };
}, null)(Telephone);
