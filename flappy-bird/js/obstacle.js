class Obstacle {
  constructor(context) {
    this.context = context;

    this.topImage = new Image();
    this.topImage.src = './images/top-obstacle.png';

    this.bottomImage = new Image();
    this.bottomImage.src = './images/bottom-obstacle.png';

    this.width = 52;
    this.height = 320;
    this.gap = 100;

    this.minYPos = -100;
    this.speed = 2;
    this.frames = 0;

    this.position = [];
  }

  draw() {
    for (let i = 0; i < this.position.length; i++) {
      const p = this.position[i];

      var topYPos = p.y;
      var bottomYPos = p.y + this.height + this.gap;

      this.context.drawImage(
        this.topImage,
        0,
        0,
        this.width,
        this.height,
        p.x,
        topYPos,
        this.width,
        this.height
      );

      this.context.drawImage(
        this.bottomImage,
        0,
        0,
        this.width,
        this.height,
        p.x,
        bottomYPos,
        this.width,
        this.height
      );
    }
  }

  update(bird, gameWidth) {
    this.frames = ++this.frames % 100;

    if (this.frames % 100 == 0) {
      this.position.push({
        x: gameWidth,
        y: this.minYPos * (Math.random() + 1)
      });
    }

    for (let i = 0; i < this.position.length; i++) {
      const p = this.position[i];

      var bottomPipeYPos = p.y + this.height + this.gap;

      // detect collision;
      // top pipe
      if (
        bird.posX + bird.width > p.x &&
        bird.posX < p.x + this.width &&
        bird.posY + bird.height > p.y &&
        bird.posY < p.y + this.height
      ) {
        return true;
      }

      // bottom pipe
      if (
        bird.posX + bird.width > p.x &&
        bird.posX < p.x + this.width &&
        bird.posY + bird.height > bottomPipeYPos
        // bird.posY < this.bottomPipeYPos + this.height
      ) {
        return true;
      }

      p.x -= this.speed;
    }
  }

  obstacleCrossed(birdXPos) {
    for (let i = 0; i < this.position.length; i++) {
      const p = this.position[i];

      if (p.x + this.width <= 0) {
        this.position.shift();
        return true;
      }
    }

    return false;
  }
}
