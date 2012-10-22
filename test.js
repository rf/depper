var assert = require('assert');
var Depper = require('./depper');

suite('solve', function () {
  test('1', function () {

    var set = new Depper();
    set.pkg("foo", "1.3", "1.2", "1.1");
    set.pkg("bar", "1.3", "1.2", "1.1");
    set.pkg("baz", "1.3", "1.2", "1.1");

    set.dep("foo@1.3", "bar@1.2");
    set.dep("baz@1.3", "bar@1.3");
    set.dep("baz@1.2", "bar@1.2");

    var results = set.solve();

    assert(results.indexOf("foo@1.3") !== -1);
    assert(results.indexOf("baz@1.2") !== -1);
    assert(results.indexOf("bar@1.2") !== -1);
  });

  test('2', function () {

    var set = new Depper();
    set.pkg("foo", "1.3", "1.2", "1.1");
    set.pkg("bar", "1.3", "1.2", "1.1");
    set.pkg("baz", "1.3", "1.2", "1.1");

    set.dep("foo@1.3", "bar@1.2");
    set.dep("baz@1.3", "bar@1.3");
    set.dep("baz@1.2", "bar@1.3");

    var results = set.solve();

    assert(results.indexOf("foo@1.3") !== -1);
    assert(results.indexOf("baz@1.1") !== -1);
    assert(results.indexOf("bar@1.2") !== -1);
  });
});
