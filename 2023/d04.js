import fs from "fs";

fs.readFile("inputs/d1.txt", "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	let sum = 0;
	for (var l of lines) {
		if (l) {
			// console.log(l);

			const [card, nums] = l.split(": ");
			let [lotto, mine] = nums.split(" | ");
			lotto = lotto.trim().split(/\s+/g);
			mine = mine.trim().split(/\s+/g);
			// console.log(card, lotto, mine);

			let matched = 0;
			let val = 0;
			for (var n of lotto) {
				if (mine.includes(n)) {
					if (val > 0) val *= 2;
					else val = 1;
					// console.log(" ", n);
					matched++;
				}
			}
			sum += val;
			if (matched > 0) {
				console.log(
					card,
					":",
					matched,
					val,
					"=",
					Math.pow(2, matched - 1)
				);
				// sum += Math.pow(2, matched - 1);
			}
		}
	}
	console.log(">>", sum);
});
