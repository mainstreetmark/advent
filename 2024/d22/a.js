import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d22.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

var TIMES = 2000;

const mix = (val, secret) => (val ^ secret) >>> 0;
const prune = (a) => a % 16777216;

function Go(contents) {
	const lines = contents.trim().split("\n").map(Number);
	console.log(lines);
	var total = 0;

	for (var secret of lines) {
		var val = secret;
		for (var t = 0; t < 2000; t++) {
			val = prune(mix(val * 64, val));
			val = prune(mix(Math.floor(val / 32), val));
			val = prune(mix(val * 2048, val));
		}
		console.log(`${secret}:`, val);
		total += val;
	}
	console.log(">>", total);
}
// }

// var test = 1541105;
// console.log(test, mix(test * 2048, test));
// console.log(test, prune(100106161));
// console.log(test, prune(mix(test * 2048, test)));
