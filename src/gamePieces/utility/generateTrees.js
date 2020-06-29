//Trees should be a class

//Each TREE Instance will have X, Z Coord, and if it contains Candy (T || F)
// const treeMesh = require('../../scenes')

export const treeGenerator = (numTrees, currScene, treeLoadTask, gridSize = 61) => {
  let gridArray = new Array(gridSize).fill([]).map(element => new Array(gridSize).fill(null));

  //THE GRID WILL ALWAYS BE AN ODD NUMBER
  gridArray[(gridArray.length - 1)/2][(gridArray.length - 1)/2] = true;

  const isPositionValid = (x, z) => {
    for(let i = x - 3; i <= x + 3; i++) {
      for(let j = z - 3; j <= z + 3; j++) {
        if(gridArray[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  let treesWithCandy = Math.floor(numTrees/3)
  treeLoadTask.onSuccess = function(newMeshes) {
  let newTree = newMeshes.loadedMeshes[0];


  newTree.isVisible = false;
  newTree.scaling = new BABYLON.Vector3(150,150,150);
  for(let i = 0; i < numTrees; i++) {
    console.log(numTrees, i);
    let xCoor = Math.floor(Math.random() * 61 -30)
    let zCoor = Math.floor(Math.random() * 61 -30)
    if(!isPositionValid(xCoor + 30, zCoor + 30)) {
      numTrees++;

    }
    else {
      gridArray[xCoor + 30][zCoor + 30] = true;

      let newInstance = newTree.createInstance("treeInstance" + i);
      let treeCollider = BABYLON.MeshBuilder.CreateBox('tree', {height:4, width:2, depth:2}, currScene);
      treeCollider.visibility = 0;
      newInstance.position.x = xCoor;
      newInstance.position.z = zCoor;
      treeCollider.position.x = xCoor;
      treeCollider.position.z = zCoor;
      if(treesWithCandy > 0) {
        treeCollider.hasCandy = true;
      }
      else {
        treeCollider.hasCandy = false;
      }
    }
  }
}
}



// class Tree {
//   constructor() {
//     this.value = BABYLON.MeshBuilder.CreateBox('newTree', {height:4, width:1, depth:1}, this.scene)
//     this.hasCandy = false;
//   }
//   grantCandy() {
//     this.hasCandy = true
//   }
//   spawnCandy(candyMesh, currCandies) {
//     if (this.hasCandy) {
//       let newCandy = candyMesh.value.createInstance("i" + currCandies.length)
//       newCandy.position.y = 4;
//       let imposter = newCandy.physicsImpostor = new BABYLON.PhysicsImpostor(newCandy, BABYLON.PhysicsImpostor.SphereImpostor, {mass:1, restitution: 0})
//       //FOR POSITION, MAKE SURE IT'S BEING PLACE RELATIVE TO TREE'S GLOBAL SCALE
//       newCandy.position.z = this.value.position.z;
//       newCandy.position.x = this.value.position.x + 2;
//       this.hasCandy = false;
//       return {candy: newCandy, impCandy: imposter}
//     }

//   }
// }

// //1/3 of Trees in a given game should contain candy

// //Cache created trees so they cannot be placed within 3 X OR 3 Z of each other of each others
// //Don't worry about this right now

// export const treeGenerator = (numbTrees, currScene) => {
//   let treesWithCandy = Math.floor(numbTrees/3);
//   let treeArray = []
//   for (let i = 0; i < numbTrees; i++) {
//     let xCoor = Math.floor(Math.random() * 60 -30)
//     let zCoor = Math.floor(Math.random() * 60 -30)
//     let newTree = new Tree()
//     BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/dlkogan/fileHostTest/master/", "treeBab.babylon", currScene, function(newMeshes) {
//       newTree.value = newMeshes[0];
//       newTree.scaling = new BABYLON.Vector3(150,150,150);
//     });
//     newTree.value.position.y = 2;
//     newTree.value.position.z = zCoor;
//     newTree.value.position.x = xCoor;
//     newTree.checkCollisions = true;
//     let treeCollider = new BABYLON.MeshBuilder.CreateBox("tree", {height:4, width:2, depth:2});
//     treeCollider.parent = newTree.value;
//     treeCollider.visibility = 0;
//     let treeImposter = newTree.value.physicsImpostor = new BABYLON.PhysicsImpostor(newTree.value, BABYLON.PhysicsImpostor.BoxImpostor, {mass:.1, restitution: .001})
//     if(treesWithCandy > 0) newTree.grantCandy()
//     treesWithCandy--
//     treeArray.push({['tree']: newTree, ['treeImposter']:treeImposter})
//   }
//   return treeArray;

// }




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
