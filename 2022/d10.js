import fs from "fs";

let cycle = 0;
let X = 1;
let cost = 0;
let dx = 0;
let sum = 0;
fs.readFile("d10.txt", "utf8", (err, contents) => {
	const lines = contents.split("\n");
	for (var l of lines) {
		const [cmd, arg] = l.split(" ");
		switch (cmd) {
			case "addx":
				dx = Number(arg);
				cost = 2;
				break;
			case "noop":
				cost = 1;
				break;
		}
		for (var c = 0; c < cost; c++) {
			cycle++;
			console.log(cycle, l, ":", X);
			if (cycle == 20 || (cycle + 20) % 40 == 0) sum += cycle * X;
		}
		X += dx;
		if (dx) console.log("  -> X=", X);
		dx = 0;
	}
	console.log(">>", sum);
});
