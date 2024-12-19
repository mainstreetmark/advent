import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d19.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

function Validate(design, patterns) {
	// console.log("   Validate", design);
	if (design == "") return 1;
	const patternsf = patterns.filter((p) => design.length >= p.length);
	for (var pattern of patternsf) {
		var part = design.slice(0, pattern.length);
		if (part == pattern) {
			// console.log("     match", part);
			if (Validate(design.slice(pattern.length), patterns)) return 1;
		}
	}

	return 0;
}

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
		if (Validate(design, patterns)) {
			// console.log("  VALID", design, possible);
			possible++;
		} else {
			console.warn("invalid", design, possible);
		}
	}
	console.log(">>", possible);
}
