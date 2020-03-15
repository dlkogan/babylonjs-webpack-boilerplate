export const numbToTime = (num) => {
  if(num < 60) return ":" + num.toString()
  else {
    let numMinutes = Math.floor(num/60);
    let remainingSeconds = -(numMinutes - 60);
    return numMinutes.toString() + ":" + remainingSeconds.toString()
  }


}

export const myTimer = (inputTime) => {
  inputTime = inputTime - 1;
  return inputTime;
}



//EVERY 1000 MILLISECONDS, SUBTRACT 1

// setInterval(myTimer, 1000)
