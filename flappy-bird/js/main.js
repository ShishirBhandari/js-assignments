// main class
class main {
  constructor(numberOfGames) {
    this.element = document.getElementsByClassName('main-wrapper')[0];

    this.gameInstances = [];
    this.createGames(numberOfGames);
  }

  createGames(numberOfGames) {
    // for (let i = 0; i < numberOfGames; i++) {
    //   var game = new Game(this.element, ' ');
    //   this.gameInstances.push(game);
    // }

    var game1 = new Game(this.element, ' ');

    var game2 = new Game(this.element, 'ArrowUp');

    // var game2 = new Gamepad(this.element, 'b');
  }
}

main = new main(3);
