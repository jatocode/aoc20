let test1 = [0, 3, 6]; // 0
let test2 = [3, 2, 1]; // 438
let test3 = [3, 1, 2]; // 1836

let input = [20, 9, 11, 0, 1, 2];

let numbers = input;

let lastspoken = new Map(); // Använde Map istället för Array och gick från 12min till 11s...
let last = 0;
const max = 30000000;
//const max = 2020;
for (var turn = 0; turn < max; turn++) {
    if (turn < numbers.length) {
        last = numbers[turn];
        lastspoken.set(last, { turn: turn });
    } else {
        let latest = lastspoken.get(last);
        if (latest == undefined || latest.turnprev == undefined) {
            last = 0;
            let speak = lastspoken.get(last);
            if (speak == undefined) {
                lastspoken.set(0, { turn: 0, turnprev: undefined });
            } else {
                lastspoken.set(0, { turn: turn , turnprev: speak.turn });
            }
        } else {
            last = latest.turn - latest.turnprev;
            let speak = lastspoken.get(last);
            let turnprev = undefined;
            if (speak != undefined) {
                turnprev = speak.turn;
            }
            lastspoken.set(last, { turn: turn , turnprev: turnprev });
        }
    }
}
console.log('Turn:', turn, 'Saying', last)
