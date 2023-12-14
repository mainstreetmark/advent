import fs from "fs";
const MAP = [];

fs.readFile(process.argv[2], "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	const data = [];
	for (var l of lines) {
		if (l) {
			data.push(l.split(""));
		}
	}
	for (var r = 0; r < data.length; r++) {
		const row = [];
		for (var c = 0; c < data[r].length; c++) {
			row.push({ symbol: data[r][c], to: [], seen: false, x: c, y: r });
		}
		MAP.push(row);
	}
	for (var r = 0; r < data.length; r++) {
		for (var c = 0; c < data[r].length; c++) {
			MAP[r][c] = { ...Peek(c, r) };
		}
	}

	Go();

	CountInside();
	// Loop(x + 1, y);
	debugger;
});

function Reduce(row) {
	// console.log(row.map((s) => s.symbol).join(""));
	let line = "";
	for (var c of row) {
		if (c.seen) {
			line += c.symbol;
		} else {
			line += ".";
		}
	}
	return line
		.replaceAll(/F-*J/g, "|")
		.replaceAll(/L-*7/g, "|")
		.replaceAll(/F-*7/g, "")
		.replaceAll(/L-*J/g, "");
}

function CountInside() {
	// console.log(Reduce(MAP[2]));
	// debugger;

	let count = 0;
	for (var r = 0; r < MAP.length; r++) {
		// console.log(MAP[r].map((s) => s.symbol).join(""));
		let row = "";
		let inside = false;
		let inpipe = false;
		let corner = "";
		const newrow = Reduce(MAP[r]);
		// console.log(r + 1, MAP[r].map((s) => (s.seen ? "#" : ".")).join(""));
		console.log(r + 1, newrow);
		for (var c = 0; c < newrow.length; c++) {
			// console.log(newrow[c]);
			if (newrow[c] == "|") {
				inside = !inside;
			}
			if (newrow[c] == ".") {
				// console.log(inside);
				if (inside) count++;
			}
			// let map = MAP[r][c];
			// let symbol = map.symbol;
			// let tile = ".";
			// if (map.seen) {
			// 	tile = inside ? "#" : "#"; //symbol;
			// }

			// row += tile;
		}
		// console.log(r + 1, row);
	}
	console.log(">>", count);
}

function Go() {
	let { c, r } = FindStart();
	MAP[r][c].symbol = StartSym(r, c);
	let at = FindFirst(r, c);
	// console.log("f", at);
	let num = 1;
	while ((at = Loop(at, 1))) {
		num++;
		// console.log(at.symbol);
	}

	// const num = Loop(first, 1);
	// console.log(">>", (num + 1) / 2);
}

function Loop(at, dist) {
	// console.log(dist, at.symbol);
	at.seen = true;
	at.dist = dist;
	const to = at.to.find((t) => !MAP[t.r][t.c].seen);
	if (to) return MAP[to.r][to.c];
	return false;
}

function StartSym(r, c) {
	let dirs = "";
	if ("7J-".includes(MAP[r][c + 1]?.symbol)) dirs += "R";
	if ("FL-".includes(MAP[r][c - 1]?.symbol)) dirs += "L";
	if (r > 0) if ("F7|".includes(MAP[r - 1][c]?.symbol)) dirs += "U";
	if ("LJ|".includes(MAP[r + 1][c]?.symbol)) dirs += "D";
	const map = { RD: "F", RU: "L", LD: "7", LU: "J" };
	return map[dirs];
}

function FindFirst(r, c) {
	if ("L-F".includes(MAP[r][c - 1]?.symbol)) return MAP[r][c - 1];
	if ("J-7".includes(MAP[r][c + 1]?.symbol)) return MAP[r][c + 1];
	if ("7|F".includes(MAP[r - 1][c]?.symbol)) return MAP[r - 1][c];
	if ("L|J".includes(MAP[r + 1][c]?.symbol)) return MAP[r + 1][c];
}

function FindStart() {
	for (var r = 0; r < MAP.length; r++) {
		for (var c = 0; c < MAP[r].length; c++) {
			if (MAP[r][c].symbol === "S") {
				MAP[r][c].seen = true;
				const at = { c: c, r: r };
				return at;
			}
		}
	}
}

function Peek(c, r) {
	const at = { symbol: MAP[r][c].symbol, to: [], r, c, seen: false };
	switch (at.symbol) {
		case "-":
			at.to.push({ c: c + 1, r: r });
			at.to.push({ c: c - 1, r: r });
			break;
		case "|":
			at.to.push({ c: c, r: r + 1 });
			at.to.push({ c: c, r: r - 1 });
			break;
		case "L":
			at.to.push({ c: c + 1, r: r });
			at.to.push({ c: c, r: r - 1 });
			break;
		case "J":
			at.to.push({ c: c - 1, r: r });
			at.to.push({ c: c, r: r - 1 });
			break;
		case "7":
			at.to.push({ c: c - 1, r: r });
			at.to.push({ c: c, r: r + 1 });
			break;
		case "F":
			at.to.push({ c: c + 1, r: r });
			at.to.push({ c: c, r: r + 1 });
			break;
	}
	return at;
}
