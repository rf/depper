var assert = require('assert');
var Depper = require('./depper');

suite('solve', function () {
  test('solve', function () {

    var set = new Depper();
    set.pkg("foo", "1.3", "1.2", "1.1");
    set.pkg("bar", "1.3", "1.2", "1.1");
    set.pkg("baz", "1.3", "1.2", "1.1");

    set.dep("foo@1.1", "bar@1.2");
    set.dep("baz@1.3", "bar@1.3");
    set.dep("baz@1.2", "bar@1.2");

    var results = set.solve();

  });
});
