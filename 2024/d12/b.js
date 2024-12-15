import Map from "../Map.class.js";

const MAP = new Map("d12/d12.txt");

MAP.print("Original");

const REGIONS = [];
let start = [0, 0];

function GrowRegion(plant, loc) {
	let region = [];
	region.push(loc);
	MAP.set(loc, ".");
	for (var dir of Map.NEWS) {
		var spot = MAP.Go(loc, dir);
		var el = MAP.get(spot);
		if (el == plant) {
			region.push(...GrowRegion(plant, spot));
		}
	}
	return region;
}

function PrintCorner(area) {
	console.warn(area.slice(0, 3));
	console.warn(area.slice(3, 6));
	console.warn(area.slice(6, 9));
}

function CountCorners(area) {
	let corners = 0;
	const map = area.split("");
	const NW = 0,
		N = 1,
		NE = 2,
		W = 3,
		X = 4,
		E = 5,
		SW = 6,
		S = 7,
		SE = 8;
	var checks = [
		area[W] + area[NW] + area[N],
		area[N] + area[NE] + area[E],
		area[E] + area[SE] + area[S],
		area[S] + area[SW] + area[W],
	];

	for (var c of checks) {
		switch (c) {
			case "...":
			case "#.#":
			case ".#.":
				corners++;
		}
	}

	// console.log("     ==>", corners);
	return corners;
}

function CalcFence(plant, region) {
	let fence = 0;
	var corners = 0;
	for (var spot of region) {
		let used = [];
		let area = "";
		for (var r = -1; r <= 1; r++) {
			for (var c = -1; c <= 1; c++) {
				if (r == 0 && c == 0) area += "X";
				else {
					if (!used.includes(`${spot[0] + r},${spot[1] + c}`)) {
						area += MAP.Look(spot, [r, c]) == plant ? "#" : ".";
					}
				}
				used.push(`${spot[0] + r},${spot[1] + c}`);
			}
		}
		corners += CountCorners(area);
	}
	return corners;
}

for (var r = 0; r < MAP.height; r++) {
	for (var c = 0; c < MAP.width; c++) {
		var plant = MAP.get([r, c]);
		if (plant == ".") continue;
		let region = GrowRegion(plant, [r, c]);
		REGIONS.push({ plant, region });
		// MAP.print(plant);
	}
}

let total = 0;
MAP.reset();
REGIONS.forEach((r) => {
	r.area = r.region.length;
	r.fence = CalcFence(r.plant, r.region);
	r.total = r.area * r.fence;
	total += r.total;
	console.log(r.plant, `${r.area} * ${r.fence} = ${r.total}`);
});
// MAP.print("Final");
// console.log(REGIONS);
console.log(">>", total);
