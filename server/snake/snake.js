class SnakeGame{
//Snake game constructor
constructor(){
this.snakeCanvas = document.getElementById("snakeCanvas");
 this.context =snakeCanvas.getContext("2d");
this.context.fillRect(10,10,50,50);
this.interval = setInterval(this.updateSnakeCanvas.bind(this),20);
}
    //updates snakecanvas
updateSnakeCanvas(){

    //reaches this function just doesn't do either
   this.clearCanvas(); 
    this.snakeCanvas.update();
}
//clears Snake canvas of objects
clearCanvas(){
    //this.snakeCanvas.style.background="blue";
     this.context.clearRect(0, 0, this.snakeCanvas.width, this.snakeCanvas.height);
}

}

 const game = new SnakeGame()