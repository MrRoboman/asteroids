function Util() {}

Util.inherits = function (ChildClass, ParentClass) {
  function Surrogate() {}
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
  ChildClass.prototype.constructor = ChildClass;
};

Util.randomVel = function(length) {
  var x = Math.random() * 10 - 5;
  var y = Math.random() * 10 - 5;
  x = Math.random() * 2 - 1;
  y = Math.random() * 2 - 1;
  return [x,y];
};

module.exports = Util;
