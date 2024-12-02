import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { split_string } from "../functions.js";

function check_safe(report) {
	// console.log("< ", report);
	let dir = null;
	for (var i = 0; i < report.length - 1; i++) {
		if (!dir) {
			if (report[i] > report[i + 1]) dir = [-3, -1];
			else dir = [1, 3];
		}
		// console.log(report[i], report[i + 1]);
		const diff = report[i + 1] - report[i];
		if (diff < dir[0] || diff > dir[1]) return 0;
	}
	return 1;
}

const __dirname = fileURLToPath(dirname(import.meta.url));
console.log(__dirname + "/d02.txt");
fs.readFile(__dirname + "/d02.txt", "utf8", (err, contents) => {
	const lines = contents.split("\n");
	const split_lines = lines
		.map((line) => split_string(line, true))
		.filter((line) => line?.length > 0);
	let good = 0;
	for (var report of split_lines) {
		good += check_safe(report);
	}
	console.log(">>", good);
});
