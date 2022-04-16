window.onload = function() {
    //declare global variables
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");
    var t = performance.now();
    var x = 500;
    var y = 250;
    var dirX = 0;
    var dirY = 0;
    var dirA = 0;
    var dirB = 0;
    var diamondX = Math.random() * (700-100) + 50;
    var diamondY = Math.random() * (500-100) + 80;
    var score = 0;
    var highscore = 0;
    var enemyX = 200;
    var enemyY = 250;
    var started = false;
    var gameover = false;

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
        let speed = 250 //speed of ball;
        context.clearRect(0,0,700,500); //clear canvas

        //display shapes & text in canvas
        context.beginPath();
        context.arc(x, y, 20, 0, 2 * Math.PI);
        context.fillStyle = "yellow";
        context.fill();

        context.beginPath();
        context.arc(enemyX,enemyY,20,0,2*Math.PI)
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
        
        //response for user input
        right.onmousedown = function() {
            if (started==true && gameover == false) {
                dirX=1;
            };
        };
        right.onmouseup = function() {
            dirX=0;
        };
        left.onmousedown = function() {
            if (started==true && gameover == false) {
                dirX=-1;
            };
        };
        left.onmouseup = function() {
            dirX=0;
            };
        up.onmousedown = function() {
            if (started==true && gameover == false) {
                dirY=-1;
            };
        };
        up.onmouseup = function() {
            dirY=0;
            };
        down.onmousedown = function() {
            if (started==true && gameover == false) {
                dirY=1;
            };
        };
        down.onmouseup = function() {
            dirY=0;
            };
        
        document.addEventListener('keydown',function(event){
            if (started==true && gameover == false && event.code == 'ArrowUp' || event.code == "KeyW") {
                dirY= -1;
            }
            else if (started==true && gameover == false && event.code == 'ArrowDown' || event.code == "KeyS") {
                dirY = 1; 
            }
            if (started==true && gameover == false && event.code == 'ArrowRight' || event.code == "KeyD") {
                dirX = 1; 
            }
            else if (started==true && gameover == false && event.code == 'ArrowLeft' || event.code == "KeyA") {
                dirX = -1; 
            }
        });
    
        document.addEventListener('keyup',function(event){
            if (event.code == 'ArrowUp' || event.code == "KeyA") {
                dirY = 0;
            }
            else if (event.code == 'ArrowDown' || event.code == "KeyS") {
                dirY = 0;
            }
            if (event.code == 'ArrowRight' || event.code == "KeyD") {
                dirX = 0; 
            }
            else if (event.code == 'ArrowLeft' || event.code == "KeyA") {
                dirX = 0; 
            }
        });
        enter.onclick = function() {
            score = 0;
            x = 500;
            y = 250;
            dirA = 1;
            dirB = 1;
            enemyX = 200;
            enemyY = 250;

            if (gameover == true) {
                diamondX = Math.random() * (700-100) + 50;
                diamondY = Math.random() * (500-100) + 80;
                gameover = false;
            };
            started = true;
        };
        document.addEventListener('keypress', function(event){
            if (event.code == 'Enter') {
                score = 0;
                x = 500;
                y = 250;
                dirA = 1;
                dirB = 1;
                enemyX = 200;
                enemyY = 250;
                
                if (gameover==true) {
                    diamondX = Math.random() * (700-100) + 50;
                    diamondY = Math.random() * (500-100) + 80;
                    gameover = false;
                };
                started = true;
            };
        });
        
        //game logic
        //for player movement and collision
        if(dirX==1) {
            if(x+25 < 700) {
                x += dirX*(speed * timePassed);
            }
        }
        else if(dirX==-1) {
            if(x>25){
                x += dirX*(speed * timePassed);
            }
        }
        if(dirY==1) {
            if(y+25 < 500){
                y += dirY*(speed * timePassed);
            }
        }
        else if(dirY==-1) {
            if(y>85){
                y += dirY*(speed * timePassed);
            }
        }

        //collison for player & diamond
        if (diamondX <= x+20 && x<=diamondX+40 && diamondY <= y+20 && y <= diamondY+40) {
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
        //enemy movement
        enemyX += dirA*(speed*timePassed);
        enemyY += dirB*(speed*timePassed);
        //if enemy collision with player game ends
        if (enemyX <= x+35 && x<=enemyX+35 && enemyY <= y+35 && y <= enemyY+35) {
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
        }
        //if game is over
        if (gameover==true) {
            dirA = 0;
            dirB = 0;
            dirX = 0;
            dirY = 0;
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