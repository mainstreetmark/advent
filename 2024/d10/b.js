import Map from "../Map.class.js";

const map = new Map("d10/d10t.txt");

map.print("Original");
var starts = map.findAll("0");
console.log("starts", starts);

function GetScore(start) {
	const el = parseInt(map.get(start));
	const target = el + 1;
	var score = 0;
	for (var dir of Map.NEWS) {
		var spot = map.Move(start, dir);
		var el2 = map.get(spot);
		if (el2 == target) {
			if (target == 9) {
				// console.log("-".repeat(el), el2, start, spot);
				score += 1;
			} else score += GetScore(spot);
		}
	}
	return score;
}

var score = 0;
for (var start of starts) {
	map.reset();
	score += GetScore(start);
	// map.print("start" + start);
}
console.log(">>", score);
