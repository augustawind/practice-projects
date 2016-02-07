'use strict';
// Basics
// ----------------------------------------------------------------------------
function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};

const directions = {
    n:  new Vector( 0, -1),
    ne: new Vector( 1, -1),
    e:  new Vector( 1,  0),
    se: new Vector( 1,  1),
    s:  new Vector( 0,  1),
    sw: new Vector(-1,  1),
    w:  new Vector(-1,  0),
    nw: new Vector(-1, -1)
};

const directionNames = 'n ne e se s sw w nw'.split(' ');

function dirPlus(dir, n) {
    const index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function elementFromChar(legend, ch) {
    if (ch === ' ')
        return null;
    const element = new legend[ch]();
    element.originChar = ch;
    return element;
}

function charFromElement(element) {
    return (element === null) ? ' ' : element.originChar;
}

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

// View
// ----------------------------------------------------------------------------
function View(world, vector) {
    this.world = world;
    this.vector = vector;
}
View.prototype.look = function(dir) {
    const target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target))
        return charFromElement(this.world.grid.get(target));
    else
        return '#';
};
View.prototype.findAll = function(ch) {
    const found = [];
    for (let dir in directions)
        if (this.look(dir) === ch)
            found.push(dir);
    return found;
};
View.prototype.find = function(ch) {
    const found = this.findAll(ch);
    if (found.length === 0) return null;
    return randomElement(found);
};

// Entities
// ----------------------------------------------------------------------------
function Wall() {}

function BouncingCritter() {
    this.direction = randomElement(directionNames);
}
BouncingCritter.prototype.act = function(view) {
    if (view.look(this.direction) != ' ')
        this.direction = view.find(' ') || 's';
    return {type: 'move', direction: this.direction};
};

function WallFollower() {
    this.dir = 's';
}
WallFollower.prototype.act = function(view) {
    let start = this.dir;
    if (view.look(dirPlus(this.dir, -3)) != ' ')
        start = this.dir = dirPlus(this.dir, -2);
    while (view.look(this.dir) != ' ') {
        this.dir = dirPlus(this.dir, 1);
        if (this.dir === start) break;
    }
    return {type: 'move', direction: this.dir};
};




// ============================================================================
// ============================================================================
// ============================= Lifelike World ===============================
// ============================================================================
// ============================================================================

// World
// ----------------------------------------------------------------------------
function LifelikeWorld(map, legend) {
    World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);
LifelikeWorld.prototype.letAct = function(critter, vector) {
    const action = critter.act(new View(this, vector));
    const handled = action &&
        action.type in actionTypes &&
        actionTypes[action.type].call(this, critter, vector, action);

    if (!handled) {
        critter.energy -= 0.2;
        if (critter.energy <= 0)
            this.grid.set(vector, null);
    }
};

// Actions
// ----------------------------------------------------------------------------
const actionTypes = Object.create(null);
actionTypes.grow = function(critter) {
    critter.energy += 0.5;
    return true;
};
actionTypes.move = function(critter, vector, action) {
    const dest = this.checkDestination(action, vector);
    if (dest === null ||
        critter.energy <= 1 ||
        this.grid.get(dest) != null)
        return false;
    critter.energy -= 1;
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    return true;
};
actionTypes.eat = function(critter, vector, action) {
    const dest = this.checkDestination(action, vector);
    const atDest = dest !== null && this.grid.get(dest);
    if (!atDest || atDest.energy === null)
        return false;
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
};
actionTypes.reproduce = function(critter, vector, action) {
    const baby = elementFromChar(this.legend, critter.originChar);
    const dest = this.checkDestination(action, vector);
    if (dest === null ||
        critter.energy <= 2 * baby.energy ||
        this.grid.get(dest) !== null)
        return false;
    critter.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    return true;
};

// Entities
// ----------------------------------------------------------------------------
function Plant() {
    this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function(view) {
    if (this.energy > 15) {
        const space = view.find(' ');
        if (space)
            return {type: 'reproduce', direction: space};
    }
    if (this.energy < 20)
        return {type: 'grow'};
};

function Herbivore() {
    this.energy = 20;
}
Herbivore.prototype.act = function(view) {
    const space = view.find(' ');
    if (this.energy > 60 && space)
        return {type: 'reproduce', direction: space};
    const plant = view.find('*');
    if (plant)
        return {type: 'eat', direction: plant};
    if (space)
        return {type: 'move', direction: space};
};

function SmartHerbivore() {
    this.energy = 20;
    this.direction = randomElement(directionNames);
}
SmartHerbivore.prototype.act = function(view) {
    const space = view.find(' ');
    if (this.energy > 60 && space)
        return {type: 'reproduce', direction: space};
    const plant = view.find('*');
    const plants = view.findAll('*');
    if (plant && plants.length > 1)
        return {type: 'eat', direction: plant};
    if (view.look(this.direction) != ' ')
        this.direction = view.find(' ') || 's';
    return {type: 'move', direction: this.direction};
};

function Tiger() {
    this.energy = 30;
}
Tiger.prototype.act = function(view) {
    console.log(this.energy);
    const space = view.find(' ');
    if (this.energy > 70 && space)
        return {type: 'reproduce', direction: space};
    const herbivore = view.find('O');
    if (herbivore)
        return {type: 'eat', direction: herbivore};
    if (space && this.energy > 10)
        return {type: 'move', direction: space};
};

// Run the app
// ----------------------------------------------------------------------------
const world = new LifelikeWorld(
  ["####################################################",
   "#                 ####         ****              ###",
   "#   *  @  ##                 ########       OO    ##",
   "#   *    ##        O O                 ****       *#",
   "#       ##*                        ##########     *#",
   "#      ##***  *         ****                     **#",
   "#* **  #  *  ***      #########                  **#",
   "#* **  #      *               #   *              **#",
   "#     ##              #   O   #  ***          ######",
   "#*            @       #       #   *        O  #    #",
   "#*                    #  ######                 ** #",
   "###          ****          ***                  ** #",
   "#       O                        @         O       #",
   "#   *     ##  ##  ##  ##               ###      *  #",
   "#   **         #              *       #####  O     #",
   "##  **  O   O  #  #    ***  ***        ###      ** #",
   "###               #   *****                    ****#",
   "####################################################"],
  {"#": Wall,
   "@": Tiger,
   "O": SmartHerbivore, // from previous exercise
   "*": Plant}
);

animateWorld(world);
