import React, { useEffect, useState } from "react";
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
  ButtonGroup,
  propNames,
} from "@chakra-ui/react";
import axios from "axios";
import { connect } from "react-redux";
function Telephone({ newData }) {
  const [display, changeDisplay] = useState("hide");
  const [telephoneData, setTelephoneData] = useState([]);

  const SelectorData = useSelector((state) => state.newData);
  function handleChange(item) {
    console.log(item)
    let obj = {
      ...item,
      status: "processed",
    };
    console.log(obj)
    axios.put(
      `https://project401.herokuapp.com/telephoneTicket/${obj.id}`,
      obj
    )
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
  console.log(telephoneData);

  return (
    <>
      <Flex flexDir="column" algin="center" overflow="auto">
        <Flex
          h={[null, null, "100vh"]}
          maxW="2000px"
          algin="center"
          flexDir={["column", "column", "column", "column"]}
          overflow="hidden"
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
                          <Button onClick={() => handleChange(item)}>
                            {item.status}
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
    </>
  );
}
export default connect((state) => {
  return {
    newData: state.newData,
  };
}, null)(Telephone);
