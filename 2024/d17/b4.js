/*
	X= [0..7]

	A = X
24  B = A
15	B = B ^ 5
75	C = X
16	B = B ^ 6
03	A = A / 8
40  B = B ^ C
55  Print B % 8

print!
*/

var program = "2,4,1,5,7,5,1,6,0,3,4,0,5,5,3,0";
program = "0,1,2,3,4,5,6,7";
var digits = program.split(",");
console.log(digits);

var A = 0;
var B = 0;
var C = 0;

var options = [];

for (var i = 0; i < digits.length; i++) {
	var digit = digits[i];
	console.log("digit", digit);
	var matches = [];

	for (var X = 0; X < 8; X++) {
		A = X;
		B = A % 8; // 24
		B = B ^ 5; // 15
		C = A / Math.pow(2, B); // 75
		B = B ^ 6; // 16
		A = A / Math.pow(2, 3); //03
		B = B ^ C; // 40
		if (digit == 4 || digit == B % 8) {
			// console.log("  ", digit, X, B % 8);
			matches.push(X);
		}
	}

	options.push(matches);
}

console.log(options);

function Possible(string, options) {
	var nums = options.shift();
	if (nums.length == 0) {
		nums = [0];
	}
	for (var num of nums) {
		if (options.length > 0) {
			Possible(string + num, options);
		} else {
			console.log(string + num);
		}
	}
}

console.log(Possible("", options));
