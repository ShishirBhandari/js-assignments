class Foreground {
  constructor(context) {
    this.context = context;
    this.image = new Image();
    this.image.src = './images/foreground.png';

    this.currentPosX = 0;
    this.speed = 2;
  }

  animate(gameWidth) {
    this.currentPosX -= this.speed;
    if (this.currentPosX + gameWidth <= 0) this.currentPosX = 0;
  }

  detectCollision(bird, gameHeight) {
    if (bird.posY + bird.image.height >= gameHeight - this.image.height) {
      return true;
    }
  }

  draw(gameWidth, gameHeight) {
    this.context.drawImage(
      this.image,
      this.currentPosX,
      gameHeight - this.image.height,
      gameWidth,
      this.image.height
    );

    this.context.drawImage(
      this.image,
      this.currentPosX + gameWidth,
      gameHeight - this.image.height,
      gameWidth,
      this.image.height
    );
  }
}
