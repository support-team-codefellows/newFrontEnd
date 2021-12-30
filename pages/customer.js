import React, { useEffect, useState } from "react";
// import {useDispatch} from "react-redux"
import axios from "axios";
import { useDispatch } from "react-redux";
import { newDataTelephone, newDataOnSite } from "../redux/actions";
import { useSelector } from "react-redux";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";

function Customer() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const [inputField, setInputField] = useState({
    customerName: "",
    phoneNumber: "",
    subject: "",
    department: "",
    description: "",
    status: "unprocessed",
  });

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    // console.log("inputField", inputField);

    if (inputField.department === "Telephone") {
      await axios.post(
        "https://project401.herokuapp.com/telephoneTicket",
        inputField
      );
      dispatch(newDataTelephone());
    }
    console.log("selectorfor newData", selector.newData);

    if (inputField.department === "OnSite") {
      await axios.post(
        "https://project401.herokuapp.com/onSiteTicket",
        inputField
      );
      dispatch(newDataOnSite());
      console.log("selector for onsite", selector.onSite);
    }
  };

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="email">Username</FormLabel>
        <Input
          type="text"
          name="customerName"
          onChange={inputsHandler}
          value={inputField.customerName}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="email">Phone Number</FormLabel>
        <Input
          type="text"
          name="phoneNumber"
          onChange={inputsHandler}
          value={inputField.phoneNumber}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="email">Subject</FormLabel>
        <Input
          type="text"
          name="subject"
          onChange={inputsHandler}
          value={inputField.subject}
        />
      </FormControl>

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

      <FormControl>
        <FormLabel htmlFor="email">Description</FormLabel>

        <Textarea
          name="description"
          onChange={inputsHandler}
          value={inputField.description}
          size="lg"
        />
      </FormControl>

      <Button onClick={onSubmit} colorScheme="teal" size="md">
        Submit
      </Button>
    </>
  );
}

export default Customer;
