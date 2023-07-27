const adminServices = (contract, web3) => ({
  // Function to add a new patient
  addPatient: async (patientData) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const {
        nik,
        nama,
        alamat,
        jenisKelamin,
        golonganDarah,
        tanggalLahir,
      } = patientData;
      await contract.methods
        .daftarPasien(
          nik,
          nama,
          alamat,
          jenisKelamin,
          golonganDarah,
          tanggalLahir
        )
        .send({ from: accounts[0] });
      return "Patient added successfully.";
    } catch (error) {
      console.error("Error adding patient:", error);
      return "Error adding patient.";
    }
  },

  // Function to add a new medical history
  addMedicalHistory: async (medicalHistoryData) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const {
        nik,
        tanggalPemeriksaan,
        diagnosa,
        hasilPemeriksaan,
      } = medicalHistoryData;
      await contract.methods
        .tambahRiwayatMedis(nik, tanggalPemeriksaan, diagnosa, hasilPemeriksaan)
        .send({ from: accounts[0] });
      return "Medical history added successfully.";
    } catch (error) {
      console.error("Error adding medical history:", error);
      return "Error adding medical history.";
    }
  },

  // Function to add a new medical history
  addAnamnesis: async (AnamnesisData) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const {
        nik,
        riwayatPenyakit,
        waktuRiwayatPenyakit,
        jenisRiwayatPenyakit,
        riwayatPenanganan,
        waktuRiwayatPenanganan,
        tempatRiwayatPenanganan,
        metodeRiwayatPenanganan,
        dokterRiwayatPenanganan,
        riwayatAlergi,
      } = AnamnesisData;
      console.log(AnamnesisData)
      await contract.methods
        .tambahHasilAnamnesis(
          nik,
          riwayatPenyakit,
          waktuRiwayatPenyakit,
          jenisRiwayatPenyakit,
          riwayatPenanganan,
          waktuRiwayatPenanganan,
          tempatRiwayatPenanganan,
          metodeRiwayatPenanganan,
          dokterRiwayatPenanganan,
          riwayatAlergi
        )
        .send({ from: accounts[0] });
      return "Anamnesis added successfully.";
    } catch (error) {
      console.error("Error adding Anamnesis:", error);
      return "Error adding Anamnesis.";
    }
  },

  // Function to add a new medical history
  getListAnamnesis: async (nik, index = null) => {
    try {
      const count = await contract.methods.getJumlahHasilAnamnesis().call();
      let idx = 0;
      let listData = [];

      console.log(count)
      for (let i = 0; i < count; i++) {
        const data = await contract.methods.getHasilAnamnesis(i).call();
        if (String(data.nik) === nik) {
          listData.push(data);
          if (index !== null && idx === index) {
            return data;
          }

          idx++;
        }
      }
      if (index == null) {
        return listData;
      }
      return null;
    } catch (error) {
      console.error("Error getting anamnesis:", error);
      return null;
    }
  },

  // Function to get patient count
  getPatientCount: async () => {
    try {
      const count = await contract.methods.getJumlahPasien().call();
      return count;
    } catch (error) {
      console.error("Error getting patient count:", error);
      return 0;
    }
  },

  // Function to get patient data by index
  getPatientByIndex: async (index) => {
    try {
      const patient = await contract.methods.getIdentitasPasien(index).call();
      return patient;
    } catch (error) {
      console.error("Error getting patient data:", error);
      return null;
    }
  },

  getListPatients: async () => {
    try {
      const count = await contract.methods.getJumlahPasien().call();
      const listPatients = [];

      for (let i = 0; i < count; i++) {
        const patient = await contract.methods.getIdentitasPasien(i).call();
        listPatients.push(patient);
      }
      console.log(listPatients);

      return listPatients;
    } catch (error) {
      console.error("Error getting patient count:", error);
      return 0;
    }
  },

  // Function to get medical history count for a patient
  getMedicalHistoryCount: async (nik) => {
    try {
      const count = await contract.methods.getJumlahRiwayatMedis().call();
      let medicalHistoryCount = 0;
      for (let i = 0; i < count; i++) {
        const history = await contract.methods.getRiwayatMedis(i).call();
        if (history.nik === nik) {
          medicalHistoryCount++;
        }
      }
      return medicalHistoryCount;
    } catch (error) {
      console.error("Error getting medical history count:", error);
      return 0;
    }
  },

  // Function to get medical history for a patient by index
  getMedicalHistory: async (nik, index = null) => {
    try {
      const count = await contract.methods.getJumlahRiwayatMedis().call();
      let medicalHistoryIndex = 0;
      let listData = [];

      for (let i = 0; i < count; i++) {
        const history = await contract.methods.getRiwayatMedis(i).call();
        if (String(history.nik) === nik) {
          listData.push(history);
          if (index !== null && medicalHistoryIndex === index) {
            return history;
          }

          medicalHistoryIndex++;
        }
      }
      if (index == null) {
        return listData;
      }
      return null;
    } catch (error) {
      console.error("Error getting medical history:", error);
      return null;
    }
  },
});

export default adminServices;
