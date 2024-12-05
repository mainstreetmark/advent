import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(dirname(import.meta.url));
var datafile = __dirname + "/d05t.txt";
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
	// console.log(CheckRule("75,97,47,61,53".split(",")));
	let valid = [];
	for (var update of data) {
		var out = CheckRule(update);
		if (out) {
			console.log("   ", out);
			const len = out.length;
			const middle = out[Math.floor(len / 2)];
			total += Number(middle);
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
				console.log(`${a} must come after ${page}`);
				return false;
			}
		}
		for (var b of before) {
			if (rule.after.includes(b)) {
				console.log(`${b} must come before ${page}`);
				return false;
			}
		}
		before.push(page);
	}
	return update;
}
