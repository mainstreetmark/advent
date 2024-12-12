var input = "872027 227 18 9760 0 4 67716 9245696";
// input = "125 17";
const MAX = 75;

import { bar } from "../functions.js";

let line = input;

const CACHE = {};

function CountIt(stone, count) {
	const key = `${count}-${stone}`;
	if (CACHE[key]) return CACHE[key];
	let sum = 0;
	// console.log("sum", "-".repeat(count), stone);
	if (count >= MAX) {
		// console.log(" >> max", stone);
		// console.log(" >> max", stone);
		return 1;
	} else if (stone == "0") {
		return CountIt("1", count + 1);
	} else if (stone.length % 2 == 0) {
		const half = stone.length / 2;
		const part1 = String(Number(stone.slice(0, half)));
		sum += CountIt(part1, count + 1);
		const part2 = String(Number(stone.slice(half)));
		sum += CountIt(part2, count + 1);
	} else {
		sum += CountIt(String(Number(stone * 2024)), count + 1);
	}
	CACHE[key] = sum;
	return sum;
}

let stones = line.split(" ");
let out = [];
var count = 0;
while (stones.length > 0) {
	var stone = stones.shift();
	count += CountIt(stone, 0);
	console.log("stone", stone, count);
	// const calcs = Calc(stone, 0);
	// calcs.forEach((o) => {
	// 	out.push(o);
	// });
}
console.log(">>", count);
console.log(Object.keys(CACHE).length);
