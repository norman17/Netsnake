var isrunning = 0;
var game;
var justPost=false;
class SnakeGame{
    //Snake game constructor
    constructor(){
        this.snakeCanvas = document.getElementById("snakeCanvas");
        this.context =snakeCanvas.getContext("2d");
        this.scoreBoard = document.getElementById("scoreBoard");
        this.scoreContext= scoreBoard.getContext("2d");
        this.scoreContext.fillRect(10,30,50,50);
        this.food=0;
  //      justPost=false;
        this.foodOnBoard={x:[],y:[],};
        this.foodOnBoard.x.push(70);
        this.foodOnBoard.y.push(70);
        this.movingObject={x: 0,y: 0,};//
        this.addFood(70,70,10,"red");
        this.foodOnBoard.x.push(10);
        this.foodOnBoard.y.push(10);
        this.addFood(10,10,10,"red");
        this.obstacle={x:[],y:[],};//used to keep track of hitable objects
        this.score=0;
        this.x=[];
        this.y=[];
        this.xDirection=10;
        this.yDirection=0;
        this.interval = setInterval(this.updateSnakeCanvas.bind(this),100);
        document.addEventListener('keypress',this.moveUp.bind(this));
        this.snakeHead = {
            x: 250,
            y: 250,
            size:10,
            color: "green",
            length: 1,
            prevx: 0,
            prevy: 0,
            direction: "right",
        }
        isrunning = 1;

    }

    randomNumber(num){
       return Math.floor(Math.random()*num/10)*10+10;
    }

    //updates snakecanvas
    updateSnakeCanvas(){
        this.x.push(this.snakeHead.x);
        this.y.push(this.snakeHead.y);
        this.snakeHead.prevx=this.snakeHead.x;
        this.snakeHead.prevy=this.snakeHead.y;
        this.snakeHead.x+=this.xDirection;
        this.snakeHead.y+=this.yDirection;
        var i;

        if(this.snakeCanvas.width - 1 < this.snakeHead.x || 0 > this.snakeHead.x || this.snakeCanvas.height - 1 < this.snakeHead.y || 0 > this.snakeHead.y){
            this.onCollision();
        }

        for( i=0; i < this.x.length;i++){
            if(this.snakeHead.x==this.x[i]&&this.snakeHead.y==this.y[i]){
               // this.food = 0;
                this.onCollision();
            }
        }
        for( i=0; i < this.obstacle.x.length;i++){
            if(this.snakeHead.x==this.obstacle.x[i]&&this.snakeHead.y==this.obstacle.y[i]){
               // this.food = 0;
                this.onCollision();
            }
        }

        for( i=0; i < this.foodOnBoard.x.length;i++){
            if(this.snakeHead.x == this.foodOnBoard.x[i] && this.snakeHead.y == this.foodOnBoard.y[i]){
                this.score += 50;
                var isFilled=0;
                var c=0;
                while(isFilled===0){
                this.foodOnBoard.x[i] = this.randomNumber(this.snakeCanvas.width);
                this.foodOnBoard.y[i] = this.randomNumber(this.snakeCanvas.height);
                isFilled=1;
                for(c=0;c<this.x.length;c++){ 
                  if(this.x[c]===this.foodOnBoard.x[i]&&this.y[c]===this.foodOnBoard.y[i]){
                      isFilled=0;
                  }  
            }
            for(c=0;c<this.obstacle.x.length;c++){ 
                if(this.obstacle.x[c]===this.foodOnBoard.x[i]&&this.obstacle.y[c]===this.foodOnBoard.y[i]){
                    isFilled=0;
                }  
          }
                }
            
                this.addFood(this.foodOnBoard.x[i],this.foodOnBoard.y[i],10,"red");
            
                this.food=2;
                if(this.x[0] !== 0 || this.y[0] !== 0){
                    var greyx=-10;
                    var greyy=-10;
                    if(this.x[1]<this.x[0]){
                        greyx=10;
                    }else if(this.x[1]==this.x[0]){
                        greyx=0;
                    }
                    if(this.y[1]<this.y[0]){
                        greyy=10;
                    }
                    else if(this.y[1]==this.y[0]){
                        greyy=0;
                    }
                    this.obstacle.x.push(this.x[0]+greyx)
                    this.obstacle.y.push(this.y[0]+greyy)
                    this.addFood(this.x[0]+greyx,this.y[0]+greyy,10,"grey");
                    if(this.obstacle.x.length>15){
                        this.clearEnd(10,this.obstacle.x.shift(),this.obstacle.y.shift())
                    }
                }
            }
        }

        if(this.food>5){
            //if there snake is
            if(this.x.length>0){
                this.clearEnd(this.snakeHead.size,this.x.shift(),this.y.shift());
                this.updateSnake(this.snakeHead,this.snakeHead.x,this.snakeHead.y);
            } else{
                this.clearEnd(this.snakeHead.size,this.x.pop(),this.y.pop());}

        } else{
                this.updateSnake(this.snakeHead,this.snakeHead.x,this.snakeHead.y);
        }
        this.scoreMaker();
        this.food+=1;
    }
    onCollision() {
        clearInterval(this.interval)
        isrunning = 0;
    }
        //pass in obj that contain x y size and color to have them rendered on canvas
    updateSnake(obj,x,y){
            this.context.fillStyle=obj.color;
            this.context.fillRect(x,y,obj.size,obj.size);
    }

        //clears Snake end from canvas
        clearEnd(size,x,y){
            this.context.clearRect(x, y, size, size);
        }
        //clears Snake canvas of objects
        clearCanvas(){
            this.context.clearRect(0, 0, this.snakeCanvas.width, this.snakeCanvas.height);
        }
        //updates score board
        scoreMaker(){
            this.scoreContext.clearRect(0, 0, this.scoreBoard.width, this.scoreBoard.height);
            this.scoreContext.fillStyle = "rgba(255, 255, 255, 0.5)";
            this.scoreContext.font = "30px Arial";
            this.scoreContext.fillText(this.score,10,30);
        }

        addFood(x,y,size,color){
            this.context.fillStyle=color;
            this.context.fillRect(x,y,size,size);
        }

        //function for event listner
        moveUp(ev){
            const key=ev.key;
            if(key==='a'){
                if (this.snakeHead.direction === "left") {
                }
                else if(this.snakeHead.direction === "right") {
                }
                else {
                    this.xDirection=-10;
                    this.yDirection=0;
                    this.snakeHead.direction = "left";
                }
            }
            else if(key==='s'){
                if (this.snakeHead.direction === "down") {
                }
                else if (this.snakeHead.direction === "up") {
                }
                else {
                    this.xDirection=0;
                    this.yDirection=10;
                    this.snakeHead.direction = "down";
                }
            }
            else if(key==='w'){
                if (this.snakeHead.direction === "up") {
                }
                else if(this.snakeHead.direction === "down") {
                }
                else{
                    this.xDirection=0;
                    this.yDirection=-10;
                    this.snakeHead.direction = "up";
                }
            }
            else if (key==='d'){
                if (this.snakeHead.direction === "right") {
                }
                else if (this.snakeHead.direction === "left") {
                }
                else {
                    this.xDirection=10;
                    this.yDirection=0;
                    this.snakeHead.direction = "right";
                }
            }
        }
    }

    function startGame() {
        if (isrunning == 1) {
            return;
        }
        var canv = document.getElementById("snakeCanvas");
        var context = canv.getContext("2d");
        context.clearRect(0, 0, canv.width, canv.height);
        game = new SnakeGame();
    }
    function getUser() {
          document.location.href="https://google.com";
    }
    function postScore() {
       // if(justPost===false){
            var username = document.getElementById("username").value;
            fetch('/postscore?score=' + game.score.toString() + '&username=' + username, { method: 'POST' })
            /*
            var xml = new XMLHttpRequest();
            xml.onreadystatechange = function() {
                if (xml.readyState == 4 && xml.status == 200) {
                    callback(xml.responseText);
                }
            }
            var username = document.getElementById("username").value;
            xml.open("POST", '/postscore?score=' + game.score.toString() + '&username=' + username, false); //NEED TO FIND URL
            xml.send(null);
        */
    //justPost=true;
    //}
        }
