//Trees should be a class

//Each TREE Instance will have X, Z Coord, and if it contains Candy (T || F)

class Tree {
  constructor() {
    this.xCoor = 0;
    this.yCoor = 0;
    this.hasCandy = false;
  }
  hasCandy() {
    this.hasCandy = true
  }
}

//1/3 of Trees in a given game should contain candy

//Cache created trees so they cannot be placed within 3 X OR 3 Z of each other of each others

const treeGenerator = (numbTrees) => {
  const maxTreesWithCandy = Math.floor(numbTrees/3)
  let treeGraph = {}
}




// for(let i = 0; i < 5; i++) {
//   let newTree = BABYLON.MeshBuilder.CreateBox('tree', {height:4, width:1, depth:1}, this.scene)
//   newTree.position.y = 2;
//   let tempX = Math.floor(Math.random() * (10 - 1) + 1)
//   let tempZ = Math.floor(Math.random() * (10 - 1 ) + 1)
//   if (i%2 === 0) tempX = 0 - tempX
//   else tempZ = 0 - tempZ
//   newTree.position.x = tempX;
//   newTree.position.z = tempZ;
// }
