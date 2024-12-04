import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const XMAS = "XMAS";
let MAP = [];
let USED = [];

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d04.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

function GetChar(x, y) {
	if (x < 0 || x >= MAP.length) return "";
	if (y < 0 || y >= MAP[x].length) return "";
	return MAP[x][y];
}
function SetChar(x, y, c) {
	if (x < 0 || x >= MAP.length) return;
	if (y < 0 || y >= MAP[x].length) return;
	USED[x] = USED[x].substring(0, y) + c + USED[x].substring(y + 1);
}
function PrintMap(map) {
	for (var line of map) {
		console.log(line);
	}
}

function Look(x, y) {
	console.log("look", x, y);
	let count = 0;

	// A-B
	// | |
	// C-D

	const A = GetChar(x - 1, y - 1);
	const B = GetChar(x - 1, y + 1);
	const C = GetChar(x + 1, y - 1);
	const D = GetChar(x + 1, y + 1);

	const match = A + B + C + D;
	const valid = ["MMSS", "MSMS", "SSMM", "SMSM"];

	if (valid.includes(match)) {
		SetChar(x, y, "A");
		SetChar(x - 1, y - 1, A);
		SetChar(x - 1, y + 1, B);
		SetChar(x + 1, y - 1, C);
		SetChar(x + 1, y + 1, D);
		count++;
	}

	return count;
}

function Go(contents) {
	let count = 0;
	MAP = contents.split("\n");
	USED = MAP.map((line) => ".".repeat(line.length));
	console.log(MAP, USED);
	for (var r = 0; r < MAP.length; r++) {
		for (var c = 0; c < MAP[r].length; c++) {
			if (GetChar(r, c) == "A") {
				count += Look(r, c);
			}
		}
	}
	PrintMap(USED);
	console.log(">>", count);
	///here
}
