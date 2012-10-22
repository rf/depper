# depper

[![build status](https://secure.travis-ci.org/russfrank/depper.png)](http://travis-ci.org/russfrank/depper)

Depper is a simple dependency resolver. It encodes dependency sets as a boolean
expression which is then solved by 
[backtrack](https://github.com/russfrank/backtrack).

# Example

```javascript

var Depper = require('./depper');
var set = new Depper();

// Register some packages
set.pkg("foo", "1.3", "1.2", "1.1");
set.pkg("bar", "1.3", "1.2", "1.1");
set.pkg("baz", "1.3", "1.2", "1.1");

// Register some dependencies
set.dep("foo@1.3", "bar@1.2");
set.dep("baz@1.3", "bar@1.3");
set.dep("baz@1.2", "bar@1.2");

// Solve the set
var results = set.solve();
// => [ 'foo@1.3', 'bar@1.2', 'baz@1.2' ]

```

# License

MIT.
