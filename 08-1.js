const fs = require('fs');
const args = process.argv.slice(2);

const data = fs.readFileSync(args[0], 'utf8');

let lines = data.split('\n');

let program = [];
let pc = 0;
lines.forEach(line => {
    let parsed = line.match(/([a-z]+) ([-+]\d+)/);
    let inst = parsed[1];
    let value = parseInt(parsed[2]);
    program[pc++] = { inst: inst, value: value, exec: false }
});

exec(program);

function exec(program) {
    pc = 0;
    let loop = false;
    let acc = 0;
    while (pc < program.length && !loop) {
        let inst = program[pc].inst;
        let value = program[pc].value;
        program[pc].exec = true;
        switch (inst) {
            case 'nop': break;
            case 'acc': acc += value; break;
            case 'jmp':
                if (program[pc + value].exec == true) {
                    loop = true;
                    console.log('Infinite loop, acc=', acc);
                } else {
                    pc += value;
                }
                continue;
            default: break;
        }
        pc++;
    }
    return loop;
}
