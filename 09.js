const fs = require('fs');
const args = process.argv.slice(2);

const data = fs.readFileSync(args[0], 'utf8');

let lines = data.split('\n');

let psize = 25;
let xmas = [];
lines.forEach((line, i) => {
    if (line.length > 0) {
        num = parseInt(line);
        if (i >= psize) {
            let preamble = lines.slice(i - psize, i).map(x => parseInt(x));
            preamble['valid'] = findsum(num, preamble);
            if (!preamble['valid']) console.log('Not valid: ', num);
            xmas[num] = preamble;
            preamble = [num];
        }
    }
});

function findsum(sum, preamble) {
    for (var i = 0; i < preamble.length; i++) {
        for (var j = i; j < preamble.length; j++) {
            let v1 = preamble[i];
            let v2 = preamble[j];
            if (parseInt(v1) + parseInt(v2) == sum) {
                //console.log(v1, v2);
                return true;
            }
        }
    }
    return false;
}
