g.Storage = function (rootKey) {
  this._rootKey = rootKey;
};

g.Storage.prototype.constructor = g.Storage;

g.Storage.prototype.save = function (key, value) {
  localStorage.setItem('g_' + this._rootKey + '_' + key, JSON.stringify(value));
};

g.Storage.prototype.load = function (key) {
  return JSON.parse(localStorage.getItem('g_' + this._rootKey + '_' + key));
};

g.Storage.prototype.remove = function (key) {
  localStorage.removeItem('g_' + this._rootKey + '_' + key);
};

g.Storage.get = function (name) {
  return new g.Storage(name);
};
