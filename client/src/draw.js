class car{
    constructor(color, speed = 8, power = 3, special = 2, ctx, x = 5, y = 90){
      this.ctx = ctx;
      this.speed = speed;
      this.power = power;
      this.special = special;
      this.xPosition = x;
      this.yPosition = y;
      this.color = color;
    }

    drawMyCar(){
      let x = this.xPosition;
      let y = this.yPosition;

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.moveTo(x,y); // start
      this.ctx.lineTo(x - 5, y+10); // back - top/ middle
      this.ctx.lineTo(x-5, y+25); // back - middle
      this.ctx.lineTo(x, y+25); // back - middle/ bottom
      this.ctx.lineTo(x, y+30); // back - bottom

      this.ctx.lineTo(x + 5, y+30); // bottom to back wheel
      this.ctx.bezierCurveTo(x+5, y+22, x+15, y+22, x+15, y+30); // back wheel
      this.ctx.lineTo(x+25, y+30); // bottom to front wheel
      this.ctx.bezierCurveTo(x+25, y+22, x+35, y+22, x+35, y+30); // front wheel
      this.ctx.lineTo(x+40, y+30); // bottom to front

      this.ctx.lineTo(x+40, y+25); // front - bottom
      this.ctx.lineTo(x + 45, y+25); // front - bottom/ middle
      this.ctx.lineTo(x+45, y+15); // front - middle
      this.ctx.lineTo(x + 35, y); // front - top
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.strokeStyle = 'green';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.restore();
      this.drawWheel(x, y);
    }

    drawWheel(x, y){
      this.ctx.save();
      this.ctx.fillStyle = this.color;
      this.ctx.arc(x + 10, y+30, 5, 0, 2 * Math.PI, false); // back wheel
      this.ctx.moveTo(x+30, y+30);
      this.ctx.arc(x + 30, y+30, 5, 0, 2 * Math.PI, false); // front wheel
      this.ctx.fill();
      this.ctx.restore();
    }
  
    move(){
      if (this.xPosition <= width - 45){
        this.xPosition++;
      }
    }
  }
  
  function loop(){
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, width, height);
    for (let car of currentCars){
      car.drawMyCar();
      car.move();
    }
}