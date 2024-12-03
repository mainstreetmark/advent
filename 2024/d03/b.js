import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d03.txt";
console.clear();
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

function Go(contents) {
	let total = 0;
	console.log("contents", contents);
	const test = `do()${contents}`;
	console.log("test", test.match(/(do\(\)|don't\(\))/gs));
	const matches = test.match(/do\(\)(.+?)(?:don't\(\)|$)/gs);
	console.log("matches", matches.length);
	for (var match of matches) {
		// console.log("  match", match);
		total += DoLine(match);
	}
	console.log(">>>", total);
}

function DoLine(line) {
	let total = 0;
	const matches = line.match(/mul\(\d+,\d+\)/g);
	if (matches && matches.length > 0) {
		for (var match of matches) {
			const [_, fn, a, b] = match.match(/(mul)\((\d+),(\d+)\)/);
			// console.log("  fn", fn, "a", a, "b", b);
			switch (fn) {
				case "mul":
					// console.log("    mul", a, b);
					total += a * b;
					break;
			}
		}
	}
	return total;
}
