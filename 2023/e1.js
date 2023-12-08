import fs from "fs";

const MAP = {};
let KEYS = [];
let SEEDS = [];
const CACHE = {};
function Lookup(num, key) {
	const map = MAP[key];
	let out = num;
	for (var m of map) {
		const [dest, source, length] = m;
		if (num >= source && num < source + length) {
			out = dest + (num - source);
			break;
		}
	}
	const next = KEYS[KEYS.indexOf(key) + 1];
	// console.log(next);
	// console.log(key, out);
	if (next) out = Lookup(out, next);
	// CACHE[`${key}.${num}`] = out;
	return out;
}

fs.readFile("inputs/e1s.txt", "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	let key = "";
	for (var l of lines) {
		if (l) {
			if (l.slice(0, 6) === "seeds:") {
				SEEDS = l.slice(7).split(" ");
				console.log(SEEDS);
				continue;
			}
			switch (l) {
				case "seed-to-soil map:":
					key = "seed-to-soil";
					continue;
				case "soil-to-fertilizer map:":
					key = "soil-to-fertilizer";
					continue;
				case "fertilizer-to-water map:":
					key = "fertilizer-to-water";
					continue;
				case "water-to-light map:":
					key = "water-to-light";
					continue;
				case "light-to-temperature map:":
					key = "light-to-temperature";
					continue;
				case "temperature-to-humidity map:":
					key = "temperature-to-humidity";
					continue;
				case "humidity-to-location map:":
					key = "humidity-to-location";
					continue;
			}
			// console.log(key, l);
			if (!MAP[key]) {
				MAP[key] = [];
			}
			MAP[key].push(l.split(" ").map((n) => Number(n)));
		}
	}
	KEYS = Object.keys(MAP);

	// console.log(SEEDS, Object.keys(MAP), MAP);

	// console.log(Lookup(14, "seed-to-soil"));
	// console.log(Lookup(53, "fertilizer-to-water"));

	const out = [];
	let start = false;

	const TOTAL = 2549759327;
	let count = 0;

	// let ranges = [];
	// for (var seed of SEEDS) {
	// 	if (!start) start = seed;
	// 	else {
	// 		ranges.push([start, Number(seed) + Number(start)]);
	// 		start = false;
	// 	}
	// }
	// console.log(ranges);

	// for (var i = 0; i < ranges.length; i++) {
	// 	for (var j = i + 1; j < ranges.length; j++) {
	// 		if (ranges[i][0] >= ranges[j][0] && ranges[i][0] <= ranges[j][1]) {
	// 			console.log("overlap start", ranges[i], ranges[j]);
	// 		}
	// 		if (ranges[i][1] >= ranges[j][0] && ranges[i][1] <= ranges[j][1]) {
	// 			console.log("overlap stop", ranges[i], ranges[j]);
	// 		}
	// 		if (ranges[i][0] > ranges[j][0] && ranges[i][1] < ranges[j][1]) {
	// 			console.log("overlap inside", ranges[i], ranges[j]);
	// 		}
	// 		if (ranges[i][0] < ranges[j][0] && ranges[i][1] > ranges[j][1]) {
	// 			console.log("overlap outside", ranges[i], ranges[j]);
	// 		}
	// 	}
	// }

	// return;
	const time = Date.now();
	for (var seed of SEEDS) {
		// console.log(seed);
		if (!start) start = seed;
		else {
			let stop = Number(seed) + Number(start);
			console.log(start, "...", stop);
			for (var i = start; i < stop; i++) {
				count++;
				const elapsed = Date.now() - time;
				if (count % 1000000 === 0)
					console.log(
						count,
						count / TOTAL,
						Object.keys(CACHE).length,
						"\ttime",
						elapsed,
						new Date(
							time + elapsed / (count / TOTAL)
						).toLocaleString(),
						"\trate",
						count / elapsed
					);
				let lookup = 0;
				if (CACHE[`${key}.${i}`]) lookup = CACHE[`seed-to-soil.${i}`];
				else lookup = Lookup(i, "seed-to-soil");
				// CACHE[`seed-to-soil.${i}`] = lookup;

				out.push(lookup);
			}
			start = false;
		}
		// out.push(Lookup(seed, "seed-to-soil"));
	}
	// console.log(out);
	console.log(">>", Math.min(...out));
});
