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
	const dirlength = dirs.length;
	const starts = Object.keys(MAP).filter((k) => k[2] == "A");
	console.log(starts);

	const keys = starts.map((k) => ({ key: k }));
	let step = 0;
	let begin = Date.now();
	let loop = true;
	const len = keys.length;
	while (loop) {
		// console.log(keys.filter((k) => k.key[2] == "Z").length);
		const index = step % dirlength;
		loop = false;
		for (var i = 0; i < len; i++) {
			const k = keys[i];
			k.key = MAP[k.key][dirs[index]];
			loop = loop || k.key[2] !== "Z";
		}
		step++;
		// console.log("step", step, loop);
		if (step % 100000000 == 0) {
			console.log(step.toLocaleString(), Date.now() - begin);
			begin = Date.now();
		}
	}
	console.log(">>", step);
});
