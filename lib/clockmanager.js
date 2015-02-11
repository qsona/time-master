/* global Date:true */
var OrigDate = Date;

var _isBreakingEnabled = false;
var _isBroken = false;
var _delay = 0;
var _freeze = {
  frozen: false,
  time: undefined
};

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
WrappedDate.now = function() {
  if (_freeze.frozen) {
    return _freeze.time;
  }
  return OrigDate.now() + _delay;
};
WrappedDate.parse = OrigDate.parse;
WrappedDate.UTC = OrigDate.UTC;

function _getNoArgDate() {
  if (_freeze.frozen) {
    return new OrigDate(_freeze.time);
  }
  return new OrigDate(OrigDate.now() + _delay);
}

function enableBreaking() {
  _isBreakingEnabled = true;
}
function disableBreaking() {
  _isBreakingEnabled = false;
  if (_isBroken) {
    Date = OrigDate;
    _isBroken = false;
  }
}
function isBreakingEnabled() {
  return _isBreakingEnabled;
}
function overwrite() {
  if (!_isBreakingEnabled) {
    throw new Error('overwriting is not enabled.');
  }
  _isBroken = true;
  Date = WrapperDate;
}

function delay(time) {
  var timeNum = +time;
  if (!Number.isFinite(timeNum)) {
    throw new TypeError('delay: time should be a finite number. ' + time);
  }
  _freeze.frozen = false;
  _delay = timeNum;
}
function getDelay() {
  return _delay;
}

function clear() {
  _freeze.frozen = false;
  _delay = 0;
}

function freeze(time) {
  if (time === undefined) {
    _freeze.frozen = true;
    _freeze.time = OrigDate.now();
  }
}

var clockManager = {
  WrappedDate: WrappedDate,

  enableBreaking: enableBreaking,
  disableBreaking: disableBreaking,
  isBreakingEnabled: isBreakingEnabled,
  overwrite: overwrite,

  //set: set,
  delay: delay,
  getDelay: getDelay,
  clear: clear,
  freeze: freeze
};


module.exports = clockManager;
