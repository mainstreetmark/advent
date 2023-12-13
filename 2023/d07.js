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

function GetType2(hand) {
	var cards = hand.split("");
	const repeats = {};
	for (var c of cards) {
		// console.log(" >", c);
		if (!repeats[c]) repeats[c] = 0;
		repeats[c]++;
	}
	const counts = Object.values(repeats);
	const max = Math.max(...counts);
	// if (hand == "JJ44J") debugger;
	const jokers = cards.filter((c) => c === "J").length;
	let rs = 1;
	if (max === 5) rs = 7; // 5 of a kind
	else if (max === 4) {
		if (jokers == 4) rs = 7;
		else rs = 6; // 4 of a kind
	} else if (counts.indexOf(3) !== -1 && counts.indexOf(2) !== -1) {
		if (jokers == 2) rs = 7;
		else if (jokers == 3) rs = 7;
		else rs = 5; // full house
	} else if (max === 3) {
		if (jokers == 1) rs = 6; // full house
		else if (jokers == 2) rs = 7;
		else rs = 4; // 3 of a kind
	} else if (counts.filter((c) => c === 2).length === 2) {
		if (jokers == 2) rs = 6;
		else if (jokers === 1) rs = 5;
		else rs = 3; // 2 pair
	} else if (max === 2) {
		if (jokers == 1) rs = 4; // 2 pair
		else if (jokers == 2) rs = 6;
		else if (jokers === 3) rs = 7;
		else rs = 2; // 1 pair
	} else {
		if (jokers == 1) rs = 2;
	}
	return rs; // high card
}

function GetType(hand) {
	let HIGH = 1;
	let ONE = 2;
	let TWO = 3;
	let THREE = 4;
	let FULL = 5;
	let FOUR = 6;
	let FIVE = 7;

	var cards = hand.split("");
	const repeats = {};
	for (var c of cards) {
		// console.log(" >", c);
		if (!repeats[c]) repeats[c] = 0;
		repeats[c]++;
	}
	const jokers = cards.filter((c) => c === "J").length;
	const counts = Object.values(repeats);
	const max = Math.max(...counts);

	if (max == 5) return FIVE;
	if (max == 4) {
		// chk
		if (jokers == 1) return FIVE;
		if (jokers == 4) return FIVE;
		return FOUR;
	}
	if (max == 3) {
		// if (hand == "11222") debugger;
		if (jokers == 1) return FOUR;
		if (jokers == 2) return FIVE;
		if (jokers == 3) {
			const noj = cards.filter((c) => c !== "J");
			if (noj[0] == noj[1]) return FIVE;
			if (counts.indexOf(2) !== -1) return FULL;
			return FOUR;
		}
		if (counts.length == 2) return FULL;
		return THREE;
	}
	if (max == 2) {
		// chk
		if (counts.filter((c) => c === 2).length === 2) {
			console.log("  2", hand);
			if (jokers == 1) return FULL;
			if (jokers == 2) return FOUR;
			return TWO;
		}
		if (jokers == 1) return THREE;
		if (jokers == 2) return THREE;
		return ONE;
	}
	if (max == 1) {
		// chk
		console.log(" ", hand);
		if (jokers == 1) return ONE;
		return HIGH;
	}
	return false;
}

function ToVal(hand) {
	const index = "J23456789TQKA";
	const cards = hand.split("");
	let val = 0;
	for (var i = 0; i < cards.length; i++) {
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
		if (rank[c].hand.indexOf("J") !== -1 || true)
			console.log(
				rank[c].hand,
				rank[c].hand.split("").sort().join(""),
				rank[c].type,
				c + 1,
				"\t:",
				TYPES[rank[c].type]
			);
	}
	console.log(">>", winnings);
});
