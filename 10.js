// Testar med ett eget utilbibliotek
const util = require('./util.js');

let data = util.getInputTrim().map(x => parseInt(x));

// Del 1
console.log(findsteps(data));

// Del 2

function findsteps(data) {
    let end = 0;
    let onestep = 0;
    let threestep = 0;
    let sorted = data.sort((a, b) => a - b);
    for (var i = 0; i < sorted.length; i++) {
        let jolt = sorted[i];
        if (end <= jolt + 3) {
            if (jolt - end == 1) onestep++;
            if (jolt - end == 3) threestep++;
            end = jolt;
        }
    }

    // My adapter is always 3 jolts up
    threestep++;
    return onestep * threestep;
}
