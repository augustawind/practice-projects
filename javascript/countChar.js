function countChar (chr, str) {
    var count = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) === chr)
            count++;
    };
    return count;
};

console.log(countChar('B', 'BBC'));
console.log(countChar('k', 'kakkerlak'));
