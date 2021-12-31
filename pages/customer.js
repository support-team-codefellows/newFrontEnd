import React, { useEffect, useState, useContext } from "react";
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
import { LoginContext } from "../components/auth/context";
import Auth from "../components/auth/auth";

function Customer() {
  const ontext = useContext(LoginContext);

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
      <Auth>
        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="text"
            name="phoneNumber"
            onChange={inputsHandler}
            value={inputField.phoneNumber}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Subject</FormLabel>
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
          <FormLabel>Description</FormLabel>

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
      </Auth>
    </>
  );
}

export default Customer;
