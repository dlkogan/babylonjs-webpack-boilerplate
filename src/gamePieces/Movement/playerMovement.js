export const movement = (playerToMove) => {
  let keyMap = {}

//38, 40 up down
//39, 37 right left

//I DIDN'T INVENT THIS, THANKS STACK OVERFLOW

  onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    keyMap[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
    let lastKeyDown = 0;
    if (keyMap[38] && keyMap[39]) playerToMove.translate(BABYLON.Axis.Z, .3, BABYLON.Space.LOCAL),playerToMove.addRotation(0,0.01,0)
    else if (keyMap[38] && keyMap[37]) playerToMove.translate(BABYLON.Axis.Z, .3, BABYLON.Space.LOCAL),playerToMove.addRotation(0,-0.01,0)
    else if(keyMap[38]) playerToMove.translate(BABYLON.Axis.Z, .3, BABYLON.Space.LOCAL)
    else if(keyMap[40]) playerToMove.translate(BABYLON.Axis.Z, -.3, BABYLON.Space.LOCAL)
    else if (keyMap[39]) playerToMove.addRotation(0,0.01,0)
    else if (keyMap[37]) playerToMove.addRotation(0,-0.01,0)


    // console.log(lastKeyDown)
    //PROBLEM, If I switch keys that's ANOTHER condition, what do?
  }
}
