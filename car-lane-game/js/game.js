var GAME_ASPECT_RATIO = 1 / 1.5;
var GAME_WIDTH = 350;
var FPS = 30;

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

    this.moveEnemies();
    this.playerControl();
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

    var createEnemies = setInterval(
      function() {
        var car = new EnemyCar(this.element);

        this.enemies.push(car);
      }.bind(this),
      CARS_INTERVAL
    );

    this.intervals.push(createEnemies);
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

    var playerControl = setInterval(
      function() {
        if (this.gameOver) {
          for (let i = 0; i < this.intervals.length; i++) {
            const element = this.intervals[i];

            clearInterval(element);
            clearInterval(this.background.moveInterval);
          }

          if (
            this.background.currentScore > localStorage.getItem('high_score')
          ) {
            localStorage.setItem('high_score', this.background.currentScore);
          }

          setTimeout('location.reload(true);', 1000);
          // location.reload(true);
        }
      }.bind(this),
      1000 / FPS
    );

    this.intervals.push(playerControl);
  }

  moveEnemies() {
    var moveEnemies = setInterval(
      function() {
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
      }.bind(this),
      1000 / FPS
    );

    this.intervals.push(moveEnemies);

    var checkGameOver = setInterval(
      function() {
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
      }.bind(this),
      1000 / FPS
    );

    this.intervals.push(checkGameOver);
  }
}

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
    console.log(game);
  };
}

mainGame();
