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
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
Time: O(1), Space: O(1)
1. Store 1-20 as english numerals in nums array to convert h & m
    -nums[h - 1] = "h in english numerals"
2. Seperate return value into the following substrings 
    -hourStr, minStr, prepStr ("to"/"past"), quantStr (quantity "minute(s)") 
3. Use conditions to determine values for substrings listed above
   -Use modulus operator & concatenation to derive m (minutes) > 20
5. Concatenate substrings for return value
-Tyler Jachetta
*/
function timeInWords(h, m) {
    if( !(1 <= h && h <= 12) || !(0 <= m && m <= 60) || isNaN(h) || isNaN(m) )
        return "Invalid Input"; 
    const nums = ["one", "two", "three", "four", "five", 
                  "six", "seven", "eight", "nine", "ten",
                  "eleven", "twelve", "thirteen", "fourteen", "quarter", 
                  "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
    let hourStr = (m > 30 ? (h != 12 ? nums[h] : nums[0]) : nums[h - 1]); 
    if(m == 0) 
        return hourStr + " o' clock";   
    else if (m == 30) 
        return "half past " + hourStr;
    let prepStr = (m < 30 ? "past " : "to "), minStr, quantStr;
    m = m > 30 ? 60 - m : m;
    minStr = (m > 20 ? "twenty " + (nums[(m - 1) % 20]) : nums[m - 1]); 
    quantStr = (m == 15 ? " " : (m == 1 ? " minute " : " minutes "));
    return minStr + quantStr + prepStr + hourStr; 
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const h = parseInt(readLine(), 10);

    const m = parseInt(readLine(), 10);

    let result = timeInWords(h, m);

    ws.write(result + "\n");

    ws.end();
}
