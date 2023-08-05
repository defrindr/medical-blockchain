const perawatServices = ({ contract, web3 }) => ({
  // Function to add a new patient
  tambah: async (sendData) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const {
        idCheckup,
        nik,
        idPerawat,
        diagnosa,
        subjek,
        objek,
        assesmen,
        planning,
        intervensi,
        tanggal,
      } = sendData;
      await contract.methods
        .tambahPerawat(
          idCheckup,
          nik,
          idPerawat,
          diagnosa,
          subjek,
          objek,
          assesmen,
          planning,
          intervensi,
          tanggal
        )
        .send({ from: accounts[0] });
      return "Perawat added successfully.";
    } catch (error) {
      console.error("Error adding Perawat:", error);
      return "Error adding Perawat.";
    }
  },

  // Function to get medical history count for a patient
  jumlah: async () => {
    try {
      const count = await contract.methods.jumlahPerawat().call();
      return count;
    } catch (error) {
      console.error("Error getting medicalCheckup count:", error);
      return 0;
    }
  },

  // Function to get medical history for a patient
  dapatkan: async (idCheckup = null, index = null) => {
    try {
      const count = await contract.methods.jumlahPerawat().call();
      let _mcHistory = 0;
      let results = [];

      for (let i = 0; i < count; i++) {
        const data = await contract.methods.lihatPerawat(i).call();
        console.log("Smartcontract idCheckup: ", data.idCheckup);
        if (idCheckup === null || String(data.idCheckup) === idCheckup) {
          results.push(data);
          if (index !== null && _mcHistory === index) {
            return data;
          }

          _mcHistory++;
        }
      }
      if (index == null) {
        return results;
      }
      return null;
    } catch (error) {
      console.error("Error getting medicalCheckup count:", error);
      return 0;
    }
  },
});

export default perawatServices;
