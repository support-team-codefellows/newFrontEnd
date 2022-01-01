import { ChakraProvider } from "@chakra-ui/react";
import LoginContext from "..//components//auth//context";
import "../styles/globals.css";
import DashboardCol1 from "../components/DashboardCol1";
import { Flex } from "@chakra-ui/react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducer from "..//redux//reduces";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
} from "redux-state-sync";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const middleware = [createStateSyncMiddleware()];

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

initStateWithPrevTab(store);
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <LoginContext>
        <ChakraProvider>
          <Flex
            h={[null, null, "100vh"]}
            maxW="2000px"
            flexDir={["column", "column", "row"]}
            overflow="hidden"
          >
            <DashboardCol1 /> <Component {...pageProps} />
     
          </Flex>
        </ChakraProvider>
      </LoginContext>
    </Provider>
  );
}

export default MyApp;
