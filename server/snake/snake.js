class SnakeGame{
//Snake game constructor
constructor(){
this.snakeCanvas = document.getElementById("snakeCanvas");
 this.context =snakeCanvas.getContext("2d");
//this.context.fillRect(10,10,50,50);
this.interval = setInterval(this.updateSnakeCanvas.bind(this),20);
this.snakeHead = {
    x: 0,
    y: 0,
    size:50,
    color: "green",
}
}
    //updates snakecanvas
updateSnakeCanvas(){
   this.clearCanvas(); 
   //this.context.fillRect(10,10,50,50);
   this.update(this.snakeHead);
 //  this.context.fillRect(10,10,50,50);
}
update(obj){
    this.context.fillStyle=obj.color;
    obj.x++;
    obj.y++;
this.context.fillRect(obj.x,obj.y,obj.size,obj.size);
}
//clears Snake canvas of objects
clearCanvas(){
     this.context.clearRect(0, 0, this.snakeCanvas.width, this.snakeCanvas.height);

}

}

 const game = new SnakeGame()