var liczba1 = 0;
var liczba2 = 0;

function mnozenie() {
	pobierz();
	document.getElementById('liczba3').value = liczba1 * liczba2;
}

function dzielenie() {
	pobierz();
	document.getElementById('liczba3').value = liczba1 / liczba2;
}

function dodawanie() {
	pobierz();
	document.getElementById('liczba3').value = liczba1 + liczba2;
}

function odejmowanie() {
	pobierz();
	document.getElementById('liczba3').value = liczba1 - liczba2;
}

function pierwiastkowanie() {
	pobierz();
	document.getElementById('liczba3').value = Math.pow(liczba1, 1/liczba2);
}

function potega() {
	pobierz();
	document.getElementById('liczba3').value = Math.pow(liczba1, liczba2);
}

function pobierz() {
	liczba1 = parseFloat(document.getElementById('liczba1').value.replace(/,/gi, '.'));
	liczba2 = parseFloat(document.getElementById('liczba2').value.replace(/,/gi, '.'));
	if(isNaN(liczba1) || isNaN(liczba2)) {
		document.getElementById('error').innerHTML = 'W obu polach wpisz liczbę!'
	} else document.getElementById('error').innerHTML = '';
}
