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
import farmasiService from "services/farmasiService";

export default function Dashboard() {
  const history = useHistory();
  const { paramCheckup } = useParams();
  const { web3, accounts, contract } = useWeb3();
  const [dataList, setDataList] = useState([]);

  const fetchResources = async () => {
    if (!web3 || !contract) return;
    try {
      const data = await farmasiService({ contract, web3 }).dapatkan(
        paramCheckup
      );
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
    idPerawat,
    diagnosa,
    resepObat,
    tanggal,
  }) => (
    <Tr key={`${idCheckup}${nik}${tanggal}`}>
      <Td color={"gray.400"}>{nik}</Td>
      {/* <Td color={"gray.400"}>{idCheckup}</Td>
      <Td color={"gray.400"}>{idPerawat}</Td> */}
      <Td color={"gray.400"}>{diagnosa}</Td>
      {/* <Td color={"gray.400"}>{subjek}</Td>
      <Td color={"gray.400"}>{objek}</Td>
      <Td color={"gray.400"}>{assesmen}</Td>
      <Td color={"gray.400"}>{planning}</Td> */}
      <Td color={"gray.400"}>{resepObat}</Td>
      <Td color={"gray.400"}>{tanggal}</Td>
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
              history.push(`/admin/riwayat-medis/farmasi/add/${paramCheckup}`)
            }
          >
            <AddIcon style={{ marginRight: 5 }} />
            Farmasi
          </Button>{" "}
          <Button
            mt={2}
            mr={2}
            colorScheme="gray"
            onClick={() => history.push(`/admin/riwayat-medis/list`)}
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
                  <Th color="gray.400">NIK</Th>
                  <Th color="gray.400">Diagnosa</Th>
                  <Th color="gray.400">Resep Obat</Th>
                  <Th color="gray.400">Tanggal</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataList?.length > 0 &&
                  dataList.map((row) => {
                    return (
                      <TablesRow
                        idCheckup={row.idCheckup.toString()}
                        nik={row.nik.toString()}
                        idPerawat={row.idPerawat}
                        diagnosa={row.diagnosa}
                        resepObat={row.resepObat}
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
