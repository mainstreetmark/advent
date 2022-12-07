import fs from "fs";

fs.readFile("c1.txt", "utf8", (err, contents) => {
	const lines = contents.split("\n");
	let sum = 0;
	for (var l of lines) {
		// console.log(l);
		const csize = l.length / 2;
		const c1 = l.substring(0, csize);
		const c2 = l.substring(csize, l.length);
		console.log(l, c1, c2);

		for (var c of c1.split("")) {
			if (c2.indexOf(c) >= 0) {
				break;
			}
		}

		const pri = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

		console.log(pri.indexOf(c));
		sum += pri.indexOf(c);
	}
	console.log(">>", sum);
});
