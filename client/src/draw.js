function drawCar(){
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.fillRect(myCar.xPosition, myCar.yPosition, 40, 30);
    ctx.stroke();
  }
  
  class car{
    constructor(color, speed = 8, power = 3, special = 2,x = 0, y = 40){
      this.speed = speed;
      this.power = power;
      this.special = special;
      this.xPosition = x;
      this.yPosition = y;
      this.color = color;
    }
  
    move(){
      if (this.xPosition <= width - 40){
        this.xPosition++;
      }
    }
  }
  
  function loop(){
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, width, height);
    drawCar();
    myCar.move();
}