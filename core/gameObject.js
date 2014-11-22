g.GameObject = function(texture) {
  PIXI.Sprite.call(this, texture);

  this._tag = '';
  this._velocityX = 0;
  this._velocityY = 0;

  this.collisionAdjustmentX = 0;
  this.collisionAdjustmentY = 0;
  this.useGravity = true;
};

g.GameObject.prototype = Object.create(PIXI.Sprite.prototype);
g.GameObject.prototype.constructor = g.GameObject;

Object.defineProperty(g.GameObject.prototype, 'tag', {
  get: function () {
    return this._tag;
  },
  set: function (value) {
    this._tag = value;
  }
});

Object.defineProperty(g.GameObject.prototype, 'velocityX', {
  get: function () {
    return this._velocityX;
  },
  set: function (value) {
    this._velocityX = value;
  }
});

Object.defineProperty(g.GameObject.prototype, 'velocityY', {
  get: function () {
    return this._velocityY;
  },
  set: function (value) {
    this._velocityY = value;
  }
});

g.GameObject.prototype.remove = function () {
  g.stage.removeChild(this);

  g.objects = g.objects.filter(function (gameObject) {
    return (gameObject !== this);
  });
};

g.GameObject.create = function (properties) {
  var texture = g.textures[properties.texture];
  var gameObject = new g.GameObject(texture);

  if (properties.position) {
    if (properties.position.x) {
      gameObject.position.x = properties.position.x;
    }
    if (properties.position.y) {
      gameObject.position.y = properties.position.y;
    }
  }

  if (properties.scale) {
    if (properties.scale.x) {
      gameObject.scale.x = properties.scale.x;
    }
    if (properties.scale.y) {
      gameObject.scale.y = properties.scale.y;
    }
  }

  if (properties.anchor) {
    if (properties.anchor.x) {
      gameObject.anchor.x = properties.anchor.x;
    }
    if (properties.anchor.y) {
      gameObject.anchor.y = properties.anchor.y;
    }
  }

  if (properties.velocityX) {
      gameObject.velocityX = properties.velocityY;
  }
  if (properties.velocityY) {
      gameObject.velocityY = properties.velocityY;
  }

  if (properties.tag) {
      gameObject.tag = properties.tag;
  }

  g.stage.addChild(gameObject);
  g.objects.push(gameObject);

  return gameObject;
};

g.GameObject.deleteAll = function () {
  g.objects = [];

  if (g.stage.children.length > 0) {
    g.stage.removeChildren(0);
  }
};
