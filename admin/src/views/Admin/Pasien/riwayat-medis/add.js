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
import medicalServices from "services/medicalServices";

export default function Dashboard() {
  const history = useHistory();
  const { id } = useParams();
  const { web3, accounts, contract } = useWeb3();
  const [user, setUser] = useState(null);
  const router = useHistory();
  const auther = AuthHelper(router);

  const iconBoxInside = useColorModeValue("white", "white");

  const [formData, setFormData] = useState({
    idCheckup: null,
    nik: null,
    idDokter: null,
    diagnosa: null,
    subjek: null,
    objek: null,
    assesmen: null,
    planning: null,
    statusPasien: null,
    keterangan: "",
    tanggal: "",
  });

  const statusPasienList = [
    {
      id: "rawat-jalan",
      value: "Rawat Jalan",
    },
    {
      id: "rawat-inap",
      value: "Rawat Inap",
    },
    {
      id: "pulang",
      value: "Pulang",
    },
  ];

  const keteranganPasienList = [
    {
      id: "sembuh",
      value: "Sembuh",
    },
    {
      id: "pulang-paksa",
      value: "Pulang Paksa",
    },
    {
      id: "meninggal",
      value: "Meninggal",
    },
  ];

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
    if (formData.statusPasien !== "pulang") {
      changeByKey("", "statusPasien");
      changeByKey("", "keterangan");
    }

    if (formData.keterangan !== "meninggal") {
      changeByKey("", "keterangan");
    }

    if (!contract || !web3) return;

    try {
      let response = await medicalServices({ web3, contract }).tambah(formData);

      alert(response);
      history.push(`/admin/pasien/riwayat-medis/list/${id}`);
    } catch (error) {
      alert("Terjadi kesalahan: " + JSON.stringify(error));
    }
  };

  const getUser = async () => {
    try {
      let response = await auther.getUser();

      if (!response.roles.includes("doctor")) {
        return router.replace("/");
      }

      changeByKey(response.id, "idDokter");
      setUser(response);
    } catch (error) {}
  };
  const getIDCheckup = async () => {
    try {
      if (!contract || !web3) return;

      let response = await medicalServices({ web3, contract }).jumlah();
      changeByKey(response + BigInt(1), "idCheckup");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    changeByKey(id, "nik");
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
              <FormLabel>Dokter</FormLabel>
              <Input value={user?.email} disabled />
            </FormControl>
          </SimpleGrid>

          <FormControl p={2}>
            <FormLabel>Diagnosa</FormLabel>
            <Textarea
              name="diagnosa"
              onChange={handleChange}
              value={formData.diagnosa}
            />
          </FormControl>

          <SimpleGrid columns={{ sm: 2, md: 2, xl: 2 }} spacing="24px">
            <FormControl p={2}>
              <FormLabel>Object</FormLabel>
              <Textarea
                name="objek"
                onChange={handleChange}
                value={formData.objek}
              />
            </FormControl>
            <FormControl p={2}>
              <FormLabel>Subject</FormLabel>
              <Textarea
                name="subjek"
                onChange={handleChange}
                value={formData.subjek}
              />
            </FormControl>
            <FormControl p={2}>
              <FormLabel>Assesmen</FormLabel>
              <Textarea
                name="assesmen"
                onChange={handleChange}
                value={formData.assesmen}
              />
            </FormControl>
            <FormControl p={2}>
              <FormLabel>Planning</FormLabel>
              <Textarea
                name="planning"
                onChange={handleChange}
                value={formData.planning}
              />
            </FormControl>
          </SimpleGrid>

          <FormControl p={2}>
            <FormLabel>Status Pasien</FormLabel>
            <RadioGroup
              value={formData.statusPasien}
              onChange={(data) => changeByKey(data, "statusPasien")}
            >
              <HStack spacing="24px">
                {statusPasienList.map(
                  (item) => item && <Radio value={item.id}>{item.value}</Radio>
                )}
              </HStack>
            </RadioGroup>
          </FormControl>

          {formData.statusPasien === "pulang" && (
            <>
              <FormControl p={2}>
                <FormLabel>Keterangan</FormLabel>
                <RadioGroup
                  value={formData.keterangan}
                  onChange={(data) => changeByKey(data, "keterangan")}
                >
                  <HStack spacing="24px">
                    {keteranganPasienList.map(
                      (item) =>
                        item && <Radio value={item.id}>{item.value}</Radio>
                    )}
                  </HStack>
                </RadioGroup>
              </FormControl>
              {formData.keterangan === "meninggal" && (
                <FormControl p={2}>
                  <FormLabel>Tanggal</FormLabel>
                  <Input
                    type="date"
                    name="tanggal"
                    onChange={handleChange}
                    value={formData.tanggal}
                  />
                </FormControl>
              )}
            </>
          )}

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
                history.push(`/admin/pasien/riwayat-medis/list/${id}`)
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
