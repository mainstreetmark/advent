import fs from "fs";

import { split_string, transpose_array } from "../functions.js";

fs.readFile("d01.txt", "utf8", (err, contents) => {
	const lines = contents.split("\n");
	const split_lines = lines
		.map((line) => split_string(line, true))
		.filter((row) => row?.length > 0);
	// console.log(split_lines);
	const transposed_lines = transpose_array(split_lines);
	console.log("tr", transposed_lines);
	// const sorted_lines = transposed_lines.map((row) =>
	// 	row.sort((a, b) => a - b)
	// );
	// console.log("sl", sorted_lines);
	let dist = 0;
	for (var r in transposed_lines[0]) {
		var loc = transposed_lines[0][r];
		var count = transposed_lines[1].filter((c) => c == loc).length;
		console.log(r, loc, count, "=", count * loc);
		dist += count * loc;
	}
	console.log(">>", dist);
});
