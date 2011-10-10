;!function(context) {

  function avion(options) {
    var config = {
          timeout: 5000,
          batchSize: 10
        },
        jobs = {},
        queue = [],
        timer = null,
        processBatch = function processBatch() {
          for(var i = config.batchSize; i--;) {
            if(queue.length === 0) return false;
            var item = queue[0];
            jobs[item.job].apply(item.data);
            queue.shift();
          }
        },
        setTimer = function() {
          if(timer !== null) return false;
          timer = setInterval(processBatch, config.timeout);
        };

    for(var attrname in options) config[attrname] = options[attrname];
    
    return {
      registerJob: function addJob(name, callback) {
        if(typeof jobs[name] === 'object') {
          throw new Error('This job already exists');
          return false;
        }

        if(typeof callback !== 'function') {
          throw new Error('Callback must be a function');
          return false;
        }

        jobs[name] = callback;
        setTimer();
      },
      add: function add(jobName, data) {
        queue.push({
          job: jobName,
          data: data
        });
        return queue.length;
      }
    }
  }

  var old = context.avion;
  avion.noConflict = function () {
    context.avion = avion;
    return this;
  };

  (typeof module !== 'undefined') && module.exports ?
    (module.exports = avion) :
    (context.avion = avion);
}(this);