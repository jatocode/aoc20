// Testar med ett eget utilbibliotek
const util = require('./util.js');

let data = util.getInputTrim();
let bitmask = '';

let mem = [];
data.forEach(line => {
    if(line.startsWith('mask')) {
        bitmask = line.match(/.* = (.*)/)[1];
    } else {
        let parse = line.match(/mem\[(\d+)\] = (\d+).*/);
        let addr = parse[1];
        let pvalue = parse[2];
        let binval = dec2bin(parseInt(pvalue));
        let value = pad(binval, 36);

        if(mem[addr] == undefined) mem[addr] = pad(0, 36);
        mem[addr] = applymask(bitmask, value);       
    }
})

// Del 1. Räkna summan
console.log(mem.reduce( (summa,value) => summa + calc(value) ,0));

function applymask(mask, value) {
    let size = 36;
    let zeropad = pad(value, 36);
    result = '';
    for (var i = 0; i < size; i++) {
         switch (mask[i]) {
            case '0':
                result += '0';
                break;
            case '1':
                result += '1';
                break;
            case 'X':
                result += zeropad[i];
                break;
        }
    }
    return result;
}

function calc(value) {
    let size = 36;
    let result = 0;
    for (var i = 0; i < size; i++) {
        let bit = size - i - 1;
        let shift = lshift(1, bit);
        switch (value[i]) {
            case '0':
                break;
            case '1':
                result += shift;
                break;
        }
    }
    return result;
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function lshift(num, bits) {
    return num * Math.pow(2, bits);
}

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}
