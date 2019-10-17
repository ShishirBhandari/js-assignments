class Circle {
  constructor(context, isOutOfPhase) {
    this.context = context;
    this.radius = 10;
    this.radiusAmp = 10;

    this.amplitude = 50;

    this.posX = 100;
    this.posY = 100;

    this.currentX = 0;
    this.currentY = 100;
    this.color = '#aa0';

    this.phase = isOutOfPhase ? Math.PI : 0;
    this.speed = 2;
    this.frames = 0;
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    this.context.closePath();
    this.context.fill();
  }

  oscillate() {
    this.currentX = ++this.currentX % 180;

    this.posY =
      this.amplitude *
        Math.sin((this.speed * (this.currentX * Math.PI)) / 180 + this.phase) +
      this.currentY;

    this.radius =
      (this.radiusAmp / 2) *
        Math.cos((this.speed * this.currentX * Math.PI) / 180 + this.phase) +
      this.radiusAmp / 2;

    this.frames++;

    // if (this.frames % 10 == 0) {
    //   var colorR = this.posY / 2;

    //   if (colorR > 255) colorR = 255;

    //   colorR = this.toHex(colorR);

    //   this.color = '#' + colorR + 'aa00';
    // }
  }

  toHex(number) {
    var hex = Number(number).toString(16);
    if (hex.length <= 1) hex = '0' + hex;

    return hex;
  }
}
