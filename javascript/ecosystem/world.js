'use strict';
// Grid
// ----------------------------------------------------------------------------
function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}
Grid.prototype.forEach = function(f, context) {
    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            const value = this.space[x + y * this.width];
            if (value != null)
                f.call(context, value, new Vector(x, y));
        }
    }
};
Grid.prototype.isInside = function(vector) {
    return vector.x >= 0 && vector.x < this.width &&
           vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function(vector) {
    return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
};

// Directions object
// ----------------------------------------------------------------------------

// World
// ----------------------------------------------------------------------------
function World(map, legend) {
    const grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function(line, y) {
        for (let x = 0; x < line.length; x++)
            grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
    });
}
World.prototype.turn = function() {
    const acted = [];
    this.grid.forEach(function(critter, vector) {
        if (critter.act && acted.indexOf(critter) == -1) {
            acted.push(critter);
            this.letAct(critter, vector);
        }
    }, this);
};
World.prototype.letAct = function(critter, vector) {
    const action = critter.act(new View(this, vector));
    if (action && action.type === 'move') {
        const dest = this.checkDestination(action, vector);
        if (dest && this.grid.get(dest) === null) {
            this.grid.set(vector, null);
            this.grid.set(dest, critter);
        }
    }
};
World.prototype.checkDestination = function(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
        const dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(dest))
            return dest;
    }
};
World.prototype.toString = function() {
    let output = '';
    for (let y = 0; y < this.grid.height; y++) {
        for (let x = 0; x < this.grid.width; x++) {
            let element = this.grid.get(new Vector(x, y));
            output += charFromElement(element);
        }
        output += '\n';
    }
    return output;
};
