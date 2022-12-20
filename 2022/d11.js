import fs from "fs";
const monkeys = [];
fs.readFile("d11.txt", "utf8", (err, contents) => {
	const lines = contents.split("\n");
	for (var l = 0; l < lines.length; l += 7) {
		const line = lines[l];
		// console.log(line);
		const monkey = {};
		// console.log();
		monkey.items = lines[l + 1]
			.split(":")[1]
			.trim()
			.split(", ")
			.map((n) => Number(n));
		monkey.op = lines[l + 2].split("= ")[1];
		monkey.test = lines[l + 3].split(": ")[1];
		monkey.true = Number(lines[l + 4].split(" ").pop());
		monkey.false = Number(lines[l + 5].split(" ").pop());
		monkey.inspects = 0;
		// console.log(monkey);
		monkeys.push(monkey);
	}
	console.log(monkeys);

	for (var round = 1; round <= 20; round++) {
		console.log("------- Round", round);
		for (var monkey of monkeys) {
			// console.log(" ", monkey.items);
			while (monkey.items.length) {
				var item = monkey.items.shift();
				monkey.inspects++;
				// console.log("  monkey inspects ", item);
				let worry = eval(monkey.op.replaceAll("old", item));
				// console.log(
				// 	"  worry level",
				// 	monkey.op.replaceAll("old", item),
				// 	worry
				// );
				worry = Math.floor(worry / 3);
				console.log("  worry level / 3", worry);
				console.log("    > ", monkey.test.split(" ")[2]);
				if (worry % Number(monkey.test.split(" ")[2]) == 0) {
					monkeys[monkey.true].items.push(worry);
					// console.log("    is");
					// console.log("     item ", worry, " to monkey", monkey.true);
				} else {
					monkeys[monkey.false].items.push(worry);
					// console.log("    is not");
					// console.log("  item ", worry, " to  monkey", monkey.false);
				}
			}
		}
		// console.log(JSON.stringify(monkeys.map((m) => m.items)));
	}
	console.log(monkeys);
	console.log(
		">>",
		monkeys
			.map((m) => m.inspects)
			.sort((a, b) => b - a)
			.slice(0, 2)
			.reduce((sum, x) => sum * x, 1)
	);
});
