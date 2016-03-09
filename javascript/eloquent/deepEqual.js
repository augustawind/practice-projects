function deepEqual (a, b) {
    if ((typeof a !== 'object' || typeof b !== 'object') ||
                 (typeof a === null || typeof b === null)) {
        if (a === b)
            return true;
        else
            return false;
     }

    for (prop in a) {
        if ((prop in b))
            return deepEqual(a[prop], b[prop]);
        else
            return false;
    }
    for (prop in b) {
        if ((prop in a))
            return deepEqual(b[prop], a[prop]);
        else
            return false;
    }

    return true;
}

//var obj = {here: {is: "an"}, object: 2};
//console.log(deepEqual(obj, obj));
//console.log(deepEqual(obj, {here: 1, object: 2}));
//console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
