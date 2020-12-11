// Testar med ett eget utilbibliotek
const util = require('./util.js');

let data = util.getInputTrim();
let seats = [];
data.forEach(d => seats.push(d.trim().split('')));

// Test
//print();
// console.log();
// console.log(getNeigbours(2, 2).join(''));
// console.log(getNeigbours(0, 0).join(''));
// console.log(getNeigbours(9, 9).join(''));
//console.log(getNeigbours(0,1).join(''));
//console.log(seatState(0,1));

model();
console.log(countOccupied());

function model() {
    let seatsChanged = 0;
    do {
        let newmodel = [];
        seatsChanged = 0;
        for (var y = 0; y < seats.length; y++) {
            for (var x = 0; x < seats[0].length; x++) {
                if(newmodel[y] == undefined) newmodel[y] = [];
                newmodel[y][x] = seatState(x, y);
                if (get(x, y) != newmodel[y][x]) seatsChanged++;
            }
        }
        seats = JSON.parse(JSON.stringify(newmodel));
    } while(seatsChanged > 0)
}

function seatState(x, y) {
    let nb = getNeigbours(x, y);
    let occ = nb.filter(x => x == '#').length;
    let seat = get(x, y);
    if (seat == 'L' && occ == 0) {
        return '#';
    } else if (seat == '#' && occ >= 4) {
        return 'L';
    }
    return seat;
}

function countOccupied() {
    let occ = 0;
    for (var y = 0; y < seats.length; y++) {
        occ += seats[y].filter(x => x == '#').length;
    }
    return occ;
}

function getNeigbours(x, y) {
    return [
        get(x, y - 1),
        get(x + 1, y - 1),
        get(x + 1, y),
        get(x + 1, y + 1),

        get(x, y + 1),
        get(x - 1, y + 1),
        get(x - 1, y),
        get(x - 1, y - 1),
    ]
}

function get(x, y) {
    let r = seats[y];
    if (r == undefined) return 'W';

    let g = seats[y][x];
    return g != undefined ? g : 'W'
}

function print() {
    console.log();
    for (var y = 0; y < seats.length; y++) {
        console.log(seats[y].join(''));
    }
}