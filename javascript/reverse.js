function reverseArray (arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        result.unshift(arr[i]);
    }
    return result;
}

function reverseArrayInPlace (arr) {
    var swap;
    for (var i = 0; i < Math.floor(arr.length / 2); i++) {
        swap = arr[i];
        arr[i] = arr[arr.length - 1 - i];
        arr[arr.length - 1 -i] = swap;
    }
}

/*
var arr = [1,2,3,4,5,6,7];
console.log(reverseArray(arr));

reverseArrayInPlace(arr);
console.log(arr);
*/
