import fs from "fs";

const MAP = {};
let KEYS = [];
let SEEDS = [];
// function Lookup(num, key) {
// 	const map = MAP[key];
// 	let out = num;
// 	for (var i = 0; i < map.length; i++) {
// 		const [dest, source, length] = map[i];
// 		if (num >= source && num < source + length) {
// 			// console.log(map[i]);
// 			out = dest - source + Number(num);
// 			// console.log(" >", num, ":", dest, source, length, "=", out);
// 			break;
// 		}
// 	}
// 	const next = KEYS[KEYS.indexOf(key) + 1];
// 	if (next) return Lookup(out, next);

// 	return out;
// }

fs.readFile(process.argv[2], "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	let key = "";
	for (var l of lines) {
		if (l) {
			if (l.slice(0, 6) === "seeds:") {
				SEEDS = l.slice(7).split(" ");
				// console.log(SEEDS);
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

	// function Levels(key) {
	// 	const next = KEYS[KEYS.indexOf(key) + 1];
	// 	let map = {};
	// 	if (next) map = Levels(next);
	// 	// console.log("  >", key);
	// 	for (var m of MAP[key].sort((a, b) => a[1] - b[1])) {
	// 		const [dest, source, length] = m;
	// 		const delta = source - dest;
	// 		const start = source;
	// 		const stop = source + length - 1;
	// 		// console.log("  >>", start, stop, delta);
	// 		map[start] = map[start] ? map[start] - delta : -delta;
	// 		map[stop] = map[stop] ? map[stop] + delta : +delta;
	// 	}
	// 	// console.log(key, map);
	// 	return map;
	// }
	function Levels(key) {
		let map = {};
	}
	var LEVELS = Levels("seed-to-soil");

	function in_range(num) {
		// console.log(SEEDS);
		for (var i = 0; i < SEEDS.length; i += 2) {
			// console.log(SEEDS[i], num, SEEDS[i] + SEEDS[i + 1]);
			if (
				num >= SEEDS[i] &&
				num < Number(SEEDS[i]) + Number(SEEDS[i + 1])
			)
				return true;
		}
		return false;
	}

	function Lookup(num) {
		console.log(num);
	}
	console.log("LEVELS", LEVELS);

	process.exit();
	// console.log(keys);
	let min = Infinity;
	for (var k of keys) {
		// console.log(">>>>", Number(k) + Number(LEVELS[k]));
		if (Number(k) + Number(SUMS2[k]) < min) {
			if (in_range(Number(k) + Number(SUMS2[k])))
				min = Number(k) + Number(SUMS2[k]);
		}
	}
	console.log(min);

	process.exit();
	const out = [];
	let start = false;

	const TOTAL = 2549759327;
	let count = 0;

	// return;
	const time = Date.now();
	let MIN = Infinity;
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
						"\ttime",
						elapsed,
						new Date(
							time + elapsed / (count / TOTAL)
						).toLocaleString(),
						"\trate",
						count / elapsed
					);
				let lookup = Lookup(i, "seed-to-soil");
				// CACHE[`seed-to-soil.${i}`] = lookup;
				// console.log("  >", i, lookup);
				out.push(lookup);
				if (lookup < MIN) MIN = lookup;
			}
			start = false;
		}
		console.log("next");
		// out.push(Lookup(seed, "seed-to-soil"));
	}
	// console.log(out);
	console.log(">>", MIN);
});
