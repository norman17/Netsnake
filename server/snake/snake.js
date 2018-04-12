class SnakeGame{
constructor(){
this.snakeCanvas = document.getElementById("snakeCanvas");
 this.context =snakeCanvas.getContext("2d");
this.context.fillRect(10,10,50,50);
this.interval = setInterval(this.updateSnakeCanvas,20);
}
clearCanvas(){
     this.context.clearRect(0, 0, this.snakeCanvas.width, this.snakeCanvas.height);
}
updateSnakeCanvas(){
   clearCanvas(); 
   this.snakeCanvas.update();
}

}

 const game = new SnakeGame()