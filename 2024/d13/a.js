import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

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
	const [label, X, Y] = line.split(" ");
	return {
		X: Number(X.slice(2, -1)),
		Y: Number(Y.slice(2)),
	};
}

function Go(contents) {
	const lines = contents.split("\n");
	let total = 0;
	while (lines.length > 0) {
		const A = SplitButton(lines.shift(), 3);
		const B = SplitButton(lines.shift(), 1);
		const Prize = SplitPrize(lines.shift());
		lines.shift();
		console.log("--");
		console.log(A, B, Prize);

		var matches = [];
		for (var i = 0; i < 100; i++) {
			for (var j = 0; j < 100; j++) {
				if (
					A.X * i + B.X * j == Prize.X &&
					A.Y * i + B.Y * j == Prize.Y
				) {
					matches.push({ i, j, cost: A.cost * i + B.cost * j });
				}
			}
		}
		matches = matches.reduce(function (prev, curr) {
			return prev.cost < curr.cost ? prev : curr;
		}, Infinity);
		if (matches.cost) {
			total += matches.cost;
			console.log(">", matches);
		}
		// break;
	}
	console.log(">>", total);
	///here
}
