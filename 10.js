// Testar med ett eget utilbibliotek
const util = require('./util.js');

let data = util.getInputTrim();

data.forEach((line,i) => {
    console.log(i,line);
});