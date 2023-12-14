import fs from "fs";
const MAP = [];
const COORD = [];
const INFLATE = 2;
fs.readFile(process.argv[2], "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	for (var l of lines) {
		if (l) {
			MAP.push(l);
			if (!l.includes("#"))
				for (var i = 0; i < INFLATE - 1; i++) MAP.push(l);
		}
	}
	Expand();
	// console.log(MAP.join("\n"), MAP.length);
	Identify();
	Path();
	// console.log(COORD);
	debugger;
});

function Path() {
	let count = 0;
	let sum = 0;
	for (var p = 0; p < COORD.length - 1; p++) {
		let coord = COORD[p];
		for (var p2 = p + 1; p2 < COORD.length; p2++) {
			let coord2 = COORD[p2];
			let dist =
				Math.abs(coord.c - coord2.c) + Math.abs(coord.r - coord2.r);
			COORD[p].min = Math.min(coord.min, dist);
			coord.to.push({ to: p2, dist });
			sum += dist;
			count++;
		}
		// console.log(coord);
	}
	// console.log(count);
	const mins = COORD.map((c) => c.min);
	console.log(">>", sum);
	return count;
}

function Identify() {
	for (var r = 0; r < MAP.length; r++) {
		let row = MAP[r];
		for (var c = 0; c < row.length; c++) {
			if (row[c] === "#") {
				COORD.push({ c, r, min: Infinity, to: [] });
			}
		}
	}
}

function Expand() {
	const cols = [];
	for (var c = 0; c < MAP[0].length; c++) {
		let found = false;
		for (var row of MAP) {
			if (row[c] === "#") {
				found = true;
				break;
			}
		}
		if (!found) {
			cols.push(c);
		}
	}
	for (var r = 0; r < MAP.length; r++) {
		let row = MAP[r];
		let row2 = "";
		console.log(r, MAP.length);
		for (var c = 0; c < row.length; c++) {
			row2 += row[c];
			if (cols.includes(c)) {
				for (var i = 0; i < INFLATE - 1; i++) row2 += row[c];
			}
		}
		MAP[r] = row2;
	}
}
