const medicalServices = ({ contract, web3 }) => ({
  // Function to add a new patient
  tambah: async (patientData) => {
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      const {
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
      } = patientData;
      await contract.methods
        .tambahMedicalCheckup(
          nik,
          idCheckup,
          idDokter,
          diagnosa,
          subjek,
          objek,
          assesmen,
          planning,
          statusPasien,
          keterangan,
          tanggal
        )
        .send({ from: accounts[0] });
      return "Medical Checkup added successfully.";
    } catch (error) {
      console.error("Error adding Medical Checkup:", error);
      return "Error adding Medical Checkup.";
    }
  },

  // Function to get medical history count for a patient
  jumlah: async () => {
    try {
      const count = await contract.methods.jumlahMedicalCheckup().call();
      return count;
    } catch (error) {
      console.error("Error getting medicalCheckup count:", error);
      return 0;
    }
  },

  // Function to get medical history for a patient
  dapatkan: async (nik = null, index = null) => {
    try {
      const count = await contract.methods.jumlahMedicalCheckup().call();
      let _mcHistory = 0;
      let results = [];

      for (let i = 0; i < count; i++) {
        const data = await contract.methods.lihatMedicalCheckout(i).call();
        console.log("Smartcontract", data.nik);
        if (nik === null || String(data.nik) === nik) {
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

  // Function to get medical history for a patient
  dariIdCheckup: async (idCheckup) => {
    try {
      const count = await contract.methods.jumlahMedicalCheckup().call();

      for (let i = 0; i < count; i++) {
        const data = await contract.methods.lihatMedicalCheckout(i).call();
        if (String(data.idCheckup) === idCheckup) {
          return data;
        }
      }
      return null;
    } catch (error) {
      console.error("Error getting medicalCheckup count:", error);
      return 0;
    }
  },
});

export default medicalServices;
