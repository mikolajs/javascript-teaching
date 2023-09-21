const fs = require('fs');
const graphCreator = require('./graphs.js');
const graph = require('./graph.js');

let arr = [8, 12, 20, 30, 40, 50, 60, 80, 200];
let nodesSize = 0;
let foundPaths = [];
let startNode = -1;
let graphsNumb = [];
let nodeNames = [];


function main(){
  for(const fileId of arr){
    if(fileId > 30) continue;
    let graphObj = graphCreator.createGraph(fileId);
    startNode = graphObj.f;
    //console.log(graphObj.g);
    let graphObjNumb = graphCreator.toNumbers(graphObj.g, nodesSize);
    //console.log(graphObjNumb.n);
    //console.log(graphObjNumb.e);
    graphsNumb = graphObjNumb.e;
    nodeNames = graphObjNumb.n;
    nodesSize = nodeNames.length;
    //console.log(graphsNumb);
    foundPaths = [];
    foundByStack(graphsNumb);
    console.log('size of found paths %d', foundPaths.length);
    let pos = 0;
    let max = Number.MAX_SAFE_INTEGER;
    for(const i in foundPaths) {
      if(foundPaths[i].distance < max) {
        pos = i;
        max  = foundPaths[i].distance;

      }
    }
      foundPaths[pos].printNames(nodeNames);
  }

}

main();


function foundByStack(graphs){
  let stack = [];
  for(const arr of graphs[0]){
    let wp = new graphCreator.WorkPath(graphs.size);
    wp.fillHave(nodesSize);
    wp.path.push(arr[0]);
    wp.distance += arr[1];
    wp.have[arr[0]] = true;
    stack.push(wp);
  }
 
  while(stack.length > 0) {
    let wp = stack.pop();
    //console.log('started queue');
    if(wp.path.length == nodesSize) {
      foundPaths.push(wp);
      //console.log('started queue have size %d', queue.length);
      continue;
    }
    for(const arr of graphs[wp.path[wp.path.length-1]]){
      if(wp.path.length < nodesSize-1){
        if(arr[0] != 0 && !wp.have[arr[0]]){
          stack.push(wp.copy(arr[0], arr[1]));
        }
      } else if(arr[0] == 0){
        stack.push(wp.copy(arr[0], arr[1]));
      }
    }
    //wp.printNames();
  }
  
  
}
