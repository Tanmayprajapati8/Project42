var monkey,monkeyImage;
var ground,groundImage;
var banana,bananaImage;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var invisibleGround;
var bananasGroup,stonesGroup;
var stone,stoneImage;
var endImg,eng;

function preload(){
  //addImage
  monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  groundImage=loadImage("jungle.jpg");
  bananaImage=loadImage("banana.png");
  stoneImage=loadImage("stone.png");
  endImg=loadImage("gameOver.png");

}
function setup() {
  createCanvas(400, 300);
  
  //ground sprite
  ground=createSprite(200,150,20,20);
  ground.addImage(groundImage);
  ground.velocityX=-4;
  
  //invisible ground sprite
  invisibleGround=createSprite(80,280,200,5);
  invisibleGround.visible=false;
    
//  monkey sprite
  monkey=createSprite(50,240,20,20);
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale=0.1;

  //end sprite
  end=createSprite(180,150,20,20);
  end.addImage(endImg);
  end.scale=0.8;
  end.visible=false;
  

  
  
  //making new groups
  bananasGroup=new Group();
  stonesGroup=new Group();
}

function draw() {
  background(220);

  //making game state PLAY
if(gameState===PLAY){

  //making infinite ground
    if(ground.x<=0){
      ground.x=ground.width/2;
    }
  //functions that I made 
    stonespawn();
    monkeybig();
    spawnbanana();
    
  //if we press space monkey will jump
    if(keyDown("space")&&monkey.y>=210){
      monkey.velocityY=-14;
    }
  
  //adding gravity 
    monkey.velocityY=monkey.velocityY+0.8;
    
  //monkey will collide
    monkey.collide(invisibleGround);
    
  //if monkey will touch banana banana will destroy and score will increase
    if(monkey.isTouching(bananasGroup)){
      bananasGroup.destroyEach();
      score=score+5;

    }
}
    drawSprites();
  
  //creating END game state
  if(gameState===END){
    //ground velocity will 0
    ground.velocityX=0;
    //all groups will destroy
    bananasGroup.destroyEach();
    stonesGroup.destroyEach();
    //show GAME OVER
    end.visible=true;

  }
  //show score
    textSize(20);
    fill("white");
    text("Score:"+score,300,20);
}
 
function spawnbanana(){
  if(frameCount%60===0){
      banana=createSprite(400,100,20,20);
      banana.addImage(bananaImage);
      banana.velocityX=-4;
      banana.scale=0.05;
      banana.y=Math.round(random(50,250));
      bananasGroup.add(banana);
      banana.lifetime=120;
  }

}
function monkeybig(){
  var rand=Math.round(random(1,7));
  if(score>0 &&score%20===0 && bananasGroup.isTouching(monkey)){
  monkey.scale+=0.1;
  
  }
}
function stonespawn(){
  if(frameCount%80===0){
    stone=createSprite(400,250,20,20);
    stone.addImage(stoneImage);
    stone.velocityX=-4;
    stone.scale=0.1;
    stonesGroup.add(stone);
    if(monkey.isTouching(stonesGroup)){
      gameState=END;
    }
    }

  
}