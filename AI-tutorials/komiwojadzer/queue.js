const fs = require('fs');
const graphCreator = require('./graphs.js');
const graph = require('./graph.js');

let arr = [8, 12, 20, 30, 40, 50, 60, 80, 200];
let nodesSize = 0;
let foundPaths = [];
let startNode = -1;
let graphsNumb = [];
let nodeNames = [];

class WorkPath {
  constructor(size){
    this.path = [];
    this.have = [];
    this.distance = 0;
  }
  fillHave(nodesSize){
    for(let i = 0; i < nodesSize; i++) this.have.push(false);
  }
  print(){
    console.log(this.path.join(' ') + ' distance: ' + this.distance );
  }
  printNames(){
    console.log(this.path.map((n) => nodeNames[n]).join(' ') + ' distance: ' + this.distance );
  }
  copy(node, distance){
    let wp = new WorkPath(this.have.size);
    wp.path = Array.from(this.path);
    wp.path.push(node);
    wp.distance = this.distance + distance;
    wp.have = Array.from(this.have);
    wp.have[node] = true;
    return wp;
  }
}


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
    foundByQueue(graphsNumb);
    console.log('size of found paths %d', foundPaths.length);
    let pos = 0;
    let max = Number.MAX_SAFE_INTEGER;
    for(const i in foundPaths) {
      if(foundPaths[i].distance < max) {
        pos = i;
        max  = foundPaths[i].distance;

      }
    }
      foundPaths[pos].printNames();
  }

}

main();


function foundByQueue(graphs){
  let queue = [];
  for(const arr of graphs[0]){
    let wp = new WorkPath(graphs.size);
    wp.fillHave(nodesSize);
    wp.path.push(arr[0]);
    wp.distance += arr[1];
    wp.have[arr[0]] = true;
    queue.push(wp);
  }
 
  while(queue.length > 0) {
    let wp = queue.pop();
    //console.log('started queue');
    if(wp.path.length == nodesSize) {
      foundPaths.push(wp);
      //console.log('started queue have size %d', queue.length);
      continue;
    }
    for(const arr of graphs[wp.path[wp.path.length-1]]){
      if(wp.path.length < nodesSize-1){
        if(arr[0] != 0 && !wp.have[arr[0]]){
          queue.push(wp.copy(arr[0], arr[1]));
        }
      } else if(arr[0] == 0){
        queue.push(wp.copy(arr[0], arr[1]));
      }
    }
    //wp.printNames();
  }
  
  
}
