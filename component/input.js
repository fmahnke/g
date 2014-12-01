g.Input = function (position, onchange) {
  this._input = document.createElement('input');
  this._input.type = 'text';

  this._input.onchange = onchange;

  this._div = document.createElement('div');
  this._div.style.position = 'absolute';
  this._div.style.left = position.x + 'px';
  this._div.style.top = position.y + 'px';

  this._div.appendChild(this._input);

  var body = document.body;
  body.insertBefore(this._div, body.childNodes[0]);
};

g.Input.prototype.constructor = g.Input;

g.Input.prototype.remove = function () {
  this._div.parentNode.removeChild(this._div);
};

g.Input.create = function (properties) {
  return new g.Input(properties.position, properties.onchange);
};
