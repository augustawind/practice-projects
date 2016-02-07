Demystifying Prototypes in JS 
=============================

Almost all objects derive from the prototype `Object.prototype`.

`Object.getPrototypeOf` returns the prototype of an object.

Functions derive from `Function.prototype` and arrays derive from
`Array.prototype`, both of which derive from `Object.prototype`.

This tree-like structure is known as the _prototype chain_.

You can use `Object.create` to create an object with a specific prototype:

    var programmer = { power: average };
    var dustin = Object.create(programmer);

### Constructors

An easier way to create objects from prototypes is to use a _constructor_.
Calling a function with the `new` keyword causes it to be treated as a
constructor.
A constructor has its `this` variable bound to a fresh object.
This object will be returned from the call unless the constructor explicitly
returns something else.

Constructors (all functions, actually) have a property named `prototype` which
by default holds an empty object that derives from `Object.prototype`.

    function Programmer(power) {
        this.power = power;
    }
    var dustin = new Programmer(9000);

    Programmer.prototype.boast = function () {
        console.log("My power level is over " + this.power + "!");
    };
    dustin.boast();
    // -> My power level is over 9000!

When you add a property to an object, it is added to the object itself.
If there is a property by the same name in the prototype, this property will be
overridden.
If the property is deleted, the object will again have access to that property
in its prototype.
This is often used to override the `Object.toString` method.

### Prototype Interference

Sometimes, an object's prototype can get in the way.
The `for..in` loop and the `in` operator check all properties, including
the entire prototype chain.
To check whether the object *itself* has a property, use
`Object.hasOwnProperty`.

A way to prevent properties showing up from an object's prototype in the
`for..in` loop is by setting them as _nonenumerable_.
The `Object.toString` is nonenumerable, so it won't show up in `for..in`.
All properties created by simple assignment are enumerable.
Use `Object.defineProperty` to create nonenumerable properties:

    Object.defineProperty(Object.prototype, "hiddenNonsense",
                            {enumerable: false, value: "hi"});
    for (var attr in dustin)
        console.log(attr);
    // → power
    console.log(dustin.hiddenNonsense);
    // → hi

### Prototype-less Objects

To create an object without a prototype, use `Object.create(null)`.
Then you can safely use `for..in` or the `in` operator without checking for
interference from the object's prototype.

### Getters and Setters

JavaScript allows us to set properties that look like normal properties but
internally have methods associated with them.

    var pile = {
        elements: ["eggshell", "orange peel", "worm"],
        get height() {
            return this.elements.length;
        },
        set height(value) {
            console.log("Ignoring attempt to set height to", value);
        }
    };

    console.log(pile.height);
    // → 3
    pile.height = 100;
    // → Ignoring attempt to set height to 100

This is allows you to define dynamic properties whose values depend on other
properties.

Getters and setters can also be added to existing objects (like prototypes)
using `Object.defineProperty`:

    Object.defineProperty(TextCell.prototype, "heightProp", {
        get: function() { return this.text.length; }
    });

    var cell = new TextCell("no\nway");
    console.log(cell.heightProp);
    // → 2
    cell.heightProp = 100;
    console.log(cell.heightProp);
    // → 2

When a getter but no setter is defined, writing to the property is simply
ignored.

### Inheritance

An object can "inherit" from another object by calling the parent object's
constructor in its own constructor:

    function RTextCell(text) {
        TextCell.call(this, text);
    }

The child object's prototype will inherit all properties and methods from its
parent's prototype.
The child object can then be customized by overwriting some of these
properties on the child's prototype, while keeping the others intact.  

Inheritance can easily create a tangled mess, so try not to use it. A better
way to extend types is through composition, where one object builds on another
by simply storing it in a property and forwarding method calls to its own
methods.

### The Instanceof Operator

The `instanceof` binary operator can be used to determine whether an object was
derived from a specific constructor.

