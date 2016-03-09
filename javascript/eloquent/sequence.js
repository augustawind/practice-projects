/*
    var sequence = {
        _sequence: ...,
        next: function () {
            // Move to and return the next element in the sequence.
            ...
        },
        get end () {
            // Return true if the on the last item, else return false.
            ...
        }
    };
*/

function logFive (sequence) {
    for (var i = 0; i < 5; i++) {
        if (sequence.end)
            break
        console.log(sequence.next());
    }
}

function ArraySeq (array) {
    this._sequence = array;
    this._index = 0;
}
ArraySeq.prototype.next = function() {
    return this._sequence[this._index++];
}
Object.defineProperty(ArraySeq.prototype, 'end', {
    get: function () { return this._index === this._sequence.length; }
});

function RangeSeq (start, end) {
    this._sequence = [];
    this._index = 0;

    for (var i = start; i < end; i++) {
        this._sequence.push(i);
    }
}
RangeSeq.prototype = ArraySeq.prototype;

console.log('ArraySeq: ');
logFive(new ArraySeq([1,2,3]));
console.log('\nRangeSeq: ');
logFive(new RangeSeq(100, 1000));
