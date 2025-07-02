"use strict";
// interface Input {
//     name: string,
//     age: number
// }
// let input: Input = {
//     name: "John Doe",
//     age: 25
// }
// for (const key in input) {
//     console.log(`${key}: ${input[key as keyof Input]}`)
// }
function kalkulator(operasi, angka) {
    let hasil;
    if (operasi == "tambah") {
        hasil = angka.reduce((acc, cur) => acc + cur).toString();
        return hasil;
    }
    else if (operasi == "kurang") {
        hasil = angka.reduce((acc, cur) => acc - cur).toString();
        return hasil;
    }
    else if (operasi == "bagi") {
        hasil = angka.reduce((acc, cur) => acc / cur).toString();
        return hasil;
    }
    else if (operasi == "kali") {
        hasil = angka.reduce((acc, cur) => acc * cur).toString();
        return hasil;
    }
    else {
        return "opeasi tidak diketahui";
    }
}
console.log(kalkulator("bagi", [11, 0]));
// function sentence(...texts: string[]) {
//     for (const text of texts) {
//         console.log(text);
//     }
// }
// sentence("aku", "kamu", "saya", "anda")
