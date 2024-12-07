import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d07.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

let EQS = [];

function Eq2(a, b, op) {
	if (b.length == 1) b = b[0];
	if (typeof b == "number") return `${a}${op}${b}`;
	var term1 = b[0];
	var term2 = b.slice(1);
	console.log(term1, term2);
	return `${a}${op}${Eq(term1, term2, op)}`;
}

function Eq(eq, next) {
	var ops = ["+", "*"];
	var test = "";
	for (var op of ops) {
		if (next.length == 1) {
			test = eq + op + next[0];
			EQS.push(test);
			// console.log(test, eval(test));
		} else {
			test = Eq("(" + eq + op + next[0] + ")", next.slice(1));
		}
	}
	return test;
}
function GetEqs(sum, nums) {
	EQS = [];
	const eq = Eq(nums[0], nums.slice(1));

	return false;
}

// function Eval(eq) {
// 	var parts = eq.split(/([+*])/);
// 	console.log(parts);
// 	var out = Number(parts.shift());
// 	for (var p of parts) {
// 		switch (p) {
// 			case "+":
// 				out += Number(parts.shift());
// 				break;
// 			case "*":
// 				out *= Number(parts.shift());
// 				break;
// 		}
// 	}
// 	return out;
// }
function Go(contents) {
	let total = 0;
	const lines = contents.split("\n");
	for (var l of lines) {
		if (l) {
			var [sum, ...nums] = l.replace(":", "").split(" ").map(Number);
			// console.log(sum, nums);
			GetEqs(sum, nums);
			// console.log(" = ", EQS);
			for (var eq of EQS) {
				// console.log(eq, eval(eq), "=", sum);
				if (eval(eq) == sum) {
					console.log("valid", eq, sum);
					total += sum;
					break;
				}
			}
		}
	}
	console.log(">>", total);
	///here
}
