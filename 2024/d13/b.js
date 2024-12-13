import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { bar } from "../functions.js";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d13.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

function SplitButton(line, cost) {
	const [label, button, X, Y] = line.split(" ");
	return {
		button: button.slice(0, 1),
		X: Number(X.slice(2, -1)),
		Y: Number(Y.slice(2)),
		cost: cost,
	};
}
function SplitPrize(line) {
	var p2 = 10000000000000;
	// p2 = 0;
	const [label, X, Y] = line.split(" ");
	return {
		X: p2 + Number(X.slice(2, -1)),
		Y: p2 + Number(Y.slice(2)),
	};
}

function Go(contents) {
	const tries = 100;
	const lines = contents.split("\n");
	let total = 0;
	while (lines.length > 0) {
		const A = SplitButton(lines.shift(), 3);
		const B = SplitButton(lines.shift(), 1);
		const Prize = SplitPrize(lines.shift());
		lines.shift();
		console.log("--");
		console.log(A, B, Prize);

		// A.x * I + B.x * J = Prize.X
		// A.y * I + B.y * J = Prize.Y

		// A = (p_x * b_y - prize_y * b_x) / (a_x * b_y - a_y * b_x);
		// B = (a_x * p_y - a_y * p_x) / (a_x * b_y - a_y * b_x);

		var i = (Prize.X * B.Y - Prize.Y * B.X) / (A.X * B.Y - A.Y * B.X);
		var j = (A.X * Prize.Y - A.Y * Prize.X) / (A.X * B.Y - A.Y * B.X);
		if (i == Math.floor(i) && j == Math.floor(j)) {
			console.log(
				`${Prize.X} * ${B.Y} - ${Prize.Y} * ${B.X} / (${A.X} * ${B.Y} - ${A.Y} * ${B.X})`
			);
			console.log(i, j);
			total += A.cost * i + B.cost * j;
		}
		// console.log("tests", tests);
		// break;
	}
	console.log(">>", total);
	///here
}
