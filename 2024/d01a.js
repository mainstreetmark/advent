import fs from "fs";

import { split_string, transpose_array } from "./functions.js";

fs.readFile("inputs/d01a.txt", "utf8", (err, contents) => {
	const lines = contents.split("\n");
	const split_lines = lines
		.map((line) => split_string(line, true))
		.filter((row) => row?.length > 0);
	// console.log(split_lines);
	const transposed_lines = transpose_array(split_lines);
	// console.log("tr", transposed_lines);
	const sorted_lines = transposed_lines.map((row) =>
		row.sort((a, b) => a - b)
	);
	console.log("sl", sorted_lines);
	let dist = 0;
	for (var r in sorted_lines[0]) {
		console.log(r, sorted_lines[0][r], sorted_lines[1][r]);
		dist += Math.abs(sorted_lines[0][r] - sorted_lines[1][r]);
	}
	console.log(">>", dist);
});
