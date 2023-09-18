const fs = require('fs');
const toNum = require('./graphs.js');

let arr = [8, 9, 12, 20, 30, 40, 50, 60, 80, 200];
let nodesSize = 0;
let foundPaths = [];
let startNode = -1;

class Graph {
  constructor(name, edges) {
    this.name = name;
    this.id = -1;
    this.edges = [];
    this.edges.push(edges);
    this.distance = 0;
  }

  printA() {
    console.log('%s : %d', this.name, this.edges.length);
  }
}



function checkFiles() {
  for (let nr of arr) {
    let edgesSet = new Set();
    console.log('');
    console.log('file: komiwojazer_' + nr);
    const dane = fs.readFileSync('komiwojazer_' + nr + '.txt', { encoding: 'utf-8', flag: 'r' }).split('\n')
      .map(linia => linia.split(' '));//.map(n => parseInt(n)));

    let graphs = [];
    let ids = 0;
    for (let line of dane) {
      //console.log(line);
      edgesSet.add(line[0]);
      edgesSet.add(line[1]);
      if (graphs[line[0]] != undefined) {
        graphs[line[0]].edges.push([line[1], parseInt(line[2])]);
      } else {
        graphs[line[0]] = new Graph(line[0], [line[1], parseInt(line[2])]);
        graphs[line[0]].id = ids++;
      }
      if (graphs[line[1]] != undefined) {
        graphs[line[1]].edges.push([line[0], parseInt(line[2])]);
      } else {
        graphs[line[1]] = new Graph(line[1], [line[0], parseInt(line[2])]);
        graphs[line[1]].id = ids++;
      }
    }



    nodesSize = edgesSet.size;
    console.log('nodes: %d start looking postman path', nodesSize);

    const graphNumbObj = toNum.toNumbers(graphs, nodesSize);
    const nodeNames = graphNumbObj.n;
    const nodeEdges = graphNumbObj.e;
    startNode = graphs[dane[0][0]].id;

    foundPaths = [];
    if (nr > 80) continue;
    let checked = [];
    for (let i = 0; i < nodeNames; i++) checked.push(false);
    visitAllRecur(startNode, nodeEdges, [], checked);
    findMinimumCycle();
    //console.log(minCycle);
    for(const pp of foundPaths) console.log(pp);
  }
}

//cykl hamiltonowski
function visitAllRecur(start, nodeEdges, path, checked) {
  /*if(path.length > 7){
    console.log('start %s ', start);
    console.log(path);
  } */
  if(foundPaths.length > 0) return;
  if (path.length == nodesSize) {
    console.log('went to long of nodes');
    foundPaths.push(path);
    return;
  } else {
    for (const i of nodeEdges[start]) {
      if (!checked[i]) {
        const newPath = Array.from(path);
        const newChecked = Array.from(checked);
        newChecked[i] = true;
        newPath.push(i);
        if (i == startNode && newPath.length == nodesSize) {
          foundPaths.push(newPath);
          return;
          //console.log('found end node %d', i);
        } else if(i != startNode) visitAllRecur(i, nodeEdges, newPath, newChecked);
      }
    }
  }
}

function findMinimumCycle() {
  console.log('cycle size %d', foundPaths.length);
  //for(let i in foundPaths) console.log(foundPaths[i]);
}

checkFiles();