G.Keyboard = function () {
  this._keyStates = {};

  var self = this;

  for (var code in G.Keyboard.prototype.keyCodeEnum) {
    this._keyStates[code] = G.Keyboard.prototype.keyStateEnum.up;
  }

  document.addEventListener('keydown', function (event) {
    var code = event.keyCode;

    for (var keyCodeEnum in G.Keyboard.prototype.keyCodeEnum) {
      if (code === G.Keyboard.prototype.keyCodeEnum[keyCodeEnum]) {
        self._keyStates[keyCodeEnum] = G.Keyboard.prototype.keyStateEnum.down;
      }
    }
  });

  document.addEventListener('keyup', function (event) {
    var code = event.keyCode;

    for (var keyCodeEnum in G.Keyboard.prototype.keyCodeEnum) {
      if (code === G.Keyboard.prototype.keyCodeEnum[keyCodeEnum]) {
        self._keyStates[keyCodeEnum] = G.Keyboard.prototype.keyStateEnum.up;
      }
    }
  });
};

G.keys = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down'
};

G.Keyboard.prototype.constructor = G.Keyboard;

G.Keyboard.prototype.keyCodeEnum = {
  left: 37,
  right: 39,
  up: 38,
  down: 40
};

G.Keyboard.prototype.keyStateEnum = {
  up: 0,
  down: 1
};

G.Keyboard.prototype.isKeyPressed = function (keyCodeEnum) {
  if (this._keyStates[keyCodeEnum] === this.keyStateEnum.down) {
    return true;
  } else {
    return false;
  }
};
