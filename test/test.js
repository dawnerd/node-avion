var avion = require('avion')({
  timeout: 1000,
  batchSize: 10
});

for(var i = 0, c = 105; i < c; i++) {
  avion.add('test1', {
    number: i
  });
}

for(var i = 0, c = 100; i < c; i++) {
  avion.add('test2', {
    number: i
  });
}

avion.registerJob('test1', function() {
  console.log('test1', this.number);
});

avion.registerJob('test2', function() {
  console.log('test2', this.number);
});