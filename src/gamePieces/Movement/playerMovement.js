
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
  let playerCollider = new BABYLON.MeshBuilder.CreateBox("playerCollider", {size:1}, currScene)
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
    if(keyMap.ArrowUp && isColliding === "cubePlayer") {
      //when up arrow is pressed, player should face away from camera
      isForward = true;
      playerController.lookAt(new BABYLON.Vector3(0, 0, -1))
      camController.translate(BABYLON.Axis.Z, speed);
    }
    if(keyMap.ArrowDown && isColliding === "cubePlayer") {
      //When down arrow is pressed, player should face toward camera
      // playerToMove.rotate(BABYLON.Axis.Y, 180)
      // console.log(playerController.forward);
      isForward = false;
      playerController.lookAt(new BABYLON.Vector3(0, 0, 1))
      camController.translate(BABYLON.Axis.Z, -speed)

    }
    if(keyMap.ArrowLeft) {
      // cam.rotationOffset += 1;
      camController.addRotation(0,-0.01,0);
    }
    if(keyMap.ArrowRight) {
      // cam.rotationOffset -=1;
      camController.addRotation(0,0.01,0);
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
    forward = vecToLocal(forward, camController);

    let direction = forward.subtract(origin);
    direction = BABYLON.Vector3.Normalize(direction);

    let length = 2;

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

