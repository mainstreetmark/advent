import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d06t.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

let MAP = [];
let DIR = "^";

function PrintMap() {
	for (var line of MAP) {
		console.log(line.join(""));
	}
}

function FindStart() {
	for (var r = 0; r < MAP.length; r++) {
		for (var c = 0; c < MAP[r].length; c++) {
			if (MAP[r][c] === "^") return [r, c];
		}
	}
}

function Next(loc) {
	var next;
	switch (DIR) {
		case "<":
			next = [loc[0], loc[1] - 1];
			break;
		case "v":
			next = [loc[0] + 1, loc[1]];
			break;
		case ">":
			next = [loc[0], loc[1] + 1];
			break;
		case "^":
			next = [loc[0] - 1, loc[1]];
			break;
	}
	if (
		next[0] < 0 ||
		next[0] >= MAP.length ||
		next[1] < 0 ||
		next[1] >= MAP[0].length
	)
		return false;
	return next;
}

function Move(loc) {
	MAP[loc[0]][loc[1]] = "X";
	var next = Next(loc);
	if (!next) return false;
	var spot = MAP[next[0]][next[1]];
	if (!spot) return false;
	if (spot === ".") return next;
	if (spot === "X") return next;
	if (spot === "#") {
		const dirs = ["^", ">", "v", "<"];
		DIR = dirs[(dirs.indexOf(DIR) + 1) % 4];
		MAP[loc[0]][loc[1]] = DIR;

		// PrintMap();
		MAP[loc[0]][loc[1]] = "X";
		return Next(loc);
	}
}

function Count() {
	let count = 0;
	for (var r = 0; r < MAP.length; r++) {
		for (var c = 0; c < MAP[r].length; c++) {
			if (MAP[r][c] === "X") count++;
		}
	}
	return count;
}

function Go(contents) {
	const lines = contents.split("\n");
	for (var line of lines) {
		MAP.push(line.split(""));
	}
	PrintMap();
	let start = FindStart();
	console.log("start", start);
	let attempt = 0;
	let max = MAP.length * MAP[0].length;
	for (var r = 0; r < MAP.length; r++) {
		for (var c = 0; c < MAP[r].length; c++) {
			MAP = [];
			for (var line of lines) {
				MAP.push(line.split(""));
			}
			if (MAP[r][c] === ".") {
				MAP[r][c] = "#";
				// PrintMap();
				attempt++;
				let start = FindStart();
				DIR = "^";
				let next = start;
				let count = 0;
				while (count < 10000) {
					let next = Move(start);
					if (!next) break;
					start = next;
					count++;
					// console.log("      ", count);
				}
				PrintMap();
				console.log("  >>", `${attempt}/${max}`, count);
			}
		}
	}
	// PrintMap();
	console.log(">>", Count());
}
