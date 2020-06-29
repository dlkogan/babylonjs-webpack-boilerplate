import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import "@babylonjs/loaders/glTF";
import * as GUI from 'babylonjs-gui';
import {treeGenerator} from '../src/gamePieces/utility/generateTrees'
import {myTimer, numbToTime} from '../src/gamePieces/utility/numberToTime'
import {player} from './gamePieces/Mesh/player'

export default class Game {
  constructor( canvasId ){
    this.canvas = document.getElementById( canvasId );
    this.engine = new BABYLON.Engine( this.canvas, true );
    this.scene = {};
    this.camera = {};
    this.light = {};
    this.assetsManager = {};
  }

  createScene() {
    // Create a basic BJS Scene object.
    this.scene = new BABYLON.Scene(this.engine);
    //physics
    // this.scene.enablePhysics(new BABYLON.Vector3(0,-9.81, 0), new BABYLON.CannonJSPlugin())
    // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
    this.camera = new BABYLON.FollowCamera('followCam', new BABYLON.Vector3(0, 5, -15), this.scene);
    //camera distance from target
    this.camera.radius = 20;
    //how high above the character the camera is
    this.camera.heightOffset = 6;
    this.camera.rotationOffset = 0;
    this.camera.attachControl(this.canvas, true)
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);
    this.assetsManager = new BABYLON.AssetsManager(this.scene);
    let treeMesh = this.assetsManager.addMeshTask("tree task", "", "https://raw.githubusercontent.com/dlkogan/fileHostTest/master/", "treeBab.babylon")
    //IDEA: Maybe can load in the rootMesh for Candy Task here there reference it in generate candy?
    // let candyMesh = this.assetsManager.addMeshTask("candy task", "", "https://raw.githubusercontent.com/dlkogan/fileHostTest/master/", "candyBab.babylon")
    // let rootCandy = {};
    player(this.scene, this.camera)



    // Create a built-in "ground" shape.
    let ground = BABYLON.MeshBuilder.CreateGround('ground',
                                {width: 60, height: 60, subdivisions: 2}, this.scene);
    //Create material for Ground
    let groundMat = new BABYLON.StandardMaterial('groundMat', this.scene)
    //Set the Diffuse Color of the Ground
    groundMat.diffuseColor = new BABYLON.Color3(.3,1,.1)
    //Apply the GroundMat Material to my Ground Mesh
    ground.material = groundMat;
    // ground.checkCollisions = true;


    //CREATING THE MAIN OVERLAY

    //CREATING UI FOR CANDY COUNTER

    let overlayUI = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI")
    // let candyCounter = new GUI.TextBlock();
    // candyCounter.height = "150px";
    // candyCounter.fontSize = 100;
    // candyCounter.text = 0;
    // candyCounter.color = 'white';
    // candyCounter.left = "500px"
    // candyCounter.top = "-250px"
    // //candyCounter.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    // overlayUI.addControl(candyCounter)

    //CREATING UI FOR TIMER
    let timer = new GUI.TextBlock();
    timer.height = "150px"
    timer.fontSize = 100;
    timer.color = 'white';
    timer.top = '-250px'
    overlayUI.addControl(timer)




  //For Testing UI, Create a UI Elem
    // let spaceBarPlane = BABYLON.MeshBuilder.CreatePlane('spaceBarPlane', {width:2, height:1}, this.scene)
    // spaceBarPlane.parent = cubePlayer;
    // spaceBarPlane.position.y = 1.5;

    // let pressSpaceUI = GUI.AdvancedDynamicTexture.CreateForMesh(spaceBarPlane)
    // let button1 = GUI.Button.CreateSimpleButton("but1", "Space!");
    // button1.width = 1;
    // button1.height = 0.4;
    // button1.color = "black";
    // button1.fontSize = 200;
    // button1.isVisible = false;
    // button1.background = "white";

    // button1.onPointerUpObservable.add(function() {
    //     alert("you did it!");
    // });
    // pressSpaceUI.addControl(button1);


  treeGenerator(15, this.scene, treeMesh)

  // TIMER STUFF
  let timeCount = 59;

  setInterval(function() {
    timeCount = myTimer(timeCount)
    if(timeCount > 0) timer.text = numbToTime(timeCount);
    else timer.text = "Times up!"
  }, 1000)

  this.scene.onBeforeRenderObservable.add(() => {

    let meshes = this.scene.meshes.slice(0)

    for (let i = 0; i < meshes.length; i++) {
      if(meshes[i].position.y < -1) {
        meshes[i].dispose()
      }
    }
  })

//Render Loop runs when assets are loaded
this.assetsManager.onFinish = function (tasks) {

    this.engine.runRenderLoop(function () {

       this.scene.render();
    });
 };
 this.assetsManager.load();


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
