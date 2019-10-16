var GAME_ASPECT_RATIO = 1 / 1.5;
var GAME_WIDTH = 350;
var FPS = 60;

var CARS_INTERVAL = 1000;

class Game {
  constructor(parentElem) {
    this.parentElem = parentElem;
    this.element = document.createElement('div');
    this.background = new Background(this.element);

    this.gameOver = false;
    this.intervals = [];

    this.setStyles();
    this.createPlayer();
    this.createEnemies();

    this.playerControl();
    this.gameLoop();
  }

  setStyles() {
    this.element.style.display = 'inline-block';
    this.element.style.width = GAME_WIDTH + 'px';
    this.element.style.height = GAME_WIDTH / GAME_ASPECT_RATIO + 'px';
    this.element.style.overflow = 'hidden';

    this.element.style.position = 'relative';
    this.parentElem.appendChild(this.element);
  }

  createPlayer() {
    this.player = new Car(this.element);
    this.player.draw();
  }

  createEnemies() {
    this.enemies = [];

    this.createEnemiesInterval = setInterval(
      function() {
        var car = new EnemyCar(this.element);

        this.enemies.push(car);
      }.bind(this),
      CARS_INTERVAL
    );
  }

  playerControl() {
    document.onkeypress = function(event) {
      // event = event || window.event;
      var pressedKey = event.key;
      if (pressedKey == 'a') {
        this.player.moveLeft();
      } else if (pressedKey == 'd') {
        this.player.moveRight();
      }

      this.player.draw();
    }.bind(this);
  }

  gameLoop() {
    this.gameLoopInterval = setInterval(
      function() {
        this.moveEnemies();
        this.background.move();
        this.afterGameOver();
      }.bind(this),
      1000 / FPS
    );
  }

  afterGameOver() {
    if (this.gameOver) {
      clearInterval(this.gameLoopInterval);
      clearInterval(this.createEnemiesInterval);
      clearInterval(this.background.moveInterval);

      if (this.background.currentScore > localStorage.getItem('high_score')) {
        localStorage.setItem('high_score', this.background.currentScore);
      }

      setTimeout('location.reload(true);', 1000);
      // location.reload(true);
    }
  }

  moveEnemies() {
    // move enemies
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      enemy.moveDown();
      enemy.detectObstacle(this.enemies);
      enemy.draw();

      if (enemy.outOfTheGame()) {
        enemy.element.style.display = 'none';
        this.element.removeChild(enemy.element);
        this.enemies.splice(i, 1);
        this.background.increaseScore(1);
        break;
      }
    }

    // check game Over
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];

      if (
        enemy.positionX == this.player.positionX &&
        enemy.positionY <=
          this.player.positionY +
            (100 * this.player.height) / (GAME_WIDTH / GAME_ASPECT_RATIO) &&
        enemy.positionY + enemy.heightPercent >= this.player.positionY
      ) {
        this.gameOver = true;
      }
    }
  }
}

// Main Game
function mainGame() {
  var mainWrapper = document.querySelector('.main-wrapper');

  var highScore = document.createElement('span');
  highScore.style.color = '#aa0';
  highScore.style.display = 'block';

  var highScoreText = (hc = localStorage.getItem('high_score')) ? hc : 0;
  highScore.innerHTML = 'High Score: ' + highScoreText;

  mainWrapper.appendChild(highScore);

  var playButton = document.createElement('img');
  playButton.setAttribute('src', './images/start-button.png');

  mainWrapper.appendChild(playButton);

  playButton.onclick = function() {
    playButton.style.display = 'none';

    var game = new Game(mainWrapper);
  };
}

mainGame();
