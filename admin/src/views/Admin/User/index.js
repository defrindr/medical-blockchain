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
  Text,
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
import { FaList, FaPencilAlt, FaPlus } from "react-icons/fa";
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
      let response = await fetcher.get(`${BE_URL}/admin/user`);
      if (response.status) {
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

  const TablesRow = ({ id, name, email, blockchainAddress = [], roles }) => (
    <Tr key={id}>
      <Td color="gray.400">{name}</Td>
      <Td color="gray.400">{email}</Td>
      <Td color="gray.400">{blockchainAddress}</Td>
      <Td color="gray.400">
        {roles?.map((role) => (
          <Text key={role.id}>{role.name}</Text>
        ))}
      </Td>
      <Td color="gray.400">
        {user?.roles.includes("admin") && (
          <Button
            colorScheme="yellow"
            mr={1}
            mt={1}
            onClick={() =>
              history.push(`/admin/user/edit/${id}`)
            }
          >
            <FaPencilAlt style={{ marginRight: 5 }} /> Ubah
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
            {user?.roles.includes("admin") && (
              <Button
                colorScheme="green"
                m={4}
                onClick={() => history.push(`/admin/user/add`)}
              >
                <FaPlus style={{ marginRight: 5 }} /> Tambah
              </Button>
            )}
            <Button m={4} colorScheme="blue" onClick={() => getPatiens()}>
              Refresh
            </Button>
          </SimpleGrid>
          <TableContainer>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px">
                  <Th color="gray.400">NAMA</Th>
                  <Th color="gray.400">EMAIL</Th>
                  <Th color="gray.400">BLOCKCHAIN</Th>
                  <Th color="gray.400">HAK AKSES</Th>
                  <Th color="gray.400">AKSI</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataPasien?.length > 0 &&
                  dataPasien.map((row) => {
                    return (
                      <TablesRow
                        id={row?.id}
                        name={row?.name}
                        email={row?.email}
                        blockchainAddress={row?.blockchainAddress}
                        roles={row?.roles}
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
