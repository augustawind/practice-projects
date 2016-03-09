function flatten (array) {
    return array.reduce(function (a, b) {
        return a.concat(b);
    });
};

//console.log(flatten([[1,2],[3,4]]));
