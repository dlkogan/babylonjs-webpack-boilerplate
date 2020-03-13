import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import * as GUI from 'babylonjs-gui';

export default class Game {
  constructor( canvasId ){
    this.canvas = document.getElementById( canvasId );
    this.engine = new BABYLON.Engine( this.canvas, true );
    this.scene = {};
    this.camera = {};
    this.light = {};
  }

  createScene() {
    // Create a basic BJS Scene object.
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.enablePhysics(new BABYLON.Vector3(0, -9, 0), new BABYLON.OimoJSPlugin(100))

    // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
    this.camera = new BABYLON.FollowCamera('followCam', new BABYLON.Vector3(0, 5,-10), this.scene);
    //camera distance from target
    this.camera.radius = 10;
    //how high above the character the camera is
    this.camera.heightOffset = 6;
    this.camera.rotationOffset = 180;
    this.camera.attachControl(this.canvas, true)
    let camRotate = BABYLON.Vector3()
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);
    // Create a built-in "sphere" shape; with 16 segments and diameter of 2.
    let cubePlayer = BABYLON.MeshBuilder.CreateBox('box',{height: 1, width: 1, depth:1}, this.scene);
    // Move the sphere upward 1/2 of its height.
    cubePlayer.position.y = 1;

    //Parent Camera to cubePlayer
    this.camera.lockedTarget = cubePlayer;

    // Create a built-in "ground" shape.
    let ground = BABYLON.MeshBuilder.CreateGround('ground',
                                {width: 20, height: 20, subdivisions: 2}, this.scene);
    //Create material for Ground
    let groundMat = new BABYLON.StandardMaterial('groundMat', this.scene)
    //Set the Diffuse Color of the Ground
    groundMat.diffuseColor = new BABYLON.Color3(0,1,0)
    //Apply the GroundMat Material to my Ground Mesh
    ground.material = groundMat;

    //Code to generate Randomly Placed Trees

    //GENERATE A SINGLE TREE FOR TEST
    let newTree = BABYLON.MeshBuilder.CreateBox('newTree', {height:4, width:1, depth:1}, this.scene)
    newTree.position.y = 2;
    newTree.position.z = -5;
    newTree.position.x = 8;

    //Collisions
    //Set Gravity in Scene

    //enable Collisions in scene


    //Creation of UI Space Bar Indicator
    let spaceBarPlane = BABYLON.MeshBuilder.CreatePlane('spaceBarPlane', {width:2, height:1}, this.scene)
    spaceBarPlane.parent = cubePlayer;
    spaceBarPlane.position.y = 1.5;

    let pressSpaceUI = GUI.AdvancedDynamicTexture.CreateForMesh(spaceBarPlane)
    let button1 = GUI.Button.CreateSimpleButton("but1", "Space!");
    button1.width = 1;
    button1.height = 0.4;
    button1.color = "black";
    button1.fontSize = 200;
    button1.isVisible = false;
    button1.background = "white";

    // button1.onPointerUpObservable.add(function() {
    //     alert("you did it!");
    // });
    // pressSpaceUI.addControl(button1);

    //Extremely Basic Keyboard Controller
    this.scene.onKeyboardObservable.add((kbInfo) => {
      switch(kbInfo.type) {
        case BABYLON.KeyboardEventTypes.KEYDOWN:
          switch(kbInfo.event.key) {
            case 'ArrowRight':
              //this.camera.rotationOffset += 1
              cubePlayer.addRotation(0,0.01,0)
              //console.log(cubePlayer)
              break
            case 'ArrowLeft':
              //this.camera.rotationOffset -= 1
              cubePlayer.addRotation(0,-.01,0)
              break
            case 'ArrowUp':
              // cubePlayer.position.z += .05
              cubePlayer.translate(BABYLON.Axis.Z, .05, BABYLON.Space.LOCAL);
              break
            case 'ArrowDown':
              cubePlayer.translate(BABYLON.Axis.Z, -.05, BABYLON.Space.LOCAL);
              break
            default:
              console.log(kbInfo.event.key)

          }
        break
      }
    })

    // this.scene.registerBeforeRender(() => {
    //   console.log(this.camera.storeState())
    // })
    console.log(this.scene)


  }

  doRender() {

    // Run the render loop.
    this.engine.runRenderLoop(() => {


      this.scene.render();


    });

    // The canvas/window resize event handler.
    window.addEventListener('resize', () => {
        this.engine.resize();
    });
  }
}
