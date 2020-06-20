//Note, you can add properties and methods to Babylon Meshes
export const generateCandy = (currScene, dropper) => {
  let candyProxy = BABYLON.MeshBuilder.CreateSphere("candy", 4)
  candyProxy.visibility = 0;
  candyProxy.position = new BABYLON.Vector3(dropper.position.x + 2, dropper.position.y, dropper.position.z);
  let fallSpeed = .01;
  candyProxy.position.y = 3;
      BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/dlkogan/fileHostTest/master/", "candyBab.babylon", currScene, function(newMeshes){
        let candy = newMeshes[0];
        candy.scaling = new BABYLON.Vector3(30,30,30);
        candy.parent = candyProxy;
        let candyColor = new BABYLON.StandardMaterial("candyCol", currScene);
        candyColor.diffuseColor = new BABYLON.Color3(0, 1, 0);
        candy.material = candyColor;

    });
    const candyDrop = () => {
      if(candyProxy.position.y > 1) {
        fallSpeed *= 1.5;
        candyProxy.translate(BABYLON.Axis.Y, -fallSpeed)
      }
      else if(candyProxy.position.y < 0) {
        candyProxy.position.y = 1;
      }
    }
    currScene.registerBeforeRender(function() {
      candyDrop();
    })
}



