import fs from "fs";

const MAP = [];

fs.readFile(process.argv[2], "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	for (var l of lines) {
		if (l) {
			MAP.push(l.split(""));
		}
	}
	// Print(MAP);
	let lastpic = "";
	const T = 1000000000;
	for (var i = 0; i < T; i++) {
		GoNorth();
		GoWest();
		GoSouth();
		GoEast();
		// const pic = Getmap(MAP);
		// // console.log(pic);
		// if (pic == lastpic) break;
		// lastpic = pic;
		if (i % 100000 === 0) console.log(i / T);
	}

	console.log(">");
	Print(MAP);
	console.log(">>", Weigh());
	debugger;
});

function Weigh() {
	let total = 0;
	let weight = MAP.length;
	for (var r = 0; r < MAP.length; r++) {
		for (var c = 0; c < MAP[r].length; c++)
			if (MAP[r][c] == "O") total += weight;
		weight--;
	}
	return total;
}

function GoNorth() {
	for (var y = 1; y < MAP.length; y++) {
		for (var x in MAP[y]) {
			const rock = MAP[y][x];
			if (rock == "O") {
				MAP[y][x] = ".";
				const [nx, ny] = Look(Number(x), Number(y), 0, -1);
				MAP[ny][nx] = "O";
			}
		}
	}
}
function GoSouth() {
	for (var y = MAP.length - 1; y >= 0; y--) {
		for (var x in MAP[y]) {
			const rock = MAP[y][x];
			if (rock == "O") {
				MAP[y][x] = ".";
				const [nx, ny] = Look(Number(x), Number(y), 0, 1);
				MAP[ny][nx] = "O";
			}
		}
	}
}

function GoEast() {
	for (var x = MAP[0].length - 1; x >= 0; x--) {
		for (var y in MAP) {
			const rock = MAP[y][x];
			if (rock == "O") {
				MAP[y][x] = ".";
				const [nx, ny] = Look(Number(x), Number(y), 1, 0);
				MAP[ny][nx] = "O";
			}
		}
	}
}

function GoWest() {
	for (var x = 1; x < MAP[0].length; x++) {
		for (var y in MAP) {
			const rock = MAP[y][x];
			if (rock == "O") {
				MAP[y][x] = ".";
				const [nx, ny] = Look(Number(x), Number(y), -1, 0);
				MAP[ny][nx] = "O";
			}
		}
	}
}

function Look(X, Y, dx, dy) {
	if ((dx == -1 && X == 0) || (dx == 1 && X == MAP[Y].length - 1)) {
		return [X, Y];
	}
	if ((dy == -1 && Y == 0) || (dy == 1 && Y == MAP.length - 1)) {
		return [X, Y];
	}
	const rock = MAP[Y + dy][X + dx];
	if (rock == ".") {
		return Look(X + dx, Y + dy, dx, dy);
	}
	return [X, Y];
}

function Print(map) {
	for (var l of map) {
		console.log(l.join(""));
	}
}

function Getmap(map) {
	let out = "";
	for (var l of map) {
		out += l.join("");
	}
	return out;
}
