class Bird {
  constructor(context) {
    this.context = context;
    this.image = new Image();
    this.image.src = './images/bird.png';

    this.posX = 50;
    this.posY = 200;

    this.width = 34;
    this.height = 24;
    this.collisionRadius = 24;

    this.xOffset = 0;
    this.frames = 0;

    this.speed = 1;
    this.moveUpPosition = 0;
    this.moveUpFlag = -1;

    this.oscillationRange = 10;
    this.oscillationDirection = -1;
    this.currentOscillation = 0;
  }

  oscillate() {
    if (this.oscillationDirection >= 0) {
      this.currentOscillation++;
      this.posY += 1;
      if (this.currentOscillation >= this.oscillationRange) {
        this.oscillationDirection = -1;
      }
    } else {
      this.currentOscillation--;
      this.posY -= 1;
      if (this.currentOscillation <= -this.oscillationRange) {
        this.oscillationDirection = 1;
      }
    }
  }

  useGravity(g) {
    if (this.moveUpFlag == 1) {
      this.moveUpPosition -= 4;
      this.speed = -4;
      g = 0;

      var jumpPos = 50;

      if (this.moveUpPosition <= -jumpPos) {
        this.moveUpPosition = 0;
        this.speed = 2;
        this.moveUpFlag = -1;
      }
    }

    this.speed += 0.01 * g;
    this.posY += this.speed;
  }

  moveUp() {
    this.moveUpFlag = 1;
    this.moveUpPosition = 0;
    // this.speed = 0;
    // this.posY -= 40;
  }

  draw() {
    this.context.drawImage(
      this.image,
      this.xOffset,
      0,
      this.width,
      this.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  animate() {
    this.frames = ++this.frames % 60;

    if (this.frames % 10 == 0) this.xOffset = (this.xOffset + 56) % (56 * 3);
  }
}
