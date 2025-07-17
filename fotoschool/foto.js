const canvas = document.getElementById('canvasEditor');
const ctx = canvas.getContext( "2d" );
const W = 350;
const H = 450;
let img = new Image();
let SCALE = 100;
let isDown = false;
let imgHtml = document.getElementById('currentFoto');
let startX = 0;
let startY = 0;
img.onload = () => {
    console.log('onload', img.width, img.height);
    createImageBitmap(img, 0, 0, W, H).then((imgObj) => {
        ctx.drawImage(imgObj, startX, startY);
    });
};

function loadFile(elem){
    console.log('start load file');
    let file = elem.files[0];  
    var blobURLref = URL.createObjectURL(file);
    img.src = blobURLref;
    ctx.fillStyle = '#dddddd';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    //console.log(file);
}
let dx = 0;
let dy = 0;
let dx2 = 0;
let dy2 = 0;
function printInfo(startX, startY, dx, dy, clientX, clientY){
    console.log(startX, startY, dx, dy, clientX, clientY)
}
function moveImg(event){
    startX += event.clientX - dx;
    startY += event.clientY - dy;
    printInfo(startX, startY, dx, dy, event.clientX, event.clientY);
    dx = event.clientX;
    dy = event.clientY;
    //if(W - startX > img.width) startX = W - startX;
    //if(startY < 0) startY = 0;
    ctx.drawImage(img, startX, startY);
}

function mkBigger(){
    if(SCALE > 150) return;
   SCALE += 5;
   document.getElementById('rescale').innerHTML = SCALE;
}

function mkSmaller(){
    if(SCALE < 80) return;
    SCALE -= 5;
    document.getElementById('rescale').innerHTML = SCALE;
 }

canvas.addEventListener("mousemove", function (e) {
    if(isDown) moveImg(e);
}, false);
canvas.addEventListener("mousedown", function (e) {
   dx = e.clientX;
   dy = e.clientY;
   isDown = true;
}, false);
canvas.addEventListener("mouseup", function (e) {
    isDown = false;
}, false);
canvas.addEventListener("mouseout", function (e) {
    isDown = false;
}, false);