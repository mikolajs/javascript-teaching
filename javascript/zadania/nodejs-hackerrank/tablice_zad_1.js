/*
  Program wczytuje tablicę danych, uzupełnij funkcję maksimumParzystych, która obliczy i wyświetli
  największą parzystą liczbę w tablicy

*/

function maksimumParzystych(arr){



}

let stdin = process.openStdin();
stdin.addListener('data', function(d){
	maksimumParzystych(d.toString().replace(/\s+$/g, '')
  .split(' ').map(arrTemp => parseInt(arrTemp, 10)));
	process.exit();
});
