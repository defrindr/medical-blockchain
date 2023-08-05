// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RekamMedis {
    struct MedicalCheckup {
        uint256 idCheckup;
        uint256 nik;
        uint256 idDokter;
        string diagnosa;
        string subjek;
        string objek;
        string assesmen;
        string planning;
        string statusPasien;
        string keterangan;
        string tanggal;
    }

    struct Perawat {
        uint256 nik;
        uint256 idCheckup;
        uint256 idPerawat;
        string diagnosa;
        string subjek;
        string objek;
        string assesmen;
        string planning;
        string intervensi;
        string tanggal;
    }

    struct Gizi {
        uint256 nik;
        uint256 idCheckup;
        uint256 idPerawat;
        string diagnosa;
        string intervensi;
        string tanggal;
    }

    struct Farmasi {
        uint256 nik;
        uint256 idCheckup;
        uint256 idPerawat;
        string diagnosa;
        string resepObat;
        string tanggal;
    }

    struct Laboran {
        uint256 nik;
        uint256 idCheckup;
        uint256 idPerawat;
        string diagnosa;
        string jenisPemeriksaan;
        string hasilPemeriksaan;
    }

    MedicalCheckup[] private _medicalCheckup;
    Perawat[] private _perawat;
    Gizi[] private _gizi;
    Farmasi[] private _farmasi;
    Laboran[] private _laboran;

    function tambahPerawat(
        uint256 idCheckup,
        uint256 nik,
        uint256 idPerawat,
        string memory diagnosa,
        string memory subjek,
        string memory objek,
        string memory assesmen,
        string memory planning,
        string memory intervensi,
        string memory tanggal
    ) public {
        _perawat.push(
            Perawat(
                nik,
                idCheckup,
                idPerawat,
                diagnosa,
                subjek,
                objek,
                assesmen,
                planning,
                intervensi,
                tanggal
            )
        );
    }

    function tambahMedicalCheckup(
        uint256 nik,
        uint256 idCheckup,
        uint256 idDokter,
        string memory diagnosa,
        string memory subjek,
        string memory objek,
        string memory assesmen,
        string memory planning,
        string memory statusPasien,
        string memory keterangan,
        string memory tanggal
    ) public {
        _medicalCheckup.push(
            MedicalCheckup(
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
                tanggal
            )
        );
    }

    function tambahGizi(
        uint256 nik,
        uint256 idCheckup,
        uint256 idPerawat,
        string memory diagnosa,
        string memory intervensi,
        string memory tanggal
    ) public {
        _gizi.push(
            Gizi(nik, idCheckup, idPerawat, diagnosa, intervensi, tanggal)
        );
    }

    function tambahFarmasi(
        uint256 nik,
        uint256 idCheckup,
        uint256 idPerawat,
        string memory diagnosa,
        string memory resepObat,
        string memory tanggal
    ) public {
        _farmasi.push(
            Farmasi(nik, idCheckup, idPerawat, diagnosa, resepObat, tanggal)
        );
    }

    function tambahLaboran(
        uint256 nik,
        uint256 idCheckup,
        uint256 idPerawat,
        string memory diagnosa,
        string memory jenisPemeriksaan,
        string memory hasilPemeriksaan
    ) public {
        _laboran.push(
            Laboran(
                nik,
                idCheckup,
                idPerawat,
                diagnosa,
                jenisPemeriksaan,
                hasilPemeriksaan
            )
        );
    }

    // Fungsi untuk mendapatkan jumlah data pasien
    function jumlahMedicalCheckup() public view returns (uint256) {
        return _medicalCheckup.length;
    }

    function jumlahPerawat() public view returns (uint256) {
        return _perawat.length;
    }

    function jumlahGizi() public view returns (uint256) {
        return _gizi.length;
    }

    function jumlahFarmasi() public view returns (uint256) {
        return _farmasi.length;
    }

    function jumlahLaboran() public view returns (uint256) {
        return _laboran.length;
    }

    // Fungsi untuk mendapatkan data identitas pasien berdasarkan indeks
    function lihatMedicalCheckout(
        uint256 index
    ) public view returns (MedicalCheckup memory) {
        require(index < _medicalCheckup.length, "Indeks tidak valid");
        return _medicalCheckup[index];
    }

    function lihatPerawat(uint256 index) public view returns (Perawat memory) {
        require(index < _perawat.length, "Indeks tidak valid");
        return _perawat[index];
    }

    function lihatGizi(uint256 index) public view returns (Gizi memory) {
        require(index < _gizi.length, "Indeks tidak valid");
        return _gizi[index];
    }

    function lihatFarmasi(uint256 index) public view returns (Farmasi memory) {
        require(index < _farmasi.length, "Indeks tidak valid");
        return _farmasi[index];
    }

    function lihatLaboran(uint256 index) public view returns (Laboran memory) {
        require(index < _laboran.length, "Indeks tidak valid");
        return _laboran[index];
    }

    constructor() {
        // Add assert statements to the constructor
        assert(msg.sender != address(0));
    }
}
