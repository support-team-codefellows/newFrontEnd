import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Stack,
  Flex,
} from "@chakra-ui/react";
import {Data} from "../components/faqData";
function FAQ() {


  return (
    <Flex
      flexDir="column"
      h={[null, null, "100vh"]}
      justifyContent="space-between"
    >
      <Stack spacing={6}>
        <Box>
          {Data?.map((item, index) => (
            <Accordion key={index}>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "grey", color: "white" }}>
                    <Box flex="1" textAlign="left">
                      {item.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>{item.answer}</AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))}
        </Box>
      </Stack>
    </Flex>
  );
}

export default FAQ;
