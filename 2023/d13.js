import fs from "fs";
const MAPS = [];

fs.readFile(process.argv[2], "utf8", (err, contents) => {
	let count = 0;
	const lines = contents.trim().split("\n");
	lines.push("");
	// console.log(lines);
	var rows = [];
	for (var l of lines) {
		// console.log(l);
		if (l.length > 0) {
			rows.push(l);
		} else {
			// MAPS.push({ R: ByRow(rows), C: ByCol(rows) });
			let row = GetMirror(ByRow(rows));
			let col = GetMirror(ByCol(rows));
			count += row * 100 + col;
			console.log(row, col);
			rows = [];
		}
	}
	console.log(">>", count);
	debugger;
});

function GetMirror(map) {
	let lastline = "";
	let lastlastline = "";
	for (var r = 0; r < map.length; r++) {
		var line = map[r].join("");
		if (line == lastline || CountDiff(line, lastline) == 1) {
			if (Validate(r, map)) return r;
		}
		lastlastline = lastline;
		lastline = line;
	}
	return 0;
}

function Validate(r, map) {
	let smudge = false;
	const size = map.length;
	let min = Math.min(r, size - r);
	for (var i = 0; i < min; i++) {
		const a = map[r - i - 1].join("");
		const b = map[r + i].join("");
		// console.log(r, map[r - i - 1].join(""), map[r + i].join(""));
		if (a !== b) {
			console.log(a, b, CountDiff(a, b));
			if (CountDiff(a, b) == 1) {
				console.log("smudge");
				smudge = true;
			} else return false;
		}
	}
	return smudge;
}

function CountDiff(a, b) {
	let count = 0;
	for (var i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) count++;
	}
	return count;
}

function ByRow(lines) {
	const rows = [];
	for (var l of lines) {
		rows.push(l.split(""));
	}
	return rows;
}

function ByCol(rows) {
	const cols = Array(rows[0].length);
	for (var r = 0; r < rows.length; r++) {
		var line = rows[r];
		for (var c = 0; c < line.length; c++) {
			if (!cols[c]) {
				cols[c] = [];
			}
			cols[c].push(line[c]);
		}
	}
	return cols;
}
