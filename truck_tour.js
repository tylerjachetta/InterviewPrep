'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
Time: O(N^2), Space: O(1)
N = petrolpumps.length
1. Iterate through petrolpumps & keep track of:
    - start(index), cur(index)
    - tank (keeps track of petrol gained through previous pumps)
    - stops (# of pumps passed through, succeed when stops == N)
2. Check the following conditions upon each iteration of petrolpumps: 
    a. If tank + (petrol from cur pump) - (petrol for next pump) < 0, 
       cannot complete circle from start, check if start++ can complete circle & reset variables (tank = stops = 0)
    b. If cur == petrolpumps.length, set cur = 0 loop back around to check pumps before starting pump (to complete circle)
    c. If every pump cannot complete circle (as starting position), return -1 (no solution)
-Tyler Jacetta
*/
function truckTour(petrolpumps) {
    let start = 0;
    for(let stops = 0, tank = 0, cur = 0; stops < petrolpumps.length;) {
        tank += petrolpumps[cur][0] - petrolpumps[cur][1];
        if(start == petrolpumps.length - 1 && tank < 0)
            return -1; 
        else if(tank < 0) {
            stops = 0;
            tank = 0;
            cur = ++start;
            continue;
        }
        if(++cur == petrolpumps.length) 
            cur = 0;
        stops++;
    }
    return start;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let petrolpumps = Array(n);

    for (let petrolpumpsRowItr = 0; petrolpumpsRowItr < n; petrolpumpsRowItr++) {
        petrolpumps[petrolpumpsRowItr] = readLine().split(' ').map(petrolpumpsTemp => parseInt(petrolpumpsTemp, 10));
    }

    let result = truckTour(petrolpumps);

    ws.write(result + "\n");

    ws.end();
}
