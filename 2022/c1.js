import fs from "fs";

fs.readFile("c1.txt", "utf8", (err, contents) => {
	const lines = contents.split("\n");
	let sum = 0;
	let line = 0;
	for (line = 0; line < lines.length; line += 3) {
		const l1 = lines[line];
		const l2 = lines[line + 1];
		const l3 = lines[line + 2];

		for (var c of l1.split("")) {
			if (l2.indexOf(c) >= 0 && l3.indexOf(c) >= 0) {
				break;
			}
		}
		console.log(c);

		const pri = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

		console.log(pri.indexOf(c));
		sum += pri.indexOf(c);
	}
	console.log(">>", sum);
});
