export class Player {
  constructor(inScene) {
    this.self = BABYLON.MeshBuilder.CreateBox('cubePlayer',{height: 1, width: 1, depth:1}, inScene);
    this.littleSphere = BABYLON.MeshBuilder.CreateSphere('baby', {size: .2}, inScene);
    this.littleSphere.position.y = .5;
    this.littleSphere.position.z = 2;
    this.littleSphere.parent = this.self;
    this.playerMat = new BABYLON.StandardMaterial('playerMat', inScene)
    this.playerMat.diffuseColor = new BABYLON.Color3(1,0,0)
    this.self.material = this.playerMat;
    this.isTouching = '';
    this.totalCandy = 0;
    this.self.position.y = .5;
    this.currSpeed = 0;
    this.maxSpeed = .1
  }
  createImposter(inScene) {
    const playerImposter = this.self.physicsImpostor = new BABYLON.PhysicsImpostor(this.self, BABYLON.PhysicsImpostor.BoxImpostor, { mass:10, restitution: 0.1, nativeOptions:{move: true} }, inScene);
    return playerImposter;
  }
  collectCandy() {
    this.totalCandy += 1;
  }

}
