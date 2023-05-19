let snakePoints = [];
let inputQueue = [];
let stepSize = 20;
let dir, apple;
let nDir = "a";
let len = 2;

function setup() {
  createCanvas(400, 400);
  dir = createVector(stepSize, 0);
  snakePoints.push(createVector(roundToNearest(width*0.25, stepSize), roundToNearest(height*0.5, stepSize)));
  strokeWeight(stepSize*0.5);
  apple = createVector(roundToNearest(random(0, width), stepSize), roundToNearest(random(0, height), stepSize));
  noLoop();
}

function roundToNearest(n, t){
  return round(n/t)*t;
}
function findDuplicates(arr){
  let o = false;
  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr.length; j++){
      o = o || (arr[i].x === arr[j].x && arr[i].y === arr[j].y && i !== j);
    }
  }
  return o;
}
function draw() {
  background(0);
  if(frameCount % 10 === 0){
    background(0);
    if(inputQueue[0] === "w" && "w" !== nDir){
      dir = createVector(0, -stepSize);
      nDir = "s";
    }else if(inputQueue[0] === "a" && "a" !== nDir){
      dir = createVector(-stepSize, 0);
      nDir = "d";
    }else if(inputQueue[0] === "s" && "s" !== nDir){
      dir = createVector(0, stepSize);
      nDir = "w";
    }else if(inputQueue[0] === "d" && "d" !== nDir){
      dir = createVector(stepSize, 0);
      nDir = "a";
    }
    if(inputQueue[0]){
      try {
        sfxr.play(sfxr.generate("blipSelect"));
      } catch(err) {
        console.log(err);
      }
    }
    inputQueue.shift();
    if(snakePoints.find((e)=>{return e.x===apple.x&&e.y===apple.y})){
      apple = createVector(roundToNearest(random(0, width), stepSize), roundToNearest(random(0, height), stepSize));
      sfxr.play(sfxr.generate("pickupCoin"));
      len++;
    }
    snakePoints.push(createVector(snakePoints[snakePoints.length-1].x, snakePoints[snakePoints.length-1].y).add(dir));
    if(snakePoints.length > len) {
      snakePoints.shift();
    }
  }
  stroke(255, 0, 0);
  point(apple.x, apple.y);
  stroke(255);
  if(snakePoints.length > 1){
    for(var i = 0; i < snakePoints.length-1; i++){
      line(snakePoints[i].x, snakePoints[i].y, snakePoints[i+1].x, snakePoints[i+1].y);
    }
  }else{
    point(snakePoints[0].x, snakePoints[0].y);
  }
  if(snakePoints.find((e)=>{return (constrain(e.x,0,width)!==e.x)||(constrain(e.y,0,height)!==e.y)})||findDuplicates(snakePoints)){
    noLoop();
    strokeWeight(2);
    text("You Died.", width/2, height/2);
    sfxr.play(sfxr.generate("hitHurt"));
  }
}

function keyPressed(){
  if("wasd".includes(key)){
    inputQueue.push(key);
  }
  if(key === " "){
    loop();
  }
  if(key === "r"){
    snakePoints = [];
    inputQueue = [];
    nDir = "a";
    len = 2;
    dir = createVector(stepSize, 0);
    snakePoints.push(createVector(roundToNearest(width*0.25, stepSize), roundToNearest(height*0.5, stepSize)));
    apple = createVector(roundToNearest(random(0, width), stepSize), roundToNearest(random(0, height), stepSize));
    strokeWeight(stepSize*0.5);
    loop();
  }
}
