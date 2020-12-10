// Testar med ett eget utilbibliotek
const util = require('./util.js');

let data = util.getInputTrim().map(x => parseInt(x)).sort((a, b) => a - b);
// Sätt in start och mål
data.unshift(0);
data.push(data[data.length - 1] + 3);

// Del 1
console.log(findsteps(data));
console.table(data);
// Del 2
console.log(findpaths(data));

function findsteps(sorted) {
    let end = 0;
    let onestep = 0;
    let threestep = 0;
    for (var i = 0; i < sorted.length; i++) {
        let jolt = sorted[i];
        if (end <= jolt + 3) {
            if (jolt - end == 1) onestep++;
            if (jolt - end == 3) threestep++;
            end = jolt;
        }
    }
    return onestep * threestep;
}

function findpaths(data) {
    let chains = data.map(x => 0);
    chains[0] = 1;
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < i; j++) {
            if (data[i] - data[j] <= 3) {
                chains[i] += chains[j];
            }
        }
    }
    console.table(chains);
    return chains[data.length - 1];
}
