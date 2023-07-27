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
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import adminServices from "services/adminServices";
export default function Dashboard() {
  const history = useHistory();
  const { id } = useParams();
  const { web3, accounts, contract } = useWeb3();
  const iconBoxInside = useColorModeValue("white", "white");

  const [riwayatPenyakit, setriwayatPenyakit] = useState("");
  const [waktuRiwayatPenyakit, setwaktuRiwayatPenyakit] = useState("");
  const [jenisRiwayatPenyakit, setjenisRiwayatPenyakit] = useState("");
  const [riwayatPenanganan, setriwayatPenanganan] = useState("");
  const [waktuRiwayatPenanganan, setwaktuRiwayatPenanganan] = useState("");
  const [tempatRiwayatPenanganan, settempatRiwayatPenanganan] = useState("");
  const [metodeRiwayatPenanganan, setmetodeRiwayatPenanganan] = useState("");
  const [dokterRiwayatPenanganan, setdokterRiwayatPenanganan] = useState("");
  const [riwayatAlergi, setriwayatAlergi] = useState("");

  const convertDate = (input) => {
    const date = new Date(input);
    const epochTimestamp = date.getTime();
    return epochTimestamp;
  };

  const pressSimpan = async () => {
    console.log(
      !riwayatPenyakit,
      !waktuRiwayatPenyakit,
      !jenisRiwayatPenyakit,
      !riwayatPenanganan,
      !waktuRiwayatPenanganan,
      !tempatRiwayatPenanganan,
      !metodeRiwayatPenanganan,
      !dokterRiwayatPenanganan,
      !riwayatAlergi
    );
    console.log(
      !riwayatPenyakit,
      !waktuRiwayatPenyakit,
      !jenisRiwayatPenyakit,
      !riwayatPenanganan,
      !waktuRiwayatPenanganan,
      !tempatRiwayatPenanganan,
      !metodeRiwayatPenanganan,
      !dokterRiwayatPenanganan,
      !riwayatAlergi
    );
    if (
      riwayatPenyakit === "" ||
      waktuRiwayatPenyakit === "" ||
      jenisRiwayatPenyakit === "" ||
      riwayatPenanganan === "" ||
      waktuRiwayatPenanganan === "" ||
      tempatRiwayatPenanganan === "" ||
      metodeRiwayatPenanganan === "" ||
      dokterRiwayatPenanganan === "" ||
      riwayatAlergi === ""
    ) {
      console.log(
        !riwayatPenyakit,
        !waktuRiwayatPenyakit,
        !jenisRiwayatPenyakit,
        !riwayatPenanganan,
        !waktuRiwayatPenanganan,
        !tempatRiwayatPenanganan,
        !metodeRiwayatPenanganan,
        !dokterRiwayatPenanganan,
        !riwayatAlergi
      );
      alert("Silahkan lengkapi data");
      return;
    }

    if (!contract || !web3) return;

    try {
      let response = await adminServices(contract, web3).addAnamnesis({
        nik: Number(id),
        riwayatPenyakit,
        waktuRiwayatPenyakit,
        jenisRiwayatPenyakit,
        riwayatPenanganan,
        waktuRiwayatPenanganan,
        tempatRiwayatPenanganan,
        metodeRiwayatPenanganan,
        dokterRiwayatPenanganan,
        riwayatAlergi,
      });
      alert("Berhasil menambahkan data");
      history.push(`/admin/pasien/anamnesis/list/${id}`);
    } catch (error) {
      alert("Terjadi kesalahan: " + JSON.stringify(error));
      console.log(error);
    }
  };

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} spacing="24px">
        <Card>
          <SimpleGrid columns={{ sm: 2, md: 2, xl: 2 }} spacing="24px">
            <FormControl>
              <FormLabel>Riwayat Penyakit</FormLabel>
              <Input
                value={riwayatPenyakit}
                onChange={(item) => setriwayatPenyakit(item.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Waktu Riwayat</FormLabel>
              <Input
                type="date"
                value={waktuRiwayatPenyakit}
                onChange={(item) => setwaktuRiwayatPenyakit(item.target.value)}
              />
            </FormControl>
          </SimpleGrid>
          <FormControl>
            <FormLabel>Jenis Penyakit</FormLabel>
            <Input
              value={jenisRiwayatPenyakit}
              onChange={(item) => setjenisRiwayatPenyakit(item.target.value)}
            />
          </FormControl>

          <SimpleGrid columns={{ sm: 2, md: 2, xl: 2 }} spacing="24px">
            <FormControl>
              <FormLabel>Riwayat Penanganan</FormLabel>
              <Input
                value={riwayatPenanganan}
                onChange={(item) => setriwayatPenanganan(item.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Waktu Penanganan</FormLabel>
              <Input
                type="date"
                value={waktuRiwayatPenanganan}
                onChange={(item) =>
                  setwaktuRiwayatPenanganan(item.target.value)
                }
              />
            </FormControl>
          </SimpleGrid>

          <FormControl>
            <FormLabel>Metode Penanganan</FormLabel>
            <Input
              value={metodeRiwayatPenanganan}
              onChange={(item) => setmetodeRiwayatPenanganan(item.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Tempat Penanganan</FormLabel>
            <Input
              value={tempatRiwayatPenanganan}
              onChange={(item) => settempatRiwayatPenanganan(item.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Dokter</FormLabel>
            <Input
              value={dokterRiwayatPenanganan}
              onChange={(item) => setdokterRiwayatPenanganan(item.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Riwayat Alergi</FormLabel>
            <Input
              value={riwayatAlergi}
              onChange={(item) => setriwayatAlergi(item.target.value)}
            />
          </FormControl>
          <FormControl mt={2}>
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
                history.push(`/admin/pasien/anamnesis/list/${id}`)
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
