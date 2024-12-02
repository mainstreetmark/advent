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
	// console.log("> ", report);
	var passes = 1;
	for (var i = 1; i < report.length; i++) {
		if (!dir) {
			if (report[i - 1] > report[i]) dir = [-3, -1];
			else dir = [1, 3];
		}
		let diff = report[i] - report[i - 1];
		if (diff < dir[0] || diff > dir[1]) return 0;
	}

	return 1;
}

function get_deltas(report) {
	const delta = [];
	for (var i = 1; i < report.length; i++) {
		delta.push(report[i] - report[i - 1]);
	}
	return delta;
}

function check_unsafe(report) {
	var dir = null;
	console.log("\n >>unsafe:", report.join(" "));
	let pass = 0;
	for (var i = 0; i < report.length; i++) {
		var report2 = remove_index(report, i);
		console.log(
			"    report2: ",
			report2.join(" "),
			"=",
			check_safe(report2)
		);
		pass += check_safe(report2);
	}
	if (pass > 0) console.log("    passes: ", pass);
	// console.log("    passes: ", pass);
	return pass > 0;
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
		// console.log(get_deltas(report));
		var result = check_safe(report);
		if (!result) result = check_unsafe(report);
		// if (!result)
		console.log(
			"result",
			report.join(","),
			get_deltas(report),
			result ? "Safe" : "Unsafe"
		);
		good += result;
	}
	console.log(">>", good);
});
