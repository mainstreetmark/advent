import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d03.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

function Go(contents) {
	let total = 0;
	const lines = contents.split("\n");
	for (var line of lines.filter((line) => line.length > 0)) {
		total += DoLine(line);
	}
	console.log(">>>", total);
}

function DoLine(line) {
	let total = 0;
	const matches = line.match(/mul\(\d+,\d+\)/g);
	for (var match of matches) {
		// console.log("match", match);
		const [_, fn, a, b] = match.match(/(mul)\((\d+),(\d+)\)/);
		// console.log("  fn", fn, "a", a, "b", b);
		switch (fn) {
			case "mul":
				// console.log("  mul", a, b);
				total += a * b;
				break;
		}
	}
	return total;
}
