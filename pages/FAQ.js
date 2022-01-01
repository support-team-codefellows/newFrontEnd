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
function FAQ() {
  let data = [
    {
      question: "What is the difference between a customer and a user?",
      answer:"A customer is a person who uses our services. A user is a person who is using our services. A customer is not a user. A user is not a customer.",
    },
    {
      question: "What is the difference between a customer and a user?",
      answer:"A customer is a person who uses our services. A user is a person who is using our services. A customer is not a user. A user is not a customer.",
    },
    {
      question: "What is the difference between a customer and a user?",
      answer:"A customer is a person who uses our services. A user is a person who is using our services. A customer is not a user. A user is not a customer.",
    },
  ];

  return (
    <Flex
      flexDir="column"
      h={[null, null, "100vh"]}
      justifyContent="space-between"
    >
      <Stack spacing={6}>
        <Box>
          {data.map((item, index) => (
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
