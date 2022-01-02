import React, { useEffect, useState, useContext } from "react";
// import {useDispatch} from "react-redux"
import axios from "axios";
import { useDispatch } from "react-redux";
import { newDataTelephone, newDataOnSite } from "../redux/actions";
import { useSelector } from "react-redux";
import {
  Button,
  Flex,
  Heading,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { LoginContext } from "../components/auth/context";
import Auth from "../components/auth/auth";

function Customer() {
  const ontext = useContext(LoginContext);
  console.log(ontext);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
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
    });
  }, [ontext.user.username]);
  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (inputField.department === "Telephone") {
      await axios.post(
        "https://project401.herokuapp.com/telephoneTicket",
        inputField
      );
      dispatch(newDataTelephone());
    }

    if (inputField.department === "OnSite") {
      await axios.post(
        "https://project401.herokuapp.com/onSiteTicket",
        inputField
      );
      dispatch(newDataOnSite());
      console.log("selector for onsite", selector.onSite);
    }
    console.log("inputField", inputField);
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
        <br/><FormControl>
          <FormLabel>Subject</FormLabel>
          <Input
            type="text"
            name="subject"
            onChange={inputsHandler}
            value={inputField.subject}
          />
        </FormControl>
        <br/><FormControl>
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
        <br/>{inputField.department === "Telephone" ? (
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
        <br/><FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            onChange={inputsHandler}
            value={inputField.description}
            size="lg"
          />
        </FormControl>
        {/* <Auth capabilities={"delete"}>    </Auth> */}
        <br/><br/>
        <Button
          onClick={onSubmit}
          colorScheme="alphaBlack"
          bgColor="blackAlpha.900"
          color="#fff"
          minH="45px"
        >
          Submit
        </Button>
      </Flex>
      {/* </Auth> */}
    </>
  );
}

export default Customer;
