
var titlePic = document.getElementById('titlePicture');
//var titlePic = document.getElementById('back2');
var big = true;
titlePic.setAttribute('class', 'titleBig');
//document.getElementById('back2').setAttribute('class', 'titleBig');
setInterval(function(){
	if(big) {
		titlePic.setAttribute('class', 'titleSmall' );
		big = false;
	}
	else {
		titlePic.setAttribute('class', 'titleBig' );
		big = true;
	}
}, 20000);
$(function(){
	closeMenu();
$('#news').children('ul').children('li').click(function(){
	if(this.id == 'tab1') {
		document.getElementById('newsSP').style.display = "block";
		document.getElementById('newsGim').style.display = "none";
	}
	else {
		document.getElementById('newsSP').style.display = "none";
		document.getElementById('newsGim').style.display = "block";
	}
	$('#news').children('ul').children('li').removeClass('newsActive');
	this.setAttribute('class', 'newsActive');
});
});

function closeMenu() {
	$('#linkarea').hide(100);
}
function openMenu() {
	$('#linkarea').show(100);
}

function startAnimate(elem) {
	$(elem).find('img.imgBig').addClass('imgBigAnimate');
}
function stopAnimate(elem) {
	$(elem).find('img.imgBig').removeClass('imgBigAnimate');
}
