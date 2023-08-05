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
  const [nik, setNik] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [blockchainAddress, setBlockchainAddress] = useState(null);
  const [nama, setNama] = useState(null);
  const [alamat, setAlamat] = useState(null);
  const [tanggalLahir, setTanggalLahir] = useState(null);
  const [jenisKelamin, setJenisKelamin] = useState(null);
  const [golonganDarah, setGolonganDarah] = useState(null);
  const jkOpt = [
    { id: "M", value: "Laki Laki" },
    { id: "F", value: "Perempuan" },
  ];

  const router = useHistory();
  const fetcher = FetchHelper(router);

  const pressSimpan = async () => {
    if (
      !nik ||
      !nama ||
      !email ||
      !password ||
      !blockchainAddress ||
      !alamat ||
      !jenisKelamin ||
      !golonganDarah ||
      !tanggalLahir
    ) {
      alert("Silahkan lengkapi data");
      return;
    }
    try {
      let response = await fetcher.post(`${BE_URL}/admin/patient`, {
        noIdentity: nik,
        name: nama,
        email,
        password,
        blockchainAddress,
        address: alamat,
        gender: jenisKelamin,
        bloodType: golonganDarah,
        birthday: tanggalLahir,
      });

      if (response.status) {
        alert("Berhasil menambahkan data");
        router.replace("/admin/pasien/list");
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
            <FormLabel>NIK</FormLabel>
            <Input
              type="number"
              value={nik}
              onChange={(item) => setNik(item.target.value)}
            />
            <FormHelperText>
              No NIK anda akan digunakan sesuai TOS
            </FormHelperText>
          </FormControl>
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
            <FormLabel>Alamat</FormLabel>
            <Textarea
              value={alamat}
              onChange={(item) => setAlamat(item.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Jenis Kelamin</FormLabel>
            <RadioGroup value={jenisKelamin} onChange={setJenisKelamin}>
              <HStack spacing="24px">
                {jkOpt.map(
                  (item) => item && <Radio value={item.id}>{item.value}</Radio>
                )}
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Golongan Darah</FormLabel>
            <Input
              maxLength={4}
              value={golonganDarah}
              onChange={(item) => setGolonganDarah(item.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tanggal Lahir</FormLabel>
            <Input
              type="date"
              value={tanggalLahir}
              onChange={(item) => setTanggalLahir(item.target.value)}
            />
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
