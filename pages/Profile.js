import { LoginContext } from "../components/auth/context";
import { FcApproval, FcSettings, FcPortraitMode } from "react-icons/fc";
import { BsGenderMale } from "react-icons/bs";
//  TODO get the pending tickets And solved Tickets check the imgage before clicking on the profile page 
import {
    Button,
    List,
    Flex,
    Heading,
    Icon,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    ListItem,
    ListIcon,
    Tag,
    Text,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
    HStack,
    MdCheckCircle,
    MdSettings,
    Image,
    Box,
    Badge,
} from "@chakra-ui/react";

import React, { Component } from "react";
import { initMessageListener } from "redux-state-sync";
class Profile extends Component {
    static contextType = LoginContext;
    constructor(props) {
        super(props);
        this.state = {
            image: "",
        };
    }
    componentDidMount() {
        if (typeof window !== 'undefined') {
            let userImage = localStorage.getItem('fileBase64')
            this.setState({
                image: userImage,
            })
        }
    }
    render() {
        return (
            <>
                <Flex p={8} flex={1} align={"center"} justify={"center"}>
                    <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%">
                        <Box m="5" as="a" width="100%">
                            <Badge colorScheme='purple'>New</Badge>
                            <Tag size='lg' key='md' variant='outline' colorScheme='purple'  align='end' float='right' m="1" mb="0">
                                <TagLabel >Settings</TagLabel>
                                <TagRightIcon as={FcSettings} />
                            </Tag>
                            <Image
                                borderRadius='full'
                                boxSize='180px'
                                src={this.state.image}
                                marginBottom="10%"
                                marginLeft="35%"
                                alt='Dan Abramov'
                            /> <Heading as='h6' size='xs' align="center" marginBottom="10%">
                                <Badge variant='outline' colorScheme='green'></Badge>
                                <Tag size='lg' key='md' variant='outline' colorScheme='purple'  align='end' m="1" mb="0">
                                    <TagLabel >Email: {this.context.user.email}</TagLabel>
                                    <TagRightIcon as={FcPortraitMode} />
                                </Tag>
                            </Heading>
                            <Text color='gray.500' isTruncated m="5" mb="0" as="h4" size="md">Username: {this.context.user.username}
                                <List display="inline">
                                    <ListIcon as={FcApproval} color='green.500' />
                                </List>
                            </Text>

                            <Text color='gray.500' isTruncated m="5" mb="0" as="h4" size="md">Capabilities: {this.context.user.capabilities?.map((e,i )=> {
                                return <Badge key={i} colorScheme='green'>{e}</Badge>
                            })}
                            </Text>
                            <Text color='gray.500' isTruncated m="5" mb="0" as="h4" size="md">Gender:
                                <Icon ml="2" as={BsGenderMale} w={6} h={5} />
                            </Text>
                            <Text color='gray.500' isTruncated m="5" mb="3" as="h4" size="md">Pending Tasks:</Text>
                            <Text color='gray.500' isTruncated m="5" mb="3" as="h4" size="md">Solved Tasks:</Text>
                            <StatGroup m="5" mb="0">
                                <Stat>
                                    <StatLabel>Solved</StatLabel>
                                    <StatNumber>10</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type='increase' />
                                        23.36%
                                    </StatHelpText>
                                </Stat>
                                <Stat>
                                    <StatLabel>Clicked</StatLabel>
                                    <StatNumber>3</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type='decrease' />
                                        9.05%
                                    </StatHelpText>
                                </Stat>
                            </StatGroup>
                        </Box>
                    </Box>
                </Flex>
            </>
        );
    }
}

export default Profile;
    