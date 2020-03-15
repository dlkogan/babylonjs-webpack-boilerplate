const numbToTime = (num) => {
  let numMinutes = num/60;
  let remainingSeconds = num%60
  return numMinutes.toString() + ":" + remainingSeconds.toString()

}

export const myTimer = (inputTime) => {
  inputTime = inputTime - 1;
  return inputTime;
}



//EVERY 1000 MILLISECONDS, SUBTRACT 1

// setInterval(myTimer, 1000)
