var GAME_ASPECT_RATIO = 1 / 1.5;
var GAME_WIDTH = 350;

var CAR_ASPECT_RATIO = 0.5;
var CAR_MIN_SIZE = 50;
var CAR_MAX_SIZE = 75;

var carPositions = [12.5, 12.5 + 25 * 1, 12.5 + 25 * 2, 12.5 + 25 * 3]; // Center Positions of 4 lanes

function randomNumber(min, max) {
  var r = Math.random() * (max - min);
  return Math.floor(r + min);
}

class Car {
  constructor(parentElem) {
    this.parentElem = parentElem;
    this.element = document.createElement('div');

    this.height = randomNumber(CAR_MIN_SIZE, CAR_MAX_SIZE);
    this.width = this.height * CAR_ASPECT_RATIO;
    this.positionX = carPositions[randomNumber(0, 4)];
    this.positionY = 5;

    this.heightPercent = (100 * this.height) / (GAME_WIDTH / GAME_ASPECT_RATIO);

    this.setStyles();
    this.direction;
  }

  setStyles() {
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.position = 'absolute';
    this.element.style.transform = 'translate(-50%, 0)';
    this.element.style.display = this.carImage = document.createElement('img');

    this.carImage.setAttribute('src', './images/GreenCar.png');
    this.carImage.style.width = '100%';
    this.carImage.style.height = 'auto';

    // this.draw();

    this.element.appendChild(this.carImage);
    this.parentElem.appendChild(this.element);
  }

  draw() {
    this.element.style.left = this.positionX + '%';
    this.element.style.bottom = this.positionY + '%';
  }

  moveLeft() {
    if (this.positionX > 15) {
      this.positionX -= 25;
    }
  }

  moveRight() {
    if (this.positionX < 85) {
      this.positionX += 25;
    }
  }

  detectCollision(cars) {
    for (let i = 0; i < cars.length; i++) {
      const c = cars[i];
    }
  }
}

//

class EnemyCar extends Car {
  constructor(parentElem) {
    super(parentElem);
    this.speed = randomNumber(5, 10) * 0.1;
    this.positionY = 100;
    this.carImage.setAttribute('src', './images/RedCar.png');

    this.carImage.style.transform = 'scaleY(-1)';
    // this.setLanes();
    this.draw();
  }

  setLanes() {
    if (this.positionX < 50) {
      this.carImage.style.transform = 'scaleY(-1)';
    }
  }

  moveDown() {
    this.positionY -= this.speed;
  }

  outOfTheGame() {
    if (this.positionY <= -1 * this.heightPercent) {
      return true;
    } else return false;
  }

  detectObstacle(cars) {
    var detectionPos = 5;
    var lowestSpeeed = 0.5;

    for (let i = 0; i < cars.length; i++) {
      const c = cars[i];

      if (c.positionX == this.positionX && c.positionY < this.positionY) {
        if (c.positionY + c.heightPercent >= this.positionY - detectionPos) {
          this.speed = lowestSpeeed;
          break;
        }
      }
    }
  }

  // not used
  detectCollision(cars) {
    for (let i = 0; i < cars.length; i++) {
      const c = cars[i];

      if (c.element != this.element) {
        if (
          this.positionX == c.positionX &&
          this.positionY + this.height >= c.positionY &&
          this.positionY <= c.positionY + c.height
          // this.positionX + this.width >= c.positionX &&
          // this.positionX <= c.positionX + c.width
        ) {
          // console.log('detected');
          break;
        }
      }
    }
  }
}
