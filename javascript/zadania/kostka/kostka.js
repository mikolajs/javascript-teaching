var licznik = 0;
function rzut(elem) {
	var wynik = Math.ceil(Math.random()*6);
	elem.src = "kostka"+ wynik + ".png";
	if(licznik < 10) {
		setTimeout(function() {rzut(elem);}, 100);
		licznik++;
	}
	else licznik = 0;
}
