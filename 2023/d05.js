import fs from "fs";
const args = process.argv;

const MAP = {};
let KEYS = [];
let SEEDS = [];
function Lookup(num, key) {
	const map = MAP[key];
	let out = num;
	for (var i = 0; i < map.length; i++) {
		const [dest, source, length] = map[i];
		if (num >= source && num < source + length) {
			// console.log(map[i]);
			out = dest - source + Number(num);
			// console.log(" >", num, ":", dest, source, length, "=", out);
			break;
		}
	}
	const next = KEYS[KEYS.indexOf(key) + 1];
	if (next) return Lookup(out, next);

	return out;
}

fs.readFile(args[2], "utf8", (err, contents) => {
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

	const TOTAL = 2549759327n;
	let count = 0n;

	// return;
	const time = BigInt(Date.now());
	let MIN = Infinity;
	for (var seed of SEEDS) {
		// console.log(seed);
		if (!start) start = BigInt(seed);
		else {
			let stop = BigInt(seed) + BigInt(start);
			console.log(start, "...", stop);
			for (var i = start; i < stop; i++) {
				count++;
				const elapsed = BigInt(Date.now()) - time;
				if (count % 10000000n === 0n)
					console.log(
						count,
						count / TOTAL,
						"\ttime",
						elapsed,
						new Date(
							Number(time) +
								Number(elapsed) /
									(Number(count) / Number(TOTAL))
						).toLocaleString(),
						"\trate",
						count / elapsed
					);
				let lookup = Lookup(i, "seed-to-soil");
				// CACHE[`seed-to-soil.${i}`] = lookup;
				// console.log("  >", i, lookup);
				// out.push(lookup);
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
