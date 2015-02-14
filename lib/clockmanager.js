/* global Date:true */
var OrigDate = Date;

var _exposed = false;
var _delay = 0;
var _freeze = {
  frozen: false,
  time: undefined
};

function _getNoArgDate() {
  if (_freeze.frozen) {
    return new OrigDate(_freeze.time);
  }
  return new OrigDate(OrigDate.now() + _delay);
}

function WrappedDate(a1, a2, a3, a4, a5, a6) {
  var argSize = arguments.length;
  switch (argSize) {
    case 0:  return _getNoArgDate();
    case 1:  return new OrigDate(a1);
    case 2:  return new OrigDate(a1, a2);
    case 3:  return new OrigDate(a1, a2, a3);
    case 4:  return new OrigDate(a1, a2, a3, a4);
    case 5:  return new OrigDate(a1, a2, a3, a4, a5);
    default: return new OrigDate(a1, a2, a3, a4, a5, a6);
  }
}
WrappedDate.prototype = OrigDate.prototype;
Object.defineProperty(WrappedDate, 'now', {
  value: function() {
    if (_freeze.frozen) {
      return _freeze.time;
    }
    return OrigDate.now() + _delay;
  }
});
Object.defineProperty(WrappedDate, 'parse', { value: OrigDate.parse });
Object.defineProperty(WrappedDate, 'UTC', { value: OrigDate.UTC });

function expose() {
  _exposed = true;
  Date = WrappedDate;
}
function isExposed() {
  return _exposed;
}
function unexpose() {
  if (_exposed) {
    _exposed = false;
    Date = OrigDate;
  }
}

function delay(time) {
  var timeNum = +time;
  if (!Number.isFinite(timeNum)) {
    throw new TypeError('delay: time should be a finite number. ' + time);
  }
  unfreeze();
  _delay = timeNum;
}

function getDelay() {
  return _delay;
}

function freeze(time) {
  if (time === undefined) {
    _freeze.frozen = true;
    _freeze.time = OrigDate.now();
    return;
  }
  timeNum = +time;
  if (!Number.isFinite(timeNum)) {
    throw new TypeError('delay: time should be a finite number. ' + time);
  }
  _freeze.frozen = true;
  _freeze.time = time;
}

function isFrozen() {
  return _freeze.frozen;
}

function unfreeze() {
  _freeze.frozen = false;
  _freeze.time = undefined;
}

function clear() {
  unfreeze();
  _delay = 0;
}

var clockManager = {
  WrappedDate: WrappedDate,

  delay: delay,
  getDelay: getDelay,
  freeze: freeze,
  isFrozen: isFrozen,

  clear: clear,

  expose: expose,
  isExposed: isExposed,
  unexpose: unexpose
};

module.exports = clockManager;
