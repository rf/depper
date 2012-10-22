var backtrack = require('backtrack');
var util = require("util");

// # Depper
// Represents a set of packages that need to be installed
function Depper () {
  var self = this;
  backtrack.Expression.apply(self);
}

util.inherits(Depper, backtrack.Expression);

// ## pkg
// adds a package to the dependency set
Depper.prototype.pkg = function (/* pkg, versions.. */) {
  var self = this;
  var args = Array.prototype.slice.apply(arguments);
  var name = args.shift();
  var versions = args.map(function (item) { 
    return name + "@" + item;
  });

  // Install precisely one version of this package
  self.xor.apply(self, versions);
};

// ## dep
// Declares source to be `dependent` on `dep`
Depper.prototype.dep = function (source, dep) {
  var self = this;
  self.or("-" + source, dep);
};

// ## solve
// Solves the dependency set
Depper.prototype.solve = function () {
  var self = this;
  var results = backtrack.Expression.prototype.solve.apply(self);
  return Object.keys(results).reduce(function (memo, item) { 
    if (results[item]) memo.push(item);
    return memo;
  }, []);
};

module.exports = Depper;
