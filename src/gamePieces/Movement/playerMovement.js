import { Scene } from "babylonjs";

let speed = .3;
export const movement = (playerToMove, currScene) => {
  let playerController = new BABYLON.TransformNode("root");
  playerToMove.parent = playerController;
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
      playerController.translate(BABYLON.Axis.Z, speed);
    }
    if(keyMap.ArrowLeft) {
      playerController.addRotation(0,-0.01,0);
    }
    if(keyMap.ArrowRight) {
      playerController.addRotation(0,0.01,0);
    }
  })

}

