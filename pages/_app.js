import { ChakraProvider } from "@chakra-ui/react";
import LoginContext from "..//components//auth//context";
import "../styles/globals.css";
import DashboardCol1 from '../components/DashboardCol1'
import {
  Flex,
} from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <LoginContext>
          <ChakraProvider>
          <Flex
          h={[null, null, "100vh"]}
          maxW="2000px"
          flexDir={["column", "column", "row"]}
          overflow="hidden"
      >
  
    
      <DashboardCol1/> <Component {...pageProps} />
      </Flex>
      </ChakraProvider>
    </LoginContext>
  );
}

export default MyApp;
