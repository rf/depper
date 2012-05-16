var _ = require('underscore');
var semver = require('semver');

exports.resolve = function (pkg, version, depends, available, callback) {
  var list = {};
  var output = [];

  // add every package we need into list
  (function queue (pkg) {
    var deps = depends(pkg), avail = available(pkg);
    list[pkg] = {name: pkg, available: avail, depends: deps};
    Object.keys(deps).forEach(queue);
  }(pkg));

  // now we have a list of all of the packages we need. each marks its
  // dependencies and the versions available. this algorithm currently
  // assumes that the dependencies don't change over time.
  
  try {

    (function traverse (pkg, version) {
      Object.keys(pkg.deps).forEach(function (dep) {
        var ver = pkg.deps[dep];

        // now, look through all of the available versions of pkg and see if they
        // satisfy the version requirement

        var satisfactory =_.filter(list[dep].available, function (item) {
          return semver.satisfies(ver, item);
        });

        if (satisfactory.length < 1) {
          throw new Error(
            "no version of package " + dep + 
            " that satisfies version requirement " + ver
          );
        }

        traverse(dep, satisfactory);
      });

      // if we got here, we satisfied all deps
      output.push({name: pkg, version: version});
    }(pkg, version));

  } catch (e) { callback(e); }
};
