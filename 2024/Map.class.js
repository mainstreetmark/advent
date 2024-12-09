import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

console.log(">>>>Map.class.js");
export default class Map {
	width;
	height;
	constructor(filename) {
		const __dirname = fileURLToPath(dirname(import.meta.url));
		var datafile = __dirname + "/" + filename;
		console.log("\n---\n", datafile);

		this.data = fs
			.readFileSync(datafile, "utf8")
			.split("\n")
			.map((line) => line.split(""))
			.filter((l) => l.length);
		this.original = fs
			.readFileSync(datafile, "utf8")
			.split("\n")
			.map((line) => line.split(""))
			.filter((l) => l.length);
		this.width = this.data[0].length;
		this.height = this.data.length;
		console.log(`${filename} loaded.`, this.width, this.height);
	}

	print(title = "") {
		if (title)
			console.log(
				`\n ${title.toUpperCase()}`,
				`\n${"-".repeat(this.width)}`
			);

		console.log(this.data.map((row) => row.join("")).join("\n"));
	}

	// Idenitify unique chars
	identifyChars(ignore = ["."]) {
		const out = [];
		for (let r = 0; r < this.height; r++) {
			for (let c = 0; c < this.width; c++) {
				if (
					this.data[r][c] &&
					!ignore.includes(this.data[r][c]) &&
					!out.includes(this.data[r][c])
				) {
					out.push(this.data[r][c]);
				}
			}
		}
		return out;
	}
	// Return the coordinates of the first occurrance of a char
	find(char) {
		const out = [];
		for (let r = 0; r < this.height; r++) {
			for (let c = 0; c < this.width; c++) {
				if (this.data[r][c] === char) {
					return [r, c];
				}
			}
		}
		return out;
	}

	// Returns an array of coordinates of all occurrances of a char
	findAll(char) {
		const out = [];
		for (let r = 0; r < this.height; r++) {
			for (let c = 0; c < this.width; c++) {
				if (this.data[r][c] === char) {
					out.push([r, c]);
				}
			}
		}
		return out;
	}

	set([r, c], char) {
		if (r >= 0 && r < this.height && c >= 0 && c < this.width) {
			// console.log("\tSet>", r, c, char);
			this.data[r][c] = char;
		}
	}
	get([r, c]) {
		return this.data[c][r];
	}
}
