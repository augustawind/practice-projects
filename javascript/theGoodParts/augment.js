// Safer way to create object methods
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

// Safer method to create objects from prototypes
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}
