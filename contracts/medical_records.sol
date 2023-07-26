// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RekamMedis {
    // Struct untuk menyimpan data dokter
    struct Dokter {
        address alamatDokter;
        string nama;
        string spesialisasi;
        uint256 waktuPendaftaran; // Timestamp untuk waktu pendaftaran dokter
    }

    // Struct untuk menyimpan data identitas pasien
    struct IdentitasPasien {
        string nama;
        uint256 nik;
        string jenisKelamin;
        string tempatLahir;
        string tanggalLahir;
        string alamat;
        string wali;
        string nomorTeleponWali;
        string golonganDarah;
        uint256 waktuPendaftaran; // Timestamp untuk waktu pendaftaran identitas pasien
    }

    // Struct untuk menyimpan status pasien
    struct StatusPasien {
        bool dirujuk;
        string sumberRujukan;
        string tempatRujukan;
        string alasanRujukan;
        bool rawatInap;
        string lokasiRawatInap;
        string periodeRawatInap;
        string statusPulang;
        string tanggalPulang;
        string alasanPulang;
        uint256 waktuPembaruanStatus; // Timestamp untuk waktu pembaruan status pasien
    }

    struct HasilAnamnesis {
        string riwayatPenyakit;
        string waktuRiwayatPenyakit;
        string jenisRiwayatPenyakit;
        string riwayatPenanganan;
        string waktuRiwayatPenanganan;
        string tempatRiwayatPenanganan;
        string metodeRiwayatPenanganan;
        string dokterRiwayatPenanganan;
        string riwayatAlergi;
        uint256 waktuPembaruanStatus; // Timestamp untuk waktu pembaruan status pasien
    }

    struct HasilPemeriksaanFisik {
        string kelainanFisik;
        uint256 tinggiBadan;
        uint256 beratBadan;
        uint256 waktuPembaruanStatus; // Timestamp untuk waktu pembaruan status pasien
    }

    struct HasilPemeriksaanDiagnostik {
        uint256 eritrosit;
        uint256 hemoglobin;
        uint256 hematokrit;
        uint256 basofil;
        uint256 eosinofil;
        uint256 limfosit;
        uint256 monosit;
        uint256 lajuEndapDarah;
        uint256 leukosit;
        uint256 mchHer;
        uint256 mchcKher;
        uint256 mcvVer;
        uint256 trombosit;
        uint256 waktuPembaruanStatus; // Timestamp untuk waktu pembaruan status pasien
        // ... (lanjutan pemeriksaan diagnostik lainnya)
    }

    struct DiagnosaRencana {
        string diagnosaUtama;
        string rencanaPenatalaksanaan;
        string dokter;
        string tempat;
        string intervensiDokter;
        uint256 waktuPembaruanStatus; // Timestamp untuk waktu pembaruan status pasien
    }

    struct Intervensi {
        string subjekAsesmen;
        string subjekPlanning;
        string subjekIntervensi;
        string objekAsesmen;
        string objekPlanning;
        string objekIntervensi;
        uint256 waktuPembaruanStatus; // Timestamp untuk waktu pembaruan status pasien
    }

    struct Keuangan {
        uint256 biayaPemeriksaan;
        uint256 biayaObat;
        uint256 biayaRawatInap;
        uint256 biayaPenanganan;
        string jenisPembayaran;
        uint256 waktuPembaruanStatus; // Timestamp untuk waktu pembaruan status pasien
        // ... (lanjutan rincian keuangan lainnya)
    }

    // ... (struktur lainnya dengan penambahan timestamp)

    // Array untuk menyimpan daftar dokter
    address[] public _daftarDokter;
    // Array untuk menyimpan daftar pasien
    address[] public _daftarPasien;

    // Mapping untuk menyimpan data dokter berdasarkan alamatnya (address)
    mapping(address => Dokter) public _dokters;
    // Mapping untuk menyimpan data pasien berdasarkan alamatnya (address)
    mapping(address => IdentitasPasien) public _identitasPasien;
    // Mapping untuk menyimpan status pasien berdasarkan alamatnya (address)
    mapping(address => StatusPasien) public _statusPasien;
    // Mapping untuk menyimpan status pasien berdasarkan alamatnya (address)
    mapping(address => HasilAnamnesis) public _hasilAnamnesis;
    mapping(address => HasilPemeriksaanFisik) public _hasilPemeriksaanFisik;
    mapping(address => HasilPemeriksaanDiagnostik)
        public _hasilPemeriksaanDiagnostik;
    mapping(address => DiagnosaRencana) public _diagnosaRencana;
    mapping(address => Intervensi) public _intervensi;
    mapping(address => Keuangan) public _keuangan;

    // ... (mapping lainnya dengan penambahan timestamp)

    // Fungsi untuk mendaftarkan data dokter
    function daftarDokter(
        string memory _nama,
        string memory _spesialisasi
    ) public {
        require(
            _dokters[msg.sender].alamatDokter == address(0),
            "Anda telah terdaftar sebagai dokter."
        );
        _dokters[msg.sender] = Dokter(
            msg.sender,
            _nama,
            _spesialisasi,
            block.timestamp // Gunakan timestamp blok Ethereum sebagai waktu pendaftaran
        );
        _daftarDokter.push(msg.sender);
    }

    // Fungsi untuk mendaftarkan data identitas pasien
    function daftarIdentitasPasien(
        string memory _nama,
        uint256 _nik,
        string memory _jenisKelamin,
        string memory _tempatLahir,
        string memory _tanggalLahir,
        string memory _alamat,
        string memory _wali,
        string memory _nomorTeleponWali,
        string memory _golonganDarah
    ) public {
        require(
            _identitasPasien[msg.sender].nik == 0,
            "Anda telah terdaftar sebagai pasien."
        );
        _identitasPasien[msg.sender] = IdentitasPasien(
            _nama,
            _nik,
            _jenisKelamin,
            _tempatLahir,
            _tanggalLahir,
            _alamat,
            _wali,
            _nomorTeleponWali,
            _golonganDarah,
            block.timestamp // Gunakan timestamp blok Ethereum sebagai waktu pendaftaran
        );
        _daftarPasien.push(msg.sender);
    }

    // Fungsi untuk melihat daftar dokter
    function lihatDaftarDokter() public view returns (address[] memory) {
        return _daftarDokter;
    }

    // Fungsi untuk melihat daftar pasien
    function lihatDaftarPasien() public view returns (address[] memory) {
        return _daftarPasien;
    }

    // Fungsi untuk melihat detail data dokter
    function detailDokter(
        address _dokterAddress
    ) public view returns (Dokter memory) {
        return _dokters[_dokterAddress];
    }

    // Fungsi untuk melihat detail data pasien beserta semua komponen data
    function detailPasienDenganDetail()
        public
        view
        returns (
            IdentitasPasien memory,
            StatusPasien memory,
            HasilAnamnesis memory,
            HasilPemeriksaanFisik memory,
            HasilPemeriksaanDiagnostik memory,
            DiagnosaRencana memory,
            Intervensi memory,
            Keuangan memory
        )
    {
        return (
            _identitasPasien[msg.sender],
            _statusPasien[msg.sender],
            _hasilAnamnesis[msg.sender],
            _hasilPemeriksaanFisik[msg.sender],
            _hasilPemeriksaanDiagnostik[msg.sender],
            _diagnosaRencana[msg.sender],
            _intervensi[msg.sender],
            _keuangan[msg.sender]
        );
    }

    // Fungsi untuk membuat atau memperbarui hasil anamnesis pasien
    function tambahHasilAnamnesis(
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
        _hasilAnamnesis[msg.sender] = HasilAnamnesis(
            _riwayatPenyakit,
            _waktuRiwayatPenyakit,
            _jenisRiwayatPenyakit,
            _riwayatPenanganan,
            _waktuRiwayatPenanganan,
            _tempatRiwayatPenanganan,
            _metodeRiwayatPenanganan,
            _dokterRiwayatPenanganan,
            _riwayatAlergi,
            block.timestamp
        );
    }

    // Fungsi untuk membaca hasil anamnesis pasien
    function lihatHasilAnamnesis() public view returns (HasilAnamnesis memory) {
        return _hasilAnamnesis[msg.sender];
    }

    // Fungsi untuk membuat atau memperbarui hasil pemeriksaan fisik pasien
    function tambahHasilPemeriksaanFisik(
        string memory _kelainanFisik,
        uint256 _tinggiBadan,
        uint256 _beratBadan
    ) public {
        _hasilPemeriksaanFisik[msg.sender] = HasilPemeriksaanFisik(
            _kelainanFisik,
            _tinggiBadan,
            _beratBadan,
            block.timestamp
        );
    }

    // Fungsi untuk membaca hasil pemeriksaan fisik pasien
    function lihatHasilPemeriksaanFisik()
        public
        view
        returns (HasilPemeriksaanFisik memory)
    {
        return _hasilPemeriksaanFisik[msg.sender];
    }

    // Fungsi untuk membuat atau memperbarui hasil pemeriksaan diagnostik pasien
    function tambahHasilPemeriksaanDiagnostik(
        uint256 _eritrosit,
        uint256 _hemoglobin,
        uint256 _hematokrit,
        uint256 _basofil,
        uint256 _eosinofil,
        uint256 _limfosit,
        uint256 _monosit,
        uint256 _lajuEndapDarah,
        uint256 _leukosit,
        uint256 _mchHer,
        uint256 _mchcKher,
        uint256 _mcvVer,
        uint256 _trombosit
    )
        public
    // Tambahkan parameter untuk pemeriksaan diagnostik lainnya sesuai dengan struktur
    {
        _hasilPemeriksaanDiagnostik[msg.sender] = HasilPemeriksaanDiagnostik(
            _eritrosit,
            _hemoglobin,
            _hematokrit,
            _basofil,
            _eosinofil,
            _limfosit,
            _monosit,
            _lajuEndapDarah,
            _leukosit,
            _mchHer,
            _mchcKher,
            _mcvVer,
            _trombosit,
            block.timestamp
            // ... (tambahkan nilai untuk pemeriksaan diagnostik lainnya sesuai dengan struktur)
        );
    }

    // Fungsi untuk membaca hasil pemeriksaan diagnostik pasien
    function lihatHasilPemeriksaanDiagnostik()
        public
        view
        returns (HasilPemeriksaanDiagnostik memory)
    {
        return _hasilPemeriksaanDiagnostik[msg.sender];
    }

    // Fungsi untuk membuat atau memperbarui diagnosa dan rencana penatalaksanaan pasien
    function tambahDiagnosaRencana(
        string memory _diagnosaUtama,
        string memory _rencanaPenatalaksanaan,
        string memory _dokter,
        string memory _tempat,
        string memory _intervensiDokter
    ) public {
        _diagnosaRencana[msg.sender] = DiagnosaRencana(
            _diagnosaUtama,
            _rencanaPenatalaksanaan,
            _dokter,
            _tempat,
            _intervensiDokter,
            block.timestamp
        );
    }

    // Fungsi untuk membaca diagnosa dan rencana penatalaksanaan pasien
    function lihatDiagnosaRencana()
        public
        view
        returns (DiagnosaRencana memory)
    {
        return _diagnosaRencana[msg.sender];
    }

    // Fungsi untuk membuat atau memperbarui data intervensi pasien
    function tambahIntervensi(
        string memory _subjekAsesmen,
        string memory _subjekPlanning,
        string memory _subjekIntervensi,
        string memory _objekAsesmen,
        string memory _objekPlanning,
        string memory _objekIntervensi
    ) public {
        _intervensi[msg.sender] = Intervensi(
            _subjekAsesmen,
            _subjekPlanning,
            _subjekIntervensi,
            _objekAsesmen,
            _objekPlanning,
            _objekIntervensi,
            block.timestamp
        );
    }

    // Fungsi untuk membaca data intervensi pasien
    function lihatIntervensi() public view returns (Intervensi memory) {
        return _intervensi[msg.sender];
    }

    // Fungsi untuk membuat atau memperbarui data keuangan pasien
    function tambahKeuangan(
        uint256 _biayaPemeriksaan,
        uint256 _biayaObat,
        uint256 _biayaRawatInap,
        uint256 _biayaPenanganan,
        string memory _jenisPembayaran
    ) public {
        _keuangan[msg.sender] = Keuangan(
            _biayaPemeriksaan,
            _biayaObat,
            _biayaRawatInap,
            _biayaPenanganan,
            _jenisPembayaran,
            block.timestamp
        );
    }

    // Fungsi untuk membaca data keuangan pasien
    function lihatKeuangan() public view returns (Keuangan memory) {
        return _keuangan[msg.sender];
    }
}
