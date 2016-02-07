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
