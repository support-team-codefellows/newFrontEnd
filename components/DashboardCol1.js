import { Flex, Heading, Avatar, Text, Icon, Link } from "@chakra-ui/react";
import { FiHome, FiPieChart, FiDollarSign, FiBox, FiPhone, FiCalendar, FiUser, FiPlus} from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import {useContext , useEffect , useState} from 'react';
import { If, Then, Else } from 'react-if';
import { LoginContext } from "./auth/context"; 
export default function DashboardCol1() {
  const Context = useContext(LoginContext);
  let [image,setImage] = useState("") ; 
  useEffect(() => {

    if (typeof window !== 'undefined') {
      let userImage =  localStorage.getItem('fileBase64')
      setImage(userImage)

    }
  }, [])

  
  return (
    <>
  
      {/* Column 1 */}
      <Flex
        w={["100%", "100%", "10%", "15%", "15%"]}
        flexDir="column"
        alignItems="center"
        backgroundColor="#020202"
        color="#fff"
      >
        <Flex
          flexDir="column"
          h={[null, null, "100vh"]}
          justifyContent="space-between"
        >
          <Flex flexDir="column" as="nav">
         
            <Heading
              mt={50}
              mb={[25, 50, 100]}
              fontSize={["4xl", "4xl", "2xl", "3xl", "4xl"]}
              alignSelf="center"
              letterSpacing="tight"
            >
              Tangeled.
            </Heading>
            <Flex
              flexDir={["row", "row", "column", "column", "column"]}
              align={["center", "center", "center", "flex-start", "flex-start"]}
              wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
              justifyContent="center"
            > 
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                </Link>
      
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href="/"
                  >
                  <Text className="active">Home</Text>
                </Link>
              </Flex>
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={BsPersonCircle} fontSize="2xl" />
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href='/Profile'

                >
                  <Text>Profile</Text>
                </Link>
   
              </Flex>
        
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiPhone} fontSize="2xl" />
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href='/telephone'

                >
                  <Text>Telephone</Text>
                </Link>
   
              </Flex>
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiCalendar} fontSize="2xl" />
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href='/site'
                  >
                  <Text>On-Site</Text>
                </Link>
              </Flex>
        
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiPlus} fontSize="2xl" />
                </Link>
              
              <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href='/customer'

                >
                  <Text>Tickets</Text>
                </Link>
    
               
              </Flex>
    
                    <If condition= {!Context.loggedIn}>

              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiUser} fontSize="2xl" />
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href='/login'


                >
                  <Text>Login</Text>

                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href='/FAQ'
                  >
                  <Text>FAQ</Text>
                </Link>
              </Flex>
                  </If>
                  <If condition= {Context.loggedIn}>
                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiBox} fontSize="2xl" />
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href='/login'
                  >
                  <Text><button onClick={Context.logout}>LogOut</button></Text>
                </Link>
                </Flex>
                  </If>
            </Flex>
          </Flex>
          <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
            <Avatar my={2} src={image} />
            <Text textAlign="center">{Context.user.username}</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
