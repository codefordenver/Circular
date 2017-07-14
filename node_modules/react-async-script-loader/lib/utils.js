'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isDefined = exports.isDefined = function isDefined(val) {
  return val != null;
};
var isFunction = exports.isFunction = function isFunction(val) {
  return typeof val === 'function';
};
var noop = exports.noop = function noop(_) {};

var newScript = exports.newScript = function newScript(src) {
  return function (cb) {
    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', function () {
      return cb(null, src);
    });
    script.addEventListener('error', function () {
      return cb(true, src);
    });
    document.body.appendChild(script);
    return script;
  };
};

var keyIterator = function keyIterator(cols) {
  var keys = Object.keys(cols);
  var i = -1;
  return {
    next: function next() {
      i++; // inc
      if (i >= keys.length) return null;else return keys[i];
    }
  };
};

// tasks should be a collection of thunk
var parallel = exports.parallel = function parallel() {
  for (var _len = arguments.length, tasks = Array(_len), _key = 0; _key < _len; _key++) {
    tasks[_key] = arguments[_key];
  }

  return function (each) {
    return function (cb) {
      var hasError = false;
      var successed = 0;
      var ret = [];
      tasks = tasks.filter(isFunction);

      if (tasks.length <= 0) cb(null);else {
        tasks.forEach(function (task, i) {
          var thunk = task;
          thunk(function (err) {
            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            if (err) hasError = true;else {
              // collect result
              if (args.length <= 1) args = args[0];

              ret[i] = args;
              successed++;
            }

            if (isFunction(each)) each.call(null, err, args, i);

            if (hasError) cb(true);else if (tasks.length === successed) {
              cb(null, ret);
            }
          });
        });
      }
    };
  };
};

// tasks should be a collection of thunk
var series = exports.series = function series() {
  for (var _len3 = arguments.length, tasks = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    tasks[_key3] = arguments[_key3];
  }

  return function (each) {
    return function (cb) {
      tasks = tasks.filter(function (val) {
        return val != null;
      });
      var nextKey = keyIterator(tasks);
      var nextThunk = function nextThunk() {
        var key = nextKey.next();
        var thunk = tasks[key];
        if (Array.isArray(thunk)) thunk = parallel.apply(null, thunk).call(null, each);
        return [+key, thunk]; // convert `key` to number
      };
      var key = void 0,
          thunk = void 0;
      var next = nextThunk();
      key = next[0];
      thunk = next[1];
      if (thunk == null) return cb(null);

      var ret = [];
      var iterator = function iterator() {
        thunk(function (err) {
          for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            args[_key4 - 1] = arguments[_key4];
          }

          if (args.length <= 1) args = args[0];
          if (isFunction(each)) each.call(null, err, args, key);

          if (err) cb(err);else {
            // collect result
            ret.push(args);

            next = nextThunk();
            key = next[0];
            thunk = next[1];
            if (thunk == null) return cb(null, ret); // finished
            else iterator();
          }
        });
      };
      iterator();
    };
  };
};