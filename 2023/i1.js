import fs from "fs";

fs.readFile(process.argv[2], "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	let sum = 0;
	for (var l of lines) {
		if (l) {
			const seq = l.split(" ").map(Number).reverse();
			const next = DoSeq(seq);
			console.log(sum, "+", next, "\t=", sum + next);
			sum += next;
			// break;
		}
	}
	console.log(">>", sum);
	debugger;
});

function DoSeq(seq, level = 0) {
	// console.log(" ".repeat(level), seq.join(" "));
	const sum = seq.reduce((a, b) => a + b, 0);
	if (seq.filter((x) => x === 0).length === seq.length) {
		console.log("\n", " ".repeat(level), seq.join(" "), "=0");
		return 0;
	}
	const delta = [];
	for (var i = 1; i < seq.length; i++) {
		delta.push(seq[i] - seq[i - 1]);
	}
	const next = DoSeq(delta, level + 1);
	const rs = seq[seq.length - 1] + next;
	console.log(" ".repeat(level), seq.join(" "), `=${rs}`);
	return rs;
}

// 1757008096
