# MEDI-CHAIN

Belajar blockchain dengan studi kasus Rumah Sakit sederhana. Mengintegrasikan blockchain dengan RDBMS untuk mendapatkan keunggalan dari keduanya.
Menggunakan REACT untuk FRONTEND, dan express sebagai backend

## Requirements

- GANACHE
- IPFS
- Metamask
- NODEJS
- MARIADB SERVER
- Yarn

## ROLES

- ADMIN
- DOKTER
- PERAWAT
- PASIEN
- STAF GIZI
- STAF FARMASI
- STAF LABORATORIUM

## Instalasi

0. Buka ganache & import truffle-config.js dari folder admin

1. Konfigurasi Metamask sesuai dengan ganache

    Referensi: [https://www.geeksforgeeks.org/how-to-set-up-ganche-with-metamask/](https://www.geeksforgeeks.org/how-to-set-up-ganche-with-metamask/)

2. Import database
   Import database, kemudian lakukan konfigurasi pada folder be

3. Install requirement pada folder be

    ```
    yarn install
    ```

4. Jalankan Backend

    ```
    yarn start
    ```

5. Install requirement pada folder admin

    ```
    yarn install
    ```

6. Sesuaikan BE_URL pada admin/src/config.js

7. Jalankan Frontend admin

    ```
    yarn start
    ```
