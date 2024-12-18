import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { Grid, Astar } from "fast-astar";

export default class Map {
	width;
	height;
	// North, East, South, West
	NEWS = [
		[-1, 0],
		[0, 1],
		[1, 0],
		[0, -1],
	];

	/**
	 *
	 * @param {String} arg1 Filename with a map
	 * 		  (Int) arg1 Width
	 * 		  (Array) Map, already read in as an array of lines
	 * @param {*} arg2
	 * @param {*} arg3
	 */
	constructor(arg1, arg2 = false, arg3 = ".") {
		if (Array.isArray(arg1)) {
			this.data = arg1
				.map((line) => line.split(""))
				.filter((l) => l.length);
			this.original = this.copy(this.data);
			this.width = this.data[0].length;
			this.height = this.data.length;
		} else if (typeof arg1 === "string") {
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
	add(coord1, coord2) {
		return [coord1[0] + coord2[0], coord1[1] + coord2[1]];
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

	// Returns an array of coordinates of all occurrances of a char (or array of chars);
	findAll(chars) {
		if (typeof chars == "string") chars = [chars];
		const out = [];
		for (var char of chars) {
			for (let r = 0; r < this.height; r++) {
				for (let c = 0; c < this.width; c++) {
					if (this.data[r][c] === char) {
						out.push([r, c]);
					}
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
	Go(spot, delta) {
		return [spot[0] + delta[0], spot[1] + delta[1]];
	}
	// Return character at a spot, with this delta
	Look(spot, delta, mul = 1) {
		return this.get(this.Go(spot, [delta[0] * mul, delta[1] * mul]));
	}
	// Move an item on a map from..to
	Move(from, to, empty = ".") {
		this.set(to, this.get(from));
		this.set(from, ".");
	}

	// Helper method to calculate Manhattan distance heuristic
	manhattan(pos1, pos2) {
		return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]);
	}

	// A* pathfinding implementation
	Path(from, to, obstacles = ["#"]) {
		let grid = new Grid({
			col: this.height, // col
			row: this.width, // row
			render: function () {
				// Optional, this method is triggered when the grid point changes
				// console.log(this);
			},
		});

		var walls = this.findAll(obstacles);
		for (var wall of walls) {
			grid.set(wall, "value", 1);
		}

		var astar = new Astar(grid);
		var path = astar.search(from, to);
		console.log(path);

		return path; // No path found
	}
}
