g.Event = function () {
  EventEmitter.call(this);
};

g.Event.prototype = Object.create(EventEmitter.prototype);
g.Event.prototype.constructor = g.Event;
