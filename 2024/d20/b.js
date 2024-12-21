// --stack-size=8192

import Map from "../Map.class.js";
import { bar } from "../functions.js";

const MAP = new Map("d20/d20.txt");
const MAX_TIME = 20;
const LEAST_TIME = 100;

// MAP.print("Original");
var start = MAP.find("S");
var end = MAP.find("E");
console.log("starts", start, end);

var path = [start, ...MAP.Path(start, end)];
var original_time = path.length;
var cheats = {};

// 9447 is too low

var count = 0;
var cheat_count = 0;

for (var s2 of path) {
	if (original_time > 1000) bar(count++, original_time, 90);

	var new_time = MAP.Path(s2, end).length;
	// console.log(s2, new_time); // time from S2 to the end
	for (var dx = -MAX_TIME; dx <= MAX_TIME; dx++) {
		for (var dy = -MAX_TIME; dy <= MAX_TIME; dy++) {
			if (s2[0] + dx < 0 || s2[1] + dy < 0) continue;
			if (s2[0] + dx >= MAP.width || s2[1] + dy >= MAP.height) continue;
			var time2 = Math.abs(dx) + Math.abs(dy); // time to move to the new cheat position
			if (time2 > MAX_TIME) continue;
			if (dx == 0 && dy == 0) continue;
			var test_pos = [s2[0] + dx, s2[1] + dy];
			if ([".", "E"].includes(MAP.get(test_pos))) {
				// MAP.show(test_pos, "?");
				// MAP.set(test_pos, "@");
				if (s2[0] == 7 && s2[1] == 7) debugger;
				var test_path = MAP.Path(MAP.add(s2, [dx, dy]), end);
				var test_time = test_path.length;
				const deltat = test_time - new_time + time2 + 0;
				if (deltat <= -LEAST_TIME) {
					// console.log(" ", test_pos, new_time, test_time, deltat);
					if (!cheats[deltat]) {
						cheats[deltat] = 0;
					}
					cheats[deltat]++;
					cheat_count++;
					// MAP.print(test_pos.join("x"));
				}
				// MAP.set(test_pos, "!");
			}
		}
	}
	MAP.set(s2, ",");
	// MAP.printcache();
	// break;
}

console.log(cheats);
console.log(">>", cheat_count);
// MAP.print("Path");
