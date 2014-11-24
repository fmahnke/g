g.Text = function (text, style) {
  PIXI.Text.call(this, text, style);

  g.stage.addChild(this);
};

g.Text.prototype = Object.create(PIXI.Text.prototype);
g.Text.prototype.constructor = g.Text;

g.Text.create = function (properties) {
  var text = new g.Text(properties.text, properties.style);

  return text;
};
