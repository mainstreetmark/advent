var input = "872027 227 18 9760 0 4 67716 9245696";
const MAX = 75;

import { bar } from "../functions.js";

let line = input;

for (var i = 0; i < MAX; i++) {
	let stones = line.split(" ");
	let out = [];
	bar(i, MAX);
	while (stones.length > 0) {
		var stone = stones.shift();
		if (stone == "0") {
			out.push("1");
		} else if (stone.length % 2 == 0) {
			const half = stone.length / 2;
			const part1 = stone.slice(0, half);
			const part2 = stone.slice(half);
			out.push(String(Number(part1)));
			out.push(String(Number(part2)));
		} else {
			out.push(String(Number(stone * 2024)));
		}
	}
	line = out.join(" ");
	// console.log(line);
}
console.log(">>", line.split(" ").length);
