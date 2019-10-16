var BG_SPEED = 2; // 2, 5
var FPS = 60;

class Background {
  constructor(parentElem) {
    this.parentElem = parentElem;
    this.element = document.createElement('div');

    this.scoreBox = document.createElement('span');
    this.ammoBox = document.createElement('span');
    this.currentScore = 0;
    this.currentBgPos = 0;

    this.setStyles();
    this.move();

    this.increaseScore(0);
  }

  setStyles() {
    this.element.style.width = '100%';
    this.element.style.background = 'url("./images/asphalt.png")';
    // this.element.style.backgroundAttachment = 'fixed';
    this.element.style.backgroundSize = '50%';
    this.element.style.height = '100%';

    this.scoreBox.style.position = 'absolute';
    this.scoreBox.style.color = '#FFD700';
    this.scoreBox.style.fontSize = '28px';
    this.scoreBox.style.left = '5%';
    this.scoreBox.style.zIndex = '10';

    this.ammoBox.style.position = 'absolute';
    this.ammoBox.style.color = '#0ff';
    this.ammoBox.style.fontSize = '20px';
    this.ammoBox.style.right = '5%';
    this.ammoBox.style.bottom = '5%';
    this.ammoBox.style.zIndex = '10';

    this.parentElem.appendChild(this.scoreBox);
    this.parentElem.appendChild(this.ammoBox);

    this.parentElem.appendChild(this.element);
  }

  move() {
    this.element.style.backgroundPositionY =
      // (this.currentBgPos += (BG_SPEED * FPS) / 30) + 'px';
      (this.currentBgPos += BG_SPEED) + '%';
  }

  increaseScore(score) {
    this.currentScore += score;
    this.scoreBox.innerHTML = Math.floor(this.currentScore);
  }

  setAmmo(ammo) {
    this.ammoBox.innerHTML = 'Ammo: ' + Math.floor(ammo);
  }
}
