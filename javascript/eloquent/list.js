function arrayToList (array) {
    var list = {};

    list.value = array[0];

    if (array.length > 1)
        list.rest = arrayToList(array.slice(1));
    else
        list.rest = null;

    return list;
}

function listToArray (list) {
    var array = [];
    
    while (true) {
        array.push(list.value);
        if (list.rest === null)
            break
        list = list.rest;
    }

    return array;
}

function prepend (element, list) {
    return { value: element, rest: list };
}

function nth (list, n) {
    if (n === 0)
        return list.value;
    else if (list.rest === null)
        throw "Error: index not in list"
    else
        return nth(list.rest, n - 1);
}


/*
array = [1,2,3,4,5];
list = arrayToList(array);
console.log(list);

console.log(prepend(0, list));

console.log(nth(list, 0));
console.log(nth(list, 1));
console.log(nth(list, 2));
console.log(nth(list, 9));
*/
