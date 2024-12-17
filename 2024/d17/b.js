import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { bar } from "../functions.js";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d17t.txt";
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

const MAX = 100000000;

function Go(contents) {
	const lines = contents.split("\n");
	A = lines[0].split(" ")[2] | 0;
	B = lines[1].split(" ")[2] | 0;
	C = lines[2].split(" ")[2] | 0;
	let program = lines[4].split(": ")[1].split(",").map(Number);
	const target = lines[4].split(": ")[1];
	console.log(A, B, C, target);

	for (var attempt = 0; attempt < MAX; attempt++) {
		// console.log("test", AA);
		bar(attempt, MAX, 20);

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
						A = Math.trunc(A / Math.pow(2, Combo(operand)));
						break;
					case 1: // bxl
						B = (B ^ operand) >>> 0;
						break;
					case 2: // bst
						B = mod(Combo(operand), 8);
						break;
					case 3: // jnz
						if (A !== 0) {
							pointer = operand;
							pointer -= 2;
						}
						break;
					case 4: // bxc
						B = (B ^ C) >>> 0;
						break;
					case 5: // out;
						output.push(Combo(operand) % 8);

						const test = output.join(",");
						// console.log("test", AA, target, test);
						if (target.indexOf(test) !== 0) {
							// console.log("break");
							break mainloop;
						}
						break;
					case 6: // bdv
						B = Math.trunc(A / Math.pow(2, Combo(operand)));
						break;
					case 7: // bdv
						C = Math.trunc(A / Math.pow(2, Combo(operand)));
						break;
				}
				pointer += 2;
				opcode = program[pointer];
				operand = program[pointer + 1];
				// break;
			}
			// console.log("\n>>", output.join(","));
			if (output.join(",") === target) {
				console.log("found", attempt, target, "=", output.join(","));
			}
		}
		// if (AA % 100000 === 0) {
		// 	console.log("test>", AA);
		// }
	}
	// console.log("reg>", A, B, C);
}
