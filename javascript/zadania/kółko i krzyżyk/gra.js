
var stage = 0;
var spanWho = new Object();
var spanInfo = {};
var pools =[];
pools[0] = [0,0,0];
pools[1] = [0,0,0];
pools[2] = [0,0,0];

function findWho() {
	spanWho = document.getElementById("who");
 	spanInfo =document.getElementById('info');
}

function check(elem){
	var id = elem.id;
	var x = parseInt(id[0]);
	var y = parseInt(id[1]);

	if (pools[x][y] == 0) {
		stage++;	
	   if(stage % 2 == 0) {
			elem.src = "circle.png";
			pools[x][y] = 2;	
			spanWho.innerHTML = "krzyżyk";	
		} else {
			elem.src = "cross.png";
			pools[x][y] = 1;
			spanWho.innerHTML = "kółko";
		}
		if (stage == 9) {
            spanInfo.innerHTML = "REMIS"		
			spanWho.innerHTML = "kliknij na planszę, aby zacząć od nowa";
		}
		if(isWinner()) stage = 9;
	} else if(stage == 9) {
		stage = 0;
		var imgs = document.getElementsByTagName('img');
		for(i in imgs){
			imgs[i].src = "empty.png";		
		}
		for(var i = 0; i < 3; i++)
		for(var j = 0; j < 3; j++)
			pools[i][j] = 0;
		spanWho.innerHTML ="krzyżyk";
		spanInfo.innerHTML = "Tura gracza: ";
	}	
}

function isWinner() {
	var winner = "";
    var win = checkPools();
    console.log("Who " + win);
	if(win == 1) winner = "Wygrał krzyżyk";
    else if(win == 2) winner = "Wygrało kółko"; 
    if(winner != "") {
        spanInfo.innerHTML = winner;
        spanWho.innerHTML = "kliknij na planszę, aby zacząć od nowa";
        return true;
    }
	
	return false;
}

function checkPools() {
    printPools();
    for(var i = 0; i < 3; i++)
     if(pools[i][0] == pools[i][1] && pools[i][1] == pools[i][2])
        if(pools[i][0] != 0) return pools[i][0];
     for(var j = 0; j < 3; j++)
        if(pools[0][j] == pools[1][j] && pools[1][j] == pools[2][j])
            if(pools[0][j] != 0) return pools[0][j];  
     if(pools[0][0] == pools[1][1] && pools[1][1] == pools[2][2]) 
        if(pools[1][1] != 0) return pools[1][1];  
     if(pools[0][2] == pools[1][1] && pools[1][1] == pools[2][0]) 
        if(pools[1][1] != 0) return pools[1][1];  
     return 0;
}

function printPools() {
    console.log(pools[0][0] + "|" + pools[1][0] + "|" + pools[2][0] );
    console.log(pools[0][1] + "|" + pools[1][1] + "|" + pools[2][1] );
    console.log(pools[0][2] + "|" + pools[1][2] + "|" + pools[2][2] );
}

