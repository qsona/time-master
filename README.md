Configure (forward, rewind or freeze) JavaScript's clock

Currently, it only supports Node.js. Any pull requests are welcome.

## usage

### Browser
Coming soon

### Node.js

```
var TimeMaster = require('time-master');
```

## Documentation

### TimeMaster.WrappedDate
Results of `WrappedDate.now()` and `new WrappedDate()` are different from ones of `Date` if the TimeMaster is configured (forwarded or frozen). Except for those, `WrappedDate` is same as `Date`.

```
var WrappedDate = TimeMaster.WrappedDate;

TimeMaster.freeze(1500000000000);
WrappedDate.now(); // 1500000000000
new WrappedDate().getTime(); // 1500000000000

// perform as Date in following cases
new WrappedDate('2038/1/19 03:14:07');
new WrappedDate(2038, 0, 19);
WrappedDate.UTC();
WrappedDate.parse();
```

Warning: `Date()` (without `new`) returns a string but `WrappedDate()` returns a Date object. It is due to a technical reason. `Date()` should not be used in my personal opinion, anyway it is the only incompatibility.

### TimeMaster.forward

### TimeMaster.getLag

### TimeMaster.freeze

### TimeMaster.isFrozen

### TimeMaster.clear
Clear settings (forward/rewind/freeze) of TimeMaster.

### TimeMaster.overwrite
overwrite global `Date` with `WrappedDate`. It is dangerous so it should not be used in a production environment.

```
TimeMaster.overwrite();
Date === TimeMaster.WrappedDate; // true
```

### TimeMaster.isOverwritten

### TimeMaster.cancelOverwriting

## License

MIT
