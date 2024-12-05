// https://adventofcode.com/2024/day/1

console.log('FOOBAR 2!');

var fs = require('fs');
var array = fs.readFileSync('file.txt').toString().split("\n");
for(i in array) {
    console.log(array[i]);
}