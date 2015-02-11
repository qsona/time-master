var clockManager = require('./lib/clockmanager');
var WrappedDate = clockManager.WrappedDate;
console.log(new WrappedDate().getTime());
console.log(new WrappedDate());
console.log(new WrappedDate(2014, 3, 4));
//clockManager.freeze();


console.log(new WrappedDate());
clockManager.delay(10000000000);
setTimeout(function() {
  console.log(new WrappedDate());
}, 1000);
