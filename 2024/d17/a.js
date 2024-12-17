import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

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

function Go(contents) {
	const lines = contents.split("\n");
	A = lines[0].split(" ")[2] | 0;
	B = lines[1].split(" ")[2] | 0;
	C = lines[2].split(" ")[2] | 0;
	let program = lines[4].split(": ")[1].split(",").map(Number);
	console.log(A, B, C, program);

	let opcode = "";
	let operand = "";
	let output = [];
	let pointer = 0;
	opcode = program[pointer];
	operand = program[pointer + 1];
	let bits = "";
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
				debugger;
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
	console.log("reg>", A, B, C);
	console.log("\n>>", output.join(","));
}
