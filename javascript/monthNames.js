'use strict';

const month = () => {
    let names = ['January', 'February', 'March', 'April',
                 'May', 'June', 'July', 'August',
                 'September', 'October', 'November', 'December'];
    return {
        name: (number) => names[number],
        number: (name) => names.indexOf(name)
    };
}();

console.log(month.name(2));
// -> March
console.log(month.number('November'));
// -> 10
