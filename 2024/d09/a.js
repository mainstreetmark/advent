import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d09t.txt";
// console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

function Go(contents) {
	const map = contents.trim();
	// console.log(map);
	const bits = map.split("").map((b) => parseInt(b));
	// console.log(bits);

	const disk = Array();
	let id = 0;
	let pos = 0;
	for (var b = 0; b < bits.length; b += 2) {
		// console.log(id, b);
		for (var p = pos; p < bits[b] + pos; p++) {
			disk[p] = id;
		}
		id++;
		pos += bits[b] + bits[b + 1];
	}

	for (var d = 0; d < disk.length; d++)
		if (typeof disk[d] === "undefined") disk[d] = ".";
	// console.log(disk.join(""));

	// console.log(">", disk);
	for (var b = disk.length - 1; b >= 0; b--) {
		if (disk[b]) {
			for (var t = 0; t < b; t++) {
				if (typeof disk[t] === "undefined" || disk[t] === ".") {
					disk[t] = disk[b];
					disk[b] = ".";
					console.log(">", disk.join(""));
					break;
				}
			}
		}
	}
	// console.log(disk.join(""));
	var sum = 0;
	for (var p = 0; p < disk.length; p++) {
		if (typeof disk[p] !== "undefined" && disk[p] !== ".") {
			sum += p * disk[p];
			// console.log(p, disk[p], sum);
		}
	}
	console.log(sum);
}
