/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var sumOfDistancesInTree = function (n, edges) {
  if (n === 1) return [0];

  let data = mapData(edges);
  const maxNumber = Object.keys(data)[data.length - 1];
  const listNodes = Object.keys(data);

  let arrDis = [];

  listNodes.forEach((node) => {
    const path = BFS(data, node, maxNumber);
    let sum = 0;

    listNodes.forEach((otherNode) => {
      if (node !== otherNode) {
        let distance = printPath(otherNode, path);
        sum += distance;
      }
    });
    arrDis.push(sum);
  });

  return arrDis;
};

function mapData(edges) {
  let graph = [];

  edges.forEach((edge) => {
    if (!graph.hasOwnProperty(edge[0])) {
      graph[edge[0]] = [];
    }
    if (!graph.hasOwnProperty(edge[1])) {
      graph[edge[1]] = [];
    }
    graph[edge[0]].push(edge[1]);
    graph[edge[1]].push(edge[0]);
  });

  return graph;
}

function printPath(end, back) {
  let count = 0;

  while (true) {
    if (back[end] == -1) {
      return count;
    }
    end = back[end];
    count++;
  }
}

function BFS(graph, s, maxNumber) {
  let visited = [];
  let path = [];
  let node = s;
  for (let i = 0; i <= maxNumber; i++) {
    visited[i] = false;
    path[i] = -1;
  }

  let queue = [];

  visited[node] = true;
  queue.push(node);

  while (queue.length > 0) {
    node = queue.shift();

    graph[node].forEach((value) => {
      if (!visited[value]) {
        visited[value] = true;
        queue.push(value);
        path[value] = node;
      }
    });
  }
  return path;
}

let n = 6;
let edges = [
  [0, 1],
  [0, 2],
  [2, 3],
  [2, 4],
  [2, 5],
];

// Time Limit Exceeded with 10000 data
// BFS may not a good choice or my code is awful
let answer = sumOfDistancesInTree(n, edges);

console.log(answer);
