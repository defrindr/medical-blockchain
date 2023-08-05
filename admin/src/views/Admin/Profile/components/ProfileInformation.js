// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { BE_URL } from "config";
import FetchHelper from "helpers/FetchHelper";
import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProfileInformation = ({ title, name, email, addressBlockchain }) => {
  const [fieldName, setName] = useState(name);
  const [fieldEmail, setEmail] = useState(email);
  const [fieldAddressBlockchain, setAddressBlockchain] = useState(
    addressBlockchain
  );

  const router = useHistory();
  const fetcher = FetchHelper(router);

  const updateProfile = async () => {
    try {
      let response = await fetcher.post(`${BE_URL}/admin/profile`, {
        name: fieldName,
        email: fieldEmail,
        blockchainAddress: fieldAddressBlockchain,
      });

      if (!response.status) {
        alert("Gagal mengubah data");
        return;
      }

      alert("Data berhasil diubah");
      return;
    } catch (error) {
      alert("Terjadi kesalahan saat mengubah data");
      return;
    }
  };

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p="12px 5px" mb="12px">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          {title}
        </Text>
      </CardHeader>
      <CardBody style={{ width: "100%", flexDirection: "column" }}>
        <FormControl p={2}>
          <FormLabel>Nama</FormLabel>
          <Input
            type="text"
            value={fieldName}
            onChange={(evt) => setName(evt.target.value)}
          />
        </FormControl>
        <FormControl p={2}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={fieldEmail}
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <FormHelperText>Email anda akan digunakan sesuai TOS</FormHelperText>
        </FormControl>
        <FormControl p={2}>
          <FormLabel>Alamat Blockchain</FormLabel>
          <Input
            type="text"
            value={fieldAddressBlockchain}
            onChange={(evt) => setAddressBlockchain(evt.target.value)}
          />
          <FormHelperText>
            Alamat Blockchain anda akan digunakan sesuai TOS
          </FormHelperText>
        </FormControl>
        <FormControl p={2}>
          <Button colorScheme="green" onClick={() => updateProfile()}>
            Simpan
          </Button>
        </FormControl>
      </CardBody>
    </Card>
  );
};

export default ProfileInformation;
