g.Keyboard = function () {
  this._keyStates = {};

  var self = this;

  for (var code in g.Keyboard.prototype.keyCodeEnum) {
    this._keyStates[code] = g.Keyboard.prototype.keyStateEnum.up;
  }

  document.addEventListener('keydown', function (event) {
    var code = event.keyCode;

    for (var keyCodeEnum in g.Keyboard.prototype.keyCodeEnum) {
      if (code === g.Keyboard.prototype.keyCodeEnum[keyCodeEnum]) {
        self._keyStates[keyCodeEnum] = g.Keyboard.prototype.keyStateEnum.down;
      }
    }
  });

  document.addEventListener('keyup', function (event) {
    var code = event.keyCode;

    for (var keyCodeEnum in g.Keyboard.prototype.keyCodeEnum) {
      if (code === g.Keyboard.prototype.keyCodeEnum[keyCodeEnum]) {
        self._keyStates[keyCodeEnum] = g.Keyboard.prototype.keyStateEnum.up;
      }
    }
  });
};

g.keys = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down'
};

g.Keyboard.prototype.constructor = g.Keyboard;

g.Keyboard.prototype.keyCodeEnum = {
  left: 37,
  right: 39,
  up: 38,
  down: 40
};

g.Keyboard.prototype.keyStateEnum = {
  up: 0,
  down: 1
};

g.Keyboard.prototype.isKeyPressed = function (keyCodeEnum) {
  if (this._keyStates[keyCodeEnum] === this.keyStateEnum.down) {
    return true;
  } else {
    return false;
  }
};
