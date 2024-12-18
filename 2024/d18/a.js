import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import Map from "../Map.class.js";

const tests = [
	{ W: 7, H: 7, map: "d18t.txt", start: [0, 0], exit: [6, 6], count: 12 },
	{
		W: 71,
		H: 71,
		map: "d18.txt",
		start: [0, 0],
		exit: [70, 70],
		count: 1024,
	},
];

var data = tests[1];

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + `/${data.map}`;
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

const MAP = new Map(data.W, data.H);
MAP.print("Original");

function Go(contents) {
	const map = contents.trim();
	const lines = map.split("\n");
	for (var l = 0; l < data.count; l++) {
		var line = lines[l];
		const [c, r] = line.split(",").map((s) => parseInt(s));
		MAP.set([r, c], "#");
	}

	MAP.print("After");
	var path = MAP.Path(data.start, data.exit);

	console.log(">>", path.length);
	// console.log(MAP.findAll(["#"]));
}
