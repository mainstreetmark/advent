import fs from "fs";

const MAP = {};

fs.readFile(process.argv[2], "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	const dirs = lines.shift().split("");
	for (var l of lines) {
		if (l) {
			const id = l.slice(0, 3);
			const left = l.slice(7, 10);
			const right = l.slice(12, 15);
			// console.log(key, left, right);
			MAP[id] = { L: left, R: right };
		}
	}
	console.log(dirs, MAP);

	let key = "AAA";
	let step = 0;
	while (key !== "ZZZ") {
		const index = step % dirs.length;
		key = MAP[key][dirs[index]];
		console.log(key);
		step++;
	}
	console.log(">>", step);
});
