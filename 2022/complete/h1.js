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
	// const [r, c] = [3, 2];
	// vis[r][c] = Look(forrest, "e", r, c);
	// vis[3][3] = Look(forrest, "e", 3, 3);
	// vis[3][3] = Look(forrest, "w", 3, 3);
	// vis[3][3] = Look(forrest, "s", 3, 3);
	for (var r = 0; r < forrest.length; r++) {
		for (var c = 0; c < forrest[0].length; c++) {
			vis[r][c] =
				Look(forrest, "n", r, c) *
				Look(forrest, "w", r, c) *
				Look(forrest, "s", r, c) *
				Look(forrest, "e", r, c);
		}
	}
	console.log(vis);
	// for (var r = 0; r < forrest.length; r++) {
	// 	for (var c = 0; c < forrest[0].length; c++) {
	// 		vis[r][c] =
	// 			String(Look(forrest, "n", r, c)) +
	// 			String(Look(forrest, "w", r, c)) +
	// 			String(Look(forrest, "s", r, c)) +
	// 			String(Look(forrest, "e", r, c));
	// 	}
	// }
	console.log(vis);
	console.log(">>", Math.max(...vis.join().split(",")));
	// console.log(
	// 	">>",
	// 	vis
	// 		.join()
	// 		.split(",")
	// 		.filter((f) => f !== "____").length
	// );
});

function Look(forrest, dir, R, C) {
	const tree = Number(forrest[R][C]);
	// console.log(forrest, dir, R, C);
	// console.log(tree, `[${R},${C}]`);
	switch (dir) {
		case "n":
			if (R == 0) return 0;
			for (var r = R - 1; r >= 0; r--) {
				// console.log(" ", dir, "trr", forrest[r][C] >= tree);
				if (forrest[r][C] >= tree) return R - r;
			}
			return R;
			break;
		case "s":
			if (R == forrest.length - 1) return 0;
			for (var r = R + 1; r < forrest.length; r++) {
				// console.log(dir, `[${r},${C}]`, forrest[r][C]);
				if (forrest[r][C] >= tree) return r - R;
			}
			// console.log(">>", R, r);
			return forrest.length - R - 1;
			break;
		case "w":
			if (C == 0) return 0;
			for (var c = C - 1; c > 0; c--) {
				// console.log(tree, dir, `[${R},${c}]`, forrest[R][c]);
				if (forrest[R][c] >= tree) return C - c;
			}
			// console.log(">>", C, c);
			return C;
			break;
		case "e":
			if (C == forrest[0].length - 1) return 0;
			for (var c = C + 1; c < forrest[0].length; c++) {
				// console.log(dir, forrest[R][c]);
				if (forrest[R][c] >= tree) return c - C;
			}
			return forrest[0].length - C - 1;
			break;
	}

	return 0;
}
