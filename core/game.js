G.input = {};

G.textures = {};

G.objects = [];

G.fpsMeter = new FPSMeter();

G.keyboard1 = new G.Keyboard();

G.display = {};

G.updateGameObjectPositions = function () {
  G.objects.forEach(function (object) {
    object.position.x += object.velocityX;
    object.position.y += object.velocityY;
  });
};

G.updateInput = function () {
  if (G.keyboard1.isKeyPressed(G.keys.left)) {
    G.input.x = -1;
  } else if (G.keyboard1.isKeyPressed(G.keys.right)) {
    G.input.x = 1;
  } else {
    G.input.x = 0;
  }

  if (G.keyboard1.isKeyPressed(G.keys.up)) {
    G.input.y = 1;
  } else if (G.keyboard1.isKeyPressed(G.keys.down)) {
    G.input.y = -1;
  } else {
    G.input.y = 0;
  }
};

G.frame = function () {
  var time = new Date().getTime();
  var dt = time - (G.time || time);

  G.time = time;
  G.gameTime += dt;

  G.fpsMeter.tick();

  G.updateInput();

  G.collisions = G.getCollisions(G.objects);
  G.updateGameObjectPositions();
};

G.scaleToRatio = function (object, ratio) {
  object.position.x = object.position.x * ratio;
  object.position.y = object.position.y * ratio;
  object.scale.x = object.scale.x * ratio;
  object.scale.y = object.scale.y * ratio;
};

G._applyRatio = function (object, ratio) {
  if (ratio == 1) return;

  G.scaleToRatio(object, ratio);

  for (var i = 0; i < object.children.length; i++) {
    var child = object.children[i];
    G.scaleToRatio(child, ratio);
  }
};

G.render = function () {
  G._applyRatio(G.stage, G.display.ratio); //scale to screen size
  G.renderer.render(G.stage);
  G._applyRatio(G.stage, 1 / G.display.ratio);
};

G._rescale = function () {
  G.display.ratio = Math.min(window.innerWidth / G.config.width, window.innerHeight /
      G.config.height);
  G.display.width = G.config.width * G.display.ratio;
  G.display.height = G.config.height * G.display.ratio;

  G.renderer.resize(G.display.width, G.display.height);
};

G.createTextures = function () {
  for (var asset in G.assets.textures) {
    var texture = PIXI.Texture.fromImage(G.assets.textures[asset]);

    G.textures[asset] = texture;
  }
};

G.initialize = function () {
  G.stage = new PIXI.Stage();
  G.renderer = PIXI.autoDetectRenderer(G.config.width, G.config.height);

  window.addEventListener('resize', G._rescale, false);

  document.body.appendChild(G.renderer.view);

  G._rescale();

  if (!G.config.showFPS) {
    G.fpsMeter.hide();
  }
};

G.getCollisions = function (objects) {
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
