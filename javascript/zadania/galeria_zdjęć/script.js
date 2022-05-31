function mkOpen(elem) {

    var nodes = document.querySelectorAll("img");
    for(var i = 0; i < nodes.length; i++) {
      if(nodes[i] != undefined){
        console.log("i: " + nodes[i].nodeName);
        nodes[i].style.display = "none";
      }
    }
    var full = document.querySelectorAll(".full")[0];
    full.style.display = "inline-block"
    full.setAttribute("src", elem.getAttribute("src"));

    console.log(full.nameNode)
}

function mkClose(elem) {
  var nodes = document.querySelectorAll("img");
  for(var i = 0; i < nodes.length; i++) {
      console.log("i: " + i);
      nodes[i].style.display = "inline-block";
  }
  elem.style.display = "none";
}

function start() {
    var nodes = document.querySelectorAll("div.list > img");
    for(var i = 0; i < nodes.length; i++) {
        nodes[i].onclick = function(){mkOpen(this)};
    }
    var w = window.innerWidth;
    var h = window.innerHeight;
    var full = document.querySelectorAll(".full")[0];
    full.style.width = (w - 90).toString() + "px";
    full.style.height = (h - 90).toString() + "px";
}
