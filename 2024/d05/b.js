import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d05.txt";
console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

let RULES = {};
let DATA = [];

let rules = {};

function Go(contents) {
	let mode = "rules";
	let rules = [];
	let data = [];
	const lines = contents.split("\n");
	for (var line of lines) {
		if (line.length == 0) {
			mode = "data";
			continue;
		}
		if (mode == "rules") {
			rules.push(line.split("|"));
		} else {
			data.push(line.split(","));
		}
	}
	let total = 0;
	IngestRules(rules);
	// console.log(TestUpdate(["88", "46", "96", "98", "42"]));
	let valid = [];

	for (var update of data) {
		var out = CheckRule(update);
		if (!out) {
			var fixed = TestUpdate(update);
			if (fixed) {
				const len = fixed.length;
				const middle = fixed[Math.floor(len / 2)];
				total += Number(middle);
			}
		}
		// break;
	}
	console.log(">>", total);
}

function IngestRules(rules) {
	for (var r of rules) {
		if (!RULES[r[0]]) RULES[r[0]] = { before: [], after: [] };
		if (!RULES[r[1]]) RULES[r[1]] = { before: [], after: [] };
		RULES[r[0]].after.push(r[1]);
		RULES[r[1]].before.push(r[0]);
	}
	// console.log(RULES);
	return RULES;
}

function CheckRule(update) {
	const before = [];
	const after = [...update];
	let page;
	while ((page = after.shift())) {
		let rule = RULES[page];
		// console.log(" - ", page, RULES[page]);
		for (var a of after) {
			if (rule.before.includes(a)) {
				console.log(`  ${a} must come before ${page}`);
				return false;
			}
		}
		for (var b of before) {
			if (rule.after.includes(b)) {
				console.log(`  ${b} must come after ${page}`);
				return false;
			}
		}
		before.push(page);
	}
	return update;
}

function TestUpdate(update) {
	let count = 1;
	let test = [...update];
	while (!CheckRule(test)) {
		console.log("test", count++, test);
		test = FixUpdate(test);
	}
	return test;
}

function FixUpdate(update) {
	const before = [];
	const after = [...update];
	let page;
	while ((page = after.shift())) {
		let rule = RULES[page];
		// console.log(" - ", page, RULES[page]);
		for (var a of after) {
			if (rule.before.includes(a)) {
				console.log(`  ${a} must come before ${page}`);
				return Swap(update, update.indexOf(a), update.indexOf(page));
				return false;
			}
		}
		for (var b of before) {
			if (rule.after.includes(b)) {
				console.log(`  ${b} must come after ${page}`);
				return Swap(update, update.indexOf(b), update.indexOf(page));
				return false;
			}
		}
		before.push(page);
	}
	return true;
}

function FixUpdate2(update) {
	console.log("fix1", update, CheckRule(update));
	const before = [];
	const after = [...update];
	let page;
	while ((page = after.shift())) {
		let rule = RULES[page];
		for (var a of rule.after) {
			if (before.includes(a)) {
				Move(update, update.indexOf(a), update.indexOf(page) + 1);
			}
		}
		for (var b of rule.before) {
			if (after.includes(b)) {
				Move(update, update.indexOf(b), update.indexOf(page) - 1);
			}
		}
		before.push(page);
	}
	console.log("fix2", update, CheckRule(update));
	// if (!CheckRule(update)) {
	// 	return FixUpdate(update);
	// }
	return update;
}

function Move(update, index, offset) {
	const page = update[index];
	update.splice(index, 1);
	update.splice(index + offset, 0, page);
}

function Swap(update, index1, index2) {
	const page1 = update[index1];
	const page2 = update[index2];
	update.splice(index1, 1, page2);
	update.splice(index2, 1, page1);
	console.log("swap", update);
	return update;
}
