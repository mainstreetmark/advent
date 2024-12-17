import Map from "../Map.class.js";

const MAP = new Map("d16/d16t.txt");

// NOTES FROM THE FUTURE:https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm

// MAP.print("Original");

const DIRS = ["^", ">", "v", "<"];
const CACHE = {};

var START = MAP.find("S");
var END = MAP.find("E");
const DIR = ">";

async function main() {
	console.log(">>", await Step(START, [0, 1], 0));
	// for (var c of Object.keys(CACHE)) {
	// 	if (CACHE[c] < Infinity) {
	// 		console.log(c, CACHE[c]);
	// 	}
	// }

	// MAP.print("After");
}

main();

async function Step(loc, dir, cost, depth = 0, total = 0) {
	return new Promise(async (resolve) => {
		// console.log(" ".repeat(depth) + "Step(", loc, dir, cost, depth, ")");
		var key = `${loc[0]},${loc[1]},${dir}`;
		if (CACHE[key]) {
			// console.log("cache", key, CACHE[key]);
			resolve(CACHE[key] + cost);
			return;
		} else {
			const valid = ".,ES"; // valid spots
			if (!valid.includes(MAP.get(loc))) {
				resolve(false);
				return;
			} else {
				const strings = {
					"0,-1": "<",
					"1,0": "v",
					"0,1": ">",
					"-1,0": "^",
				};
				// console.log(step, key);
				// MAP.set(loc, "@");
				// MAP.print("map" + dir);
				// if (loc[0] == 11) {
				// 	MAP.print();
				// 	debugger;
				// }
				var dirstring = "^>v<";
				var fwd = dirstring.indexOf(dir);
				if (MAP.get(loc) == "E") {
					// MAP.print("END " + total);
					resolve(cost);
					return;
				} else {
					MAP.set(loc, "@");
					// MAP.print(key);
					MAP.set(loc, strings[dir.join(",")]);
					// MAP.print(key);
					var dirs = [];
					switch (dir.join(",")) {
						case "1,0":
						case "-1,0":
							dirs = [dir, [0, -1], [0, 1]];
							break;
						case "0,-1":
						case "0,1":
							dirs = [dir, [-1, 0], [1, 0]];
							break;
					}
					let nextcost = 1;
					var prices = [];
					for (var d of dirs) {
						prices.push(
							await Step(
								MAP.Go(loc, d),
								d,
								nextcost,
								depth + 1,
								total + nextcost
							)
						);
						nextcost = 1001;
					}
					// console.log(prices);
					MAP.set(loc, ".");
					CACHE[key] = Math.min(...prices.filter((p) => p !== false));
					resolve(CACHE[key] + cost);
					return;
				}
			}
		}
	});
}
