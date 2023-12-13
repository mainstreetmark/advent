import fs from "fs";

const max = {
	blue: 14,
	red: 12,
	green: 13,
};
const bad_ids = [];
const all_ids = [];
let sum = 0;
fs.readFile("b1.txt", "utf8", (err, contents) => {
	const lines = contents.split("\n");
	for (var l of lines) {
		if (l) {
			const [game, cubes] = l.split(":");
			// console.log(game, cubes);
			const id = game.split(" ")[1];
			all_ids.push(id);
			const mins = { red: 0, green: 0, blue: 0 };
			for (var cube of cubes.trim().split("; ")) {
				console.log(">", cube, cube.split(", "));
				const bits = cube.split(", ");
				for (var bit of bits) {
					const [count, color] = bit.split(" ");
					// console.log(count, color);
					mins[color] = Math.max(mins[color], parseInt(count));
					if (count > max[color]) {
						console.log("ERROR", id, color, count);
						bad_ids.push(id);
					}
				}
			}
			console.log("max>", mins);
			sum += mins.red * mins.green * mins.blue;
		}
	}
	// console.log(all_ids, bad_ids);
	const good_ids = all_ids.filter((id) => !bad_ids.includes(id));
	// console.log(good_ids);
	// const sum = good_ids.reduce((acc, id) => acc + parseInt(id), 0);
	console.log(">>", sum);
});
