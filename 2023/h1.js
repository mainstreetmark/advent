import fs from "fs";
import lcm from "compute-lcm";

const MAP = {};

// function lcm(arr) {
// 	// Kind of a brute force method, It's not fancy but it's very simple and easy to read :P

// 	// make an array with all the numbers in the range.
// 	let numbersArr = [...arr];
// 	// for (let i = Math.min(...arr); i <= Math.max(...arr); i++) {
// 	// 	numbersArr.push(i);
// 	// }

// 	// keep multiplying the biggest number until it's divisible by all the numbers in the numbersArr array.
// 	let scm = Math.max(...arr);
// 	while (true) {
// 		if (numbersArr.every((num) => scm % num === 0)) {
// 			return scm;
// 		} else {
// 			scm += Math.max(...arr);
// 			5;
// 		}
// 	}
// }

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
	let starts = Object.keys(MAP).filter((k) => k[2] == "A");
	// starts = [starts[0]];
	console.log(starts);

	const keys = starts.map((k) => ({
		key: k,
		path: [],
		start: k,
		loop: 0,
	}));
	let step = 0;
	let begin = Date.now();
	let loop = true;
	const len = keys.length;
	while (loop) {
		const index = step % dirlength;
		// loop = false^;
		for (var i = 0; i < len; i++) {
			const k = keys[i];
			k.path.push(k.key);
			// if (!k.start) k.start = k.key;
			k.key = MAP[k.key][dirs[index]];
			if (k.key[2] == "Z") {
				if (k.loop == 0) {
					console.log(k.key);
					k.loop = k.path.length;
				}
			}
		}
		console.log(keys.filter((k) => k.loop == 0).length);
		if (keys.filter((k) => k.loop == 0).length == 0) {
			break;
		}
		step++;
		// loop = step < 1000;
		// console.log("step", step, loop);
		if (step % 100000000 == 0) {
			console.log(step.toLocaleString(), Date.now() - begin);
			begin = Date.now();
		}
	}
	console.log(
		"end",
		keys,
		keys.map((k) => k.loop)
	);
	console.log(lcm(keys.map((k) => k.loop)));
	debugger;
	// console.log(">>", step);
});
