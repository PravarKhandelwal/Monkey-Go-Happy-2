var bananaImage, obstacleImage, obstacleGroup, background_moving, score,player,monkey,background,ground;

var bananaGroup,obstacleGroup;

function preload() {
  background_moving = loadImage("jungle.jpg");
  
  player = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_01.png","Monkey_01.png","Monkey_01.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
                       
}

function setup() {
  createCanvas(600, 600);
  
  background1 = createSprite(300,300,40,10);
  background1.addImage("background",background_moving);
  background1.velocityX = -4;
  background1.scale = 1.5
  
   monkey = createSprite(100,190,40,10);
  monkey.addAnimation("monkey",player);
  monkey.scale = 0.2;
  monkey.x = 60;
  
  
  
   ground = createSprite(400,580,600,40);
  ground.visible = false;
  ground.velocityX = -6;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
}

function draw() {
  
  background(0);
  drawSprites();
  banana();
  obstacles();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);
  
  monkey.collide(ground);
  
  if(background1.x<0)
  {
    background1.x = ground.width/2;
  }
  
  if(ground.x<0)
    {
      ground.x = ground.width/2;
    }
  
  if(keyDown("space") && monkey.y >=200)
  {
    monkey.velocityY = -6;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  

  time = Math.ceil(frameCount/frameRate());
  text("Survival Time:"+time,100,50);
  
  if(bananaGroup.isTouching(monkey))
  {
      score = score+2;
      bananaGroup.destroyEach();
  } 
  
  switch(score)
  {
    case 10 : monkey.scale = 0.12;
      break;
    case 20 : monkey.scale = 0.14;
      break; 
    case 30 : monkey.scale = 0.16;
      break;
    case 40 : monkey.scale = 0.18;
      break;
   
  }
  
  if(obstacleGroup.isTouching(monkey))
     {
        player.scale = 0.2;   
     }
  
  
}

function banana()
{
  if(World.frameCount%80 === 0)
  {
    var banana = createSprite(400,550,40,10);
    banana.y = random(400,450);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = -1;
    bananaGroup.add(banana);
    
  }
}

function obstacles()
{
  if(World.frameCount%300 === 0)
  {
    var obstacle = createSprite(400,580,10,40);
    obstacle.addImage("Stone",obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    obstacleGroup.add(obstacle);
  }
}


