class SnakeGame{
//Snake game constructor
constructor(){
this.snakeCanvas = document.getElementById("snakeCanvas");
 this.context =snakeCanvas.getContext("2d");
 //1 up,2 down,3 right, 4 left
 this.direction=1;
 this.food=0;
//this.context.fillRect(10,10,50,50);
this.interval = setInterval(this.updateSnakeCanvas.bind(this),40);
this.x=[0];
this.y=[0];
this.snakeHead = {
    x: 25,
    y: 25,
    size:5,
    color: "green",
    length: 1,
    endx: 0,
    endy: 0,
}

}
    //updates snakecanvas
updateSnakeCanvas(){
    if(this.food===1){
this.x.push(this.snakeHead.y);
this.y.push(this.snakeHead.x);
 this.snakeHead.x+=5;
this.snakeHead.y+=5;
this.food=0;  
} else {
    
        this.x.push(this.snakeHead.x);
this.y.push(this.snakeHead.y);
this.clearEnd(this.snakeHead,this.x.shift(),this.y.shift());
        this.snakeHead.x+=5;
this.snakeHead.y+=5;
 
this.food=1;
} 
//this.clearCanvas();
   this.updateSnake(this.snakeHead,this.snakeHead.x,this.snakeHead.y);
}
//pass in obj that contain x y size and color to have them rendered on canvas

updateSnake(obj,x,y){
    this.context.fillStyle=obj.color;
this.context.fillRect(x,y,obj.size,obj.size);
}

//clears Snake end from canvas
clearEnd(obj,x,y){
   // this.context.fillStyle="purple";
   // this.context.fillRect(x,y,obj.size,obj.size);
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