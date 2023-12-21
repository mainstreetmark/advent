import fs from "fs";

const SPR = [];
const REP = 1;
let CACHE = {};
let COUNT = 0;
fs.readFile(process.argv[2], "utf8", (err, contents) => {
	let count = 0;
	const lines = contents.trim().split("\n");
	for (var l of lines) {
		if (l) {
			CACHE = {};
			let [spring, pos] = l.split(" ");
			spring = (spring + "?").repeat(REP).slice(0, -1);
			pos = (pos + ",")
				.repeat(REP)
				.split(",")
				.map(Number)
				.filter((s) => s > 0);
			console.log(spring, pos);
			count += GetCombo(spring, pos);
			console.log("   >", count);
			break;
		}
	}
	console.log(">>", count);
	// console.log("count: ", COUNT);
	// console.log(SPR);
	debugger;
});

function GetCombo(spring, groups) {
	// console.log(spring);
	const size = groups[0];
	spring = spring.replace(/^\.+/g, "");
	const part = spring.slice(0, size);
	// console.log(size, part);
	if (part.includes("?")) {
		const parts = Explode(part);
		console.log(part, ">", parts);
		let sum = 0;
		for (var p of parts) {
			sum += GetCombo(p + spring.slice(size), groups);
		}
		return sum;
	} else if (part == "#".repeat(size)) {
		if (groups.length == 1) {
			return 1;
		}
		return GetCombo(spring.slice(size), groups.slice(1));
	} else {
		if (groups.length == 1) {
			return 0;
		}
	}
	return 0;
}

function Explode(part) {
	const parts = part.split("?");
	if (parts.length > 1) {
		const next = Explode(parts.slice(1).join("?"));
		const hash = next.map((n) => parts[0] + "#" + n);
		const dot = next.map((n) => parts[0] + "." + n);

		// console.log(part, parts);
		let out = [...hash, ...dot];
		return out;
	}
	return [part];
}

function Do(parts) {
	let A = "." + parts;
}
