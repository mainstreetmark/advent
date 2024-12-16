import Map from "../Map.class.js";

const MAP = new Map("d16/d16t.txt");

MAP.print("Original");

const DIRS = ["^", ">", "v", "<"];

var START = MAP.find("S");
var END = MAP.find("E");
const DIR = ">";

// console.log(START, END);
let best = +Infinity;

Step(START, DIR, 0);

console.log(">>", best);

// MAP.print("After");

function Step(loc, dir, score) {
	if (score > best) return false;
	const valid = ".ES"; // valid spots
	if (!valid.includes(MAP.get(loc))) return false;
	// console.log(loc, dir, MAP.get(loc));

	var N = MAP.NEWS[0];
	var E = MAP.NEWS[1];
	var S = MAP.NEWS[2];
	var W = MAP.NEWS[3];
	if (MAP.get(loc) == "E") {
		if (score < best) {
			best = score;
			MAP.print("END " + score);
		}
		return true;
	}
	MAP.set(loc, "@");
	MAP.set(loc, dir);
	switch (dir) {
		case ">":
			Step(MAP.Go(loc, E), ">", score + 1);
			Step(MAP.Go(loc, N), "^", score + 1001);
			Step(MAP.Go(loc, S), "v", score + 1001);
			break;
		case "^":
			Step(MAP.Go(loc, N), "^", score + 1);
			Step(MAP.Go(loc, W), "<", score + 1001);
			Step(MAP.Go(loc, E), ">", score + 1001);
			break;
		case "<":
			Step(MAP.Go(loc, W), "<", score + 1);
			Step(MAP.Go(loc, N), "^", score + 1001);
			Step(MAP.Go(loc, S), "v", score + 1001);
			break;
		case "v":
			Step(MAP.Go(loc, S), "v", score + 1);
			Step(MAP.Go(loc, W), "<", score + 1001);
			Step(MAP.Go(loc, E), ">", score + 1001);
			break;
	}
	// MAP.print("After");
	MAP.set(loc, ".");
}
