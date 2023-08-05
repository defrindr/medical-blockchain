import {
  Button,
  Flex,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import { useWeb3 } from "contexts/Web3Context";
import AuthHelper from "helpers/AuthHelper";
import React, { useEffect, useState } from "react";
import { FaEye, FaPlus } from "react-icons/fa";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import medicalServices from "services/medicalServices";

export default function Dashboard() {
  const router = useHistory();
  const { web3, contract } = useWeb3();
  const [dataList, setDataList] = useState([]);
  const [user, setUser] = useState(null);
  const auther = AuthHelper(router);

  const fetchResources = async () => {
    if (!web3 || !contract) return;
    try {
      let data = [];
      if (user.roles.includes("patient")) {
        data = await medicalServices({ contract, web3 }).dapatkan(user.nik);
      } else {
        data = await medicalServices({ contract, web3 }).dapatkan();
      }
      setDataList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      let response = await auther.getUser();

      setUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [contract, web3, user]);
  useEffect(() => {
    getUser();
  }, []);

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
      {/* <Td color="gray.400">{subjek}</Td>
      <Td color="gray.400">{objek}</Td>
      <Td color="gray.400">{assesmen}</Td>
      <Td color="gray.400">{planning}</Td> */}
      <Td color="gray.400">{statusPasien}</Td>
      {/* <Td color="gray.400">{keterangan}</Td>
      <Td color="gray.400">{tanggal}</Td> */}
      <Td>
        {keterangan !== "meninggal" && user && (
          <>
            {user.roles.includes("nurse") && (
              <Button
                m={2}
                colorScheme="blue"
                onClick={() => {
                  router.push("/admin/riwayat-medis/perawat/list/" + idCheckup);
                }}
              >
                <FaPlus style={{ marginRight: 4 }} />
                Perawat
              </Button>
            )}
            {user.roles.includes("gizi") && (
              <Button
                m={2}
                colorScheme="yellow"
                onClick={() => {
                  router.push("/admin/riwayat-medis/gizi/list/" + idCheckup);
                }}
              >
                <FaPlus style={{ marginRight: 4 }} />
                Gizi
              </Button>
            )}
            {user.roles.includes("farmasi") && (
              <Button
                m={2}
                colorScheme="pink"
                onClick={() => {
                  router.push("/admin/riwayat-medis/farmasi/list/" + idCheckup);
                }}
              >
                <FaPlus style={{ marginRight: 4 }} />
                Farmasi
              </Button>
            )}
            {user.roles.includes("laboran") && (
              <Button
                m={2}
                colorScheme="green"
                onClick={() => {
                  router.push("/admin/riwayat-medis/laboran/list/" + idCheckup);
                }}
              >
                <FaPlus style={{ marginRight: 4 }} />
                Laboran
              </Button>
            )}
            {user.roles.includes("patient") && (
              <Button
                m={2}
                colorScheme="pink"
                onClick={() => {
                  router.push("/admin/riwayat-medis/detail/" + idCheckup);
                }}
              >
                <FaEye style={{ marginRight: 4 }} />
                Detail
              </Button>
            )}
          </>
        )}
      </Td>
    </Tr>
  );

  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} spacing="24px">
        <Card>
          <CardHeader>
            <Button m={4} colorScheme="blue" onClick={() => fetchResources()}>
              Refresh
            </Button>
          </CardHeader>
          <TableContainer>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px">
                  {/* <Th color="gray.400">ID Checkup</Th> */}
                  <Th color="gray.400">NIK</Th>
                  {/* <Th color="gray.400">Dokter</Th> */}
                  <Th color="gray.400">Diagnosa</Th>
                  {/* <Th color="gray.400">Subjek</Th>
                  <Th color="gray.400">Objek</Th>
                  <Th color="gray.400">Assemen</Th>
                  <Th color="gray.400">Planning</Th> */}
                  <Th color="gray.400">Status Pasien</Th>
                  {/* <Th color="gray.400">Keterangan</Th>
                  <Th color="gray.400">Tanggal</Th> */}
                  <Th color="gray.400">Aksi</Th>
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
