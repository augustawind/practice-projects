// Functions as namespaces
// ---------------------------------------------------

// ### Solution #1
// Prevent the `names` variable from spilling into the global scope
var dayName = function() {
    var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                 'Thursday', 'Friday', 'Saturday'];
    return function(number) {
        return names[number];
    };
}();

console.log(dayName(3)); // -> Wednesday


// ### Solution #2
// Isolate code from the outside world entirely
//
// Parenthesis are required to force the function to be interpreted as an
// expression so that it can be called on the fly.
(function() {
    function square(x) { return x * x }
    var hundred = 100;

    console.log(square(hundred));
})(); // -> 10000


// ### Solution #3
// Export multiple functions by wrapping them in an object
//
// This can be awkward for bigger modules since you'd likely prefer to
// keep exported functions near related, internal code.
var weekDay = function() {
    var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                 'Thursday', 'Friday', 'Saturday'];
    return {
        name: function(number) { return names[number]; },
        number: function(name) { return names.indexOf(name); }
    };
}();

console.log(weekDay.name(weekDay.number('Sunday'))); // -> Sunday


// ### Solution #4
// Export multiple functions by declaring an object (conventionally 
// named `exports`) and adding properties to it whenever we are defining
// something that needs to be exported.
//
// This scales well with bigger modules since exported functions can be
// declared anywhere as long as they are defined as properties of the
// `exports` object.
// However, this still causes problems if multiple modules happen to claim
// the same name or if you want to load two versions of the module.
(function(exports) {
    var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                 'Thursday', 'Friday', 'Saturday'];

    exports.name = function(number) {
        return names[number];
    };
    exports.number = function(name) {
        return names.indexOf(name);
    };
})(this.weekDay = {});


// ### Solution #5
// Function `require` that loads a module's file and returns the
// appropriate interface value.
//
// This solves the previous problems and makes your programs dependencies
// explicit with each call to `require`.
// Issues with this strategy:
//   1) It will load a module every time it is required
//   2) It is not possible for a module to directly export a value other
//      than the `exports` object, such as a function
function require(name) {
    var code = new Function('exports, module', readFile(name));
    var exports = {};
    code(exports);

    return exports;
}

var weekDay = require('weekDay');
console.log(weekDay.name(1)); // -> Monday

// This removes a lot of clutter from our example module:
// 
var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
             'Thursday', 'Friday', 'Saturday'];

exports.name = function(number) {
    return names[number];
};
exports.number = function(name) {
    return names.indexOf(name);
};

// ### Solution #6
// Using `require`, provide modules with another variable, `module`,
// which is an object that has a property `exports`. This property 
// initially points to the empty object created by `require` but can be
// overwritten with another value, such as a function.
//
// This style of module system is called _CommonJS modules_.
function require(name) {
    if (name in require.cache)
        return require.cache[name]

    var code = new Function('exports, module', readFile(name));
    var exports = {}, module = {exports: exports};
    code(exports, module);

    require.cache[name] = module.exports;
    return module.exports;
}
require.cache = Object.create(null);
