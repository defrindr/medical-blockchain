// Chakra imports
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import avatar4 from "assets/img/avatars/avatar4.png";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import React, { useEffect, useState } from "react";
import { FaCube, FaPenFancy } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import Header from "./components/Header";
import ProfileInformation from "./components/ProfileInformation";
import FetchHelper from "helpers/FetchHelper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BE_URL } from "config";

function Profile() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );

  const router = useHistory();
  const fetcher = FetchHelper(router);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await fetcher.get(`${BE_URL}/admin/profile`);
      console.log(response);
      if (response.status) {
        setUser(() => response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Flex direction="column">
      <Header
        backgroundHeader={ProfileBgImage}
        backgroundProfile={bgProfile}
        avatarImage={avatar4}
        name={user ? user.name : "-"}
        email={user ? user.email : "sample@mail.com"}
        tabs={[
          {
            name: "OVERVIEW",
            icon: <FaCube w="100%" h="100%" />,
          },
        ]}
      />
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(1, 1fr)" }} gap="22px">
        {user && (
          <ProfileInformation
            title={"Profile Information"}
            name={user.name}
            email={user.email}
            addressBlockchain={user.blockchainAddress}
          />
        )}
      </Grid>
    </Flex>
  );
}

export default Profile;
