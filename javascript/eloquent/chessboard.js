function chessboard (size) {
    var board = '';

    for (var y = 1; y <= size; y++) {
        for (var x = 1; x <= size; x++) {
            if (y % 2)
                board += (x % 2) ? '#' : ' ';
            else
                board += (x % 2) ? ' ' : '#';
        };
        board += '\n';
    };

    return board;
};

console.log(chessboard(8));
