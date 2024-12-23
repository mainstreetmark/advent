import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d22t.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

var TIMES = 2000;

const mix = (val, secret) => (val ^ secret) >>> 0;
const prune = (a) => a % 16777216;
const uniq = (array) => [...new Set(array)];

var SEQS = {};
var ALLSEQS = {};

function Go(contents) {
	const lines = contents.trim().split("\n").map(Number);
	console.log(lines);
	var total = 0;

	for (var secret of lines) {
		SEQS[secret] = Array(10).map((a) => []);
		var val = secret;
		var ones = -1;
		var lastones = NaN;
		var seq = [];
		for (var t = 0; t < 2000; t++) {
			ones = Number(String(val).charAt(String(val).length - 1));
			// console.log("  ", val, ones, `(${ones - lastones})`);
			seq.push(ones - lastones);
			if (t > 3) {
				seq.shift();
				if (!SEQS[secret][ones]) {
					SEQS[secret][ones] = [];
				}
				SEQS[secret][ones].push(seq.join(","));

				if (!ALLSEQS[seq.join(",")]) ALLSEQS[seq.join(",")] = [];
				ALLSEQS[seq.join(",")].push(ones);
			}
			val = prune(mix(val * 64, val));
			val = prune(mix(Math.floor(val / 32), val));
			val = prune(mix(val * 2048, val));
			lastones = ones;
		}
		// console.log(`${secret}:`, val);
		total += val;
	}
	for (var seq of Object.keys(ALLSEQS)) {
		ALLSEQS[seq] = uniq(ALLSEQS[seq]);
		// if (ALLSEQS[seq].length < 3) {
		// 	delete ALLSEQS[seq];
		// }
	}
	console.log(ALLSEQS);
	console.log(
		Object.keys(ALLSEQS).map((a) => ALLSEQS[a].reduce((x, y) => x + y, 0)),
		Math.max(
			...Object.keys(ALLSEQS).map((a) =>
				ALLSEQS[a].reduce((x, y) => x + y, 0)
			)
		)
	);

	var test;
	test = "-1,-3,3,2"; // my test
	// test = "-2,1,-1,3"; // example
	// console.log("\n--", SEQS);
	for (var v of Object.keys(SEQS)) {
		// console.log(">", v, SEQS[v]);
		for (var s in SEQS[v]) {
			// console.log(">>", v, s);
			if (SEQS[v][s].indexOf(test) > -1) {
				console.log(
					">>>>",
					s,
					SEQS[v][s].filter((t) => t == test),
					SEQS[v][s].filter((t) => t == test).length
				);
			}
		}
	}
	console.log(
		">>",
		Math.max(
			...Object.keys(ALLSEQS).map((a) =>
				ALLSEQS[a].reduce((x, y) => x + y, 0)
			)
		)
	);
}
// }

// var test = 1541105;
// console.log(test, mix(test * 2048, test));
// console.log(test, prune(100106161));
// console.log(test, prune(mix(test * 2048, test)));
