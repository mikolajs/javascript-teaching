
const fs = require('fs');
const Graph = require('./graph.js');



exports.createGraph = function createGraph(nr){
  //console.log(Graph);
  const dane = fs.readFileSync('komiwojazer_' + nr + '.txt', { encoding: 'utf-8', flag: 'r' }).split('\n')
      .map(linia => linia.split(' '));//.map(n => parseInt(n)));
  let edgesSet = new Set();
  let graphs = [];
  let ids = 0;
  console.log('create graf %d', nr);
  for (let line of dane) {
      //console.log(line);
      edgesSet.add(line[0]);
      edgesSet.add(line[1]);
    //console.log(line);
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
  return {'g':graphs, 's':edgesSet, 'f':dane[0][0], 'e':dane[dane.length-1][0]};
}

exports.toNumbers = function (graphs, nodeSize){
  let names = new Array(nodeSize);
  let arrGraph = [];
  for (let n in graphs) {
    names[graphs[n].id] = graphs[n].name;
    
  }
  for (let n in graphs) {
    //console.log(graphs[n].edges)
    let map = new Map();
    for(const e of graphs[n].edges){
      map.set(graphs[e[0]].id, e[1]);
    }
    arrGraph[graphs[n].id] = map; 
  }
  //console.log(names);
  //console.log(arrGraph);
  return {'n':names, 'e':arrGraph};
}



exports.distance = function distance(start, end, graphs) {
  for (let n in graphs) {
    graphs[n].distance = Number.MAX_VALUE;
  }
  let toCheck = [];
  graphs[start].distance = 0;
  toCheck.push(start);
  while (toCheck.length > 0) {
    let name = toCheck.pop();
    //console.log('startName = %s distance %f', name, graphs[name].distance);
    for (let i in graphs[name].edges) {
      let n = graphs[name].edges[i][0];
      let d = graphs[name].edges[i][1];
      //console.log('check name  %s distance %d', n, d);
      if (graphs[n].distance > graphs[name].distance + d) {
        //console.log('change %s += %d', n, d);
        graphs[n].distance = graphs[name].distance + d;
        toCheck.push(n);
      }
    }
  }
  return graphs[end].distance;
}

exports.distanceNeighbours = function distanceN(path, graphWithId){
  path.unshift(path[path.length-1]);
  console.log(path);

}

class FullPath {
  constructor(arr, distance = 0){
    this.path = arr;
    this.distance = distance;
  }
  printWithNames(names){
    this.path.map(id => names[id]).join(' ');
  }
}

exports.FullPath = FullPath;

class WorkPath {
  constructor(){
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
  printNames(nodeNames){
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

exports.WorkPath = WorkPath;

function distanceWithIds(start, end, graphsNumb) {
  let distances = [];
  for(let i = 0; i < graphsNumb.length; i++) distances.push(Number.MAX_VALUE);
  let toCheck = [];
  distances[start] = 0;
  toCheck.push(start);
  while (toCheck.length > 0) {
    let id = toCheck.pop();
    //console.log('startName = %s distance %f', name, graphs[name].distance);
    for (let arr of graphsNumb[id]) {
      let i = arr[0];
      let d = arr[1];
      //console.log('check name  %s distance %d', n, d);
      if (distances[i] > distances[id] + d) {
        //console.log('change %s += %d', n, d);
        distances[i] = distances[id] + d;
        toCheck.push(i);
      }
    }
  }
  return distances[end];
}


exports.countWay = function countWay(workPath, graphNumb){
  let fullDistance = 0;
  let start = 0;
  for(let id of workPath.path){
    fullDistance += distanceWithIds(start, id, graphNumb);
    start = id;
  }
  return fullDistance;
}