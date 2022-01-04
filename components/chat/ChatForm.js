/* eslint-disable react-hooks/rules-of-hooks */
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import {
  Button,
  Input,
  Stack,
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Text,
  FormLabel,
} from "@chakra-ui/react";
import { LoginContext } from "../auth/context";
import Router from "next/router";
import { useContext, useEffect } from "react";
import { If, Else } from "react-if";
import { Data } from "../faqData";
const socket = io.connect("https://project401.herokuapp.com/");
function chatFrom() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isdata, setisdata] = useState("");
  const [data, setdata] = useState({ question: "", answer: "" });
  const Context = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [fail, setfail] = useState(
    "Sorry, we don't have answer for your question, please take the time to chat with us"
  );
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    setUsername(Context?.user?.username);
    setShowModal(true);
  }, [Context.user.username]);

  const joinRoom = () => {
    setRoom("1");
    if (username !== "" && room !== "") {
      socket.emit("joinRoom", room);
      setShowChat(true);
    }
  };

  console.log(isdata);
  const handleSerach = (e) => {
    setdata({ question: "", answer: "" });
    const question = isdata;
    const filtered = Data.filter((value) => {
      return value.question.toLowerCase().includes(question.toLowerCase());
    });

    setisdata("");

    if (filtered.length === 0 || filtered === false || question === "") {
      setfail(
        "Sorry, we don't have answer for your question, please take the time to chat with us"
      );
    } else {
      setdata({ question: filtered[0].question, answer: filtered[0].answer });
    }
  };

  return (
    <>
      <If condition={Context.loggedIn}>
        <Flex
          className="App"
          flexDir="Column"
          justifyContent="center"
          align="center"
        >
          {showModal ? (
            <>
              <Input
                placeholder="you have a question?"
                onChange={(e) => setisdata((isdata = e.target.value))}
                size="lg"
                width="100%"
                borderRadius="md"
                borderColor="gray.200"
                _focus={{
                  borderColor: "blue.500",
                }}
              />

              {isdata === "" ? (
                <></>
              ) : (
                <Button
                  colorScheme="blackAlpha"
                  onClick={() => {
                    handleSerach();
                    onOpen();
                  }}
                  value={isdata.question}
                  bgColor="blackAlpha.900"
                  color="#fff"
                >
                  Search
                </Button>
              )}
            </>
          ) : (
            <></>
          )}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader width="40vw">
                <Text> {data.question ? data.question + "?" : ""}</Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {" "}
                <Text>{data.answer === "" ? fail : data.answer}</Text>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* <h2>Please </h2> */}
          {!showChat ? (
            <Stack
              justifyContent="center"
              align="center"
              padding="20px"
              w="300px"
              maxW="20vw"
              className="chat-window"
              borderRadius="20px"
            >
              <Input
                type="text"
                placeholder="Add a username"
                defaultValue={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              {/* <Input
                m="10px"
                type="text"
                placeholder="Room ID "
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              /> */}
              <Button
                mr={3}
                colorScheme="blackAlpha"
                onClick={() => {
                  joinRoom();
                  setShowModal(false);
                }}
              >
                Lets chat!!{" "}
              </Button>
            </Stack>
          ) : (
            <Box h="50vh">
              <Chat socket={socket} username={username} room={room} />
            </Box>
          )}
        </Flex>
      </If>
      <Else></Else>
    </>
  );
}

export default chatFrom;
