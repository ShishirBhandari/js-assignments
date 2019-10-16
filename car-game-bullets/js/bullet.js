var FPS = 30;

class Bullet {
  constructor(parentElem, posX, posY) {
    this.posX = posX;
    this.posY = posY;

    this.parentElem = parentElem;
    this.element = document.createElement('img');

    this.width = 10;
    this.height = 10;
    this.speed;

    this.setStyles();
    this.draw();
    this.move();
  }

  setStyles() {
    this.element.style.backgroundColor = '#b87333'; // copper colour
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';

    this.element.style.borderTopLeftRadius = '50%';
    this.element.style.borderTopRightRadius = '50%';
    this.element.style.position = 'absolute';
    this.element.style.transform = 'translate(-50%, -50%)';

    this.parentElem.appendChild(this.element);
  }

  draw() {
    this.element.style.left = this.posX + '%';
    this.element.style.bottom = this.posY + '%';
  }

  move() {
    this.moveInterval = setInterval(
      function() {
        this.posY += 1;
        //   this.element.style.bottom += 1;
        this.draw();
      }.bind(this),
      1000 / FPS
    );
  }

  detectHit(cars, bullets, background) {
    for (let i = 0; i < cars.length; i++) {
      const c = cars[i];

      if (this.posX == c.positionX && this.posY >= c.positionY) {
        c.element.style.display = 'none';
        this.parentElem.removeChild(c.element);
        cars.splice(i, 1);

        this.element.style.display = 'none';
        this.parentElem.removeChild(this.element);
        bullets.splice(bullets.indexOf(this), 1);

        background.increaseScore(1);
        return true;
      }
    }
  }
}
