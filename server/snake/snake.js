class SnakeGame{
//Snake game constructor
constructor(){
this.snakeCanvas = document.getElementById("snakeCanvas");
 this.context =snakeCanvas.getContext("2d");
 //1 up,2 down,3 right, 4 left
 this.direction=1;
 this.food=0;
//this.context.fillRect(10,10,50,50);
this.x=[];
this.y=[];
this.interval = setInterval(this.updateSnakeCanvas.bind(this),350);

this.snakeHead = {
    x: 0,
    y: 0,
    size:5,
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
this.snakeHead.x+=0;
        this.snakeHead.y+=5;
   
if(this.food>25){
    if(this.x.length>0){
        
        this.clearEnd(this.snakeHead,this.x.shift(),this.y.shift());
        this.updateSnake(this.snakeHead,this.snakeHead.x,this.snakeHead.y)
        //this.x.push(this.snakeHead.x);
        //this.y.push(this.snakeHead.y);
    } else{
this.clearEnd(this.snakeHead,this.x.pop(),this.y.pop());}
} else{
    this.updateSnake(this.snakeHead,this.snakeHead.x,this.snakeHead.y);
   
}
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
moveUp(){

}
moveDown(){

}
moveRight(){

}
moveLeft(){

}
}

 const game = new SnakeGame()