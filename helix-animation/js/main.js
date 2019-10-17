class Helix {
  constructor() {
    this.canvas = document.getElementById('helix');
    this.context = this.canvas.getContext('2d');

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.circles = [];

    this.frequency = 1;
    this.initialYPos = 60;
    this.gap = 20;

    this.rows = 10;
    this.columns = 15;

    this.createCircles();
    this.loop();
  }

  createCircles() {
    var currentYPos = this.initialYPos;

    for (let i = 0; i < this.rows; i++) {
      currentYPos += this.gap;

      var currentX = 0;
      var phaseIncrease = 6;
      var currentPhase = 0;
      for (let j = 0; j < this.columns; j++) {
        var circle = new Circle(this.context, false);
        circle.posX = currentX += this.gap;
        circle.posY = currentYPos;

        circle.currentX = currentPhase += phaseIncrease;
        circle.currentY = currentYPos;

        circle.color = '#00f';

        this.circles.push(circle);
        console.log(circle.posY);
      }
    }

    var currentYPos = this.initialYPos;

    for (let i = 0; i < this.rows; i++) {
      currentYPos += this.gap;

      var phaseIncrease = 6;
      var currentPhase = 0;
      var currentX = 0;
      for (let j = 0; j < this.columns; j++) {
        var circle = new Circle(this.context, true);
        circle.posX = currentX += this.gap;
        circle.posY = currentYPos;

        circle.currentX = currentPhase += phaseIncrease;
        circle.currentY = currentYPos;

        circle.color = '#0ff';

        this.circles.push(circle);
        console.log(circle.posY);
      }
    }
  }

  loop() {
    this.context.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.circles.length; i++) {
      var c = this.circles[i];

      c.draw();
      c.oscillate();
    }

    requestAnimationFrame(this.loop.bind(this));
  }
}

var helix = new Helix();
