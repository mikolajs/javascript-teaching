const graphCreator = require('./graphs.js');
const Graph = require('./graph.js');
let arr = [8, 12, 20, 30, 40, 50, 60, 80, 200];
let nodesSize = 0;
let foundPaths = [];
let startNode = '';



function checkFiles() {
  for (let nr of arr) {
   
    console.log('\nfile: komiwojazer_' + nr);
    let data = graphCreator.createGraph(nr);

    startNode = data.f;
    nodesSize = data.s.size;
    let endNode = data.e;
    let graphs = data.g;
    
    if(nr != 8) continue;

    for (let n in graphs) {
      graphs[n].printA();
    }

    console.log('Distance from %s to %s: %f', startNode, endNode, graphCreator.distance(startNode, endNode, graphs));

    console.log('nodes: %d start looking postman path', nodesSize);
    foundPaths = [];
    visitAllRecur(startNode, graphs, new Set(), 0, []);
    let minCycle = findMinimumCycle();
    console.log(minCycle);
    //for(const pp of foundPaths) console.log(pp);
    //graphCreator.toNumbers(graphs, nodesSize);
  }

}



class PostmenPath {
  constructor(path, size){
    this.path = path;
    this.size = size;
  }
}
//cykl hamiltonowski
function visitAllRecur(start, graphs, visited, size, path){
  //console.log('start %s ', start);
  //console.log(path);
  if(visited.size == nodesSize) {
    console.log('went to long of nodes');
    foundPaths.push(new PostmenPath(path, size));
    return;
  } else {
    for(const i in graphs[start].edges){
      let n = graphs[start].edges[i][0];
      let d = graphs[start].edges[i][1];
      if(!visited.has(n)){
        //let set = new Set(Array.from(visited));
        let set = new Set(visited);
        set.add(n);
        if(n == startNode) {
          if(set.size == nodesSize) foundPaths.push(new PostmenPath(path + n, size+d));
          //console.log('found end node %s', n);
        } else visitAllRecur(n, graphs, set, size+d, path + n + ' ');
      }
    }
  }
}

function findMinimumCycle(){
  let min = 1000000000;
  for(const i in foundPaths){
    //console.log(foundPaths[i]);
    if(foundPaths[i].size < min) min = foundPaths[i].size;
  }
  for(const i in foundPaths){
    if(foundPaths[i].size == min) return foundPaths[i];
  }
}

checkFiles();

