const fs = require('fs');
const args = process.argv.slice(2);

const data = fs.readFileSync(args[0], 'utf8');

let lines = data.split('\n');

// Test
decode('FBFBBFFRLR');
decode('BFFFBBFRRR');
decode('FFFBBBFRRR');
decode('BBFFBBFRLL');

var max = 0;
var min = 1000;
var flight = [];
lines.forEach(seat => {
    var id = decode(seat);
    min = Math.min(min, id);
    max = Math.max(max, id);
    flight[id] = true;
});

// Del 1
console.log('Max seat: ' + max);

// Del 2
for(var i=min;i<max;i++) {
    if(!flight[i]) console.log(i);
}

function decode(seat) {
    // Decode row och col är så lika så jag vill slå ihop dom. Orkar inte
    var row = decodeRow(seat);
    var col = decodeCol(seat);
    var id = row * 8 + col;
    return id;
}

function decodeCol(seat) {
    let pointer = 7;
    let size = 8;
    seat.split('').forEach(l => {
        switch (l) {
            case 'L':
                size = size >> 1;
                pointer -= size;
                break;
            case 'R':
                size = size >> 1;
                break;
        }
    });
    return pointer;
}

function decodeRow(seat) {
    let pointer = 127;
    let size = 128;
    seat.split('').forEach(l => {
        switch (l) {
            case 'F':
                size = size >> 1;
                pointer -= size;
                break;
            case 'B':
                size = size >> 1;
                break;
        }
    });
    return pointer;
}
