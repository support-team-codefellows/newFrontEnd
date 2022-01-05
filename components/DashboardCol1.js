import { Flex, Heading, Avatar, Text, Icon, Link } from "@chakra-ui/react";
import { If, Then, Else } from "react-if";
import { SiSimpleanalytics } from "react-icons/si";
import { BsPersonCircle } from "react-icons/bs";
import { FiHome, FiPhone, FiCalendar, FiPlus } from "react-icons/fi";
import { useContext } from "react";
import {
  RiQuestionLine,
  RiLoginCircleLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { useState, useEffect } from "react";
import { LoginContext } from "./auth/context";
export default function DashboardCol1() {
  const Context = useContext(LoginContext);

  const [activeLink, setActiveLink] = useState(1);
  let [image, setImage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveLink(JSON.parse(localStorage.getItem("activePage")) || 1);
      let userImage = localStorage.getItem("fileBase64");
      setImage(userImage);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activePage", JSON.stringify(activeLink));
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
              <div className="logo">
                <h2 className="texth2">
                  <span className="myyspan">
                    <Heading>Tangled</Heading>
                  </span>
                </h2>
                <div className="blur"></div>
              </div>
            </Link>
            <Flex
              flexDir={["row", "row", "column", "column", "column"]}
              align={["center", "center", "center", "flex-start", "flex-start"]}
              wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
              justifyContent="center"
            >
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} >
                <Link display={["none", "none", "flex", "flex", "flex"]} >
                  <Icon
                    as={FiHome}
                    fontSize="2xl"
                    onClick={() => setActiveLink(1)}
                    className={`${activeLink === 1 ? "active-icon" : ""}`}
                  />
                </Link>

                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                  href="/"
                  _focus="outline:0 !important"
                >
                  <Text
                    onClick={() => setActiveLink(1)}
                    className={`${activeLink === 1 ? "active" : ""}`}
                  >
                    Home
                  </Text>
                </Link>
              </Flex>

              <If condition={Context.loggedIn}>
                <Then>
                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                      <Icon
                        as={BsPersonCircle}
                        fontSize="2xl"
                        onClick={() => setActiveLink(8)}
                        className={`${activeLink === 8 ? "active-icon" : ""}`}
                      />
                    </Link>
                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/Profile"
                      _focus="outline:0 !important"
                    >
                      <Text
                        onClick={() => setActiveLink(8)}
                        className={`${activeLink === 8 ? "active" : ""}`}
                      >
                        Profile
                      </Text>
                    </Link>
                  </Flex>
                  <If condition={Context.loggedIn && Context.user?.capabilities?.length > 2}>
                    <Then>
                      <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                        <Link
                          display={["none", "none", "flex", "flex", "flex"]}
                        >
                          <Icon
                            as={FiPhone}
                            fontSize="2xl"
                            onClick={() => setActiveLink(2)}
                            className={`${
                              activeLink === 2 ? "active-icon" : ""
                            }`}
                          />
                        </Link>
                        <Link
                          _hover={{ textDecor: "none" }}
                          display={["flex", "flex", "none", "flex", "flex"]}
                          href="/telephone"
                          _focus="outline:0 !important"
                        >
                          <Text
                            onClick={() => setActiveLink(2)}
                            className={`${activeLink === 2 ? "active" : ""}`}
                          >
                            Telephone
                          </Text>
                        </Link>
                      </Flex>
                      <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                        <Link
                          display={["none", "none", "flex", "flex", "flex"]}
                        >
                          <Icon
                            as={FiCalendar}
                            fontSize="2xl"
                            onClick={() => setActiveLink(3)}
                            className={`${
                              activeLink === 3 ? "active-icon" : ""
                            }`}
                          />
                        </Link>

                        <Link
                          _hover={{ textDecor: "none" }}
                          display={["flex", "flex", "none", "flex", "flex"]}
                          href="/site"
                          _focus="outline:0 !important"
                        >
                          <Text
                            onClick={() => setActiveLink(3)}
                            className={`${activeLink === 3 ? "active" : ""}`}
                          >
                            On-Site
                          </Text>
                        </Link>
                      </Flex>
                      <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                        <Link
                          display={["none", "none", "flex", "flex", "flex"]}
                        >
                          <Icon
                            as={SiSimpleanalytics}
                            fontSize="2xl"
                            onClick={() => setActiveLink(9)}
                            className={`${
                              activeLink === 9 ? "active-icon" : ""
                            }`}
                          />
                        </Link>
                        <Link
                          _hover={{ textDecor: "none" }}
                          display={["flex", "flex", "none", "flex", "flex"]}
                          href="/charts"
                          _focus="outline:0 !important"
                        >
                          <Text
                            onClick={() => setActiveLink(9)}
                            className={`${activeLink === 9 ? "active" : ""}`}
                          >
                            Analysis
                          </Text>
                        </Link>
                      </Flex>
                    </Then>
                    <Else>
                      <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                        <Link
                          display={["none", "none", "flex", "flex", "flex"]}
                        >
                          <Icon
                            as={FiPlus}
                            fontSize="2xl"
                            onClick={() => setActiveLink(4)}
                            className={`${
                              activeLink === 4 ? "active-icon" : ""
                            }`}
                          />
                        </Link>

                        <Link
                          _hover={{ textDecor: "none" }}
                          display={["flex", "flex", "none", "flex", "flex"]}
                          href="/customer"
                          _focus="outline:0 !important"
                        >
                          <Text
                            onClick={() => setActiveLink(4)}
                            className={`${activeLink === 4 ? "active" : ""}`}
                          >
                            Tickets
                          </Text>
                        </Link>
                      </Flex>
                      <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                        <Link
                          _hover={{ textDecor: "none" }}
                          display={["flex", "flex", "none", "flex", "flex"]}
                          href="/FAQ"
                          _focus="outline:0 !important"
                        >
                          <Icon
                            as={RiQuestionLine}
                            fontSize="2xl"
                            onClick={() => setActiveLink(6)}
                            className={`${
                              activeLink === 6 ? "active-icon" : ""
                            }`}
                          />
                          <Text
                            onClick={() => setActiveLink(6)}
                            className={`${activeLink === 6 ? "active" : ""}`}
                          >
                            FAQ
                          </Text>
                        </Link>
                      </Flex>
                    </Else>
                  </If>
                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                      <Icon
                        as={RiLogoutCircleLine}
                        fontSize="2xl"
                        onClick={() => setActiveLink(7)}
                        className={`${activeLink === 7 ? "active-icon" : ""}`}
                      />
                    </Link>
                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/login"
                      _focus="outline:0 !important"
                    >
                      <Text
                        onClick={() => setActiveLink(7)}
                        className={`${activeLink === 7 ? "active" : ""}`}
                      >
                        <button onClick={Context.logout}>LogOut</button>
                      </Text>
                    </Link>
                  </Flex>
                </Then>
                <Else>
                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                      <Icon
                        as={RiLoginCircleLine}
                        fontSize="2xl"
                        onClick={() => setActiveLink(5)}
                        className={`${activeLink === 5 ? "active-icon" : ""}`}
                      />
                    </Link>
                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/login"
                      _focus="outline:0 !important"
                    >
                      <Text
                        onClick={() => setActiveLink(5)}
                        className={`${activeLink === 5 ? "active" : ""}`}
                      >
                        Login
                      </Text>
                    </Link>
                  </Flex>
                  <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                    <Link
                      _hover={{ textDecor: "none" }}
                      display={["flex", "flex", "none", "flex", "flex"]}
                      href="/FAQ"
                      _focus="outline:0 !important"
                    >
                      <Icon
                        as={RiQuestionLine}
                        fontSize="2xl"
                        onClick={() => setActiveLink(6)}
                        className={`${activeLink === 6 ? "active-icon" : ""}`}
                      />
                      <Text
                        onClick={() => setActiveLink(6)}
                        className={`${activeLink === 6 ? "active" : ""}`}
                      >
                        FAQ
                      </Text>
                    </Link>
                  </Flex>
                </Else>
              </If>
            </Flex>
          </Flex>
          <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
            <Avatar my={2} src={image} />
            <Text textAlign="center">{Context.user.username}</Text>
            <Link href="/about">
            <Text
              fontSize="xs"
              mt={2}
              textAlign="left"
              color="white"
              opacity="0.6"
            >
              About Tangled
            </Text>
          </Link>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
