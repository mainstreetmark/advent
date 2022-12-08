import fs from "fs";

fs.readFile("d1.txt", "utf8", (err, contents) => {
	let count = 0;
	const lines = contents.split("\n");
	for (var l of lines) {
		if (l) {
			const pairs = l.split(",");
			// console.log(pairs);
			const r1 = pairs[0].split("-").map((n) => Number(n));
			const r2 = pairs[1].split("-").map((n) => Number(n));
			if (r2[0] >= r1[0] && r2[1] <= r1[1]) {
				count++;
				console.log("r1", pairs);
			} else if (r1[0] >= r2[0] && r1[1] <= r2[1]) {
				count++;
				console.log("r2", pairs);
			}
		}
	}
	console.log(count);
});
