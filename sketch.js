var PLAY = 1;
var END = 0;
var gameState = PLAY;

var background,backgroundImg, invisibleGround;
var monkey,monkeyImg;

var fruitsGroup,fruit1,fruit2,fruit3;
var snake,snakeImg;

var restart;


function preload(){
    backgroundImg = loadImage("background.jpeg");
    monkeyImg = loadImage("monkey.gif");

    fruit1 = loadImage("fruit1.png");
    fruit2 = loadImage("fruit_2.png");
    fruit1 = loadImage("fruit3.png");

    snakeImg = loadImage("snake.png");
    restartImg = loadImage("restart.png");

}

function setup() {

    createCanvas(500,500);

    background = createSprite(100,200);
    background.addImage("background.jpeg",backgroundImg);
    background.velocityX = -2;

    monkey = createSprite(50,300);
    monkey.addAnimation("monkey.gif",monkeyImg);
    monkey.scale = 0.25;

    snake = createSprite(400,320);
    snake.addImage("snake.png",snakeImg);
    snake.scale = 0.01;
    var rand = Math.round(random(1,5));
    snake.velocityX = -4;

    invisibleGround = createSprite(200,329,600,10);
    invisibleGround.visible = false;

    restart = createSprite(250,200);
  restart.addImage(restartImg);
  restart.scale=0.05;

    score = 0;
    fruitsGroup = new Group();
   
}

function draw() {


text("Score: "+ score, 100,500,); 

      monkey.debug = false;
      monkey.setCollider("circle",0.2,100,200);
      monkey.collide(invisibleGround);

    snake.collide(invisibleGround);
    snake.debug = false;
    snake.setCollider("circle",0.2,100,0);

    restart.visible = false;
    if(background.x < 220){
        background.x = 300
      }

      if (gameState===PLAY){

        background.velocityX = -(3 + 1*score/5);
      }
      if(keyDown("space") && monkey.y >= 200) {
        monkey.velocityY = -10;
      }
      monkey.velocityY = monkey.velocityY + 1;

      
      if (fruitsGroup.isTouching(monkey)) {
        fruitsGroup.destroyEach();
        score=score + 2;
    }
    if(snake.isTouching(monkey)){
        gameState = END;
        snake.destroyEach();
        monkey.velocityX= 0;
    }
    
    else if (gameState === END) {
       
        restart.visible = true;
        
        //set velcity of each game object to 0
        background.velocityX = 0;
        monkey.velocityY = 0;
        fruitsGroup.setVelocityXEach(0);
       
        
    
      
        fruitsGroup.setLifetimeEach(-1);
       
        
        if(mousePressedOver(restart)) {
          reset();
        }
      }
    
    
   
spawnfruits();


drawSprites();
}
function spawnfruits(){

    if(frameCount % 60 === 0) {
        var fruit = createSprite(600,165,10,40);
        fruit.velocityX = -(6 + 3*score/100);
        var rand = Math.round(random(1,2));
        switch(rand) {
            case 1: fruit.addImage(fruit1);
                    break;
            case 2: fruit.addImage(fruit2);
                    break;
            case 3: fruit.addImage(fruit3);
                    break;
            default: break;
          }

         fruit.scale=0.1;
         fruit.lifetime = 300;
        fruitsGroup.add(fruit);
    }
}
function reset(){
  gameState = PLAY;
  restart.visible = false;
  
  fruitsGroup.destroyEach();
  snake.destroyEach();
  score = 0;
}
