

export class Candy {
  constructor(inScene) {
    this.value = BABYLON.MeshBuilder.CreateSphere('newCandy', 4, inScene)
    this.value.isVisible = true;
    this.value.position.x += 3;
    this.value.position.y = -1;
    this.value.isVisible = false;
  }

}

export const generateCandy = (candyMesh, currCandies) => {
  let candiesArr = []
  let newCandy = candyMesh.value.createInstance("i" + currCandies.length)
  let imposter = newCandy.physicsImpostor = new BABYLON.PhysicsImpostor(newCandy, BABYLON.PhysicsImpostor.SphereImpostor, {mass:1, restitution: 0})
  newCandy.position.x = 2;
  newCandy.position.y = 2;
  candiesArr.push({candy: newCandy, impCandy: imposter})
  return candiesArr;
}



