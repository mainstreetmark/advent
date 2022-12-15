import fs from "fs";

function in_range(range, val) {
	return val >= range[0] && val <= range[1];
}

fs.readFile("d1.txt", "utf8", (err, contents) => {
	let count = 0;
	const lines = contents.split("\n");
	for (var l of lines) {
		if (l) {
			const pairs = l.split(",");
			// console.log(pairs);
			const r1 = pairs[0].split("-").map((n) => Number(n));
			const r2 = pairs[1].split("-").map((n) => Number(n));
			if (in_range(r1, r2[0])) {
				count++;
			} else if (in_range(r1, r2[1])) {
				count++;
			} else if (in_range(r2, r1[0])) {
				count++;
			} else if (in_range(r2, r1[1])) {
				count++;
			}
		}
	}
	console.log(count);
});
