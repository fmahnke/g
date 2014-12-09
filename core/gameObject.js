g.GameObject = function(textures) {
  PIXI.MovieClip.call(this, textures);

  this._tag = '';
  this._velocityX = 0;
  this._velocityY = 0;

  this.collisionAdjustmentX = 0;
  this.collisionAdjustmentY = 0;
  this.useGravity = true;

  this._animationFrame = 0;
};

g.GameObject.prototype = Object.create(PIXI.MovieClip.prototype);
g.GameObject.prototype.constructor = g.GameObject;

g.GameObject.fromFrames = function(frames, animations)
{
    var textures = [];
 
    for (var i = 0; i < frames.length; i++) {
      textures.push(new PIXI.Texture.fromFrame(frames[i]));
    }
 
    var gameObject = new g.GameObject(textures);
    gameObject._animations = animations;

    return gameObject;
};

Object.defineProperty(g.GameObject.prototype, 'animation', {
  set: function (value) {
    this._animation = this._animations[value];
  }
});

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
  var self = this;

  g.stage.removeChild(self);

  g.objects = g.objects.filter(function (gameObject) {
    return (gameObject !== self);
  });
};

g.GameObject.prototype.updateTransform = function()
{
    PIXI.Sprite.prototype.updateTransform.call(this);
 
    if(!this.playing)return;

    var nextAnimationFrame = this._animationFrame + 1;
    if (nextAnimationFrame >= this._animation.frames.length) {
      this._animationFrame = 0;
    } else {
      this._animationFrame = nextAnimationFrame;
    }

    this.currentFrame = this._animation.frames.indexOf(this._animation.frames[this._animationFrame]);
 
    this.setTexture(this.textures[this.currentFrame]);
};

g.GameObject.create = function (properties, game) {
  var texture;

  if (Object.prototype.toString.call(properties.texture) === '[object Array]') {
    texture = properties.texture;
  } else {
    texture = [game.textures[properties.texture]];
  }

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

  game.add(gameObject);

  return gameObject;
};

g.GameObject.deleteAll = function () {
  g.objects = [];

  if (g.stage.children.length > 0) {
    g.stage.removeChildren(0);
  }
};
