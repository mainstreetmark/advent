import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

export default class Map {
	width;
	height;
	// North, East, South, West
	static NEWS = [
		[-1, 0],
		[0, 1],
		[1, 0],
		[0, -1],
	];

	constructor(arg1, arg2 = false, arg3 = ".") {
		if (typeof arg1 === "string") {
			const filename = arg1;
			const __dirname = fileURLToPath(dirname(import.meta.url));
			var datafile = __dirname + "/" + filename;
			console.log("\n---\n", datafile);

			this.data = fs
				.readFileSync(datafile, "utf8")
				.split("\n")
				.map((line) => line.split(""))
				.filter((l) => l.length);
			this.original = this.copy(this.data);
			this.width = this.data[0].length;
			this.height = this.data.length;
			console.log(`${filename} loaded.`, this.width, this.height);
		} else {
			this.width = arg1;
			this.height = arg2;
			// this.data = Array(this.height).fill(Array(this.width).fill("."));
			this.data = Array(this.height)
				.fill()
				.map(() => Array(this.width).fill(arg3));

			this.original = this.copy(this.data);
		}
	}

	print(title = "") {
		if (title)
			console.log(
				`\n ${title.toUpperCase()}`,
				`\n${"-".repeat(this.width)}`
			);

		console.log(this.data.map((row) => row.join("")).join("\n"));
		console.log(" ");
	}

	reset() {
		this.data = this.copy(this.original);
	}

	copy(data) {
		return JSON.parse(JSON.stringify(data));
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

	// Set a value at a given coordinate
	set([r, c], char) {
		if (r >= 0 && r < this.height && c >= 0 && c < this.width) {
			// console.log("\tSet>", r, c, char);
			this.data[r][c] = char;
			return true;
		}
		return false;
	}
	// Get a value at a given coordinate
	get([r, c]) {
		if (r >= 0 && r < this.height && c >= 0 && c < this.width) {
			return this.data[r][c];
		}
		return null;
	}

	// Return a spot offset by the given delta
	Move(spot, delta) {
		return [spot[0] + delta[0], spot[1] + delta[1]];
	}
	// Return character at a spot, with this delta
	Look(spot, delta) {
		return this.get(this.Move(spot, delta));
	}
}
