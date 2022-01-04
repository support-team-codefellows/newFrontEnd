import { Flex, Heading, Avatar, Text, Icon, Link } from "@chakra-ui/react";

import { BsPersonCircle } from "react-icons/bs";
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBox,
  FiPhone,
  FiCalendar,
  FiUser,
  FiPlus,
} from "react-icons/fi";
import { useContext } from "react";
import { RiQuestionLine, RiLoginCircleLine, RiLogoutCircleLine } from "react-icons/ri";
import { useState, useEffect, useContext } from "react";
import { If, Then, Else } from "react-if";
import { LoginContext } from "./auth/context";
export default function DashboardCol1() {
  const Context = useContext(LoginContext);

  const [activeLink, setActiveLink] = useState(1);
  let [image, setImage] = useState("");

  useEffect(()=>{
    if(typeof window !== "undefined"){
      setActiveLink(JSON.parse(localStorage.getItem('activePage')) || 1);
      let userImage = localStorage.getItem('fileBase64')
      setImage(userImage) 
    }
  }, []);
  useEffect(()=>{
      if(typeof window !== "undefined"){
        localStorage.setItem('activePage', JSON.stringify(activeLink));
      }
    }, [activeLink]);
    
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

            <Link
              _hover={{ textDecor: "none" }}
              display={["flex", "flex", "none", "flex", "flex"]}
              href="/"
            >   
              <Heading
                mt={50}
                h="60px"
                border="1px solid white"
                borderRadius="2px"
                mb={[25, 50, 100]}
                fontSize={["4xl", "4xl", "2xl", "3xl", "4xl"]}
                alignSelf="center"
                letterSpacing="tight"
              >
          
              Tangeled.
              </Heading>
            </Link>


        
            <div className="logo">
              <h2 className="texth2"><span className="myyspan"><Heading>Tangled</Heading></span></h2>
              <div className="blur"></div>
            </div>

            <Flex
              flexDir={["row", "row", "column", "column", "column"]}
              align={["center", "center", "center", "flex-start", "flex-start"]}
              wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
              justifyContent="center"
            >
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiHome} fontSize="2xl" onClick={() => setActiveLink(1)} className={`${activeLink === 1 ? 'active-icon' : ''}`}/>
                </Link>
               
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href="/"
                >
                  <Text onClick={() => setActiveLink(1)} className={`${activeLink === 1 ? 'active' : ''}`}>Home</Text>
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
                  <Icon as={FiPhone} fontSize="2xl" onClick={() => setActiveLink(2)} className={`${activeLink === 2 ? 'active-icon' : ''}`}/>
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}

                  href="/telephone"

                >
                  <Text onClick={() => setActiveLink(2)} className={`${activeLink === 2 ? 'active' : ''}`}>Telephone</Text>
                </Link>
              </Flex>
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiCalendar} fontSize="2xl" onClick={() => setActiveLink(3)} className={`${activeLink === 3 ? 'active-icon' : ''}`}/>
                </Link>

                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href="/site"

                >
                  <Text onClick={() => setActiveLink(3)} className={`${activeLink === 3 ? 'active' : ''}`}>On-Site</Text>
                </Link>
              </Flex>

              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiPlus} fontSize="2xl" onClick={() => setActiveLink(4)} className={`${activeLink === 4 ? 'active-icon' : ''}`}/>
                </Link>

                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}

                  href="/customer"
                >
                  <Text onClick={() => setActiveLink(4)} className={`${activeLink === 4 ? 'active' : ''}`}>Tickets</Text>
                </Link>
              </Flex>

              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={RiLoginCircleLine} fontSize="2xl" onClick={() => setActiveLink(5)} className={`${activeLink === 5 ? 'active-icon' : ''}`}/>
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href="/login"
                >
                  <Text onClick={() => setActiveLink(5)} className={`${activeLink === 5 ? 'active' : ''}`}>Login</Text>
                </Link>
              </Flex>
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href="/FAQ"
                >
                  <Icon as={RiQuestionLine} fontSize="2xl" onClick={() => setActiveLink(6)} className={`${activeLink === 6 ? 'active-icon' : ''}`}/>
                  <Text onClick={() => setActiveLink(6)} className={`${activeLink === 6 ? 'active' : ''}`}>FAQ</Text>

                </Link>
              </Flex>

              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={RiLogoutCircleLine} fontSize="2xl" onClick={() => setActiveLink(7)} className={`${activeLink === 7 ? 'active-icon' : ''}`}/>
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href="/login"
                >

                  <Text onClick={() => setActiveLink(7)} className={`${activeLink === 7 ? 'active' : ''}`}>

                    <button onClick={Context.logout}>LogOut</button>
                  </Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
            <Avatar
              my={2}

              src={image}

            />
            <Text textAlign="center">{Context.user.username}</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
