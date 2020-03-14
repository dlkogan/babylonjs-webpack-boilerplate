export class Player {
  constructor(inScene) {
    this.self = BABYLON.MeshBuilder.CreateBox('cubePlayer',{height: 1, width: 1, depth:1}, inScene);
    this.playerMat = new BABYLON.StandardMaterial('playerMat', inScene)
    this.playerMat.diffuseColor = new BABYLON.Color3(1,0,0)
    this.self.material = this.playerMat;
    this.isTouching = '';
    this.self.position.y = 1;
    this.currSpeed = 0;
    this.maxSpeed = .1
  }
  createImposter(inScene) {
    const playerImposter = this.self.physicsImpostor = new BABYLON.PhysicsImpostor(this.self, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0, nativeOptions:{move: true} }, inScene);
    return playerImposter;
  }

}


// export const createPlayer = (inScene) => {
// const cubePlayer = BABYLON.MeshBuilder.CreateBox('cubePlayer',{height: 1, width: 1, depth:1}, inScene);
// // Move the sphere upward 1/2 of its height.
// let cubeMat = new BABYLON.StandardMaterial('cubePlayer', inScene)
// cubeMat.diffuseColor = new BABYLON.Color3(1,0,0)
// cubePlayer.material = cubeMat;
// cubePlayer.position.y = 1;

// return cubePlayer
// }

// export const playerImposter = (player, inScene) => {
//   const playerImposter = player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0, nativeOptions:{move: true} }, inScene);
//   return playerImposter;
// }
