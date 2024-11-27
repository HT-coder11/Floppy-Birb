var bgIMG, flappy, flappyIMG, gameOver, gameOverIMG, play, playIMG, restart, restartIMG, topPipe, topPipeIMG, bottomPipe, bottomPipeIMG
var checkSound, dieSound, jumpSound
var gameState=  "pre-play"
var scoreVar = 0
var pipeDoubled

function preload(){
    flappyIMG = loadImage("assets/flappybird.png")
    topPipeIMG = loadImage("assets/topflappypipe.png")
    bottomPipeIMG = loadImage("assets/bottomflappypipe.png")
    gameOverIMG = loadImage("assets/gameOver.png")
    restartIMG = loadImage("assets/restartFlap.png")
    playIMG = loadImage("assets/startFlap.png")
    bgIMG = loadImage("assets/flappybg.jpg")
    checkSound = loadSound("assets/checkpoint.mp3")
    dieSound = loadSound("assets/die.mp3")
    jumpSound = loadSound("assets/jump.mp3")
}

function setup(){
    createCanvas(1000, 500)
    pipeDoubled = createGroup()

    flappy = createSprite(140,180);
    flappy.addImage(flappyIMG)
    flappy.scale=0.05;
    flappy.debug = true
    flappy.setCollider("circle", 0,0,222)

    restart = createSprite(500,250)
    restart.addImage(restartIMG)
    restart.scale = 1
    restart.visible = false

    play = createSprite(500, 250)
    play.addImage(playIMG)
    play.scale = 0.67
}

function draw(){
    background(bgIMG)
    if(gameState == "pre-play"){
        flappy.velocityY= 0;
        flappy.visible = false;
        flappy.x =140
        flappy.y =180
        pipeDoubled.destroyEach()
        restart.visible = false
        play.visible = true
        scoreVar = 0 
        if(mousePressedOver(play)){
            gameState = "play"
        }

    }

    if(gameState == "play"){
        if(keyDown("space")){
            flappy.velocityY= -8;
        }
        
        if(flappy.isTouching(pipeDoubled) || flappy.y >500 || flappy.y <0){
            console.log("game ended")
            gameState = "end"
        }
        pipeRepeat()
        score()
        play.visible = false
        flappy.visible = true
    }
    if(gameState == "end"){
        pipeDoubled.setVelocityXEach(0)
        flappy.velocityX = 0 
        restart.visible = true
        if(mousePressedOver(restart)){
            gameState = "pre-play"
         
        }
    }
    
    flappy.velocityY=  flappy.velocityY+0.4;
    
    drawSprites()

    textSize(24)
    fill("lime")
    text("Score: "+ scoreVar , 30, 30)
}

function pipeRepeat(){

    if(frameCount % 60 == 0 ){
        topPipe = createSprite(1100, random(0, 120) );
        topPipe.addImage(bottomPipeIMG)
        topPipe.velocityX = -(5+scoreVar/10)
        topPipe.scale = 0.7
        bottomPipe = createSprite(1100,topPipe.y+440 )
        bottomPipe.addImage(topPipeIMG)
        bottomPipe.velocityX = -(5+scoreVar/10)
        bottomPipe.scale = 0.7
        pipeDoubled.add(topPipe)
        pipeDoubled.add(bottomPipe)
        restart.depth = topPipe.depth +1
        restart.depth = bottomPipe.depth +1
        topPipe.debug = true
        bottomPipe.debug = true
    }
}

function score(){
    if(frameCount % 70 == 0 && frameCount != 0 ){
        scoreVar= scoreVar + 1
    }
}
