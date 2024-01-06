
// your_other_script.js
let currentRoomValue;
let destinstionRoomValue;
let choice = 56;
let defaultBuilding = "science";
// Rest of the code...
function showDiv(divId,divHid) {
  // Hide all divs with the class 'hidden'
  let allDivs = document.querySelectorAll('.hidden');
  allDivs.forEach(function(div) {
      div.style.display = 'none';
  });

  // Show the specific div by ID
  let turnHid = document.getElementById(divHid);
  let targetDiv = document.getElementById(divId);
  
  if (targetDiv) {
      targetDiv.style.display = 'block';
      turnHid.style.display = 'none';
  }
}

function showMapDiv(mapDivID){
  
  let mapId = document.getElementById(mapDivID);
  if(mapId){
    mapId.style.display ='block';
  }

}

class Graph {
  constructor(V) {
    this.V = V;
    this.adj = new Array(V).fill().map(() => []);
    this.parent = new Array(V).fill(-1);
    this.nodeCategories = new Array(V).fill("default");
    this.nodeBuilding = new Array(V).fill(""); ;
    this.arrayPath = [];
  }

  addEdge(node, connectedNode, weightConnection) {
    this.adj[node].push([connectedNode, weightConnection]);
    this.adj[connectedNode].push([node, weightConnection]);
  }

  setNodeCategory(node, category) {
    this.nodeCategories[node] = category;
  }
  setNodeBuilding(node, building) {
    this.nodeBuilding[node] = building;
  }

  findClosestCategory(src, targetCategory, useElevator) {
    const distances = new Array(this.V).fill(Number.POSITIVE_INFINITY);
    const setDistance = new Set();
    setDistance.add([0, src]);
    distances[src] = 0;

    while (setDistance.size > 0) {
      const tmp = [...setDistance].reduce((a, b) => (a[0] < b[0] ? a : b));
      setDistance.delete(tmp);
      const u = tmp[1];

      for (const [node, weight] of this.adj[u]) {
        if (!useElevator && this.nodeCategories[node] === "elevator") {
          continue;
        }

        if (distances[node] > distances[u] + weight) {
          if (distances[node] !== Number.POSITIVE_INFINITY) {
            setDistance.delete([distances[node], node]);
          }
          distances[node] = distances[u] + weight;
          setDistance.add([distances[node], node]);
          this.parent[node] = u;
        }
      }
    }

    let closestNode = -1;
    let minDist = Number.POSITIVE_INFINITY;

    for (let i = 0; i < this.V; i++) {
      if (distances[i] < minDist && this.nodeCategories[i] === targetCategory) {
        minDist = distances[i];
        closestNode = i;
      }
    }

    return [minDist, closestNode];
  }

  printPath(v) {
    console.log(`Current Node: ${v}`);
    if (v === -1 ) {
        console.log("Terminating recursion");
        return;
    }
    this.printPath(this.parent[v]);
    console.log(`${v} -> `);
    this.arrayPath.push(v);
}



  shortestPath(src, targetNode, useElevator) {
    const distances = new Array(this.V).fill(Number.POSITIVE_INFINITY);
    const setds = new Set();
    setds.add([0, src]);
    distances[src] = 0;

    while (setds.size > 0) {
      const tmp = [...setds].reduce((a, b) => (a[0] < b[0] ? a : b));
      setds.delete(tmp);
      const u = tmp[1];

      for (const [v, weight] of this.adj[u]) {
        if (!useElevator && this.nodeCategories[v] === "elevator") {
          continue;
        }

        if (distances[v] > distances[u] + weight) {
          if (distances[v] !== Number.POSITIVE_INFINITY) {
            setds.delete([distances[v], v]);
          }
          distances[v] = distances[u] + weight;
          setds.add([distances[v], v]);
          this.parent[v] = u;
        }
      }
    }

    if (distances[targetNode] === Number.POSITIVE_INFINITY) {
      console.log(`No node found at Room ${targetNode} from Room ${src}`);
    } else {
      console.log(`Room ${targetNode} from Room ${src} is ${distances[targetNode]} units away.`);
      console.log("Path: ");
      this.printPath(targetNode);
      console.log();
    }
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  const myForm = document.getElementById("myForm");
  const buttons = document.querySelectorAll('.button');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      choice = this.id;
    });
  });

  if (myForm) {
    myForm.addEventListener("submit", function (event) {
      event.preventDefault();

      currentRoomValue = document.getElementById("InputCurrentRoom").value;
      destinstionRoomValue = document.getElementById("InputDestinationRoom").value;
      value();
    });
  } 
});

function value() {
  g.parent = new Array(V).fill(-1);
  g.arrayPath = [];

  currentRoomValue = Number(currentRoomValue);
  destinstionRoomValue = Number(destinstionRoomValue);
  g.shortestPath(currentRoomValue, destinstionRoomValue, 1);
  connectBuildingNodes(g.nodeBuilding[g.arrayPath[0]]);
}

function execute(CurrentRoom, DestinationRoom) {
  const InputCurrentRoom = CurrentRoom;
  const InputDestinationRoom = DestinationRoom;
  const destinationChoice = choiceDetermine();
  const InputCurrentRoomInputValue = InputCurrentRoom.value;
  const InputDestinationRoomInputValue = InputDestinationRoom.value;
  const destinationChoiceValue = destinationChoice.value;
  console.log(destinationChoiceValue);
}

const V = 24;
const g = new Graph(V);

let S213 = 0;
let S214 = 1;

g.addEdge(S213, S214, 1);
g.addEdge(S214, 2, 1);
g.addEdge(2, 3, 1);
g.addEdge(3, 4, 1);
g.addEdge(4, 5, 1);
g.addEdge(5, 9, 1);
g.addEdge(9, 8, 1);
g.addEdge(8, 7, 1);
g.addEdge(7, 6, 1);
g.addEdge(6, S213, 1);
g.addEdge(5, 10, 1);
g.addEdge(10, 11, 1);
g.addEdge(11, 12, 1);
g.addEdge(12, 13, 1);
g.addEdge(13, 6, 1);
g.addEdge(3, 8, 1);
g.addEdge(4, 8, 4);

g.addEdge(11, 14, 1);
g.addEdge(14, 15, 1); // elevators
g.addEdge(15, 16, 1);

g.addEdge(10, 17, 1); 
g.addEdge(17, 18, 1); // stair
g.addEdge(18, 19, 1); 
g.addEdge(19, 20, 1); 

g.addEdge(20, 21, 1); 
g.addEdge(14, 21, 1); 

g.addEdge(21, 22, 1); 
g.addEdge(22, 23, 1); 

g.setNodeCategory(13, "cr");
g.setNodeCategory(8, "cr");
g.setNodeCategory(0, "exit");
g.setNodeCategory(5, "exit");

g.setNodeCategory(14, "elevator");
g.setNodeCategory(15, "elevator");
g.setNodeCategory(16, "elevator");

g.setNodeBuilding(1,"science");
g.setNodeBuilding(2,"science");
g.setNodeBuilding(3,"science");
g.setNodeBuilding(4,"science");
g.setNodeBuilding(5,"science");


g.setNodeBuilding(6,"science2");
g.setNodeBuilding(7,"science2");
g.setNodeBuilding(8,"science2");
g.setNodeBuilding(9,"science2");
g.setNodeBuilding(10,"science2");
g.setNodeBuilding(11,"science2");
g.setNodeBuilding(12,"science2");
g.setNodeBuilding(13,"science2");
g.setNodeBuilding(14,"science2");
g.setNodeBuilding(15,"science2");

g.setNodeBuilding(11,"science2");


