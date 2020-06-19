
export const player1 = (playerToMove, currScene, cam) => {
  currScene.collisionsEnabled = true;
  let speed = .2;
  let playerController = new BABYLON.TransformNode("root");
  let camController = new BABYLON.TransformNode("camRoot");
  playerToMove.parent = playerController;
  cam.parent = camController;
  playerController.parent = camController;
  let keyMap = {
  };
  let isForward = true;
  //SETS UP THE PLAYER COLLIDER SO WE CAN USE ACTION MANAGER AND RAYCAST EVENTS WILL ONLY HAPPEN ONCE
  let playerCollider = new BABYLON.MeshBuilder.CreateBox("playerCollider", {size:.2}, currScene)
  playerCollider.position.y = .5;
  playerCollider.visibility = 0;
  currScene.actionManager = new BABYLON.ActionManager(currScene)
  playerCollider.parent = playerController;
  playerCollider.actionManager = new BABYLON.ActionManager(currScene);
  let isColliding = "cubePlayer";
  // let playerActionManager = new BABYLON.ActionManager(playerToMove);


  //PLAYER MOVEMENT SET UP
  const movement = () => {

    currScene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
      keyMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";

    }));
    currScene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
      keyMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }))
    if(keyMap.ArrowUp) {
      //when up arrow is pressed, player should face away from camera
      if(isColliding === "cubePlayer" || !isForward) {
        camController.translate(BABYLON.Axis.Z, speed);
        isForward = true;
        playerController.lookAt(new BABYLON.Vector3(0, 0, -1))
        isColliding === "cubePlayer"
      }


    }
    if(keyMap.ArrowDown) {
      /*
      WHAT: When the player hits a tree while facing backward, they can only go forward
      OTHERWISE, they can go in either direction
      If isColliding equals cubePlayer, the player is no longer colliding
      */
     if(isColliding === "cubePlayer" || isForward) {
      camController.translate(BABYLON.Axis.Z, -speed)
      playerController.lookAt(new BABYLON.Vector3(0, 0, 1))
      isForward = false;
      isColliding === "cubePlayer"
     }

    }
    if(keyMap.ArrowLeft) {
      // cam.rotationOffset += 1;
      if(isForward) {
        camController.addRotation(0,-0.02,0);
      } else {
        camController.addRotation(0,0.02,0);
      }

    }
    if(keyMap.ArrowRight) {
      // cam.rotationOffset -=1;
      if(!isForward) {
        camController.addRotation(0,-0.02,0);
      } else {
        camController.addRotation(0,0.02,0);
      }
    }
  }

  //PLAYER RAY SET UP
  const playerRay = () => {

    function vecToLocal(vector, mesh){
      let m = mesh.getWorldMatrix();
      let v = BABYLON.Vector3.TransformCoordinates(vector, m);
      return v;
    }
    let origin = camController.position;

    let forward = new BABYLON.Vector3(0,0,1);
    if(!isForward) {
      forward = new BABYLON.Vector3(0,0,-1);
    }
    forward = vecToLocal(forward, camController);

    let direction = forward.subtract(origin);
    direction = BABYLON.Vector3.Normalize(direction);

    let length = 3;

    let ray = new BABYLON.Ray(origin, direction, length);

    // let rayHelper = new BABYLON.RayHelper(ray);
    // rayHelper.show(currScene);

    let hit = currScene.pickWithRay(ray);

    if (hit.pickedMesh){
      playerCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        {
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
            parameter: {
                mesh: hit.pickedMesh
            }
        },
        (evt) => {
            isColliding = hit.pickedMesh.name;
            console.log(isColliding);
            if(isColliding !== "cubePlayer") {
              if(isForward) {
                camController.translate(BABYLON.Axis.Z, -.15)
              }
              else {
                camController.translate(BABYLON.Axis.Z, .15)
              }

            }

        }
      ));
      playerCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        {
          trigger: BABYLON.ActionManager.OnIntersectionExitTrigger,
          parameter: {
            mesh: hit.pickedMesh
          }
        },
        (evt) => {
          isColliding = "cubePlayer"
        }
      ))

    }
  }

  //This serves as the "render loop" for things pertinent to player
  currScene.registerBeforeRender(function() {
    movement();
    playerRay();
  })


}

