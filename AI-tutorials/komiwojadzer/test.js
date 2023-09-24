const graphCreator = require('./graphs.js');
const Graph = require('./graph.js');
let nodesSize = 0;
let foundPaths = [];
let startNode = '';

const graphData = graphCreator.createGraph(8);
const graph = graphData.g;
console.log('Started is %s and ended is %s', graphData.f, graphData.e)
for(let i in graph){
  graph[i].printFull();
}
const set =graphData.s;
console.log(set.size);
console.log(set);
console.log('distance from A to D should be 4 and counted %d', graphCreator.distance('A', 'D', graph));
console.log('distance from C to H should be 6 and counted %d', graphCreator.distance('C', 'H', graph));
const graphNumbData = graphCreator.toNumbers(graph, set.size);
console.log(graphNumbData.n);
const graphNumb = graphNumbData.e;
/*for(const edges of graphNumb){
  for(const d of edges){
    console.log(d);
  }
}
*/
console.log(graphNumb);
let arr = [45, 67, 89, 22, 32, 56, 54];
arr.splice(1, 1);
console.log(arr);