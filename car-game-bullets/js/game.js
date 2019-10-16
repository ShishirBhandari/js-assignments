var GAME_ASPECT_RATIO = 1 / 1.5;
var GAME_WIDTH = 350;
var FPS = 30;

var CARS_INTERVAL = 1000;
var BULLET_FIRE_RATE = 300;

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

    this.ammo = 10;
    this.isFireAllowed = true;
    this.bulletsList = [];
    this.checkBulletHit();
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
      } else if (pressedKey == ' ') {
        if (this.isFireAllowed && this.ammo > 0) {
          this.fireBullet();
          this.isFireAllowed = false;

          setTimeout(
            function() {
              this.isFireAllowed = true;
            }.bind(this),
            BULLET_FIRE_RATE
          );
        }
      }

      this.player.draw();
    }.bind(this);

    document.onkeydown = function(event) {
      var pressedKey = event.key;

      if (pressedKey == ' ') {
        if (this.isFireAllowed && this.ammo > 0) {
          this.fireBullet();
          this.isFireAllowed = false;

          setTimeout(
            function() {
              this.isFireAllowed = true;
            }.bind(this),
            BULLET_FIRE_RATE
          );
        }
      }
    }.bind(this);

    var playerControl = setInterval(
      function() {
        if (this.gameOver) {
          for (let i = 0; i < this.intervals.length; i++) {
            const element = this.intervals[i];

            clearInterval(element);
            clearInterval(this.background.moveInterval);
          }
          setTimeout('location.reload(true);', 1000);
          //   location.reload(true);

          if (
            this.background.currentScore > localStorage.getItem('high_score')
          ) {
            localStorage.setItem('high_score', this.background.currentScore);
          }
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

  fireBullet() {
    var blt = new Bullet(
      this.element,
      this.player.positionX,
      this.player.positionY + 2
    );
    this.bulletsList.push(blt);

    this.ammo -= 1;
    if (this.ammo <= 0) this.ammo = 0;
  }

  checkBulletHit() {
    var bulletHitInterval = setInterval(
      function() {
        for (let i = 0; i < this.bulletsList.length; i++) {
          const blt = this.bulletsList[i];

          if (blt.posY >= 100) {
            this.element.removeChild(blt.element);
            this.bulletsList.splice(i, 1);
            break;
          }

          var isHit = blt.detectHit(
            this.enemies,
            this.bulletsList,
            this.background
          );
          if (isHit) this.ammo++;
        }
        this.background.setAmmo(this.ammo);
      }.bind(this),
      1000 / FPS
    );
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
