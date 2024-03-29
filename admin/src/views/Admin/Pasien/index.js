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
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import { BE_URL } from "config";
import { useWeb3 } from "contexts/Web3Context";
import AuthHelper from "helpers/AuthHelper";
import FetchHelper from "helpers/FetchHelper";
import React, { useEffect, useState } from "react";
import { FaList, FaPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function Dashboard() {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const { web3, accounts, contract } = useWeb3();
  const [dataPasien, setDataPasien] = useState([]);
  const router = useHistory();
  const fetcher = FetchHelper(router);
  const auther = AuthHelper(router);

  const getUser = async () => {
    try {
      let data = await auther.getUser();
      setUser(data);
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  const getPatiens = async () => {
    // if (!web3 || !contract) return;
    try {
      let response = await fetcher.get(`${BE_URL}/admin/patient`);
      if (response.status) {
        // const patients = await adminServices(contract, web3).getListPatients();
        console.log(response.data);
        setDataPasien(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatiens();
  }, [contract, web3]);

  const TablesRow = ({
    nik,
    nama,
    tanggalLahir,
    jenisKelamin,
    golonganDarah,
    alamat,
  }) => (
    <Tr key={nik}>
      <Td color="gray.400">{nik}</Td>
      <Td color="gray.400">{nama}</Td>
      <Td color="gray.400">{tanggalLahir}</Td>
      <Td color="gray.400">{jenisKelamin}</Td>
      <Td color="gray.400">{golonganDarah}</Td>
      <Td color="gray.400">{alamat}</Td>
      <Td color="gray.400">
        {user?.roles.includes("doctor") && (
          <Button
            colorScheme="blue"
            mr={1}
            mt={1}
            onClick={() =>
              history.push(`/admin/pasien/riwayat-medis/list/${nik}`)
            }
          >
            <FaList style={{ marginRight: 5 }} /> Medical Checkup
          </Button>
        )}
      </Td>
    </Tr>
  );

  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} spacing="24px">
        <Card>
          <SimpleGrid
            columns={{ sm: 6, md: 6, xl: 3 }}
            spacing="24px"
            justifyContent={"space-between"}
          >
            <Button
              colorScheme="green"
              m={4}
              onClick={() => history.push(`/admin/pasien/add`)}
            >
              <FaPlus style={{ marginRight: 5 }} /> Tambah
            </Button>
            <Button m={4} colorScheme="blue" onClick={() => getPatiens()}>
              Refresh
            </Button>
          </SimpleGrid>
          <TableContainer>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px">
                  <Th color="gray.400">NIK</Th>
                  <Th color="gray.400">NAMA</Th>
                  <Th color="gray.400">TANGGAL LAHIR</Th>
                  <Th color="gray.400">JENIS KELAMIN</Th>
                  <Th color="gray.400">GOLONGAN DARAH</Th>
                  <Th color="gray.400">ALAMAT</Th>
                  <Th color="gray.400">AKSI</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataPasien?.length > 0 &&
                  dataPasien.map((row) => {
                    return (
                      <TablesRow
                        nik={row?.pasiens?.noIdentity}
                        nama={row?.pasiens?.name}
                        tanggalLahir={row?.pasiens?.birthday}
                        jenisKelamin={row?.pasiens?.gender}
                        golonganDarah={row?.pasiens?.bloodType}
                        alamat={row?.pasiens?.address}
                      />
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
      </SimpleGrid>
    </Flex>
  );
}
