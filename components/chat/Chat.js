import React, { useEffect, useState } from "react";
// import ScrollToBottom from "react-scroll-to-bottom";
import {
  Button,
  Input,
  Stack,
  Flex,
  Heading,
  Box,
  Text,
} from "@chakra-ui/react";
import ChatIcon from "@chakra-ui/icons"
//to be continued
function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("sendMessage", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <Stack
      h="100%"
      w="300px"
      maxW="20vw"
      className="chat-window"
      // bg="#F7F7F7"
      borderRadius="20px"
      
    >
  
      <Stack overflow="auto" className="chat-body">
        {/* <ScrollToBottom className="message-container"> */}
        {messageList.map((messageContent, i) => {
          return (
            <Box
              key={i}
              className="message"
              id={username === messageContent.author ? "you" : "other"}
            >
              <Box>
                <Box className="message-content">
                  <Text>{messageContent.message}</Text>
                </Box>
                <Box className="message-meta">
                  <Text id="time">{messageContent.time}</Text>
                  <Text id="author">{messageContent.author}</Text>
                </Box>
              </Box>
            </Box>
          );
        })}
        {/* </ScrollToBottom> */}
      </Stack>
      <Box>
        <Flex>
          <Input
          pointerEvents={username === "" ? "none" : "auto"}
          marginLeft='auto'
          borderRadius="20px"
          position="relative"
          marginTop='210px'
            type="text"
            value={currentMessage}
            placeholder="How can we Help"
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <Button  position="relative"
          marginTop='210px'
            type="text"  onClick={sendMessage}>&#9658;</Button>
        </Flex>
      </Box>
    </Stack>
  );
}

export default Chat;

{
  /* <Stack className="chat-window">
<Heading className="chat-header">
  Live Chat
</Heading>
<Stack className="chat-body">
  {/* <ScrollToBottom className="message-container"> */
}
//     {messageList.map((messageContent,i) => {
//       return (
//         <Box key ={i}
//           className="message"
//           id={username === messageContent.author ? "you" : "other"}
//         >
//           <Box>
//             <Box className="message-content">
//               <Text>{messageContent.message}</Text>
//             </Box>
//             <Box className="message-meta">
//               <Text id="time">{messageContent.time}</Text>
//               <Text id="author">{messageContent.author}</Text>
//             </Box>
//           </Box>
//         </Box>
//       );
//     })}
//   {/* </ScrollToBottom> */}
// </Stack>
// <Box >
//   <Input
//     type="text"
//     value={currentMessage}
//     placeholder="welcome"
//     onChange={(event) => {
//       setCurrentMessage(event.target.value);
//     }}
//     onKeyPress={(event) => {
//       event.key === "Enter" && sendMessage();
//     }}
//   />
//   <Button onClick={sendMessage}>&#9658;</Button>
// </Box>
// </Stack> */}
