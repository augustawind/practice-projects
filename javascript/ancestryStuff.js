var ANCESTRY_FILE = require('./ancestry.js');
var ancestry = JSON.parse(ANCESTRY_FILE);

function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
    byName[person.name] = person;
});

function hasKnownMother(person) {
    return person.mother !== null && person.mother in byName;
}

function ageDifference(person) {
    return person.born - byName[person.mother].born;
}

//console.log(
//    average(
//        ancestry.filter(hasKnownMother)
//        .map(ageDifference)
//    ).toFixed(2)
//);

function age (person) {
    return person.died - person.born;
}

//var byCentury = {}
//ancestry.forEach(function(person) {
//    var century = Math.ceil(person.died / 100);
//    if (!(century in byCentury))
//        byCentury[century] = [];
//    byCentury[century].push(age(person));
//});
//for (century in byCentury) {
//    console.log(century + ': ' + average(byCentury[century]).toFixed(1));
//}

function groupBy(array, f) {
    grouped = {}
    array.forEach(function (elem) {
        var key = f(elem);
        if (!grouped[key])
            grouped[key] = [];
        grouped[key].push(elem);
    });
    return grouped;
}

function century(person) {
    return Math.ceil(person.died / 100);
}

console.log(groupBy(ancestry, century));
