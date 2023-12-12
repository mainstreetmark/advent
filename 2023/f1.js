import fs from "fs";

console.log(process.argv[2]);

fs.readFile(process.argv[2], "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	// split on whitespace
	let times = lines[0].split(/\s+/).slice(1).join("");
	let distances = lines[1].split(/\s+/).slice(1).join("");
	times = [times].map(Number);
	distances = [distances].map(Number);
	console.log(times, distances);

	let wins = [];
	for (var r = 0; r < times.length; r++) {
		// console.log(times[r]);
		wins[r] = 0;
		for (var T = 0; T < times[r]; T++) {
			let dist = T * (times[r] - T);
			if (dist > distances[r]) wins[r]++;
			// console.log(T, dist);
		}
		// break;
	}
	console.log(wins);
	console.log(
		">>",
		wins.reduce((a, b) => a * b, 1)
	);
});
