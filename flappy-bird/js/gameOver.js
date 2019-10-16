class GameOver {
  constructor(context) {
    this.context = context;
    this.highScore = localStorage.getItem('flappy_bird_high_score')
      ? localStorage.getItem('flappy_bird_high_score')
      : 0;
  }

  setHighScore(score) {
    if (score > localStorage.getItem('flappy_bird_high_score')) {
      this.highScore = score;
      localStorage.setItem('flappy_bird_high_score', this.highScore);
    }
  }

  showHighScore(gameWidth) {
    var scoreFontSize = 20;
    this.context.font = scoreFontSize + 'px Arial';
    this.context.fillStyle = '#fff';
    this.context.fillText(
      'High Score: ' + this.highScore,
      gameWidth / 2 - (scoreFontSize * 7) / 2,
      100
    );
  }
}
