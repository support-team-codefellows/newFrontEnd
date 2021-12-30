import { ChakraProvider } from "@chakra-ui/react";
import LoginContext from "./helper/auth/context";
import "../styles/globals.css";
import Header from "./Header";
import Footer from "./Footer";
function MyApp({ Component, pageProps }) {
  return (
    <LoginContext>
      <ChakraProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </LoginContext>
  );
}

export default MyApp;
