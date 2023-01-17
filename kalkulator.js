"use strict"; // strict mode activation

// buatlah sebuah objek dengan nama calculator

/*

Di dalamnya terdapat properti yang menggambarkan data dan kondisi dari kalkulatornya, 
seperti displayNumber, operator, firstNumber, dan isWaitForSecondNumber.

Kita gunakan objek ini sebagai tempat menyimpan data dan kondisi pada calculator, 
di mana angka yang muncul pada layar kalkulator selalu diambil dari data calculator.displayNumber.

Nilai dari properti operator dan firstNumber diberikan null dulu 
karena akan diberikan nilai ketika pengguna melakukan aksi.

Properti isWaitForSecondNumber merupakan kondisi di mana kalkulator sedang menunggu pengguna 
menentukkan angka kedua dalam melakukan perhitungan.

*/

const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    isWaitForSecondNumber: false,
};

/*  
selanjutnya kita buat fungsi-fungsi umum yang dilakukan kalkulator seperti me-update angka pada layar 
dan menghapus data pada kalkulator.
*/

function updateDisplay() {
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;                           
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.isWaitForSecondNumber = false;
}

/* 

The Document method querySelector() returns the first Element within the document that matches 
the specified selector, or group of selectors.

The innerText property sets or returns the text content of an element.

*/

// Lalu, kita buat juga fungsi untuk memasukkan angka ke dalam nilai displayNumber kalkulator.
/*

Saat ini kalkulator masih dapat menampilkan angka 0 di awal bilangan, hal itu tentu aneh dan 
tidak pernah terjadi pada kalkulator manapun, kecuali menampilkan bilangan desimal.

Untuk memperbaikinya, tambahkan sebuah kondisi dimana jika displayNumber bernilai ‘0’ di fungsi inputDigit() 
sehingga angka yang pertama dimasukkan pengguna akan menggantikan keseluruhan nilai displayNumber. 
Selain itu, lakukan seperti biasanya.

Untuk melakukannya kita gunakan if-else statement.

*/

function inputDigit(digit) {
    if  (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
    calculator.displayNumber += digit;
    }
}

// definisikan fungsi inverseNumber

/* 

Fungsi inverseNumber cukuplah simple. Hal tersebut karena kita hanya perlu melakukan 
perkalian calculator.displayNumber dengan nilai -1. 

Terkecuali jika displayNumber masih bernilai ‘0’, perkalian tidak akan dilakukan.
*/

function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

/*

Selanjutnya, kita akan membuat fungsi untuk menetapkan sebuah operator, baik itu "+" atau "-" di kalkulator. 
Tuliskan fungsi berikut.

*/

function handleOperator(operator) {
    if (!calculator.isWaitForSecondNumber) {
        calculator.operator = operator;
        calculator.isWaitForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan');
    }
}

/*
Fungsi tersebut membutuhkan satu buah argument, yaitu operator. 
Nilai operator tersebut bersumber dari innerText tombol operator yang menjadi event target.

Secara prinsip, fungsi ini bertujuan untuk menyimpan operator dan firstNumber dengan nilai displayNumber 
saat ini pada object calculator, hanya jika properti isWaitForSecondNumber bernilai false.

Namun, jika isWaitForSecondNumber bernilai true, browser akan menampilkan alert dengan pesan “Operator sudah ditetapkan”.

*/

/*

Kita buat fungsi terakhir, yaitu performCalculation. Fungsi ini digunakan untuk melakukan kalkulasi 
terhadap nilai - nilai yang terdapat pada objek calculator, 
sehingga pastikan kalkulator sudah memiliki nilai operator dan firstNumber ketika fungsi ini dijalankan.

Fungsi ini diawali dengan pengecekan nilai-nilai yang dibutuhkan untuk melakukan kalkulasi. 
Jika tidak terpenuhi maka proses akan dihentikan. Namun jika terpenuhi kalkulasi akan dilakukan.

Dalam melakukan kalkulasi terdapat pengecekan tipe operator apa yang akan dilakukan. 
Kita juga menggunakan parseInt() untuk mengubah nilai string menjadi number. 
Mengapa konversi tipe data dibutuhkan? Sejatinya kita menggunakan string 
dalam menampilkan nilai pada jendela browser, namun untuk proses kalkulasi kita membutuhkan number.

*/

function performCalculation () {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert('Anda belum menetapkan operator');
        return;
    }

    let result = 0;

    if (calculator.operator === '+') {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }

    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }

    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

/*
Setelah menyiapkan datanya, barulah kita bisa memanggil fungsi putHistory() 
dengan mengirimkan variabel history sebagai argumen fungsinya. 
Jangan lupa juga panggil fungsi renderHistory() agar riwayat kalkulasi langsung tampil 
pada tabel setelah kalkulasi dilakukan.
*/

/*

Kemudian, kita buat variabel buttons dengan menginisialisasikan nilai seluruh elemen button yang ada dan 
berikan event click pada tiap elemennya.

Untuk menangkap semua elemen div.button kita gunakan querySelectorAll("div.button") dan 
kita looping nilainya untuk diberikan event click di setiap elemen button-nya.

*/

const buttons = document.querySelectorAll('.button');

for (const button of buttons) {
    button.addEventListener('click', function (event){
        // mendapatkan objek elemen yang diklik
        const target = event.target;

        if (target.classList.contains('clear')) {    // class yang berisi clear
            clearCalculator();
            updateDisplay();
            return;         // gunakan return statement agar fungsi event handler terhenti sehingga kode yang ada di bawahnya tidak ikut tereksekusi.
        } 

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    })
}

/*
Kita bisa memanfaatkan event.target.classList untuk melihat nilai class apa saja dalam bentuk array yang ada di element target. 
Kemudian panggil function contains yang merupakan method dari array yang berguna untuk memastikan nilai yang berada di dalam array tersebut. 
Jika kondisi if terpenuhi, sudah dipastikan tombol tersebut adalah tombol clear (CE) 
sehingga kita perlu memanggil fungsi clearCalculator dan mengupdate display kalkulator. 
*/

/*
Catatan:
Aplikasi kalkulator yang telah kita buat tidak bisa melakukan operasi aritmatika secara berkelanjutan, 
yaitu melakukan kedua secara langsung tepat setelah operasi pertama selesai. 
Anda bisa mengembangkannya lebih lanjut untuk meningkatkan kemampuan problem solving yang lebih baik.
*/