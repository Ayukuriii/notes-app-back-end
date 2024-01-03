**Notes App Back-End**

**Tata Cara Penggunaan**

Aplikasi Notes App Back-End ini dibuat dengan menggunakan Node.js dan framework Hapi. Aplikasi ini menyediakan API untuk mengelola catatan, termasuk membuat, membaca, memperbarui, dan menghapus catatan.

**Persiapan**

Untuk menggunakan aplikasi ini, Anda perlu memiliki Node.js dan PostgreSQL terinstal di komputer Anda.

**Instalasi**

Untuk menginstal aplikasi ini, Anda dapat menggunakan perintah berikut:

```
git clone https://github.com/Ayukuriii/notes-app-back-end.git
cd notes-app-back-end
npm install
```

**Konfigurasi**

Aplikasi ini menggunakan file `.env` untuk menyimpan konfigurasi. Anda perlu membuat file ini dan menambahkan variabel berikut:

* `Server Configuration`: konfigurasi lingkunan applikasi
  ```
  HOST=
  PORT=
  ```
* `DB Configuration`: Konfigurasi Database menggunakan Postgresql
  ```
  PGUSER=
  PGHOST=
  PGPASSWORD=
  PGDATABASE=
  PGPORT=
  ```
* `JWT configuration`: Konfigurasi akses token untuk menggunakan jwt
  ```
  ACCESS_TOKEN_KEY=
  ```
  

**Peluncuran**

Untuk meluncurkan aplikasi ini dalam mode pengembangan, Anda dapat menggunakan perintah berikut:

```
npm run start:dev
```

Aplikasi ini akan berjalan di port 3000.

**API**

Aplikasi ini menyediakan API untuk mengelola catatan. Berikut adalah dokumentasi API:

* **Menambah catatan:**

```
POST /notes
```

Body request:

```
{
  "title": "Judul catatan",
  "content": "Konten catatan"
}
```

* **Membaca catatan:**

```
GET /notes/:id
```

* **Memperbarui catatan:**

```
PUT /notes/:id
```

Body request:

```
{
  "title": "Judul catatan",
  "content": "Konten catatan"
}
```

* **Menghapus catatan:**

```
DELETE /notes/:id
```

**Contoh penggunaan**

Berikut adalah contoh penggunaan API untuk membuat catatan:

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Catatan baru",
    "content": "Ini adalah catatan baru"
  }' \
  http://localhost:3000/notes
```

Output:

```
{
  "id": "1",
  "title": "Catatan baru",
  "content": "Ini adalah catatan baru"
}
```

Untuk informasi lebih lanjut tentang penggunaan API, Anda dapat melihat dokumentasi API.

**Troubleshooting**

Jika Anda mengalami masalah saat menggunakan aplikasi ini, Anda dapat memeriksa log aplikasi. Log aplikasi terletak di file `logs/app.log`.
