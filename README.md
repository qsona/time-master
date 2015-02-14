Configure (delay or freeze) JavaScript's clock

Currently, it only supports Node.js. Any pull requests are welcomed.

## usage

### Browser
Coming soon

### Node.js

```
var clockManager = require('clockmanager.js');
```

## Documentation

### clockManager.WrappedDate
Results of `WrappedDate.now()` and `new WrappedDate()` are different from ones of `Date` if the clockManager is configured (delayed or frozen). Except for those, `WrappedDate` is same as `Date`.

```
var WrappedDate = clockManager.WrappedDate;

clockManager.freeze(1500000000000);
WrappedDate.now(); // 1500000000000
new WrappedDate().getTime(); // 1500000000000

// perform as Date in following cases
new WrappedDate('2038/1/19 03:14:07');
new WrappedDate(2038, 0, 19);
WrappedDate.UTC();
WrappedDate.parse();
```

Warning: `Date()` (without `new`) returns a string but `WrappedDate()` returns a Date object. It is due to a technical reason. `Date()` should not be used in my personal opinion, anyway it is the only incompatibility.

### clockManager.delay

### clockManager.getDelay

### clockManager.freeze

### clockManager.isFrozen

### clockManager.clear
Clear settings (delay/freeze) of clockManager.

### clockManager.expose
expose `WrapperDate` to global Date. It is dangerous so it should not be used in a production environment.

```
clockManager.expose();
Date === clockManager.WrapperDate; // true
```

### clockManager.isExposed

### clockManager.unexpose

## License

MIT
