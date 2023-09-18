const fs = require('fs');
const graphCreator = require('./graphs.js');
const graph = require('./graph.js');

let arr = [8, 12, 20, 30, 40, 50, 60, 80, 200];
let nodesSize = 0;
let foundPaths = [];
let startNode = -1;
let graphsNumb = [];

function main(){
  for(const fileId of arr){
    if(fileId != 8) continue;
    let graphObj = graphCreator.createGraph(8);
    startNode = graphObj.f;
    //console.log(graphObj.g);
    let graphObjNumb = graphCreator.toNumbers(graphObj.g, nodesSize);
    //console.log(graphObjNumb.n);
    //console.log(graphObjNumb.e);
    graphsNumb = graphObjNumb.e;
    foundPaths = [];
    for(const pp of foundPaths) console.log(pp);
  }

}

main();


function foundByQueue(graphs){
  let start = 0;
  let queue = [];
  
}
