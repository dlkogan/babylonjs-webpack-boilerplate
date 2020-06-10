import { Scene } from "babylonjs";

let speed = .2;
export const movement = (playerToMove, currScene, cam) => {
  let playerController = new BABYLON.TransformNode("root");
  let camController = new BABYLON.TransformNode("camRoot");
  playerToMove.parent = playerController;
  cam.parent = camController;
  playerController.parent = camController;
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

}

