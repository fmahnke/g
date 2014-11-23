g.input = {};

g.textures = {};

g.objects = [];

g.fpsMeter = new FPSMeter();

g.log = new g.Log();

g.keyboard1 = new g.Keyboard();

g.display = {};

g.updateGameObjectPositions = function () {
  g.objects.forEach(function (object) {
    object.position.x += object.velocityX;
    object.position.y += object.velocityY;
  });
};

g.updateInput = function () {
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

g.frame = function () {
  var time = new Date().getTime();
  var dt = time - (g.time || time);

  g.time = time;
  g.gameTime += dt;

  g.fpsMeter.tick();

  g.updateInput();

  g.collisions = g.getCollisions(g.objects);
  g.updateGameObjectPositions();
};

g.scaleToRatio = function (object, ratio) {
  object.position.x = object.position.x * ratio;
  object.position.y = object.position.y * ratio;
  object.scale.x = object.scale.x * ratio;
  object.scale.y = object.scale.y * ratio;
};

g._applyRatio = function (object, ratio) {
  if (ratio == 1) return;

  g.scaleToRatio(object, ratio);

  for (var i = 0; i < object.children.length; i++) {
    var child = object.children[i];
    g.scaleToRatio(child, ratio);
  }
};

g.render = function () {
  g._applyRatio(g.stage, g.display.ratio); //scale to screen size
  g.renderer.render(g.stage);
  g._applyRatio(g.stage, 1 / g.display.ratio);
};

g._rescale = function () {
  g.display.ratio = Math.min(window.innerWidth / g.config.width, window.innerHeight /
      g.config.height);
  g.display.width = g.config.width * g.display.ratio;
  g.display.height = g.config.height * g.display.ratio;

  g.renderer.resize(g.display.width, g.display.height);
};

g.createTextures = function () {
  for (var asset in g.assets.textures) {
    var texture = PIXI.Texture.fromImage(g.assets.textures[asset]);

    g.textures[asset] = texture;
  }
};

g.initialize = function () {
  g.stage = new PIXI.Stage();
  g.renderer = PIXI.autoDetectRenderer(g.config.width, g.config.height);

  window.addEventListener('resize', g._rescale, false);

  document.body.appendChild(g.renderer.view);

  g._rescale();

  if (!g.config.showFPS) {
    g.fpsMeter.hide();
  }
};

g.getCollisions = function (objects) {
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
