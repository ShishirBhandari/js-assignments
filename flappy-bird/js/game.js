class Game {
  constructor(parentElem) {
    this.parentElem = parentElem;
    this.gameWidth = 288;
    this.gameHeight = 512;

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.gravity = 9.81;

    this.reset();

    this.draw();
  }

  reset() {
    this.state = 'MainMenu';

    this.currentScore = 0;

    this.setStyles();
    this.createComponents();

    this.checkInputs();
    this.isSpacePressed = false;
  }

  setStyles() {
    this.canvas.setAttribute('width', this.gameWidth);
    this.canvas.setAttribute('height', this.gameHeight);

    this.parentElem.appendChild(this.canvas);
    console.log(this.canvas);
  }

  createComponents() {
    this.background = new Background(this.context);
    this.foreground = new Foreground(this.context);
    this.bird = new Bird(this.context);

    this.obstacles = new Obstacle(this.context);
  }

  checkInputs() {
    document.onkeydown = function(event) {
      var pressedKey = event.key;

      if (pressedKey == ' ') {
        event.preventDefault();

        if (this.state == 'MainMenu') this.state = 'Playing';
        else if (this.state == 'Playing') {
          this.isSpacePressed = true;
        }
        if (this.state == 'GameOver') {
          this.state = 'MainMenu';
          this.reset();
        }
      } else {
        this.isSpacePressed = false;
      }
    }.bind(this);
  }

  draw() {
    this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);

    switch (this.state) {
      case 'MainMenu':
        this.background.draw();
        this.background.animate();

        this.foreground.draw(this.gameWidth, this.gameHeight);
        this.foreground.animate(this.gameWidth);

        this.bird.oscillate();
        this.bird.draw();

        this.showScore();

        break;

      case 'Playing':
        this.background.draw();
        this.background.animate();

        this.obstacles.draw();

        this.foreground.draw(this.gameWidth, this.gameHeight);
        this.foreground.animate(this.gameWidth);

        this.bird.useGravity(this.gravity);
        this.bird.animate();
        this.bird.draw();

        if (this.isSpacePressed) {
          this.bird.moveUp();
          this.isSpacePressed = false;
        }

        this.showScore();

        this.checkCollision();

        break;

      case 'GameOver':
        this.background.draw();
        this.obstacles.draw();

        this.foreground.draw(this.gameWidth, this.gameHeight);

        this.bird.useGravity(this.gravity);
        this.bird.draw();

        break;
    }

    requestAnimationFrame(this.draw.bind(this));
  }

  checkCollision() {
    if (this.foreground.detectCollision(this.bird, this.gameHeight)) {
      this.state = 'GameOver';
    }

    if (this.obstacles.update(this.bird, this.gameWidth)) {
      this.state = 'GameOver';
    }
  }

  showScore() {
    var scoreFontSize = 50;
    this.context.font = scoreFontSize + 'px Arial';
    this.context.fillStyle = '#fff';
    this.context.fillText(
      this.currentScore,
      this.gameWidth / 2 - scoreFontSize / 2,
      100
    );
  }
}

// main class
class main {
  constructor() {
    this.element = document.getElementsByClassName('main-wrapper')[0];

    this.gameInstances = [];
    this.createGames(1);
  }

  createGames(numberOfGames) {
    for (let i = 0; i < numberOfGames; i++) {
      var game = new Game(this.element);
      this.gameInstances.push(game);
    }
  }
}

main = new main();