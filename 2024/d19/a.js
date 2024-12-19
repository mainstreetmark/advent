import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

var CACHE = {};

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d19.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

function Validate(design, patterns, depth = 0) {
	if (design == "") return 1;
	if (design.length > 0 && patterns.length === 0) return 0;

	const patternsf = patterns.filter((p) => design.indexOf(p) == 0);
	var count = 0;
	for (var pattern of patternsf) {
		// console.log(count++, " ".repeat(depth), design, pattern, patternsf);
		const key = `${design}|${pattern}`;
		if (CACHE[key] === undefined) {
			CACHE[key] = Validate(
				design.slice(pattern.length),
				patterns,
				depth + 1
			);
		}
		if (CACHE[key]) {
			return 1;
		}
	}
	return 0;
}

// 236 low
// 401 high

function Go(contents) {
	const lines = contents.trim().split("\n");
	const patterns = lines
		.shift()
		.split(", ")
		.sort((a, b) => b.length - a.length);
	console.log(patterns);
	lines.shift();
	var possible = 0;
	for (var design of lines) {
		// console.log("\n DESSIGN:", design);
		if (Validate(design, patterns)) {
			// console.log("  VALID", design, possible);
			possible++;
		} else {
			console.warn("invalid", design, possible);
		}
	}
	console.log(">>", possible);
}
