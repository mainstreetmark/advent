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
	let boxes = [];
	for (var p of parts) {
		let box = 0;
		const label = p.match(/[a-z]*/)[0];
		for (var c = 0; c < label.length; c++) {
			box += label[c].charCodeAt(0);
			box *= 17;
			box %= 256;
		}
		if (!boxes[box]) {
			boxes[box] = [];
		}
		const op = p[label.length];
		const arg = p.slice(label.length + 1);
		let index = boxes[box].findIndex((x) => x.startsWith(label));
		switch (op) {
			case "-":
				if (index > -1) {
					boxes[box].splice(index, 1);
				}
				break;
			case "=":
				if (index > -1) {
					boxes[box][index] = `${label} ${arg}`;
				} else boxes[box].push(`${label} ${arg}`);
				break;
		}
		console.log(">", p, box, op, ">", arg);
		// console.log(boxes.join("|"));
	}
	let powers = {};
	for (var b in boxes) {
		let box = boxes[b];
		let power = 0;
		for (var l in box) {
			let lense = box[l];
			let [label, length] = lense.split(" ");
			if (!powers[label]) powers[label] = 0;
			powers[label] += (1 + (b | 0)) * (1 + (l | 0)) * length;
		}
	}
	console.log(powers);
	console.log(
		">>",
		Object.values(powers).reduce((a, b) => a + b, 0)
	);
	debugger;
	// console.log(">>", total);
});
