import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import Map from "../Map.class.js";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d15.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

let MAP = null;

const DIR = {
	"^": [-1, 0],
	v: [1, 0],
	"<": [0, -1],
	">": [0, 1],
};

function Go(contents) {
	const lines = contents.split("\n");
	let map = [];
	let mode = "map";
	let path = "";
	for (var line of lines) {
		if (mode == "map") {
			if (line.length == 0) {
				mode = "move";
				continue;
			}
			map.push(line);
		} else {
			path += line;
		}
	}
	// console.log(map, path);
	MAP = new Map(map);
	MAP.print("Original");
	Start(MAP, path);
	///here
}

function Start(map, path) {
	var loc = map.find("@");

	for (var p of path) {
		// console.log(p);
		if (Push(map, loc, p)) {
			loc = map.Go(loc, DIR[p]);
			// map.Move(loc, map.Go(loc, DIR[p]), ".");
		}
	}
	map.print("Final");

	let boxes = map.findAll("O");
	var sum = 0;
	console.log("boxes", boxes);
	for (var b of boxes) {
		sum += b[0] * 100 + b[1];
	}
	console.log(">>", sum);
}

function Push(map, loc, dir) {
	var next = map.Look(loc, DIR[dir]);
	// console.log(next);
	switch (next) {
		case ".":
			map.Move(loc, map.Go(loc, DIR[dir]), ".");
			return true;
		case "#":
			return false;
		case "O":
			if (Push(map, map.add(loc, DIR[dir]), dir)) {
				map.Move(loc, map.Go(loc, DIR[dir]), ".");
				return true;
			}
			return false;
		case null:
			return false;
	}
}
