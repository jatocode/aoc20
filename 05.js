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
lines.forEach(seat => {
    max = Math.max(max, decode(seat));
});
console.log('Max seat: ' + max);

function decode(seat) {
    var row = decodeRow(seat);
    var col = decodeCol(seat);
    var id = row * 8 + col;
    //console.log(row, col, id);
    return id;
}
function decodeCol(seat) {
    let upper = 7;
    let size = 8;
    seat.split('').forEach(l => {
        switch (l) {
            case 'L':
                size = size >> 1;
                upper -= size;
                break;
            case 'R':
                size = size >> 1;
                break;
        }
    });
    return upper;
}

function decodeRow(seat) {
    let upper = 127;
    let size = 128;
    seat.split('').forEach(l => {
        switch (l) {
            case 'L':
            case 'F':
                size = size >> 1;
                upper -= size;
                break;
            case 'R':
            case 'B':
                size = size >> 1;
                break;
        }
    });
    return upper;
}
