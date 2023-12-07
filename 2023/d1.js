import fs from "fs";

fs.readFile("inputs/d1s.txt", "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	let sum = 0;
	for (var l of lines) {
		if (l) {
			// console.log(l);

			const [card, nums] = l.split(": ");
			let [lotto, mine] = nums.split(" | ");
			lotto = lotto.split(/\s+/g);
			mine = mine.split(/\s+/g);
			// console.log(card, lotto, mine);

			let matched = 0;
			for (var n of lotto) {
				if (mine.includes(n)) {
					// console.log(n);
					matched++;
				}
			}
			if (matched) {
				console.log(card, ":", matched, "=", Math.pow(2, matched - 1));
				sum += Math.pow(2, matched - 1);
			}
		}
	}
	console.log(">>", sum);
});
