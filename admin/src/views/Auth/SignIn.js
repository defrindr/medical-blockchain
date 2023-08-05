import React, { useContext, useState } from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";
import { BE_URL } from "config";
import FetchHelper from "helpers/FetchHelper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthHelper from "helpers/AuthHelper";
import initWeb3 from "../../web3";
import { useAuth } from "contexts/AuthContext";
import { AuthContext } from "contexts/AuthContext";

function SignIn() {
  const { refreshAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const authHelper = AuthHelper(history);

  const signIn = async () => {
    try {
      let response = await FetchHelper().post(`${BE_URL}/auth/login`, {
        email,
        password,
      });

      if (response.status) {
        // store auth into local storage
        await authHelper.setData(response);
        const user = await authHelper.getUser();

        // get web3 config
        if (!user.roles.includes("patient")) {
          const [web3, accounts, contract] = await initWeb3();
          if (user.blockchainAddress !== accounts[0]) {
            alert("User login & metamask tidak cocok");
            return;
          }
        }

        refreshAuth();
        history.push("/admin");
      }
    } catch (e) {
      console.log(e);
      window.alert("error");
    }
  };

  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Welcome Back
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Enter your email and password to sign in
            </Text>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Email
              </FormLabel>
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="text"
                placeholder="Your email adress"
                size="lg"
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Password
              </FormLabel>
              <Input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                borderRadius="15px"
                mb="36px"
                fontSize="sm"
                type="password"
                placeholder="Your password"
                size="lg"
              />
              <Button
                onClick={() => signIn()}
                fontSize="10px"
                type="submit"
                bg="teal.300"
                w="100%"
                h="45"
                mb="20px"
                color="white"
                mt="20px"
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
              >
                SIGN IN
              </Button>
            </FormControl>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
