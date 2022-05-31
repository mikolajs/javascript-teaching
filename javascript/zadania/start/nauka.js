function licz() {
	var p = document.getElementById('tekst');
	var inp = document.getElementById('liczba');
	var l = parseInt(inp.value);
	if (isNaN(l)) p.innerHTML = "Miałeś wpisać liczbę! ";
	else if (l % 2 === 0) p.innerHTML = "Liczba jest parzysta ";
	else p.innerHTML = "Liczba nie jest parzysta ";
}

function zawartosc() {
	var p = document.getElementById('tekst');
	var inp = document.getElementById('liczba');
	p.innerHTML = inp.value;
}
var n = 10;

function odlicz() {
	if (n > 0) {
		document.getElementById('odliczanie').innerHTML = n;
		n -= 1;
		setTimeout(odlicz, 1000);
	} else document.getElementById('odliczanie').innerHTML = "BUM";

}

