# Nutech API
### RUN
Untuk menjalankan program pada komputer lokal, gunakan command
```
npm start
```

Untuk saat ini, API-ini sudah tersedia [online](nutech10-api.herokuapp.com/barang) namun memiliki kendala terkait upload image sehingga masih belum bisa digunakan dengan baik.

### CRUD
`GET` memperlihatkan semua data, kunjungi alamat berikut
```
localhost:5000/barang
```
`GET` memperlihatkan salah satu data. Gunakan salah satu id untuk mendapatkan datanya. Contohnya adalah sebagai berikut
```
localhost:5000/barang/1
```
`POST` menambah data. Gunakan alamat berikut
```
localhost:5000/barang
```
pilih `Body > form-data` lalu masukkan data dengan ketentuan seperti di bawah ini:
|KEY      |TYPE  |VALUE            |
|---------|------|-----------------|
|nama     | text | nama_title      |
|foto     | file | (masukkan/browse file) |
|hargaJual | text | diisi dengan angka |
|hargaBeli | text | diisi dengan angka |
|stok | text | diisi dengan angka |

`PUT` mengubah data. Ubah data berdasarkan id, contohnya mengubah data pada `id = 1` sebagai berikut
```
localhost:5000/barang/1
```
pilih `Body > form-data` lalu masukkan data dengan ketentuan seperti di bawah ini:
|KEY      |TYPE  |VALUE            |
|---------|------|-----------------|
|nama     | text | nama_title      |
|foto     | file | (masukkan/browse file) |
|hargaJual | text | diisi dengan angka |
|hargaBeli | text | diisi dengan angka |
|stok | text | diisi dengan angka |

`DELETE` menghapus data. Hapus data berdasarkan id, contohnya menghapus data pada `id = 1` sebagai berikut
```
localhost:5000/barang/1
```