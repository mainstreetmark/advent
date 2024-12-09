import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d09.txt";
// console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

function IsFree(disk, start, size) {
	for (var d = start; d < start + size; d++) {
		if (disk[d] !== ".") return false;
	}
	return true;
}

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

	// console.log(">", disk.join(""), id);

	for (var b = id - 1; b >= 0; b--) {
		var start = disk.indexOf(b);
		var end = disk.lastIndexOf(b);
		const size = end - start + 1;
		// console.log(b, start, end, size);

		for (var p = 0; p < start; p++) {
			if (disk[p] == ".") {
				if (IsFree(disk, p, size)) {
					for (var x = p; x < p + size; x++) disk[x] = b;
					for (var x = start; x <= end; x++) disk[x] = ".";
					// console.log(">", disk.join(""), id);
					break;
				}
			}
		}
	}
	// for (var b = disk.length - 1; b >= 0; b--) {
	// 	if (disk[b]) {
	// 		for (var t = 0; t < b; t++) {
	// 			if (typeof disk[t] === "undefined" || disk[t] === ".") {
	// 				disk[t] = disk[b];
	// 				disk[b] = ".";
	// 				console.log(">", disk.join(""));
	// 				break;
	// 			}
	// 		}
	// 	}
	// }
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
