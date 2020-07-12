'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
Time: O(2N)==O(N), Space: O(1)
N = arr.length
1. Iterate over arr, calculate running/cumulative sum (rightSum)
2. Iterate over arr again, check upon each iteration:
   (rightSum - leftSum - arr[i] == leftSum) => satisfies condition so return "Yes"
   Otherwise, leftSum += arr[i] (calculating running sum for next iteration)
3. If condition is never satisfied, return "NO"
-Tyler Jacetta
*/
function balancedSums(arr) {
    let rightSum = 0, leftSum = 0; 
    for(let i = 0; i < arr.length; i++) 
        rightSum += arr[i];
        
    for(let i = 0; i < arr.length; i++) {
        if(leftSum == rightSum - leftSum - arr[i])
            return "YES";
        leftSum += arr[i];
    }
    return "NO";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const n = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = balancedSums(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
