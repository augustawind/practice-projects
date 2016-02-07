NOTES for JavaScript: The Good Parts 
====================================

Best practices for writing clean, effective JavaScript 
------------------------------------------------------

### 1. The Good Parts

+ Unlearning bad habits is harder than learning good habits
+ Avoid the bad parts of JS by adhering to a curated subset of the language

#### The Good vs The Bad

+ Good parts
    + Functions
    + Loose typing
    + Dynamic objects
    + Expressive object literal notation
+ Bad parts
    + A programming model based on global variables
    + ...




### 2. Grammar

#### Whitespace

+ Whitespace is usually insignicant
+ Never use block comments, because `/*` and `*/` are sometimes found in
  regular expressions and could cause errors

#### Names

Names can start with a letter or underscore, and can contain letters,
underscores, and digits. Names cannot be the following reserved words:
+ `abstract`
+ `boolean break byte`
+ `case catch char class const continue`
+ `debugger default delete do double`
+ `else enum export extends`
+ `false final finally float for function`
+ `goto`
+ `if implements import in instanceof int interface`
+ `long`
+ `native new null`
+ `package private protected public`
+ `return`
+ `short static super switch synchronized`
+ `this throw throws transient true try typeof`
+ `var volatile void`
+ `while with`

#### Numbers

+ JS has a single number type, a 64-bit floating point number
+ Numbers can have 3 forms
    + integer (`0`, `50`, `-5`) - cannot begin with `0`
    + fraction (`.5`, `0.199`, `-1.07`) - leading `0` not required
    + exponent (`1e2`, `3e-25`, `5E9`)
+ `NaN` is a number value that is the result of an operation that cannot
  produce a normal result
+ `Infinity` represents all numbers greater than `1.79769313486231570e+308`

#### Strings

+ All strings are 16-bit Unicode.
+ Strings are immutable.

#### Equality

*Falsey* values:

+ `false`
+ `null`
+ `undefined`
+ The empty string `''`
+ The number `0`
+ The number `NaN`

All other values are truthy.




### 3. Objects

Use prototypes where possible to reduce object initialization time and memory
consumption.

#### Retrieval (getting a value from an object)

+ Prefer `.` notation for retrieval where possible for readability.
+ `undefined` is produced if an attempt is made to retrieve a nonexistent
  member

+ `||` can be used to fill in default values:
    
    var email = person.email || 'n/a';

+ Attempting to retrieve values from `undefined` will throw a `TypeError`. This
  can be guarded against with the `&&` operator:

    person.children                             // undefined
    person.children.paul                        // throw "TypeError"
    person.children && person.children.paul     // undefined


#### Update

+ A value can be updated by assignment.
+ If the property name already exists, the value is replaced.
+ If it does not exist, the object is augmented with a new property.

#### Reference

Objects are passed around by reference. They are never copied.

#### Prototype

+ Every object is linked to a prototype object from which it can inherit
  properties.
+ Objects created by object literals (`{}`) are linked to `Object.prototype`.
+ The mechanism provided by JavaScript for creating new objects from prototypes
  is messy and complex. We will add a `create` method to the `Object` function:
    
    if (typeof Object.create !== 'function') {
        Object.create = function (o) {
            var F = function () {};
            F.prototype = o;
            return new F();
        };
    }

+ The prototype has no effect on updating. It is used only in retrieval.
+ If we try to retrieve a value from an object and it lacks the given property,
  JavaScript will go up the prototype chain until it finds it, or return
  `undefined`. This is called _delegation_.
+ The prototype relationship is dynamic. If we add a new property to a
  prototype, that property will immediately be visible to all objects that are
  based on that prototype. 

#### Reflection

+ Use `Object.hasOwnProperty` to check if a property belongs to a specific
  object, ignoring its prototype chain.
+ Using `typeof someObject !== 'function'` can be useful as well if you are
  only interested in retrieving data.

#### Enumeration

+ The `for in` statement loops over the property names of an object, including
  functions and prototype properties.
+ There is no guaruntee on the order of property names in the loop.
+ To loop over object properties in a particular order, use `for` with an array
  containing the property names in the correct order:

    var i;
    var properties = [
        'first-name',
        'middle-name',
        'last-name',
        'profession'
    ];
    for (i = 0; i < properties.length; i += 1) {
        document.writeln(properties[i] + ': ' +
        another_stooge[properties[i]]);
    }

#### Delete

+ The `delete` operator removes a property from an object, and ignores its
  prototype chain:

    delete person.email

+ Removing a property from an object may allow a property from its prototype to
  shine through.

#### Global Abatement

+ Minimize the use of global variables by creating a single global variable for
  your application:

    var APP = {};

+ This increases readability and reduces the chance of conflicts with other
  applications or libraries.




### 4. Functions
