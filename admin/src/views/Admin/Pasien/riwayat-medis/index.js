// Chakra imports
import { AddIcon } from "@chakra-ui/icons";
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
import { useWeb3 } from "contexts/Web3Context";
import React, { useEffect, useState } from "react";
import { FaList, FaPlus } from "react-icons/fa";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import medicalServices from "services/medicalServices";

export default function Dashboard() {
  const history = useHistory();
  const { id } = useParams();
  const { web3, accounts, contract } = useWeb3();
  const [dataList, setDataList] = useState([]);

  const fetchResources = async () => {
    if (!web3 || !contract) return;
    try {
      const data = await medicalServices({ contract, web3 }).dapatkan(id);
      setDataList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [contract, web3]);

  const TablesRow = ({
    idCheckup,
    nik,
    idDokter,
    diagnosa,
    subjek,
    objek,
    assesmen,
    planning,
    statusPasien,
    keterangan,
    tanggal,
  }) => (
    <Tr key={`${idCheckup}${nik}`}>
      <Td color="gray.400">{nik}</Td>
      <Td color="gray.400">{diagnosa}</Td>
      <Td color="gray.400">{subjek}</Td>
      <Td color="gray.400">{objek}</Td>
      <Td color="gray.400">{assesmen}</Td>
      <Td color="gray.400">{planning}</Td>
      <Td color="gray.400">{statusPasien}</Td>
      <Td color="gray.400">{keterangan}</Td>
      <Td color="gray.400">{tanggal}</Td>
    </Tr>
  );

  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} spacing="24px">
        <HStack>
          <Button
            mt={2}
            mr={2}
            colorScheme="green"
            onClick={() =>
              history.push(`/admin/pasien/riwayat-medis/add/${id}`)
            }
          >
            <AddIcon style={{ marginRight: 5 }} />
            Medical Checkup
          </Button>{" "}
          <Button
            mt={2}
            mr={2}
            colorScheme="gray"
            onClick={() => history.push(`/admin/pasien/list`)}
          >
            Kembali
          </Button>
        </HStack>
        <Card>
          <Button m={4} colorScheme="blue" onClick={() => fetchResources()}>
            Refresh
          </Button>
          <TableContainer>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px">
                  {/* <Th color="gray.400">ID Checkup</Th> */}
                  <Th color="gray.400">NIK</Th>
                  {/* <Th color="gray.400">Dokter</Th> */}
                  <Th color="gray.400">Diagnosa</Th>
                  <Th color="gray.400">Subjek</Th>
                  <Th color="gray.400">Objek</Th>
                  <Th color="gray.400">Assemen</Th>
                  <Th color="gray.400">Planning</Th>
                  <Th color="gray.400">Status Pasien</Th>
                  <Th color="gray.400">Keterangan</Th>
                  <Th color="gray.400">Tanggal</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataList?.length > 0 &&
                  dataList.map((row) => {
                    return (
                      <TablesRow
                        idCheckup={row.idCheckup}
                        nik={row.nik.toString()}
                        idDokter={row.idDokter}
                        diagnosa={row.diagnosa}
                        subjek={row.subjek}
                        objek={row.objek}
                        assesmen={row.assesmen}
                        planning={row.planning}
                        statusPasien={row.statusPasien}
                        keterangan={row.keterangan}
                        tanggal={row.tanggal}
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
