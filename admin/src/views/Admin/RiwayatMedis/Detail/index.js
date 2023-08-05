import { Flex, SimpleGrid, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { useAuth } from "contexts/AuthContext";
import { useWeb3 } from "contexts/Web3Context";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import farmasiService from "services/farmasiService";
import giziService from "services/giziService";
import laboranService from "services/laboranService";
import medicalServices from "services/medicalServices";
import perawatServices from "services/perawatServices";

export function RiwayatMedisDetail() {
  const { paramCheckup } = useParams();
  const { web3, accounts, contract } = useWeb3();
  const { user } = useAuth();
  const [data, setData] = useState({
    medicalCheckup: {},
    keperawatan: {},
    gizi: {},
    farmasi: {},
    laboran: {},
  });

  const getMedicalCheckup = async () => {
    try {
      let response = await medicalServices({ web3, contract }).dariIdCheckup(
        paramCheckup
      );

      setData((prev) => ({ ...prev, medicalCheckup: response }));
    } catch (error) {
      console.log("-- ERROR MEDICAL CHECKUP --", error);
    }
  };

  const getLainnya = async () => {
    try {
      let responseKeperawatan = await perawatServices({
        web3,
        contract,
      }).dapatkan(paramCheckup, 0);

      let responseGizi = await giziService({
        web3,
        contract,
      }).dapatkan(paramCheckup, 0);

      let responseFarmasi = await farmasiService({
        web3,
        contract,
      }).dapatkan(paramCheckup, 0);

      let responseLaboran = await laboranService({
        web3,
        contract,
      }).dapatkan(paramCheckup, 0);

      setData((prev) => ({
        ...prev,
        keperawatan: responseKeperawatan,
        gizi: responseGizi,
        farmasi: responseFarmasi,
        laboran: responseLaboran,
      }));
    } catch (error) {
      console.log("-- ERROR MEDICAL CHECKUP --", error);
    }
  };

  const initOnLoad = async () => {
    await getMedicalCheckup();
    await getLainnya();
  };

  useEffect(() => {
    initOnLoad();
  }, [user]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const TRow = ({ title, value }) => (
    <Tr>
      <Td>
        <Text fontWeight={400}>{title}</Text>
      </Td>
      <Td>
        <Text>:</Text>
      </Td>
      <Td>
        <Text>{value}</Text>
      </Td>
    </Tr>
  );
  function nl2br(str, is_xhtml) {
    if (typeof str === "undefined" || str === null) {
      return "";
    }
    var breakTag =
      is_xhtml || typeof is_xhtml === "undefined" ? "<br>" : "<br>";
    return (str + "").replace(
      /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
      "$1" + breakTag + "$2"
    );
  }

  return (
    <>
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
          <Card mt={2}>
            <CardHeader>
              <Text fontWeight={700}>Informasi Medical Checkup</Text>
            </CardHeader>
            <CardBody>
              <Table>
                <Tbody>
                  <TRow
                    title={"NIK"}
                    value={data?.medicalCheckup?.nik?.toString()}
                  />
                  <TRow
                    title={"Diagnosa"}
                    value={data?.medicalCheckup?.diagnosa?.toString()}
                  />
                  <TRow
                    title={"Assesmen"}
                    value={data?.medicalCheckup?.assesmen?.toString()}
                  />
                  <TRow
                    title={"Object"}
                    value={data?.medicalCheckup?.objek?.toString()}
                  />
                  <TRow
                    title={"Subject"}
                    value={data?.medicalCheckup?.subjek?.toString()}
                  />
                  <TRow
                    title={"Rencana"}
                    value={data?.medicalCheckup?.planning?.toString()}
                  />
                  <TRow
                    title={"Status"}
                    value={data?.medicalCheckup?.statusPasien?.toString()}
                  />
                  {data?.medicalCheckup?.statusPasien === "meninggal" && (
                    <>
                      <TRow
                        title={"Tanggal Meninggal"}
                        value={data?.medicalCheckup?.tanggal?.toString()}
                      />
                      <TRow
                        title={"Keterangan"}
                        value={data?.medicalCheckup?.keterangan?.toString()}
                      />
                    </>
                  )}
                </Tbody>
              </Table>
            </CardBody>
          </Card>
          <Card mt={2}>
            <CardHeader>
              <Text fontWeight={700}>Informasi Lainnya</Text>
            </CardHeader>
            <CardBody>
              <Table>
                <Tbody>
                  <TRow
                    title={"Intervensi Keperawatan"}
                    value={`${data?.keperawatan?.intervensi?.toString()}`}
                  />
                  <TRow
                    title={"Intervensi Gizi"}
                    value={`${data?.gizi?.intervensi?.toString()}`}
                  />
                  <TRow
                    title={"Resep Obat"}
                    value={`${data?.farmasi?.resepObat?.toString()}`}
                  />
                  <TRow
                    title={"Jenis Pemeriksaan"}
                    value={`${data?.laboran?.jenisPemeriksaan?.toString()}`}
                  />
                  <TRow
                    title={"Hasil Pemeriksaan"}
                    value={`${data?.laboran?.hasilPemeriksaan?.toString()}`}
                  />
                </Tbody>
              </Table>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Flex>
    </>
  );
}
