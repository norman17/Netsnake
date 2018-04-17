class SnakeGame{
//Snake game constructor
constructor(){
this.snakeCanvas = document.getElementById("snakeCanvas");
 this.context =snakeCanvas.getContext("2d");
 this.scoreBoard = document.getElementById("scoreBoard");
 this.scoreContext= scoreBoard.getContext("2d");
 this.scoreContext.fillRect(10,30,50,50);
 this.food=0;
 this.foodOnBoard={x:[],y:[],};
 this.foodOnBoard.x.push(70);
 this.foodOnBoard.y.push(70);
 this.addFood(70,70,10);
 this.foodOnBoard.x.push(10);
 this.foodOnBoard.y.push(10);
 this.addFood(10,10,10);
this.score=0;
this.x=[];
this.y=[];
this.xDirection=10;
this.yDirection=0;
this.interval = setInterval(this.updateSnakeCanvas.bind(this),30);
document.addEventListener('keypress',this.moveUp.bind(this));
this.snakeHead = {
    x: 250,
    y: 250,
    size:10,
    color: "green",
    length: 1,
    prevx: 0,
    prevy: 0,
}

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

if(this.snakeCanvas.width < this.snakeHead.x || 0 > this.snakeHead.x || this.snakeCanvas.height < this.snakeHead.y || 0 > this.snakeHead.y){
this.score+=1;
}

for( i=0; i < this.x.length;i++){
if(this.snakeHead.x==this.x[i]&&this.snakeHead.y==this.y[i]){
        this.food=0;
}
}
for( i=0; i < this.foodOnBoard.x.length;i++){
if(this.snakeHead.x==this.foodOnBoard.x[i]&&this.snakeHead.y==this.foodOnBoard.y[i]){
   this.score+=50;
    this.foodOnBoard.x[i]+=50;
    this.foodOnBoard.y[i]+=50;
    this.addFood(this.snakeHead.x+50,this.snakeHead.y+50,10); 
    food-=15;
}
}

if(this.food>25){
    //if there snake is 
    if(this.x.length>0){
        this.clearEnd(this.snakeHead,this.x.shift(),this.y.shift());
        this.updateSnake(this.snakeHead,this.snakeHead.x,this.snakeHead.y);
    } else{
this.clearEnd(this.snakeHead,this.x.pop(),this.y.pop());}

} else{
    this.updateSnake(this.snakeHead,this.snakeHead.x,this.snakeHead.y);
}
this.scoreMaker();
this.food+=5; 
}
//pass in obj that contain x y size and color to have them rendered on canvas
updateSnake(obj,x,y){
    this.context.fillStyle=obj.color;
this.context.fillRect(x,y,obj.size,obj.size);
}

//clears Snake end from canvas
clearEnd(obj,x,y){
 this.context.clearRect(x, y, obj.size, obj.size);
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

addFood(x,y,size){
    this.context.fillStyle="red";
    this.context.fillRect(x,y,size,size);
}

//function for event listner
moveUp(ev){
const key=ev.key;
if(key==='a'){
this.xDirection=-10;
this.yDirection=0;
}
else if(key==='s'){
    this.xDirection=0;
    this.yDirection=10;
}
else if(key==='w'){
    this.xDirection=0;
    this.yDirection=-10;
}
else if (key==='d'){
    this.xDirection=10;
    this.yDirection=0;
}
}

}

 const game = new SnakeGame()