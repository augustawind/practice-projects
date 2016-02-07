function sum (ns) {
    var result = 0;
    ns.forEach(function (n) {
        result += n;
    });
    return result;
}

function range (start, end, step) {
    var result = [];

    if (end < start) {
        if (step > 0)
            throw "Invalid `step`"
        if (step === undefined)
            step = -1;

        for (var i = start; i >= end; i += step) {
            result.push(i);
        }
    } else {
        if (step < 0)
            throw "Invalid `step`"
        if (step === undefined)
            step = 1;

        for (var i = start; i <= end; i += step) {
            result.push(i);
        }
    }

    return result;
}

/*
console.log(range(1, 10, 2));
console.log(range(10, 1));
console.log(range(10, 1, -2));
console.log(range(1, 10, -2));
*/
