// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RekamMedis {
    struct IdentitasPasien {
        uint256 nik;
        string nama;
        string alamat;
        string jenisKelamin;
        string golonganDarah;
        string tanggalLahir;
        // tambahkan atribut lain sesuai kebutuhan
    }

    struct RiwayatMedis {
        uint256 nik;
        uint256 tanggalPemeriksaan;
        string diagnosa;
        string hasilPemeriksaan;
        // tambahkan atribut lain sesuai kebutuhan
    }

    struct HasilAnamnesis {
        uint256 nik;
        string riwayatPenyakit;
        string waktuRiwayatPenyakit;
        string jenisRiwayatPenyakit;
        string riwayatPenanganan;
        string waktuRiwayatPenanganan;
        string tempatRiwayatPenanganan;
        string metodeRiwayatPenanganan;
        string dokterRiwayatPenanganan;
        string riwayatAlergi;
    }

    struct Diagnosa {
        uint256 nik;
        string diagnosaUtama;
        string rencanaPenatalaksanaan;
        string dokter;
        string tempat;
        string intervensiDokter;
    }

    struct Intervensi {
        uint256 nik;
        string subjekAsesmen;
        string subjekPlanning;
        string subjekIntervensi;
        string objekAsesmen;
        string objekPlanning;
        string objekIntervensi;
    }

    struct Keuangan {
        uint256 nik;
        uint256 biayaPemeriksaan;
        uint256 biayaObat;
        uint256 biayaRawatInap;
        uint256 biayaPenanganan;
        string jenisPembayaran;
    }

    struct HasilPemeriksaan {
        uint256 nik;
        string kelainanFisik;
        uint256 tinggiBadan;
        uint256 beratBadan;
    }

    IdentitasPasien[] private _identitasPasien;
    RiwayatMedis[] private _riwayatMedis;
    HasilAnamnesis[] private _hasilAnamnesis;
    Diagnosa[] private _diagnosa;
    Intervensi[] private _intervensi;
    Keuangan[] private _keuangan;
    HasilPemeriksaan[] private _hasilPemeriksaan;

    // Fungsi untuk mendaftarkan data pasien
    function daftarPasien(
        uint256 _nik,
        string memory _nama,
        string memory _alamat,
        string memory _jenisKelamin,
        string memory _golonganDarah,
        string memory _tanggalLahir
    ) public {
        _identitasPasien.push(
            IdentitasPasien(
                _nik,
                _nama,
                _alamat,
                _jenisKelamin,
                _golonganDarah,
                _tanggalLahir
            )
        );
    }

    // Fungsi untuk menambahkan riwayat medis pasien
    function tambahRiwayatMedis(
        uint256 _nik,
        uint256 _tanggalPemeriksaan,
        string memory _diagnosaP,
        string memory _hasilPemeriksaanP
    ) public {
        _riwayatMedis.push(
            RiwayatMedis(
                _nik,
                _tanggalPemeriksaan,
                _diagnosaP,
                _hasilPemeriksaanP
            )
        );
    }

    // Fungsi untuk menambahkan hasil anamnesis pasien
    function tambahHasilAnamnesis(
        uint256 _nik,
        string memory _riwayatPenyakit,
        string memory _waktuRiwayatPenyakit,
        string memory _jenisRiwayatPenyakit,
        string memory _riwayatPenanganan,
        string memory _waktuRiwayatPenanganan,
        string memory _tempatRiwayatPenanganan,
        string memory _metodeRiwayatPenanganan,
        string memory _dokterRiwayatPenanganan,
        string memory _riwayatAlergi
    ) public {
        _hasilAnamnesis.push(
            HasilAnamnesis(
                _nik,
                _riwayatPenyakit,
                _waktuRiwayatPenyakit,
                _jenisRiwayatPenyakit,
                _riwayatPenanganan,
                _waktuRiwayatPenanganan,
                _tempatRiwayatPenanganan,
                _metodeRiwayatPenanganan,
                _dokterRiwayatPenanganan,
                _riwayatAlergi
            )
        );
    }

    // Fungsi untuk menambahkan diagnosa pasien
    function tambahDiagnosa(
        uint256 _nik,
        string memory _diagnosaUtama,
        string memory _rencanaPenatalaksanaan,
        string memory _dokter,
        string memory _tempat,
        string memory _intervensiDokter
    ) public {
        _diagnosa.push(
            Diagnosa(
                _nik,
                _diagnosaUtama,
                _rencanaPenatalaksanaan,
                _dokter,
                _tempat,
                _intervensiDokter
            )
        );
    }

    // Fungsi untuk menambahkan intervensi pasien
    function tambahIntervensi(
        uint256 _nik,
        string memory _subjekAsesmen,
        string memory _subjekPlanning,
        string memory _subjekIntervensi,
        string memory _objekAsesmen,
        string memory _objekPlanning,
        string memory _objekIntervensi
    ) public {
        _intervensi.push(
            Intervensi(
                _nik,
                _subjekAsesmen,
                _subjekPlanning,
                _subjekIntervensi,
                _objekAsesmen,
                _objekPlanning,
                _objekIntervensi
            )
        );
    }

    // Fungsi untuk menambahkan data keuangan pasien
    function tambahKeuangan(
        uint256 _nik,
        uint256 _biayaPemeriksaan,
        uint256 _biayaObat,
        uint256 _biayaRawatInap,
        uint256 _biayaPenanganan,
        string memory _jenisPembayaran
    ) public {
        _keuangan.push(
            Keuangan(
                _nik,
                _biayaPemeriksaan,
                _biayaObat,
                _biayaRawatInap,
                _biayaPenanganan,
                _jenisPembayaran
            )
        );
    }

    // Fungsi untuk menambahkan hasil pemeriksaan pasien
    function tambahHasilPemeriksaan(
        uint256 _nik,
        string memory _kelainanFisik,
        uint256 _tinggiBadan,
        uint256 _beratBadan
    ) public {
        _hasilPemeriksaan.push(
            HasilPemeriksaan(_nik, _kelainanFisik, _tinggiBadan, _beratBadan)
        );
    }

    // Fungsi untuk mendapatkan jumlah data pasien
    function getJumlahPasien() public view returns (uint256) {
        return _identitasPasien.length;
    }

    // Fungsi untuk mendapatkan data identitas pasien berdasarkan indeks
    function getIdentitasPasien(
        uint256 index
    ) public view returns (IdentitasPasien memory) {
        require(index < _identitasPasien.length, "Indeks tidak valid");
        return _identitasPasien[index];
    }

    // Fungsi untuk mendapatkan jumlah riwayat medis pasien
    function getJumlahRiwayatMedis() public view returns (uint256) {
        return _riwayatMedis.length;
    }

    // Fungsi untuk mendapatkan riwayat medis pasien berdasarkan indeks
    function getRiwayatMedis(
        uint256 index
    ) public view returns (RiwayatMedis memory) {
        require(index < _riwayatMedis.length, "Indeks tidak valid");
        return _riwayatMedis[index];
    }

    // Fungsi untuk mendapatkan jumlah hasil anamnesis pasien
    function getJumlahHasilAnamnesis() public view returns (uint256) {
        return _hasilAnamnesis.length;
    }

    // Fungsi untuk mendapatkan hasil anamnesis pasien berdasarkan indeks
    function getHasilAnamnesis(
        uint256 index
    ) public view returns (HasilAnamnesis memory) {
        require(index < _hasilAnamnesis.length, "Indeks tidak valid");
        return _hasilAnamnesis[index];
    }

    // Fungsi untuk mendapatkan jumlah diagnosa pasien
    function getJumlahDiagnosa() public view returns (uint256) {
        return _diagnosa.length;
    }

    // Fungsi untuk mendapatkan diagnosa pasien berdasarkan indeks
    function getDiagnosa(uint256 index) public view returns (Diagnosa memory) {
        require(index < _diagnosa.length, "Indeks tidak valid");
        return _diagnosa[index];
    }

    // Fungsi untuk mendapatkan jumlah intervensi pasien
    function getJumlahIntervensi() public view returns (uint256) {
        return _intervensi.length;
    }

    // Fungsi untuk mendapatkan intervensi pasien berdasarkan indeks
    function getIntervensi(
        uint256 index
    ) public view returns (Intervensi memory) {
        require(index < _intervensi.length, "Indeks tidak valid");
        return _intervensi[index];
    }

    // Fungsi untuk mendapatkan jumlah data keuangan pasien
    function getJumlahKeuangan() public view returns (uint256) {
        return _keuangan.length;
    }

    // Fungsi untuk mendapatkan data keuangan pasien berdasarkan indeks
    function getKeuangan(uint256 index) public view returns (Keuangan memory) {
        require(index < _keuangan.length, "Indeks tidak valid");
        return _keuangan[index];
    }

    // Fungsi untuk mendapatkan jumlah hasil pemeriksaan pasien
    function getJumlahHasilPemeriksaan() public view returns (uint256) {
        return _hasilPemeriksaan.length;
    }

    // Fungsi untuk mendapatkan hasil pemeriksaan pasien berdasarkan indeks
    function getHasilPemeriksaan(
        uint256 index
    ) public view returns (HasilPemeriksaan memory) {
        require(index < _hasilPemeriksaan.length, "Indeks tidak valid");
        return _hasilPemeriksaan[index];
    }

    constructor() {
        // Add assert statements to the constructor
        assert(msg.sender != address(0));
    }
}
