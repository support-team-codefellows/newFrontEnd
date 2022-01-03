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
} from '@chakra-ui/react'
import ChatFrom from "./chat/ChatForm";
export default function ChatIcon() {

return(<Flex >
          <Spacer />
          <Box p='2' bg='' style={{ position:'fixed',right :'10px',bottom :'20px' }}>
            <Popover placement='top-start'>
              <PopoverTrigger>
                <Button  leftIcon={<BsFillChatDotsFill />} textAlign='center'   borderRadius='100px' w='70px'h='70px' ></Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight='semibold'>Chat</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <ChatFrom />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        </Flex>)
}