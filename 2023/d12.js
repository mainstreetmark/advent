import fs from "fs";

const SPR = [];

let COUNT = 0;
fs.readFile(process.argv[2], "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	for (var l of lines) {
		if (l) {
			console.log(l);
			const [spring, pos] = l.split(" ");
			SPR.push({ spring, pos: pos.split(",").map(Number) });

			GetCombo(spring, pos.split(",").map(Number));
			console.log(">>", COUNT);
		}
	}
	// console.log(SPR);
	debugger;
});
function GetCombo(row, groups, spring = "") {
	// console.log(">", row, spring);
	if (row.length > 0) {
		let c = 0;
		if (row[c] == "?") {
			GetCombo(row.slice(c + 1), groups, spring + "#");
			GetCombo(row.slice(c + 1), groups, spring + ".");
		} else {
			GetCombo(row.slice(c + 1), groups, spring + row[c]);
		}
	} else {
		// console.log(spring.length, spring);
		if (Validate(spring, groups)) COUNT++;
	}
}

function Validate(row, groups) {
	var springs = row.split(/\.+/g).filter((s) => s.length > 0);
	// console.log(springs);
	if (groups.length == springs.length) {
		for (var i = 0; i < groups.length; i++) {
			if (groups[i] !== springs[i].length) return false;
		}
		return true;
	}
	return false;
}
