import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Stack,
  Flex,
  Center,
} from "@chakra-ui/react";
import { Data } from "../components/faqData";
function FAQ() {
  return (
    <Center>
      <Flex align="center" justifyContent="space-between" minW="100%" h="100%" overflow='inherit'>
        <Box w="60vw">
          {Data?.map((item, index) => (
            <Accordion
              key={index}
              h="10vh"
              margin={"10px"}
              marginBottom={"5px"}
            >
              <Stack spacing={10}>
                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: "grey", color: "white" }}>
                      <Box flex="1" textAlign="left" fontWeight={"bold"}>
                        {index + 1 + " ."} {item.question}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>{item.answer}</AccordionPanel>
                </AccordionItem>
              </Stack>
            </Accordion>
          ))}
        </Box>
      </Flex>
    </Center>
  );
}

export default FAQ;
