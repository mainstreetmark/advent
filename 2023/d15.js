import fs from "fs";

fs.readFile(process.argv[2], "utf8", (err, contents) => {
	let parts = [];
	const lines = contents.trim().split("\n");
	for (var l of lines) {
		if (l) {
			parts.push(...l.split(","));
		}
	}
	let total = 0;
	for (var p of parts) {
		let sum = 0;
		console.log(p);
		for (var c = 0; c < p.length; c++) {
			sum += p[c].charCodeAt(0);
			sum *= 17;
			sum %= 256;
		}
		total += sum;
		console.log(">", p, sum);
	}
	console.log(">>", total);
});
