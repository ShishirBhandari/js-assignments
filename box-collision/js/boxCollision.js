// Collision detection using circles.

// We can create as many game instances as we like by making
// new instances of the class "Game";

var MIN_RAD = 10;
var MAX_RAD = 20;
var MAX_HEIGHT = 500;
var MAX_WIDTH = 700;
var FPS = 30;
var BALLS_SPEED = 0.5;

var COLORS = ['#a00', '#0a0', '#00a', '#aa0', '#a0a', '#0aa'];

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Circle {
  constructor(parentElem) {
    this.parentElem = parentElem;
    this.element = document.createElement('div');
    this.radius = randomNumber(MIN_RAD, MAX_RAD);
    this.diameter = this.radius * 2;
    this.x = randomNumber(0, MAX_WIDTH - this.diameter);
    this.y = randomNumber(0, MAX_HEIGHT - this.diameter);

    this.center = {
      x: this.x + this.radius,
      y: this.y + this.radius
    };

    this.setDirections();
    this.speed = randomNumber(1, 3) * BALLS_SPEED;
    // this.speed = BALLS_SPEED;
  }

  setDirections() {
    this.direction = { x: randomNumber(-1, 2), y: randomNumber(-1, 2) };
  }

  create() {
    this.element.style.height = this.diameter + 'px';
    this.element.style.width = this.diameter + 'px';
    this.element.style.position = 'absolute';
    this.element.style.borderRadius = '50%';
    this.element.style.opacity = 0.8;
    this.element.style.backgroundColor = COLORS[randomNumber(0, COLORS.length)];

    this.parentElem.appendChild(this.element);
    this.draw();
  }

  // Remove circle when clicked on it
  setOnClick(circles) {
    this.element.onclick = function() {
      this.element.style.display = 'none';
      this.parentElem.removeChild(this.element);

      for (let i = 0; i < circles.length; i++) {
        const c = circles[i];
        if (c.element === this.element) {
          circles.splice(i, 1);
          break;
        }
      }
    }.bind(this);
  }

  draw() {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }

  move() {
    this.x += this.speed * this.direction.x;
    this.y += this.speed * this.direction.y;

    // Control Boundary box
    if (this.x + this.diameter >= MAX_WIDTH) {
      this.direction.x = -1;
    }

    if (this.x <= 0) {
      this.direction.x = 1;
    }

    if (this.y + this.diameter >= MAX_HEIGHT) {
      this.direction.y = -1;
    }

    if (this.y <= 0) {
      this.direction.y = 1;
    }

    this.draw();
  }

  // Collision Detection algorithm
  detectCollision(circles) {
    for (let i = 0; i < circles.length; i++) {
      var c = circles[i];

      if (c.element != this.element) {
        var dx = this.x - c.x;
        var dy = this.y - c.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= this.radius + c.radius) {
          if (dx > 0) {
            this.direction.x = 1;
            c.direction.x = -1;
          } else {
            this.direction.x = -1;
            c.direction.x = 1;
          }

          if (dy > 0) {
            this.direction.y = 1;
            c.direction.y = -1;
          } else {
            this.direction.y = -1;
            c.direction.y = 1;
          }

          break;
        }
      }
    }
  }
}

class Game {
  constructor(parentElem, numberOfCircles) {
    this.parentElem = parentElem;
    this.numberOfCircles = numberOfCircles;
    this.element = document.createElement('div');
    this.parentElem.appendChild(this.element);
    this.width = MAX_WIDTH;
    this.height = MAX_HEIGHT;
    this.circles = [];
    this.setStyles();
    this.createCircles();
    this.moveCircles();
    this.detectCollision();
  }

  setStyles() {
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.position = 'relative';
    this.element.style.display = 'inline-block';
    this.element.style.border = '2px solid lightblue';
    this.element.style.backgroundColor = '#eee';
  }

  createCircles() {
    if ((this.numberOfCircles * MAX_RAD) / 2 >= MAX_HEIGHT + MAX_WIDTH) {
      alert(this.numberOfCircles + ' cannot be contained within the box.');
    }

    for (let i = 0; i < this.numberOfCircles; i++) {
      var circle;

      var isOverlapped = true;
      while (isOverlapped) {
        circle = new Circle(this.element);
        if (!this.checkCircleOverlap(circle)) {
          isOverlapped = false;
        }
      }

      circle.create();
      circle.setOnClick(this.circles);
      this.circles.push(circle);
    }
  }

  moveCircles() {
    setInterval(
      function() {
        for (let i = 0; i < this.circles.length; i++) {
          const circle = this.circles[i];
          circle.move();
        }
      }.bind(this),
      1000 / FPS
    );
  }

  detectCollision() {
    setInterval(
      function() {
        for (let i = 0; i < this.circles.length - 1; i++) {
          const circle = this.circles[i];
          circle.detectCollision(this.circles);
        }
      }.bind(this),
      1000 / FPS
    );
  }

  checkCircleOverlap(currentCircle) {
    for (let i = 0; i < this.circles.length; i++) {
      const circle = this.circles[i];

      var dx = currentCircle.center.x - circle.center.x;
      var dy = currentCircle.center.y - circle.center.y;

      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < currentCircle.radius + circle.radius) {
        return true;
      }
    }

    return false;
  }

  //Not used
  checkOverlap(currentCircle) {
    for (let i = 0; i < this.circles.length; i++) {
      const circle = this.circles[i];

      var dia = circle.diameter;
      var minPosX = circle.x;
      var maxPosX = circle.x + dia;
      var minPosY = circle.y;
      var maxPosY = circle.y + dia;

      if (
        currentCircle.x + currentCircle.diameter > minPosX &&
        currentCircle.x < maxPosX &&
        currentCircle.y + currentCircle.diameter > minPosY &&
        currentCircle.y < maxPosY
      ) {
        return true;
      }
    }
    return false;
  }
}

function mainGame() {
  var box = new Game(document.getElementsByClassName('main-wrapper')[0], 50);

  // var box2 = new Game(document.getElementsByClassName('main-wrapper')[0], 50);
}

mainGame();
