G.Score = function () {
  PIXI.Text.call(this, '', {fill: '#ff0000'});

  this._score = 0;
};

G.Score.prototype = Object.create(PIXI.Text.prototype);
G.Score.prototype.constructor = G.Score;

G.Score.prototype.add = function (addend) {
  this._score += addend;

  this.setText('SCORE:' + ' ' + this._score);
};

G.Score.create = function () {
  var score = new G.Score();

  G.stage.addChild(score);

  return score;
};
