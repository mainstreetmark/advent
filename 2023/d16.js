import fs from "fs";
let MAP = [];
let HEAT = [];
let DIRS = [];

fs.readFile(process.argv[2], "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	for (var l of lines) {
		if (l) {
			let parts = l.split("");
			// console.log(parts);
			MAP.push(parts);
			HEAT.push(parts.map((x) => "."));
			DIRS.push(parts.map((x) => []));
		}
	}
	// console.log(MAP);
	// console.log(HEAT);
	Beam(1, 0, 0, 0);
	Print(HEAT);
	console.log(">>", HEAT.join("").split("#").length - 1);
	debugger;
});

function Beam(dx, dy, x, y) {
	if (x < 0 || x >= MAP[0].length || y < 0 || y >= MAP.length) {
		return;
	}
	if (DIRS[y][x].includes(`${dx}${dy}`)) {
		return;
	}
	HEAT[y][x] = "#";
	DIRS[y][x].push(`${dx}${dy}`);
	switch (MAP[y][x]) {
		case ".":
			Beam(dx, dy, x + dx, y + dy);
			break;
		case "|":
			if (dy == 0) {
				Beam(0, -1, x, y + -1);
				Beam(0, 1, x, y + 1);
			} else Beam(dx, dy, x + dx, y + dy);
			break;
		case "-":
			if (dx == 0) {
				Beam(-1, 0, x + -1, y);
				Beam(1, 0, x + 1, y);
			} else Beam(dx, dy, x + dx, y + dy);
			break;
		case "/":
			if (dy == 1) {
				Beam(-1, 0, x + -1, y);
			}
			if (dy == -1) {
				Beam(1, 0, x + 1, y);
			}
			if (dx == 1) {
				Beam(0, -1, x, y + -1);
			}
			if (dx == -1) {
				Beam(-1, 0, x + -1, y);
			}
			break;
		case "\\":
			if (dy == 1) {
				Beam(1, 0, x + 1, y);
			}
			if (dy == -1) {
				Beam(-1, 0, x + -1, y);
			}
			if (dx == 1) {
				Beam(0, 1, x, y + 1);
			}
			if (dx == -1) {
				Beam(0, -1, x, y + -1);
			}
			break;
	}
}

function Print(map) {
	let out = "";
	for (var m of map) out += m.join("") + "\n";
	console.log(out);
}
