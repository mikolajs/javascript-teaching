var images = ["cpu.png", "disk.png", "graphic.png", "keyboard.png", "mouse.png", "RAM.jpeg"];
var table = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
var firstClicked = -1;
var secondClicked = -1;
var points = 0;
var moves = 0;
var time = (new Date()).getTime();

$(function(){
   $('.panel > img').click(function(){
      var $img = $(this);
      //transformation rotate
      var id = parseInt($img.attr('id').slice(1));
      if (firstClicked === -1) firstClicked = id;
      else if(secondClicked === -1) {
        secondClicked = id;
        moves++;
        $('#moves').text(moves);
        if(table[firstClicked] === table[secondClicked]){
          points++;
          if(points == 6) { setTimeout(mkWin, 2000);}
          firstClicked = -1; secondClicked = -1;
        }
        else setTimeout(closeCards, 2000)
      }
      else return;
      //console.log("firstClcked: " + firstClicked)
      $img.get(0).style.transition = "all 0.5s";
      $img.get(0).style.transform = "rotateY(90deg)";

      setTimeout(function(){
        $img.attr('src', images[table[id]]);
        $img.get(0).style.transform = "rotateY(0deg)"},
        500);

   });
   randChoiceImage();

});



function closeCards(){
    if(firstClicked > -1) $('#i' +firstClicked).attr('src', 'blank.png');
    if(secondClicked > -1) $('#i' +secondClicked).attr('src', 'blank.png');

  firstClicked = -1; secondClicked = -1;
}


function randChoiceImage(){
  var arr = [0,0,1,1,2,2,3,3,4,4,5,5];
  for(var i = 0; i < 12; i++){
    var index = Math.floor(Math.random() * arr.length);
    //console.log(arr[index]);
    table[i] = arr[index];
    arr.splice(index, 1);
  }
}

function mkWin(){
   time = (new Date()).getTime() - time;
   $('#panels').hide(100);
   $('#winDiv').show(300);
    $('#winInfo').text('Wygrałeś w czasie ' + Math.floor(time / 1000) + ',' +
    Math.floor(time%1000/10) + ' sek.' );
}

function restart() {
  window.location.reload();
}
