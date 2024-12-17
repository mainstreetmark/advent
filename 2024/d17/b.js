import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { bar } from "../functions.js";

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
const START = 100000030336147;
const MAX = Math.pow(10, 15);

let show_debug = true;

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

	for (var attempt = START; attempt < MAX; attempt += step) {
		// console.log("test", AA);
		bar(attempt - START, MAX - START, 265);

		A = attempt;
		B = lines[1].split(" ")[2] | 0;
		C = lines[2].split(" ")[2] | 0;
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
						Debug(`  B1 = ${B} ^ ${operand}`);
						B = (B ^ operand) >>> 0;
						break;
					case 2: // bst
						Debug(`  B2 = B % 8 = ${Combo(operand)} % 8 = ${B}`);
						B = mod(Combo(operand), 8);
						break;
					case 3: // jnz
						Debug(`  GoTo3 ${operand}`);
						if (A !== 0) {
							pointer = operand;
							pointer -= 2;
						}
						break;
					case 4: // bxc
						Debug(`  B4 = B ^ C = ${B} ^ ${C} = ${B}`);
						B = (B ^ C) >>> 0;
						break;
					case 5: // out;
						output.push(Combo(operand) % 8);
						Debug(`  output5 = ${output.join(",")}`);
						const test = output.join(",");
						if (target.indexOf(test) !== 0) {
							break mainloop;
						}
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
			// break;
			// console.log(
			// 	">>",
			// 	attempt,
			// 	output.join(","),
			// 	output.length,
			// 	program.length
			// );

			var newbig = Number(output.join(""));
			// console.log(
			// 	attempt,
			// 	target_num,
			// 	bignum - target_num,
			// 	"\t",
			// 	bignum / target_num,
			// 	minperc
			// );
			var perc = bignum / target_num;
			if (perc && perc < minperc) {
				minperc = perc;
				console.log(
					"new min",
					attempt,
					minperc,
					"\t",
					output.join(",")
				);
			}
			bignum = newbig;
			// bignum = Number(output.join(""));
			if (output.join(",") === target) {
				console.log("found", attempt, target, "=", output.join(","));
				console.log(">>", attempt);
				break;
			}
			// step += 1;
			show_debug = false;
		}
		// if (AA % 100000 === 0) {
		// 	console.log("test>", AA);
		// }
	}
	// console.log("reg>", A, B, C);
}
