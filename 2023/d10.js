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
	// Loop(x + 1, y);
	debugger;
});

function Go() {
	console.log(MAP);

	let { c, r } = FindStart();
	console.log(r, c, MAP[r][c]);
	let at = FindFirst(r, c);
	// console.log("f", at);
	let num = 1;
	while ((at = Loop(at, 1))) {
		num++;
		console.log(at.symbol);
	}

	// const num = Loop(first, 1);
	console.log(">>", (num + 1) / 2);
}

function Loop(at, dist) {
	// console.log(dist, at.symbol);
	at.seen = true;
	at.dist = dist;
	const to = at.to.find((t) => !MAP[t.r][t.c].seen);
	if (to) return MAP[to.r][to.c];
	return false;
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
