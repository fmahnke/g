g.Game = function () {
  this.textures = {};
  this.objects = [];

  this.input = {};

  this.keyboardEvent = new g.Event();
  this.keyboard1 = new g.Keyboard(g.keyboardEvent);

  this.display = {};

  this.time = 0; // time since epoch
  this.gameTime = 0; // time since game began

  this.config = {
    showFPS: false
  };

  this.fpsMeter = new FPSMeter();
  this.log = new g.Log();
};

g.Game.prototype.constructor = g.Game;

g.Game.prototype.updateGameObjectPositions = function () {
  g.objects.forEach(function (object) {
    object.position.x += object.velocityX;
    object.position.y += object.velocityY;
  });
};

g.Game.prototype.updateInput = function () {
  if (g.keyboard1.isKeyPressed(g.keys.left)) {
    g.input.x = -1;
  } else if (g.keyboard1.isKeyPressed(g.keys.right)) {
    g.input.x = 1;
  } else {
    g.input.x = 0;
  }

  if (g.keyboard1.isKeyPressed(g.keys.up)) {
    g.input.y = 1;
  } else if (g.keyboard1.isKeyPressed(g.keys.down)) {
    g.input.y = -1;
  } else {
    g.input.y = 0;
  }
};

g.Game.prototype.frame = function () {
  var time = new Date().getTime();
  var dt = time - (g.time || time);

  g.time = time;
  g.gameTime += dt;

  g.fpsMeter.tick();

  g.updateInput();

  g.collisions = g.getCollisions(g.objects);
  g.updateGameObjectPositions();
};

g.Game.prototype.scaleToRatio = function (object, ratio) {
  object.position.x = object.position.x * ratio;
  object.position.y = object.position.y * ratio;
  object.scale.x = object.scale.x * ratio;
  object.scale.y = object.scale.y * ratio;
};

g.Game.prototype._applyRatio = function (object, ratio) {
  if (ratio == 1) return;

  this.scaleToRatio(object, ratio);

  for (var i = 0; i < object.children.length; i++) {
    var child = object.children[i];
    this.scaleToRatio(child, ratio);
  }
};

g.Game.prototype.render = function () {
  this._applyRatio(this.stage, this.display.ratio); //scale to screen size
  this.renderer.render(this.stage);
  this._applyRatio(this.stage, 1 / this.display.ratio);
};

g.Game.prototype._rescale = function () {
  this.display.ratio = Math.min(window.innerWidth / this.config.width, window.innerHeight /
      this.config.height);
  this.display.width = this.config.width * this.display.ratio;
  this.display.height = this.config.height * this.display.ratio;

  this.renderer.resize(this.display.width, this.display.height);
};

g.Game.prototype.createTextures = function () {
  for (var asset in this.assets.textures) {
    var texture = PIXI.Texture.fromImage(this.assets.textures[asset]);

    this.textures[asset] = texture;
  }
};

g.Game.prototype.initialize = function () {
  this.stage = new PIXI.Stage();
  this.renderer = PIXI.autoDetectRenderer(this.config.width, this.config.height);

  window.addEventListener('resize', this._rescale, false);

  document.body.appendChild(this.renderer.view);

  this._rescale();

  if (!this.config.showFPS) {
    this.fpsMeter.hide();
  }
};

g.Game.prototype.add = function (gameObject) {
  this.stage.addChild(gameObject);
  this.objects.push(gameObject);
};

// This method returns each collision pair TWICE.
// TODO: Report only one pair per collision.
g.Game.prototype.getCollisions = function (objects) {
  var collisions = [];

  objects.forEach(function (object1) {
    objects.forEach(function (object2) {
      if (object1 === object2) {
        return;
      }

      var object1nextX = object1.getBounds().x + object1.velocityX;
      var object1nextY = object1.getBounds().y + object1.velocityY;
      var object2nextX = object2.getBounds().x + object2.velocityX;
      var object2nextY = object2.getBounds().y + object2.velocityY;

      if (object1nextX < object2nextX + object2.getBounds().width &&
            object1nextX + object1.getBounds().width > object2nextX &&
            object1nextY < object2nextY + object2.getBounds().height &&
            object1.getBounds().height + object1nextY > object2nextY) {

        if (collisions.indexOf([object1, object2] === -1) &&
            collisions.indexOf([object2, object1] === -1)) {
              collisions.push([object1, object2]);
        }
      }
    });
  });

  return collisions;
};
