const farmasiService = ({ contract, web3 }) => ({
  // Function to add a new gizi
  tambah: async (sendData) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const {
        nik,
        idCheckup,
        idPerawat,
        diagnosa,
        resepObat,
        tanggal,
      } = sendData;
      await contract.methods
        .tambahFarmasi(nik, idCheckup, idPerawat, diagnosa, resepObat, tanggal)
        .send({ from: accounts[0] });
      return "Farmasi added successfully.";
    } catch (error) {
      console.error("Error adding Farmasi:", error);
      return "Error adding Farmasi.";
    }
  },

  // Function to get medical history count for a gizi
  jumlah: async () => {
    try {
      const count = await contract.methods.jumlahFarmasi().call();
      return count;
    } catch (error) {
      console.error("Error getting Farmasi count:", error);
      return 0;
    }
  },

  // Function to get medical history for a gizi
  dapatkan: async (idCheckup = null, index = null) => {
    try {
      const count = await contract.methods.jumlahFarmasi().call();
      let loop = 0;
      let results = [];

      for (let i = 0; i < count; i++) {
        const data = await contract.methods.lihatFarmasi(i).call();
        if (idCheckup === null || String(data.idCheckup) === idCheckup) {
          results.push(data);
          if (index !== null && loop === index) {
            return data;
          }

          loop++;
        }
      }
      if (index == null) {
        return results;
      }
      return null;
    } catch (error) {
      console.error("Error getting Farmasi count:", error);
      return 0;
    }
  },
});

export default farmasiService;
