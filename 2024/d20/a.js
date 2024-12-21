// --stack-size=8192

import Map from "../Map.class.js";
import { bar } from "../functions.js";

const MAP = new Map("d20/d20t.txt");

// MAP.print("Original");
var start = MAP.find("S");
var end = MAP.find("E");
// console.log("starts", start, end);

var path = MAP.Path(start, end);
var original_time = path.length;
var cheats = {};

var count = 0;
var cheat_count = 0;
for (var s2 of path) {
	bar(count++, original_time, 90);
	// console.log(s2, MAP.Path(s2, end).length);
	for (var dir of MAP.NEWS) {
		var cut = [s2[0] + dir[0], s2[1] + dir[1]];
		if (MAP.get(cut) == "#") {
			// console.log(cut);
			MAP.set(cut, ".");
			var cheat_time =
				original_time - MAP.Path(start, end, ["#", "!"]).length;
			if (cheat_time >= 1) {
				if (!cheats[cheat_time]) {
					cheats[cheat_time] = 0;
				}
				cheats[cheat_time]++;
				cheat_count++;
			}
			MAP.set(cut, "!");
		}
	}
}

console.log(cheats);
console.log(">>", cheat_count);
// MAP.print("Path");
