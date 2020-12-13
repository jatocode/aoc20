// Testar med ett eget utilbibliotek
const util = require('./util.js');

let data = util.getInputTrim();

let earliest = data[0];
let notes = data[1].split(',');

let buses = notes.filter(note => {
    if (note != 'x') return parseInt(note);
});

console.log(earliest);
findnext(earliest);

function findnext(time) {
    let nextbus = 0;
    let nexttime = 0;
    while(nexttime == 0) {
        buses.forEach(bus => {
            if(calcbus(time, bus)) {
                nextbus = bus;
                nexttime = time;
            }
        })
        time++;
    }
    console.log((nexttime - earliest) * nextbus);
    return nextbus, nexttime;
}

function calcbus(time, id) {
    return time % id == 0;
}

function testprint() {
    for (var i = 929; i < 950; i++) {
        console.log(i, calcbus(i, 7) ? 'D' : '.', calcbus(i, 13) ? 'D' : '.');
    }
}