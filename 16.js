// Testar med ett eget utilbibliotek
const util = require('./util.js');

let data = util.getInputTrim().map(x => x.trim()); // Trim weird eols from windows

const yt = data.indexOf('your ticket:') + 1;
const nearbyi = data.indexOf('nearby tickets:') + 1;

let ticketrules = new Map();
let fieldorder = new Map();
let field = 0;
for (var i = 0; i < yt - 1; i++) {
    let parse = data[i].match(/([a-z\s]+): (.*) or (.*).*/);
    if (parse != null) {
        let ranges = [parse[2].split('-'), parse[3].split('-')];
        ticketrules.set(parse[1], ranges);
        fieldorder.set(field, parse[1]);
        field++;
    }
}
console.table(fieldorder);
console.table(ticketrules);

let ticket = data[yt].split(',');
//console.log(ticket);

let scanningerror = 0;
let validtickets = [];
for (var i = nearbyi; i < data.length; i++) {
    let nearby = data[i].split(',').map(x => parseInt(x));
    let validticket = true;
    nearby.forEach((field, i) => {
        let rule = ticketrules.get(fieldorder.get(i));
        //console.log(field, rule, checkvalid(field, rule));
        // if(!checkvalid(field, rule)) {
        //     console.log(field);
        // }
        if (!checkvalidany(field)) {
            scanningerror += field;
            validticket = false;
        }
    });
    if (validticket) validtickets.push(nearby);
}
//console.table(nearby);
console.table(validtickets);

// Del 1
console.log('Scanning error rate', scanningerror);

// Del 2
let c = 0;
field = 2;
let valid = false;
for (var i = 0; i < fieldorder.size; i++) {
    valid = true;
    for (var r = 0; r < validtickets.length && valid; r++) {
        //for (let field = 0; field < validtickets[0].length; field++) {
        let check = validtickets[r][field];
        //console.log(field, check);
        let rule = ticketrules.get(fieldorder.get(i));
        valid = checkvalid(check, rule);
        c = i;
        console.log(check, fieldorder.get(i), rule, c, valid);
    }
    console.log(valid, '--');
    //}
}
if (valid) console.log('Field', field, ' candidate:', fieldorder.get(c));

function checkvalid(value, rule) {
    return (value >= rule[0][0] && value <= rule[0][1]) ||
        (value >= rule[1][0] && value <= rule[1][1]);
}

function checkvalidany(value) {
    let valid = false;
    ticketrules.forEach(rule => {
        valid = valid ||
            ((value >= rule[0][0] && value <= rule[0][1]) ||
                (value >= rule[1][0] && value <= rule[1][1]));
    });
    return valid;
}