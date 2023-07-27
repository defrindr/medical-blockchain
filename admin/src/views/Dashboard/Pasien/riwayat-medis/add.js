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
  const [tanggalPemeriksaan, setTanggalPemeriksaan] = useState(0);
  const [diagnosa, setDiagnosa] = useState("");
  const [hasilPemeriksaan, setHasilPemeriksaan] = useState("");

  const convertDate = (input) => {
    const date = new Date(input);
    const epochTimestamp = date.getTime();
    return epochTimestamp;
  };

  const pressSimpan = async () => {
    if (!tanggalPemeriksaan || !diagnosa || !hasilPemeriksaan) {
      alert("Silahkan lengkapi data");
      return;
    }
    if (!contract || !web3) return;

    // convert tanggal to timestamp
    let tanggalPemeriksaanEpoch = convertDate(tanggalPemeriksaan);
    try {
      let response = await adminServices(contract, web3).addMedicalHistory({
        nik: id,
        tanggalPemeriksaan: tanggalPemeriksaanEpoch,
        diagnosa,
        hasilPemeriksaan,
      });
      alert("Berhasil menambahkan data");
      history.push(`/admin/pasien/riwayat-medis/list/${id}`);
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
            <FormLabel>Tanggal Lahir</FormLabel>
            <Input
              type="date"
              value={tanggalPemeriksaan}
              onChange={(item) => setTanggalPemeriksaan(item.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Diagnosa</FormLabel>
            <Textarea
              value={diagnosa}
              onChange={(item) => setDiagnosa(item.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Hasil Pemeriksaan</FormLabel>
            <Textarea
              value={hasilPemeriksaan}
              onChange={(item) => setHasilPemeriksaan(item.target.value)}
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
