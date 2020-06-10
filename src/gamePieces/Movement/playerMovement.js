import { Scene } from "babylonjs";

let speed = .2;
export const movement = (playerToMove, currScene, cam) => {
  let playerController = new BABYLON.TransformNode("root");
  let camController = new BABYLON.TransformNode("camRoot");
  playerToMove.parent = playerController;
  cam.parent = camController;
  playerController.parent = camController;


  //PLAYER MOVEMENT SET UP
  currScene.actionManager = new BABYLON.ActionManager(currScene)
  let keyMap = {
  };
  currScene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
    keyMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";

  }));
  currScene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
    keyMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
  }))

  currScene.registerAfterRender(function() {
    if(keyMap.ArrowUp) {
      camController.translate(BABYLON.Axis.Z, speed);
    }
    if(keyMap.ArrowDown) {
      camController.translate(BABYLON.Axis.Z, -speed);
    }
    if(keyMap.ArrowLeft) {
      // cam.rotationOffset += 1;
      camController.addRotation(0,-0.01,0);
    }
    if(keyMap.ArrowRight) {
      // cam.rotationOffset -=1;
      camController.addRotation(0,0.01,0);
    }
  })

  //PLAYER RAY SET UP
  const playerRay = () => {
    function vecToLocal(vector, mesh){
      let m = mesh.getWorldMatrix();
      let v = BABYLON.Vector3.TransformCoordinates(vector, m);
      return v;
    }
    let origin = camController.position;

    let forward = new BABYLON.Vector3(0,0,1);
    forward = vecToLocal(forward, camController);

    let direction = forward.subtract(origin);
    direction = BABYLON.Vector3.Normalize(direction);

    let length = 2;

    let ray = new BABYLON.Ray(origin, direction, length);

    let rayHelper = new BABYLON.RayHelper(ray);
    rayHelper.show(currScene);

    let hit = currScene.pickWithRay(ray);

    if (hit.pickedMesh){
     console.log(hit.pickedMesh.name);
    }
  }
  currScene.registerBeforeRender(function() {
    playerRay();
  })


}

