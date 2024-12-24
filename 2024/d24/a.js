import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d24t.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

var REGS = {};
var PROG = {};

function GetVal(var1) {
	if (typeof REGS[var1] == "number") return REGS[var1];
	if (PROG[var1]) return CalcEq(...PROG[var1]);
}

function CalcEq(var1, op, var2) {
	var val1 = GetVal(var1);
	var val2 = GetVal(var2);
	var out = 0;
	switch (op) {
		case "AND":
			out = val1 & val2;
			break;
		case "OR":
			out = val1 | val2;
			break;
		case "XOR":
			out = val1 ^ val2;
			break;
	}
	console.log(`${var1} ${op} ${var2} = ${val1} ${op} ${val2} = ${out}`);
	return out;
}

function Go(contents) {
	const lines = contents.trim().split("\n");
	while ((l = lines.shift())) {
		if (l == "") break;
		var [var1, val] = l.split(": ");
		REGS[var1] = Number(val);
	}
	console.log(REGS);

	for (var l of lines) {
		var [var1, op, var2, eq, var3] = l.split(" ");
		PROG[var3] = [var1, op, var2];
	}
	console.log(PROG);

	for (var key of Object.keys(PROG)) {
		REGS[key] = CalcEq(...PROG[key]);
	}

	var zregs = Object.keys(REGS)
		.filter((k) => k[0] == "z")
		.sort()
		.reverse();
	var bin = "";
	for (var z of zregs) {
		bin += String(REGS[z]);
	}
	console.log(bin);
	console.log(">>", parseInt(bin, 2));
}
