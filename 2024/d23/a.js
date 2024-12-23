import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d23t.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

const connections = [];
const links = {};

var triads = [];

function Go(contents) {
	const lines = contents.trim().split("\n");
	for (var l of lines) {
		var [a, b] = l.split("-");

		if (!links[a]) links[a] = [];
		if (!links[b]) links[b] = [];
		links[a].push(b);
		links[b].push(a);
	}
	console.log(links);
	for (var c1 of Object.keys(links).sort()) {
		var array1 = links[c1];
		for (var c2 of array1) {
			if (c2 == c1) continue;
			var array2 = links[c2];
			for (var c3 of array2) {
				if (c3 == c2) continue;
				if (links[c3].includes(c1)) {
					triads.push([c1, c2, c3]);
				}
			}
			// for (var c3 of array3) {
			// 	if (c2 == c3) continue;
			// }
		}
		// for (var c2 of Object.keys(links).sort()) {
		// 	if (c1 === c2) continue;
		// 	var array2 = links[c2];
		// 	if (!array2.includes(c1)) continue;
		// 	// console.log(" ", c2, array2);
		// 	var common = array1.filter((a) => array2.includes(a));
		// 	if (common.length == 1) {
		// 		// console.log(`${c1},${c2},${common[0]}`, array2);
		// 		triads.push([c1, c2, common[0]]);
		// 		// console.log("  ", common, c1, array1, c2, array2);
		// 	}
		// }
	}
	var triads2 = [];
	// console.log(triads);
	for (var t of triads) {
		var key = t.sort().join(",");
		if (!triads2[key]) triads2[key] = [];
		triads2[key].push(t);
	}
	const triads3 = Object.keys(triads2);
	console.log(triads3.sort());
	console.log(triads3.filter((t) => t.includes("t")).sort());
	console.log(">>", triads3.filter((t) => t.includes("t")).length);
	// console.log(Object.keys(triads2), Object.keys(triads2).length);

	// 2660 too high
}
