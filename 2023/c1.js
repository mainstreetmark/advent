import fs from "fs";

const map = [];
const matches = [];

function GetChar(x, y) {
	return map[y].charAt(x);
}

function NearSymbol(match, rows, cols) {
	// if (match.match == "485") debugger;
	const l = match.match.length;
	var x1 = Math.max(0, match.x - 1);
	var x2 = Math.min(cols, match.x + l + 1);
	var y1 = Math.max(0, match.y - 1);
	var y2 = Math.min(rows, match.y + 1);
	// console.log(match, l, "\t", x1, x2, y1, y2);
	const string = map.join("");
	// console.log(string);
	let out = "";
	for (var Y = y1; Y <= y2; Y++) {
		for (var X = x1; X < x2; X++) {
			const char = string.charAt(Y * cols + X);
			// console.log(" ", X, Y, char);
			out += char;
			if (isNaN(char) && char !== ".") {
				// console.log(`>${char}<`, match.match);
				return true;
			}
		}
		out += "\n";
	}
	// console.log(out);
	return false;
}

fs.readFile("inputs/c1s.txt", "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	let rows = lines.length;
	let cols = 0;
	for (var l of lines) {
		if (l) {
			// console.log(l);
			map.push(l);
			cols = l.length;
		}
	}

	// console.log(map);

	for (var y in map) {
		let _line = "";
		const line = map[y];
		for (var x = 0; x < line.length; x++) {
			const char = GetChar(x, y);
			if (char >= 0) {
				let match = "";
				for (var x = x; x < line.length; x++) {
					const char2 = GetChar(x, y);
					if (!isNaN(char2)) {
						match += char2;
					} else break;
					_line += " ";
				}
				// console.log(match, x - match.length, y);
				matches.push({
					match,
					x: x - match.length,
					y: Number(y),
				});
			}
			_line += ".";
		}
		// console.log(line);
		// console.log(_line);
	}
	// console.log(JSON.stringify(matches));
	let sum = 0;
	for (var match of matches) {
		if (NearSymbol(match, rows, cols)) {
			// console.log(match);
			sum += Number(match.match);
		}
	}
	console.log(">>", sum);
});
