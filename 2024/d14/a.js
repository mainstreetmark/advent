import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const test = {
	filename: "d14t.txt",
	width: 11,
	height: 7,
};
const nottest = {
	filename: "d14.txt",
	width: 101,
	height: 103,
};

const init = nottest;

const __dirname = fileURLToPath(dirname(import.meta.url));

var datafile = __dirname + "/" + init.filename;
const W = init.width;
const H = init.height;

console.log("\n---\n", datafile);
fs.readFile(datafile, "utf8", (err, contents) => {
	Go(contents);
});

import Map from "../Map.class.js";

const map = new Map(W, H);

map.print("Original");

let bots = [];
let counts = Array(H)
	.fill()
	.map(() => Array(W).fill(0));

function Go(contents) {
	const lines = contents.trim().split("\n");
	for (var bot of lines) {
		const [pos, vel] = bot.split("v=");
		const p = pos.split("p=")[1].split(",");
		const v = vel.split(",");
		bots.push({
			p: [Number(p[0]), Number(p[1])],
			v: [Number(v[0]), Number(v[1])],
		});
	}
	// console.log(bots);
	let counts = [];
	for (var i = 0; i < 100; i++) {
		Loop();

		counts = Array(W)
			.fill()
			.map(() => Array(H).fill(0));
		map.reset();
		for (var b of bots) {
			counts[b.p[0]][b.p[1]]++;
			map.set([b.p[1], b.p[0]], counts[b.p[0]][b.p[1]]);
		}
		// map.print(`After ${i + 1}`);
	}
	map.print("After");
	console.log(">>", GetCounts(counts));
}

function Loop() {
	const w = map.width;
	const h = map.height;
	for (var b of bots) {
		b.p[0] = (w + b.p[0] + b.v[0]) % w;
		b.p[1] = (h + b.p[1] + b.v[1]) % h;
	}
}

function GetCounts(counts) {
	let total = 1;
	const rows = counts.length;
	const cols = counts[0].length;
	const dr = Math.floor(rows / 2);
	const dc = Math.floor(cols / 2);

	var quads = [
		[0, 0],
		[rows - dr, 0],
		[0, cols - dc],
		[rows - dr, cols - dc],
	];
	console.log(rows, cols, dr, dc, quads);
	for (var q of quads) {
		var count = 0;
		for (var r = q[0]; r < q[0] + dr; r++) {
			for (var c = q[1]; c < q[1] + dc; c++) {
				// console.log(r, c, counts[r][c]);
				count += counts[r][c];
			}
		}
		total *= count;
		console.log(q, count);
	}
	return total;
}
