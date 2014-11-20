G.GameObject = function(texture) {
  PIXI.Sprite.call(this, texture);

  this._tag = '';
  this._velocityX = 0;
  this._velocityY = 0;

  this.collisionAdjustmentX = 0;
  this.collisionAdjustmentY = 0;
  this.useGravity = true;
};

G.GameObject.prototype = Object.create(PIXI.Sprite.prototype);
G.GameObject.prototype.constructor = G.GameObject;

Object.defineProperty(G.GameObject.prototype, 'tag', {
  get: function () {
    return this._tag;
  },
  set: function (value) {
    this._tag = value;
  }
});

Object.defineProperty(G.GameObject.prototype, 'velocityX', {
  get: function () {
    return this._velocityX;
  },
  set: function (value) {
    this._velocityX = value;
  }
});

Object.defineProperty(G.GameObject.prototype, 'velocityY', {
  get: function () {
    return this._velocityY;
  },
  set: function (value) {
    this._velocityY = value;
  }
});

G.GameObject.prototype.remove = function () {
  G.stage.removeChild(this);

  G.objects = G.objects.filter(function (gameObject) {
    return (gameObject === this);
  });
};

G.GameObject.create = function (properties) {
  var texture = G.textures[properties.texture];
  var gameObject = new G.GameObject(texture);

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

  G.stage.addChild(gameObject);
  G.objects.push(gameObject);

  return gameObject;
};

G.GameObject.deleteAll = function () {
  G.objects = [];

  if (G.stage.children.length > 0) {
    G.stage.removeChildren(0);
  }
};
