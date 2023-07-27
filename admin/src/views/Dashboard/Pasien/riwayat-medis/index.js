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
import adminServices from "services/adminServices";
export default function Dashboard() {
  const history = useHistory();
  const { id } = useParams();
  const { web3, accounts, contract } = useWeb3();
  const [dataList, setDataList] = useState([]);

  const fetchResources = async () => {
    if (!web3 || !contract) return;
    try {
      const data = await adminServices(contract, web3).getMedicalHistory(id);
      console.log(data);
      setDataList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [contract, web3]);

  const TablesRow = ({ tanggalPemeriksaan, diagnosa, hasilPemeriksaan }) => (
    <Tr key={tanggalPemeriksaan}>
      <Td color="gray.400">{tanggalPemeriksaan}</Td>
      <Td color="gray.400">{diagnosa}</Td>
      <Td color="gray.400">{hasilPemeriksaan}</Td>
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
            <AddIcon />
            Riwayat Medis
          </Button>
          <Button
            mt={2}
            mr={2}
            colorScheme="gray"
            onClick={() =>
              history.push(`/admin/pasien/list`)
            }
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
                  <Th color="gray.400">TANGGAL PEMERIKSAAN</Th>
                  <Th color="gray.400">DIAGNOSA</Th>
                  <Th color="gray.400">HASIL PEMERIKSAAN</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataList?.length > 0 &&
                  dataList.map((row) => {
                    return (
                      <TablesRow
                        tanggalPemeriksaan={new Date(
                          Number(row.tanggalPemeriksaan)
                        ).toLocaleDateString()}
                        diagnosa={row.diagnosa}
                        hasilPemeriksaan={row.hasilPemeriksaan}
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
