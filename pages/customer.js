import React, { useEffect, useState, useContext } from "react";
// import {useDispatch} from "react-redux"
import axios from "axios";
import ReactStars from "react-stars";
import { useDispatch } from "react-redux";
// import { AlertIcon } from '@chakra-ui/icons'
import { newDataTelephone, newDataOnSite } from "../redux/actions";
import { useSelector } from "react-redux";
import useInterval from "../components/hooks/useInterval";
import {
  Button,
  Flex,
  Heading,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  Text,
  Stat,
  StatLabel,
  Box,
  Textarea,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { LoginContext } from "../components/auth/context";
import Auth from "../components/auth/auth";
import { connect } from "react-redux";
function Customer() {
  const ontext = useContext(LoginContext);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const [responsesArray, setResponsesArray] = useState([]);
  const [sentSuccessfully, setSentSuccessfully] = useState(false);
  const [rate, setRate] = useState({ reating: 0, username: "" });
  const [inputField, setInputField] = useState({
    customerName: ontext.user.username,
    phoneNumber: "",
    subject: "",
    department: "",
    description: "",
    status: "unprocessed",
  });

  useEffect(() => {
    setInputField({
      customerName: ontext.user.username,
      phoneNumber: "",
      subject: "",
      department: "",
      description: "",
      status: "unprocessed",
      username: "",
      response: "",
    });
  }, [ontext.user.username]);

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getResponses();
  }, [responsesArray]);

  // short polling:
  useInterval(async () => {
    let myCustomer = ontext.user.username;
    let responses = await axios.get(
      "https://test-401.herokuapp.com/telephoneTicket"
    );
    let responses2 = await axios.get(
      "https://test-401.herokuapp.com/onSiteTicket"
    );
    let receivedResponses = [
      ...responses.data.filter((item) => Object.keys(item.response).length && item.customerName === myCustomer),
      ...responses2.data.filter((item) => Object.keys(item.response).length && item.customerName === myCustomer),
    ];
    if (receivedResponses?.length !== responsesArray?.length) {
      console.log(">> the customer has received new responses");
      setResponsesArray([...receivedResponses]);
    }
  }, 6000);

  async function getResponses() {
    let myCustomer = ontext.user.username;
    let responses = await axios.get(
      "https://test-401.herokuapp.com/telephoneTicket"
    );
    let responses2 = await axios.get(
      "https://test-401.herokuapp.com/onSiteTicket"
    );
    setResponsesArray([
      ...responses.data.filter((item) => Object.keys(item.response).length && item.customerName === myCustomer),
      ...responses2.data.filter((item) => Object.keys(item.response).length && item.customerName === myCustomer),
    ]);
  }

  const onSubmit = async () => {
    if (inputField.department === "Telephone") {
      await axios.post(
        "https://test-401.herokuapp.com/telephoneTicket",
        inputField
      );
      dispatch(newDataTelephone());
    }

    if (inputField.department === "OnSite") {
      await axios.post(
        "https://test-401.herokuapp.com/onSiteTicket",
        inputField
      );
      dispatch(newDataOnSite());
    }
    setSentSuccessfully(true);
    setTimeout(() => {
      setSentSuccessfully(false);
    }, 3000);
  };

  const ratingChanged = (newRating, item) => {
    dispatch({
      type: "RATING",
      payload: {
        rating: newRating,
        username: item.username,
      },
    });

    axios.post(
      "https://test-401.herokuapp.com/rate",
      rate
    );
    setRate({ reating: newRating, username: item.username });

  };

  return (
    <>
      {/* <Auth> */}
      <Flex
        w={["100%", "100%", "90%", "90%", "85%"]}
        p="3%"
        flexDir="column"
        overflow="auto"
        minH="100vh"
      >
        <Heading fontWeight="bold" mb={3} letterSpacing="tight">
          {" "}
          Submit a Ticket
        </Heading>
        <br />
        <FormControl>
          <FormLabel>Subject</FormLabel>
          <Input
            type="text"
            name="subject"
            onChange={inputsHandler}
            value={inputField.subject}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel htmlFor="country">Department</FormLabel>
          <Select
            size="lg"
            id="department"
            name="department"
            onChange={inputsHandler}
          >
            <option value="">....</option>
            <option value="OnSite">OnSite</option>
            <option value="Telephone">Telephone</option>
          </Select>
        </FormControl>
        <br />
        {inputField.department === "Telephone" ? (
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="text"
              name="phoneNumber"
              onChange={inputsHandler}
              value={inputField.phoneNumber}
            />
          </FormControl>
        ) : (
          <></>
        )}
        <br />
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            onChange={inputsHandler}
            value={inputField.description}
            size="lg"
          />
        </FormControl>
        {/* <Auth capabilities={"delete"}>    </Auth> */}
        <br />
        <br />
        {!sentSuccessfully ? <Button
          onClick={onSubmit}
          colorScheme="alphaBlack"
          bgColor="blackAlpha.900"
          color="#fff"
          minH="45px"
          >
          Submit
        </Button> : <Button
          colorScheme="whatsapp"
          minH="45px"
        >
          Sent Successfully
        </Button>}
        <>
          <br />
          <Heading as="h2" size="lg" letterSpacing="tight">
            Responses
          </Heading>
          <br />
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            {responsesArray.length &&
              responsesArray.map((item, idx) => (
                <>
                  <Stat
                    key={idx}
                    px={{ base: 2, md: 4 }}
                    py={"5"}
                    shadow={"xl"}
                    border={"1px solid"}
                    borderColor={("gray.800", "gray.500")}
                    rounded={"lg"}
                  >
                    <Flex justifyContent={"space-between"}>
                      <Box pl={{ base: 2, md: 4 }}>
                        {item.department === "OnSite" ? (
                          <StatLabel fontWeight={"medium"} isTruncated>
                            <Text fontSize="md" fontWeight="bold">
                              Response for {item.subject}
                            </Text>
                            <br />
                            <b>Date: </b>
                            {JSON.parse(item.response).date}
                            <br />
                            <b>Time: </b>
                            {JSON.parse(item.response).time}
                          </StatLabel>
                        ) : (
                          <StatLabel fontWeight={"medium"} isTruncated>
                            <Text fontSize="md" fontWeight="bold">
                              Response for {item.subject}
                            </Text>
                            <br />
                            {item.response}
                          </StatLabel>
                        )}
                        <br />
                        <Text fontSize="md">
                          <b>Rate</b> {item.username}
                        </Text>
                        <ReactStars
                          count={5}
                          onChange={(newRating) =>
                            ratingChanged(newRating, item)
                          }
                          size={24}
                          color2={"#ffd700"}
                        />
                      </Box>
                    </Flex>
                  </Stat>{" "}
                </>
              ))}
          </SimpleGrid>
        </>
      </Flex>

      {/* </Auth> */}
    </>
  );
}

export default Customer;
