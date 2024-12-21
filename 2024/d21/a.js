import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const KEYPAD = ["7", "8", "9", "4", "5", "6", "1", "2", "3", " ", "0", "A"];
const CTRL = [" ", "^", "A", "<", "v", ">"];

var LEFT = -1;
var RIGHT = 1;
var UP = -3;
var DOWN = 3;

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d21t.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

var col = (pad, char) => pad.indexOf(char) % 3;
var row = (pad, char) => Math.floor(pad.indexOf(char) / 3);

function Unmove(pad, seq, start) {
	var code = "";
	var pos = pad.indexOf(start);
	var chars = seq.split("");
	for (var c of chars) {
		switch (c) {
			case "^":
				pos -= 3;
				break;
			case "v":
				pos += 3;
				break;
			case "<":
				pos -= 1;
				break;
			case ">":
				pos += 1;
				break;
			case "A":
				code += pad[pos];
				break;
		}
	}
	return code;
}

// function Move(pad, code, start) {
// 	var seqa = Move2(pad, code, start, false);
// 	var seqb = Move2(pad, code, start, false);
// 	// console.log("A", seqa.length, "b", seqb.length, code);
// 	// console.log("Move2(", pad, code, start, ")");
// 	return seqa.length < seqb.length ? seqa : seqb;
// }

function Move(pad, code, start, row_first = false) {
	var seq = "";
	var pos = pad.indexOf(start);
	var chars = code.split("");
	var current = [row(pad, start), col(pad, start)];
	for (var c of chars) {
		var target_char = pad.indexOf(c);
		var target = [row(pad, c), col(pad, c)];
		var dr = target[0] - current[0];
		var dc = target[1] - current[1];
		if (row_first) {
			for (var r = 0; r < Math.abs(dr); r++) {
				seq += dr > 0 ? "v" : "^";
			}
			for (var c = 0; c < Math.abs(dc); c++) {
				seq += dc > 0 ? ">" : "<";
			}
		} else {
			for (var c = 0; c < Math.abs(dc); c++) {
				seq += dc > 0 ? ">" : "<";
			}
			for (var r = 0; r < Math.abs(dr); r++) {
				seq += dr > 0 ? "v" : "^";
			}
		}

		seq += "A";
		current = target;
	}
	return seq;
}

function Go(contents) {
	var sum = 0;
	const lines = contents.trim().split("\n");
	// console.log(lines);
	for (var line of lines) {
		var seq1 = Move(KEYPAD, line, "A");
		var seq2 = Move(CTRL, seq1, "A");
		var seq3 = Move(CTRL, seq2, "A");
		// console.log([line, seq1, seq2, seq3].reverse().join("\n"));
		// console.log(line == Unmove(KEYPAD, seq1, "A"));
		// console.log(seq1 == Unmove(CTRL, seq2, "A"));
		// console.log(seq2, Unmove(CTRL, seq3, "A"));
		// console.log("  ", seq3.length, Number(line.replace("A", "")));
		console.log(
			`${line}: ${seq3} =`,
			Unmove(KEYPAD, Unmove(CTRL, Unmove(CTRL, seq3, "A"), "A"), "A"),
			seq3.length,
			Number(line.replace("A", ""))
		);
		sum += seq3.length * Number(line.replace("A", ""));
	}
	console.log(">>", sum);
}

// console.log(
// 	"Move3",
// 	Move2(CTRL, "<A>A<AAv<AA^>>AvAA^Av<AAA^>A", "A", true).length
// );
// console.log("--");
// var mine =
// 	"v<<A^>>AvA^Av<<A^>>AAv<A<A^>>AA<Av>AA^Av<A^>AA<A>Av<A<A^>>AAA<Av>A^A";
// var theirs = "<v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A";
// // console.log(mine.split("A"));
// // console.log(theirs.split("A"));

// for (var who of [mine, theirs]) {
// 	console.log("--");
// 	console.log(Unmove(KEYPAD, Unmove(CTRL, Unmove(CTRL, who, "A"), "A"), "A"));
// 	console.log(Unmove(CTRL, Unmove(CTRL, who, "A"), "A").split("A"));
// 	console.log(Unmove(CTRL, who, "A").split("A"));
// 	console.log(who);
// 	console.log("  ");
// }

// console.log(
// 	"mine",
// 	Unmove(KEYPAD, Unmove(CTRL, Unmove(CTRL, mine, "A"), "A"), "A")
// );
// console.log(
// 	"theirs",
// 	Unmove(KEYPAD, Unmove(CTRL, Unmove(CTRL, theirs, "A"), "A"), "A")
// );
