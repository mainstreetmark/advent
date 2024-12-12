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
		var spot = MAP.Move(loc, dir);
		var el = MAP.get(spot);
		if (el == plant) {
			region.push(...GrowRegion(plant, spot));
		}
	}
	return region;
}

function CalcFence(region) {
	let fence = 0;
	const lookup = region.map((r) => `${r[0]}x${r[1]}`);
	for (var spot of region) {
		for (var dir of Map.NEWS) {
			var r = spot[0] + dir[0];
			var c = spot[1] + dir[1];
			const next = `${r}x${c}`;
			if (!lookup.includes(next)) {
				fence++;
			}
		}
	}
	return fence;
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
REGIONS.forEach((r) => {
	r.area = r.region.length;
	r.fence = CalcFence(r.region);
	r.total = r.area * r.fence;
	total += r.total;
	console.log(r.plant, `${r.area} * ${r.fence} = ${r.total}`);
});
// MAP.print("Final");
// console.log(REGIONS);
console.log(">>", total);
