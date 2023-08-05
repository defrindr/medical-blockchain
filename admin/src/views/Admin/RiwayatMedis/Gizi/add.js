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
import AuthHelper from "helpers/AuthHelper";
import React, { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import giziService from "services/giziService";
import medicalServices from "services/medicalServices";
import perawatServices from "services/perawatServices";

export default function Dashboard() {
  const { paramCheckup } = useParams();
  const { web3, accounts, contract } = useWeb3();
  const [user, setUser] = useState(null);
  const router = useHistory();
  const auther = AuthHelper(router);

  const [formData, setFormData] = useState({
    nik: null,
    idCheckup: null,
    idPerawat: null,
    diagnosa: null,
    intervensi: null,
    tanggal: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const changeByKey = (value, key) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const pressSimpan = async () => {
    if (!contract || !web3) return;

    try {
      let response = await giziService({ web3, contract }).tambah(formData);

      alert(response);
      router.push(`/admin/riwayat-medis/gizi/list/${paramCheckup}`);
    } catch (error) {
      alert("Terjadi kesalahan: " + JSON.stringify(error));
    }
  };

  const getUser = async () => {
    try {
      let response = await auther.getUser();

      if (!response.roles.includes("gizi")) {
        alert("Anda bukan Staf Gizi");
        return router.replace("/");
      }

      changeByKey(response.id, "idPerawat");
      setUser(response);
    } catch (error) {}
  };
  const getIDCheckup = async () => {
    try {
      if (!contract || !web3) return;

      let response = await medicalServices({ web3, contract }).dariIdCheckup(
        paramCheckup
      );
      if (!response) {
        alert("Data tidak ditemukan");
        router.push("/admin/dashboard/");
      }
      changeByKey(paramCheckup, "idCheckup");
      changeByKey(response.nik.toString(), "nik");
      changeByKey(response.diagnosa, "diagnosa");
      changeByKey(getCurrentDate(), "tanggal");
    } catch (error) {
      console.log(error);
    }
  };

  function getCurrentDate(separator = "-") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  }

  useEffect(() => {
    getUser();
    getIDCheckup();
  }, []);

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} spacing="24px">
        <Card>
          <SimpleGrid columns={{ sm: 2, md: 2, xl: 2 }} spacing="24px">
            <FormControl p={2}>
              <FormLabel>NIK</FormLabel>
              <Input name="nik" value={formData.nik} disabled />
            </FormControl>
            <FormControl p={2}>
              <FormLabel>Perawat</FormLabel>
              <Input value={user?.email} disabled />
            </FormControl>
          </SimpleGrid>

          <FormControl p={2}>
            <FormLabel>Diagnosa</FormLabel>
            <Textarea
              name="diagnosa"
              onChange={handleChange}
              value={formData.diagnosa}
              disabled
            />
          </FormControl>

          <FormControl p={2}>
            <FormLabel>Intervensi Gizi</FormLabel>
            <Textarea
              name="intervensi"
              onChange={handleChange}
              value={formData.intervensi}
            />
          </FormControl>

          <FormControl p={2}>
            <FormLabel>Tanggal</FormLabel>
            <Input
              type="date"
              name="tanggal"
              onChange={handleChange}
              value={formData.tanggal}
            />
          </FormControl>

          <FormControl p={2} mt={2}>
            <Button
              onClick={pressSimpan}
              colorScheme="blue"
              title="Simpan Data"
              mt={2}
              mr={2}
            >
              Simpan Data
            </Button>
            <Button
              colorScheme="gray"
              mt={2}
              mr={2}
              onClick={() =>
                router.push(`/admin/riwayat-medis/gizi/list/${paramCheckup}`)
              }
            >
              Kembali
            </Button>
          </FormControl>
        </Card>
      </SimpleGrid>
    </Flex>
  );
}
