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
import { useWeb3 } from "contexts/Web3Context";
import React, { useEffect, useState } from "react";
import adminServices from "services/adminServices";
export default function Dashboard() {
  const { web3, accounts, contract } = useWeb3();
  const iconBoxInside = useColorModeValue("white", "white");
  const [nik, setNik] = useState(null);
  const [nama, setNama] = useState(null);
  const [alamat, setAlamat] = useState(null);
  const [tanggalLahir, setTanggalLahir] = useState(null);
  const [jenisKelamin, setJenisKelamin] = useState(null);
  const [golonganDarah, setGolonganDarah] = useState(null);
  const jkOpt = [
    { id: "laki-laki", value: "Laki Laki" },
    { id: "perempuan", value: "Perempuan" },
  ];

  const pressSimpan = async () => {
    if (
      !nik ||
      !nama ||
      !alamat ||
      !jenisKelamin ||
      !golonganDarah ||
      !tanggalLahir
    ) {
      alert("Silahkan lengkapi data");
      return;
    }
    if (!contract || !web3) return;
    try {
      let response = await adminServices(contract, web3).addPatient({
        nik,
        nama,
        alamat,
        jenisKelamin,
        golonganDarah,
        tanggalLahir,
      });
      alert("Berhasil menambahkan data");
      history.push(`/admin/pasien/list`);
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
