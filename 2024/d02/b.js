import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { split_string, remove_index } from "../functions.js";

function count_fails(report) {
	let safe = 0;
	for (var i = 0; i < report.length; i++) {
		const check = remove_index(report, i);
		const result = check_safe(check);
		console.log("	check", check.join(" "), result ? "\tSafe" : "\tUnsafe");
		safe += result;
	}
	console.log("report", report.join(" "), ">>", safe);
	return safe;
}

function check_safe(report, dir = null) {
	// console.log("< ", attempt, report);
	var passes = 1;
	for (var i = 1; i < report.length; i++) {
		if (!dir) {
			if (report[i - 1] > report[i]) dir = [-3, -1];
			else dir = [1, 3];
		}
		let diff = report[i] - report[i - 1];
		if (diff < dir[0] || diff > dir[1]) {
			// console.log("diff", diff, report[i - 1], report[i]);
			if (passes > 0) {
				diff = report[i + 1] - report[i - 1];
				if (isNaN(report[i + 1])) return 1;
				if (isNaN(diff)) debugger;
				// console.log("diff retrt", diff, report[i - 1], report[i + 1]);
				if (diff < dir[0] || diff > dir[1]) return 0;
				report = remove_index(report, i);
				passes--;
			} else return 0;
		}
	}
	return 1;
}

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d02.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	const lines = contents.split("\n");
	const split_lines = lines
		.map((line) => split_string(line, true))
		.filter((line) => line?.length > 0);
	let good = 0;
	for (var report of split_lines) {
		var result = check_safe(report);
		if (!result)
			console.log("result", report.join(","), result ? "Safe" : "Unsafe");
		good += result;
	}
	console.log(">>", good);
});
