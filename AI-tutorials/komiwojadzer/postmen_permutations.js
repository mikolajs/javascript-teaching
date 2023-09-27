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
    if(fileId > 10) continue;
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
    //foundByPermutation(graphsNumb);
    let wp = new graphCreator.WorkPath();
    wp.fillHave(nodesSize);
    foundByRecursion(wp);
    for(let j in foundPaths){
      foundPaths[j].distance = graphCreator.countWay(foundPaths[j], graphsNumb);
    }
    console.log('size of found paths %d', foundPaths.length);
    let pos = 0;
    let max = Number.MAX_SAFE_INTEGER;
    for(const i in foundPaths) {
      if(foundPaths[i].distance < max) {
        pos = i;
        max  = foundPaths[i].distance;

      }
    }
      if(foundPaths.length > 0) foundPaths[pos].printNames(nodeNames);
  }

}

main();


function foundByPermutation(graphs){
  let stack = [];
  for(let id = 0; id < nodesSize; id++){
    let wp = new graphCreator.WorkPath(graphs.size);
    wp.fillHave(nodesSize);
    wp.path.push(id);
    wp.have[id] = true;
    stack.push(wp);
  }
  while(stack.length > 0){
    let wp = stack.shift(); 
    if(wp.path.length == nodesSize) {
        foundPaths.push(wp);
        //console.log('started queue have size %d', queue.length);
        continue;
      }
    for(let id = 0; id < nodesSize; id++){
        if(wp.path.length < nodesSize-1){
            if(id != 0 && !wp.have[id]){
              stack.push(wp.copy(id, 0));
            }
        } else if(id == 0){
            stack.push(wp.copy(id, 0));
        }
    }
   //console.log('size of stack %d', stack.length);
  }
}

  function foundByRecursion(wp){
    //if(wp.path.length < 5)
     // console.log(wp);
    if(wp.path.length >= nodesSize - 1) {
      wp.have[nodesSize-1] = true;
      wp.path.push(0);
      foundPaths.push(wp);
      return;
    }
    for(let id = 1; id < nodesSize; id++){
      if(!wp.have[id]){
        let wp2 = wp.copy(id, 0);
        wp2.have[id] = true;
        foundByRecursion(wp2)
      }
    }
  }
  
 

