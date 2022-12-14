import fs from "fs";

fs.readFile("h1.txt", "utf8", (err, contents) => {
	const lines = contents.split("\n");
	lines.pop();
	var forrest = [];
	var vis = [];
	for (var l of lines) {
		// console.log(l);
		forrest.push(l.split(""));
		vis.push(l.split(""));
	}
	console.log(forrest);
	// vis[2][1] = Look(forrest, "w", 2, 1);
	for (var r = 0; r < forrest.length; r++) {
		for (var c = 0; c < forrest[0].length; c++) {
			vis[r][c] =
				Look(forrest, "n", r, c) +
				Look(forrest, "e", r, c) +
				Look(forrest, "w", r, c) +
				Look(forrest, "s", r, c);
		}
	}
	// console.log(vis);
	console.log(
		">>",
		vis
			.join()
			.split(",")
			.filter((f) => f !== "____").length
	);
});

function Look(forrest, dir, R, C) {
	const tree = Number(forrest[R][C]);
	// console.log(forrest, dir, R, C);
	// console.log(tree);
	switch (dir) {
		case "n":
			if (R == 0) return dir;
			for (var r = R - 1; r >= 0; r--) {
				// console.log(r, C, forrest[r][C] < tree, forrest[r][C], tree);
				if (forrest[r][C] >= tree) return "_";
			}
			break;
		case "s":
			if (r == forrest.length) return dir;
			for (var r = R + 1; r < forrest.length; r++) {
				if (forrest[r][C] >= tree) return "_";
			}
			break;
		case "w":
			if (C == 0) return dir;
			for (var c = C - 1; c >= 0; c--) {
				// console.log(forrest[R][c], tree);
				if (forrest[R][c] >= tree) return "_";
			}
			break;
		case "e":
			if (C == forrest[0].length) return dir;
			for (var c = C + 1; c < forrest[0].length; c++) {
				if (forrest[R][c] >= tree) return "_";
			}
			break;
	}

	return dir;
}
