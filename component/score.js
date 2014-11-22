g.Score = function () {
  PIXI.Text.call(this, '', {fill: '#ff0000'});

  this._score = 0;
};

g.Score.prototype = Object.create(PIXI.Text.prototype);
g.Score.prototype.constructor = g.Score;

g.Score.prototype.add = function (addend) {
  this._score += addend;

  this.setText('SCORE:' + ' ' + this._score);
};

g.Score.create = function () {
  var score = new g.Score();

  g.stage.addChild(score);

  return score;
};
