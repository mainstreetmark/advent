import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { bar, transpose_array } from "../functions.js";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d06.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

let MAP = [];
let DIR = "^";
let TRIES = 250000000;

function PrintMap() {
	console.log(MAP.map((l) => l.join("")).join("\n"));
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
	MAP[loc[0]][loc[1]] = DIR;
	var next = Next(loc);
	if (!next) return false;
	var spot = MAP[next[0]][next[1]];
	if (!spot) return false;
	if ("^v><.X".includes(spot)) return next;
	if ("#O".includes(spot)) {
		const dirs = ["^", ">", "v", "<"];
		DIR = dirs[(dirs.indexOf(DIR) + 1) % 4];
		MAP[loc[0]][loc[1]] = DIR;

		// PrintMap();
		MAP[loc[0]][loc[1]] = DIR;
		return Next(loc);
	}
}

function Count() {
	let count = 0;
	for (var r = 0; r < MAP.length; r++) {
		for (var c = 0; c < MAP[r].length; c++) {
			if ("^v><X".includes(MAP[r][c])) count++;
		}
	}
	return count;
}

function Attempt(contents, r, c) {
	const lines = contents.split("\n");
	MAP = [];
	DIR = "^";
	for (var line of lines) {
		MAP.push(line.split(""));
	}
	if (MAP[r][c] === ".") MAP[r][c] = "O";
	let start = FindStart();
	let next = FindStart();
	let count = 0;
	let found = false;
	while (!found) {
		next = Move(next);
		// if (MAP[r][c] === DIR) {
		// 	console.log("Loop!");
		// 	return true;
		// }
		if (!next) {
			// console.log("exit map");
			return false;
		}
		// if (next[0] === start[0] && next[1] === start[1]) found = "start";
		count++;
		if (count >= TRIES) found = "loop";
	}
	// PrintMap();
	if (count >= TRIES) {
		// console.log(" =", found, count, DIR);
		return true;
	}
	return false;
}

function Go(contents) {
	let founds = 0;
	let attempts = 0;

	const lines = contents.split("\n");
	for (var line of lines) {
		MAP.push(line.split(""));
	}
	// PrintMap();
	let start = FindStart();
	console.log("start", start);

	// Attempt(contents, 6, 3);
	// PrintMap();
	// Attempt(contents, 7, 6);
	// Attempt(contents, 7, 7);
	// Attempt(contents, 7, 85);
	// PrintMap();

	for (var r = 0; r < MAP.length; r++) {
		for (var c = 0; c < MAP[r].length; c++) {
			attempts++;
			if (Attempt(contents, r, c)) {
				founds++;
				console.clear();
				bar(attempts, 16200);
				PrintMap();
				console.log("  finds:", founds);
				console.log("X count:", Count());
				console.log("\n");
			}
		}
	}
	console.log(">>", founds);
}
