g.Log = function () {
  this._log = log.noConflict();
};

g.Log.prototype.constructor = g.Log;

g.Log.prototype.setLevel = function (level) {
  this._log.setLevel(level);
};

g.Log.prototype.trace = function (message) {
  this._log.trace(message);
};

g.Log.prototype.debug = function (message) {
  this._log.debug(message);
};

g.Log.prototype.info = function (message) {
  this._log.info(message);
};

g.Log.prototype.warn = function (message) {
  this._log.warn(message);
};

g.Log.prototype.error = function (message) {
  this._log.debug(message);
};
