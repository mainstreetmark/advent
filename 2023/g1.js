import fs from "fs";

const TYPES = [
	"",
	"high card",
	"1 pair",
	"2 pair",
	"3 of a kind",
	"full house",
	"4 of a kind  ",
	"* 5 OF A KIND         <---",
];

function GetType(hand) {
	var cards = hand.split("");
	const repeats = {};
	for (var c of cards) {
		// console.log(" >", c);
		if (!repeats[c]) repeats[c] = 0;
		repeats[c]++;
	}
	const counts = Object.values(repeats);
	const max = Math.max(...counts);
	if (max === 5) return 7; // 5 of a kind
	if (max === 4) return 6; // 4 of a kind
	if (counts.indexOf(3) !== -1 && counts.indexOf(2) !== -1) return 5; // full house
	if (max === 3) return 4; // 3 of a kind
	if (counts.filter((c) => c === 2).length === 2) return 3; // 2 pair
	if (max === 2) return 2; // 1 pair
	return 1; // high card
}

function ToVal(hand) {
	const index = "23456789TJQKA";
	const cards = hand.split("");
	let val = 0;
	for (var i = 0; i < cards.length; i++) {
		// console.log(
		// 	cards[i],
		// 	(index.indexOf(cards[i]) + 1) *
		// 		Math.pow(10, 2 * (cards.length - i + 2))
		// );
		val +=
			(index.indexOf(cards[i]) + 1) *
			Math.pow(10, 2 * (cards.length - i + 2));
	}
	return val;
}

const hands = [];
fs.readFile(process.argv[2], "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	for (var l of lines) {
		if (l) {
			const split = l.split(" ");
			hands.push({ hand: split[0], bet: split[1] });
		}
	}

	for (var hand of hands) {
		hand.type = GetType(hand.hand);
	}
	const rank = hands.sort((a, b) => {
		if (a.type < b.type) return -1;
		if (a.type > b.type) return 1;
		if (ToVal(a.hand) < ToVal(b.hand)) return -1;
		return 1;
	});

	// console.log(rank.map((h) => h.hand));

	let winnings = 0;
	for (var c = 0; c < rank.length; c++) {
		// console.log(c + 1, rank[c].bet);
		winnings += (c + 1) * rank[c].bet;
		console.log(
			rank[c].hand,
			rank[c].type,
			rank[c].bet,
			":",
			TYPES[rank[c].type]
		);
	}
	console.log(">>", winnings);
});
