class Background {
  constructor(context) {
    this.context = context;
    this.image = new Image();
    this.image.src = './images/background.png';

    this.currentPosX = 0;
    this.speed = 0.5;
  }

  animate() {
    this.currentPosX -= this.speed;

    if (this.currentPosX <= -this.image.width) {
      this.currentPosX = 0;
    }
  }

  draw() {
    this.context.drawImage(this.image, this.currentPosX, 0);
    this.context.drawImage(this.image, this.currentPosX + this.image.width, 0);
  }
}
