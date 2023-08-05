const giziService = ({ contract, web3 }) => ({
  // Function to add a new gizi
  tambah: async (sendData) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const {
        nik,
        idCheckup,
        idPerawat,
        diagnosa,
        intervensi,
        tanggal,
      } = sendData;
      await contract.methods
        .tambahGizi(nik, idCheckup, idPerawat, diagnosa, intervensi, tanggal)
        .send({ from: accounts[0] });
      return "Gizi added successfully.";
    } catch (error) {
      console.error("Error adding Gizi:", error);
      return "Error adding Gizi.";
    }
  },

  // Function to get medical history count for a gizi
  jumlah: async () => {
    try {
      const count = await contract.methods.jumlahGizi().call();
      return count;
    } catch (error) {
      console.error("Error getting Gizi count:", error);
      return 0;
    }
  },

  // Function to get medical history for a gizi
  dapatkan: async (idCheckup = null, index = null) => {
    try {
      const count = await contract.methods.jumlahGizi().call();
      let loop = 0;
      let results = [];

      for (let i = 0; i < count; i++) {
        const data = await contract.methods.lihatGizi(i).call();
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
      console.error("Error getting Gizi count:", error);
      return 0;
    }
  },
});

export default giziService;
