import fs from "fs";

function HasMatch(lotto, mine) {
	let matched = 0;
	for (var n of lotto) {
		if (mine.includes(n)) {
			// console.log(" ", n);
			matched++;
		}
	}
	return matched;
}
fs.readFile("inputs/d1.txt", "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	var count = 0;
	while (count < lines.length) {
		const l = lines[count++];
		// console.log(l);
		const [card, nums] = l.split(": ");
		let [lotto, mine] = nums.split(" | ");
		lotto = lotto.trim().split(/\s+/g);
		mine = mine.trim().split(/\s+/g);
		const matches = HasMatch(lotto, mine);
		console.log(count, card, ":", matches, lines.length);
		const cardno = parseInt(card.match(/\d+/)[0]);
		// console.log(cardno);
		for (var i = cardno; i < cardno + matches; i++) {
			// console.log(" ", cardno, lines[i]);
			lines.push(lines[i]);
		}
	}
	// console.log(lines.map((l) => l.match(/\d:/)[0]).sort());
	console.log(">>", lines.length);
});
