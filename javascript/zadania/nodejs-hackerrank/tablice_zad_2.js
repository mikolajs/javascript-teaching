/*
  Program wczytuje tablicę danych, uzupełnij funkcję roznicaParzystychiNieparzystych, która obliczy i wyświetli
  różnicę między sumą liczb parzystych i nieparzystych z tablicy

*/

function roznicaSum(arr){



}

let stdin = process.openStdin();
stdin.addListener('data', function(d){
	roznicaSum(d.toString().replace(/\s+$/g, '')
  .split(' ').map(arrTemp => parseInt(arrTemp, 10)));
	process.exit();
});
