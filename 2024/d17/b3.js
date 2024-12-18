import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { bar } from "../functions.js";

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

/*
  B2 = B % 8  // last 3 bytes.  0...7
  B1 = 3 ^ 5
  C7 =  A / 2^B
  B1 = 6 ^ 6
  A0 =  A / 8
  B4 = B ^ C

  output = 2,4,1,5,7,5,1,6,0,3,4,0,5,5,3,0
217104
 - out 5
 - goto 0
*/

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d17.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

let A = 0;
let B = 0;
let C = 0;

function Combo(opcode) {
	switch (opcode) {
		case 0:
		case 1:
		case 2:
		case 3:
			return opcode;
		case 4:
			return A;
		case 5:
			return B;
		case 6:
			return C;
		case 7:
		default:
			console.warn("FAULT");
			break;
	}
}

const mod = (n, m) => ((n % m) + m) % m;

// const START = 0;
const START = 0;
const MAX = 7;

let show_debug = false;

var options = [];

function Debug(line) {
	if (show_debug) {
		console.warn(line);
	}
}

function Go(contents) {
	const lines = contents.split("\n");
	A = lines[0].split(" ")[2] | 0;
	B = lines[1].split(" ")[2] | 0;
	C = lines[2].split(" ")[2] | 0;
	let program = lines[4].split(": ")[1].split(",").map(Number);
	const target = lines[4].split(": ")[1];
	const target_num = Number(program.join(""));

	console.log("target", target);

	let bignum = 0;
	let minperc = 100000;
	var step = 1;

	let digits = lines[4].split(": ")[1].split(",").map(Number);
	options = [];
	console.log(options);
	var index = digits.length;
	var digit = digits.pop();
	while (typeof digit === "number") {
		var thisarray = [];
		console.log("digit", digit);
		for (var attempt = START; attempt < MAX; attempt += step) {
			// console.log("test", AA);
			// bar(attempt - START, MAX - START, 265);

			A = attempt;
			B = 0;
			C = 0;
			mainloop: {
				let opcode = "";
				let operand = "";
				let output = [];
				let pointer = 0;
				opcode = program[pointer];
				operand = program[pointer + 1];
				while (typeof opcode === "number") {
					// console.log(">", op, Combo(op), arg);

					switch (opcode) {
						case 0: // adv
							Debug(
								`  A0 =  A / 2^C(${operand}) = ${A} / ${Math.pow(
									2,
									Combo(operand)
								)} = ${C}`
							);
							A = Math.trunc(A / Math.pow(2, Combo(operand)));
							break;
						case 1: // bxl
							console.log(
								`  B1 = ${B} ^ ${operand} = ${B ^ operand}`
							);
							B = (B ^ operand) >>> 0;
							break;
						case 2: // bst
							Debug(
								`  B2 = B % 8 = ${Combo(operand)} % 8 = ${B}`
							);
							B = mod(Combo(operand), 8);
							break;
						case 3: // jnz
							// Debug(`  GoTo3 ${operand}`);
							// if (A !== 0) {
							// 	pointer = operand;
							// 	pointer -= 2;
							// }
							break;
						case 4: // bxc
							Debug(`  B4 = B ^ C = ${B} ^ ${C} = ${B}`);
							B = (B ^ C) >>> 0;
							break;
						case 5: // out;
							output.push(Combo(operand) % 8);
							// console.log(
							// 	`  output5 = ${output.join(",")}`,
							// 	digit
							// );
							// const test = output.join(",");
							// if (target.indexOf(test) !== 0) {
							// 	break mainloop;
							// }
							break;
						case 6: // bdv
							Debug(
								`  B6 =  A / 2^C(${operand}) = ${A} / ${Math.pow(
									2,
									Combo(operand)
								)} = ${C}`
							);
							B = Math.trunc(A / Math.pow(2, Combo(operand)));
							break;
						case 7: // bdv
							Debug(
								`  C7 =  A / 2^C(${operand}) = ${A} / ${Math.pow(
									2,
									Combo(operand)
								)} = ${C}`
							);
							C = Math.trunc(A / Math.pow(2, Combo(operand)));
							break;
					}
					pointer += 2;
					opcode = program[pointer];
					operand = program[pointer + 1];
				}
				if (Number(output) == digit) {
					console.log(digit, index, attempt, output.join(","));
					thisarray.push(attempt);
					// break;
				}
				show_debug = false;
			}
		}
		// if (AA % 100000 === 0) {
		// 	console.log("test>", AA);
		// }
		options.push(thisarray);
		digit = digits.pop();
	}
	// console.log("reg>", A, B, C);
	console.log(options);
}
