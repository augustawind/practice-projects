var box = {
    locked: true,
    unlock: function() { this.locked = false; },
    lock: function() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error('Locked!');
        return this._content;
    }
};

function withBoxUnlocked(body) {
    try {
        box.unlock();
        body();
    } catch (e) {
        return null;
    } finally {
        box.lock();
    }
}

withBoxUnlocked(function () {
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(function() {
        throw new Error("PIRATES!");
    })
} catch (e) {
    console.log("Error raised:", e);
}
console.log(box.locked);
