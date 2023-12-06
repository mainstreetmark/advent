import fs from "fs";

const map = [];
const matches = [];

function GetChar(x, y) {
	return map[y].charAt(x);
}

fs.readFile("inputs/c1s.txt", "utf8", (err, contents) => {
	const lines = contents.split("\n");
	for (var l of lines) {
		if (l) {
			// console.log(l);
			map.push(l);
		}
	}

	// console.log(map);

	for (var y in map) {
		const line = map[y];
		for (var x = 0; x < line.length; x++) {
			const char = GetChar(x, y);
			if (char > 0) {
				let match = "";
				for (var x2 = x; x2 < line.length; x++) {
					const char2 = GetChar(x2, y);
					if (char2 > 0) {
						match += char2;
					}
					if (char2 == ".") break;
				}
				console.log(match);
			}
		}
	}
});
