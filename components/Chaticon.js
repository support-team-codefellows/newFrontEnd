import { BsFillChatDotsFill } from "react-icons/bs";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Flex,
  Box,
  Spacer,
  PopoverAnchor,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";

import ChatFrom from "./chat/ChatForm";
export default function ChatIcon() {
  return (
    <Flex>
      <Spacer />
      <Box
        p="2"
        bg=""
        style={{ position: "fixed", right: "10px", bottom: "20px" }}
      >
        <Popover placement="top-start" borderBlock={'none'}  >
        
          <PopoverTrigger borderBlock={'none'}>
            {/* <Tooltip label="Looking for something?" fontSize="md"> */}
              {/* <Button> */}
                <IconButton
                
                  textAlign="center"
                  borderRadius="100px"
                  w="70px"
                  h="70px"
                  icon={<BsFillChatDotsFill />}
                  _hover={{ transform: "scale(1.5)" }}
                />
              {/* </Button> */}
            {/* </Tooltip> */}
            {/* <Button   ></Button> */}
 
          </PopoverTrigger>
          <PopoverContent background={'transparent'} borderBlock={'none'}    >
            <PopoverHeader fontWeight="semibold">Chat</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody borderBlock={'none'} background={'transparent'}>
              <ChatFrom />
            </PopoverBody>
          </PopoverContent>
         
        </Popover>
      </Box>
    </Flex>
  );
}
