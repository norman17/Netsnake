class SnakeGame{
//Snake game constructor
constructor(){
this.snakeCanvas = document.getElementById("snakeCanvas");
 this.context =snakeCanvas.getContext("2d");
//this.context.fillRect(10,10,50,50);
this.interval = setInterval(this.updateSnakeCanvas.bind(this),20);
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
    this.snakeCanvas.style.backgroundColor="red";
var food=0;
console.log("herre");
    if(food===1){
this.x.push(this.snakeHead.y);
this.y.push(this.snakeHead.x);
    } else {
        this.x.push(this.snakeHead.x);
this.y.push(this.snakeHead.y);
        this.snakeHead.x+=1;
this.snakeHead.y+=1;
 this.clearEnd(this.snakeHead,this.x.pop(),this.y.pop());

} 
this.snakeCanvas.style.backgroundColor="green";
//this.clearCanvas();
this.snakeCanvas.style.backgroundColor="yellow";
   this.updateSnake(this.snakeHead,this.snakeHead.x,this.snakeHead.y);
   this.snakeCanvas.style.backgroundColor="blue";
}
//pass in obj that contain x y size and color to have them rendered on canvas

updateSnake(obj,x,y){
    this.context.fillStyle=obj.color;
this.context.fillRect(x,y,obj.size,obj.size);
}
//clears Snake canvas of objects
clearEnd(obj,x,y){
   // this.context.fillStyle="purple";
   // this.context.fillRect(x,y,obj.size,obj.size);
 this.context.clearRect(x, y, obj.size, obj.size);

}
clearCanvas(){
     this.context.clearRect(0, 0, this.snakeCanvas.width, this.snakeCanvas.height);

}

}

 const game = new SnakeGame()