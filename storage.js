"use strict";

const CACHE_KEY = "calculation_history"; 
// Variabel ini digunakan sebagai key untuk mengakses dan menyimpan data pada localStorage.

// Selanjutnya kita buat fungsi checkForStorage() dengan mengembalikan nilai boolean dari pengecekan fitur Storage pada browser.
function checkForStorage() {
    return typeof(Storage) !== "undefined"
}

/*
Lalu kita buat juga fungsi untuk menyimpan data riwayat kalkulasi pada localStorage. 
Fungsi tersebut memiliki satu argumen yang merupakan data dari hasil kalkulasi yang nantinya akan 
dimasukkan ke dalam localStorage.
*/
function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);

        if (historyData.length > 5) {
            historyData.pop();
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

/*

JSON.parse() digunakan untuk mengubah nilai objek dalam bentuk string kembali pada bentuk objek JavaScript.

JSON.stringify() digunakan untuk mengubah objek JavaScript ke dalam bentuk String.

fungsi unshift()digunakan untuk menambahkan nilai baru pada array yang ditempatkan pada awal index.

Fungsi pop() merupakan fungsi untuk menghapus nilai index terakhir pada array, 
sehingga ukuran array historyData tidak akan pernah lebih dari 5.
Hal ini kita terapkan agar riwayat kalkulasi yang muncul adalah lima hasil kalkulasi terakhir oleh pengguna.

Dari sini kita bisa mengetahui bahwa data yang disimpan pada localStorage adalah array 
yang berisi beberapa objek hasil kalkulasi, kemudian array tersebut diubah menjadi string.

*/

/*
Selanjutnya kita buat fungsi untuk mendapatkan data dari localStorage. 
Kita namakan fungsi tersebut “showHistory()".
*/

function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

/*
Fungsi ini mengembalikan nilai array dari localStorage jika sudah memiliki nilai sebelumnya 
melalui JSON.parse(). Namun jika localStorage masih kosong, 
fungsi ini akan mengembalikan nilai array kosong.
*/

/*
terakhir, kita tambahkan fungsi untuk merender data riwayat kalkulasi pada tabel HTML. 
Fungsi ini diberi nama dengan renderHistory().
*/
function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");

    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr')
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row); // appendChild is used to insert new node "data" in DOM
    }
}

/*
Pada akhir berkas storage.js, panggil fungsi renderHistory(); 
agar data history muncul ketika website pertama kali dijalankan.
*/
renderHistory();

/*
Terakhir kita gunakan fungsi putHistory() yang sudah kita buat ketika kalkulator melakukan proses kalkulasi, 
tepatnya pada fungsi performCalculation() berkas kalkulator.js.

Sebelum memanggil fungsi putHistory(), tentu kita harus menyiapkan data yang akan dikirimkan 
sebagai argumen fungsi tersebut.

Pada performCalculation() kita buat variabel baru dengan nama history yang merupakan objek 
dari data history yang akan dikirimkan.
*/