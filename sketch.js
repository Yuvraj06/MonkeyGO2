var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var bgI, bg;
var ground;

var score = 0;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  bgI = loadImage("Jungle bg.png");


}



function setup() {
  createCanvas(400, 400);
  monkey = createSprite(70, 399, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;
  monkey.depth = 2;
  monkey.setCollider("rectangle", 0, 0, 400, monkey.height);




  bg = createSprite(200, 200);
  bg.addImage("bg", bgI);
  bg.velocityX = -(2 + score);
  bg.depth = 1;

  ground = createSprite(200, 400, 400, 5);
  ground.visible = false;

  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(300);


  monkey.collide(ground);


  if (keyDown("space") && monkey.y >= 320) {
    monkey.velocityY = -20;
  }

  Obstacle();
  Banana();

  if (monkey.isTouching(foodGroup)) {
    foodGroup.destroyEach();
    score = score + 1;
  }



  monkey.velocityY = monkey.velocityY + 0.8;

  if (bg.x <= 0) {
    bg.x = 400;
  }

  if (monkey.isTouching(obstacleGroup)&&score>0) {
    score = score - 1;
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
  }



  // console.log(score);

  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 250, 80);

  // monkey.debug=true;


}

function Banana() {

  var rand = round(random(30, 200));

  if (frameCount % 200 === 0) {
    banana = createSprite(400, rand);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(2 + score);
    banana.scale = 0.2;
    banana.lifetime = 200;

    foodGroup.add(banana);

  }
}

function Obstacle() {

  if (frameCount % 180 === 0) {
    obstacle = createSprite(400, 370);
    obstacle.addImage("obstacleI", obstacleImage);
    obstacle.velocityX = -(7 + score);
    obstacle.scale = 0.2;
    obstacle.lifetime = 200;

    obstacleGroup.add(obstacle);

  }
}