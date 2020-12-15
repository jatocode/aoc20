let test1 = [0, 3, 6]; // 0
let test2 = [3, 2, 1]; // 438
let test3 = [3, 1, 2]; // 1836

let input = [20, 9, 11, 0, 1, 2];

let numbers = input;

let lastspoken = [];
let last = 0;
const max = 30000000;
for (var turn = 0; turn < max; turn++) {
    //if(turn % 100000 == 0) console.log(turn);
    if (turn < numbers.length) {
        last = numbers[turn];
        lastspoken[last] = { turn: turn + 1, count: 1 };
    } else {
        if (lastspoken[last] == undefined || lastspoken[last].count == 1) {
            last = 0;
            if(lastspoken[0] == undefined) lastspoken[0] = {turn:0, count:0};
            let count = lastspoken[0].count == undefined ? 0 : lastspoken[0].count + 1;
            let turnprev = lastspoken[0].turn;
            lastspoken[0] = { turn: turn + 1, turnprev: turnprev, count: count };
        } else {
            last = lastspoken[last].turn - lastspoken[last].turnprev;
            if (lastspoken[last] == undefined) {
                lastspoken[last] = { turn: turn + 1, count: 1 };
            } else {
                lastspoken[last].turnprev = lastspoken[last].turn;
                lastspoken[last].turn = turn + 1;
                lastspoken[last].count = lastspoken[last].count + 1;
            }
        }
    }
}
console.log('Turn:', turn, 'Saying', last)
