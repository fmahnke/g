g.Keyboard = function (eventEmitter) {
  this._keyStates = {};
  this._eventEmitter = eventEmitter;

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

    self._eventEmitter.emitEvent('keydown', [code]);
  });

  document.addEventListener('keyup', function (event) {
    var code = event.keyCode;

    for (var keyCodeEnum in g.Keyboard.prototype.keyCodeEnum) {
      if (code === g.Keyboard.prototype.keyCodeEnum[keyCodeEnum]) {
        self._keyStates[keyCodeEnum] = g.Keyboard.prototype.keyStateEnum.up;
      }
    }

    self._eventEmitter.emitEvent('keyup', [code]);
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
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  pause: 19,
  capsLock: 20,
  escape: 27,
  space: 32,
  pageUp: 33,
  pageDown: 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  prntScrn: 44,
  insert: 45,
  delete: 46,
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  leftWindow: 91,
  menu: 93,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123,
  numLock: 144,
  scrollLock: 145,
  semicolon: 186,
  equals: 187,
  comma: 188,
  dash: 189,
  period: 190,
  forwardSlash: 191,
  graveAccent: 197,
  openBracket: 219,
  backSlash: 220,
  closeBracket: 221,
  singleQuote: 222
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
