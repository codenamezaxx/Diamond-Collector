window.onload = function() {
    //declare global variables
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");
    var t = performance.now();
    var playerX = 500; //player x & y position
    var playerY = 250; 
    var dirX = 0;      //player x & y move direction
    var dirY = 0;       
    var dirA = 0;      //enemy x & y move direction
    var dirB = 0;
    var enemyX = 200;  //enemy x & y position
    var enemyY = 250;
    var stepX = 0;
    var stepY = 0;
    var score = 0;
    var highscore = 0;
    var diamondX = Math.random() * (700-100) + 50;
    var diamondY = Math.random() * (500-100) + 80;
    var started = false;
    var gameover = false;
    var paused = false;

    //get DOM elements
    var up = document.getElementById("up");
    var down = document.getElementById("down");
    var right = document.getElementById("right");
    var left = document.getElementById("left");
    var enter = document.getElementById("enter");
    
    //make function for game loop
    function draw(){
        let timePassed = (performance.now() - t) / 1000;
        t = performance.now();
        let fps = Math.round(1 / timePassed);
        let speed = 250; //speed of ball;
        context.clearRect(0,0,700,500); //clear canvas

        //display shapes & text in canvas
        context.beginPath();
        context.arc(playerX, playerY, 20, 0, 2 * Math.PI);
        context.fillStyle = "yellow";
        context.fill();

        context.beginPath();
        context.arc(enemyX,enemyY,20,0,2*Math.PI);
        context.fillStyle = "rgb(255, 101, 101)";
        context.fill();

        context.beginPath();
        context.rect(diamondX,diamondY,20,20);
        context.fillStyle = "cyan";
        context.fill();
        
        context.beginPath();
        context.font = '25px Arial';
        context.fillStyle = 'white';
        context.fillText("SCORE: "+score, 50,40);

        context.beginPath();
        context.font = '25px Arial';
        context.fillStyle = 'white';
        context.fillText("HIGHSCORE: "+highscore, 270,40);

        context.beginPath();
        context.font = '25px Arial';
        context.fillStyle = 'white';
        context.fillText("FPS: "+fps, 550,40);
        
        context.beginPath();
        context.moveTo(0,60);
        context.lineTo(700,60);
        context.strokeStyle = "gray";
        context.stroke();
        
        //button will response if game has started, not paused, and not gameover
        //response for user input in desktop button
        right.onmousedown = function() {
            if (paused == false && started==true && gameover == false) {
                dirX=1;
            };
        };
        right.onmouseup = function() {
            dirX=0;
        };
        left.onmousedown = function() {
            if (paused == false && started==true && gameover == false) {
                dirX=-1;
            };
        };
        left.onmouseup = function() {
            dirX=0;
            };
        up.onmousedown = function() {
            if (paused == false && started==true && gameover == false) {
                dirY=-1;
            };
        };
        up.onmouseup = function() {
            dirY=0;
            };
        down.onmousedown = function() {
            if (paused == false && started==true && gameover == false) {
                dirY=1;
            };
        };
        down.onmouseup = function() {
            dirY=0;
        };
            
        //response for user input in desktop button
        right.ontouchstart = function() {
            if (paused == false && started==true && gameover == false) {
                dirX=1;
            };
        };
        right.ontouchend = function() {
            dirX=0;
        };
        left.ontouchstart = function() {
            if (paused == false && started==true && gameover == false) {
                dirX=-1;
            };
        };
        left.ontouchend = function() {
            dirX=0;
            };
        up.ontouchstart = function() {
            if (paused == false && started==true && gameover == false) {
                dirY=-1;
            };
        };
        up.ontouchend = function() {
            dirY=0;
            };
        down.ontouchstart = function() {
            if (paused == false && started==true && gameover == false) {
                dirY=1;
            };
        };
        down.ontouchend = function() {
            dirY=0;
        };
            
            document.addEventListener('keydown',function(event){
            if (paused == false && started==true && gameover == false && event.code == 'ArrowUp' || event.code == "KeyW") {
                dirY= -1;
            }
            else if (paused == false && started==true && gameover == false && event.code == 'ArrowDown' || event.code == "KeyS") {
                dirY = 1; 
            };
            if (paused == false && started==true && gameover == false && event.code == 'ArrowRight' || event.code == "KeyD") {
                dirX = 1; 
            }
            else if (paused == false && started==true && gameover == false && event.code == 'ArrowLeft' || event.code == "KeyA") {
                dirX = -1; 
            };
        });
    
        document.addEventListener('keyup',function(event){
            if (event.code == 'ArrowUp' || event.code == "KeyA") {
                dirY = 0;
            }
            else if (event.code == 'ArrowDown' || event.code == "KeyS") {
                dirY = 0;
            };
            if (event.code == 'ArrowRight' || event.code == "KeyD") {
                dirX = 0; 
            }
            else if (event.code == 'ArrowLeft' || event.code == "KeyA") {
                dirX = 0; 
            };
        });
        enter.onclick = function() {
            if (started==false) {
                score = 0;
                playerX = 500;
                playerY = 250;
                enemyX = 200;
                enemyY = 250;
                dirA = 1;
                dirB = 1;
                started = true;
            }
            else if (started==true && paused==false && gameover == false) {
                stepX = 0
                stepY = 0
                paused = true
            }
            else if (started==true && paused==true) {
                paused = false
            };
            if (gameover == true) {
                score = 0;
                playerX = 500;
                playerY = 250;
                enemyX = 200;
                enemyY = 250;
                started = true;
                diamondX = Math.random() * (700-100) + 50;
                diamondY = Math.random() * (500-100) + 80;
                gameover = false;
            };
        };
        document.addEventListener('keypress', function(event){
            if (event.code == 'Enter') {
                if (started==false) {
                    score = 0;
                    playerX = 500;
                    playerY = 250;
                    enemyX = 200;
                    enemyY = 250;
                    dirA = 1;
                    dirB = 1;
                    started = true;
                }
                else if (started==true && paused==false && gameover == false) {
                    stepX = 0
                    stepY = 0
                    paused = true
                }
                else if (started==true && paused==true) {
                    paused = false
                };
                if (gameover == true) {
                    score = 0;
                    playerX = 500;
                    playerY = 250;
                    enemyX = 200;
                    enemyY = 250;
                    started = true;
                    diamondX = Math.random() * (700-100) + 50;
                    diamondY = Math.random() * (500-100) + 80;
                    gameover = false;
                };
            };
        });
        
        //game logic
        //for player movement and collision
        if(dirX==1) {
            if(playerX+25 < 700) {
                playerX += dirX*(speed * timePassed);
            };
        }
        else if(dirX==-1) {
            if(playerX>25){
                playerX += dirX*(speed * timePassed);
            };
        };
        if(dirY==1) {
            if(playerY+25 < 500){
                playerY += dirY*(speed * timePassed);
            };
        }
        else if(dirY==-1) {
            if(playerY>85){
                playerY += dirY*(speed * timePassed);
            };
        };

        //collison for player & diamond
        if (diamondX <= playerX+20 && playerX<=diamondX+40 && diamondY <= playerY+20 && playerY <= diamondY+40) {
            score++;
            diamondX = Math.random() * (700-100) + 50;
            diamondY = Math.random() * (500-100) + 80;
        };
        //enemy collision
        if (enemyX+25 > 700 || enemyX < 25) {   
            dirA *= -1;
        };
        
        if (enemyY+25 > 500 || enemyY < 85) {
            dirB *= -1;
        };
        //enemy movement if game is not paused and not gameover
        if (paused==false && gameover == false && started == true) {
            stepX = dirA*(speed*timePassed);
            stepY = dirB*(speed*timePassed);
        };
        //if enemy collision with player game ends
        enemyX += stepX;
        enemyY += stepY;
        if (enemyX <= playerX+30 && playerX<=enemyX+30 && enemyY <= playerY+30 && playerY <= enemyY+30) {
            stepX = 0;
            stepY = 0;
            dirX = 0;
            dirY = 0;
            gameover = true;
        };
        
        //highscore funtion
        function isHighScore() {
            if (score > highscore) {
                highscore = score;
            };
        };
        //if game not started
        if (started==false) {
            context.beginPath();
            context.font = '30px Arial';
            context.fillStyle = 'white';
            context.fillText("Click ENTER to Start", 205,150);
            context.beginPath();
            context.font = '20px Arial';
            context.fillStyle = 'white';
            context.fillText("Task: - Collect diamond as many as you can", 160,370);
            context.fillText("- Don't get caught by enemy", 213,400);
            context.fillText("(Controls can also use arrow key or W,A,S,D in keyboard)", 100,430);
        };
        //if game paused
        if (paused==true) {
            context.beginPath();
            context.font = '30px Arial';
            context.fillStyle = 'white';
            context.fillText("Click ENTER again to Continue", 150,150);
        };
        //if game is over
        if (gameover==true) {
            context.beginPath();
            context.font = '50px Arial';
            context.fillStyle = 'white';
            context.fillText("GAME OVER",200, 200);
            context.font = '30px Arial';
            context.fillText("Your Score Is "+score, 250,300);
            context.fillText("Click ENTER button to play again", 140,350);
        };
        
        isHighScore(); //always update highscore
        window.requestAnimationFrame(draw); //game loop
    };
    draw();
};