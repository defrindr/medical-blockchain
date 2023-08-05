// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  HStack,
  Image,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import { BE_URL } from "config";
import { useWeb3 } from "contexts/Web3Context";
import FetchHelper from "helpers/FetchHelper";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function Dashboard() {
  const { web3, accounts, contract } = useWeb3();
  const iconBoxInside = useColorModeValue("white", "white");

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [blockchainAddress, setBlockchainAddress] = useState(null);
  const [nama, setNama] = useState(null);
  const [role, setRole] = useState(null);
  const hAkses = [
    { id: "1", value: "Administrator" },
    { id: "2", value: "Dokter" },
    { id: "3", value: "Perawat" },
    { id: "4", value: "Pasien" },
    { id: "5", value: "Gizi" },
    { id: "6", value: "Laboran" },
    { id: "7", value: "Farmasi" },
  ];

  useEffect(() => {
    console.log(role);
  }, [role]);

  const router = useHistory();
  const fetcher = FetchHelper(router);

  const pressSimpan = async () => {
    if (!nama || !email || !password || !blockchainAddress || !role) {
      alert("Silahkan lengkapi data");
      return;
    }

    try {
      let response = await fetcher.post(`${BE_URL}/admin/user`, {
        name: nama,
        email,
        roleId: role,
        password,
        blockchainAddress,
      });

      if (response.status) {
        alert("Berhasil menambahkan data");
        router.replace("/admin/user/list");
        return;
      }
    } catch (error) {
      alert("Terjadi kesalahan: " + JSON.stringify(error));
      console.log(error);
    }
  };

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} spacing="24px">
        <Card>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(item) => setEmail(item.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(item) => setPassword(item.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Address Blockchain</FormLabel>
            <Input
              type="text"
              value={blockchainAddress}
              onChange={(item) => setBlockchainAddress(item.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Nama</FormLabel>
            <Input
              type="text"
              value={nama}
              onChange={(item) => setNama(item.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Hak Akses</FormLabel>
            <RadioGroup value={role} onChange={setRole}>
              <HStack spacing="24px">
                {hAkses.map(
                  (item) => item && <Radio value={item.id}>{item.value}</Radio>
                )}
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl mt={2}>
            <Button
              onClick={pressSimpan}
              colorScheme="blue"
              title="Simpan Data"
            >
              Simpan Data
            </Button>
          </FormControl>
        </Card>
      </SimpleGrid>
    </Flex>
  );
}
