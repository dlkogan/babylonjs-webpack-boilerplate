//Note, you can add properties and methods to Babylon Meshes
export const generateCandy = (currScene) => {
      BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/dlkogan/fileHostTest/master/", "candyBab.babylon", currScene, function(newMeshes){
        let candy = newMeshes[0];
        candy.position.y = 2;
        let height = 2;
        candy.scaling = new BABYLON.Vector3(30,30,30);
        const candyDrop = () => {
          while(height >= 0) {
            candy.translate(BABYLON.Axis.Y, .1)
            height -= .1;

          }
        }
        currScene.registerBeforeRender(function() {
          candyDrop();
        })
    });

}



