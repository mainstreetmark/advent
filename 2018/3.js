const fs = require('fs');

fs.readFile('fabric.txt', 'utf8', (err, contents) => {
	const num = 0;
	const lines = contents.split('\n');
	const grid = [];
	let maxx = 0;
	let maxy = 0;
	for (const n in lines) {
		const line = lines[n];
		const parts = line.split(/[\s#@,:x]+/);
		const id = parts[1];
		const l = Number(parts[2]);
		const t = Number(parts[3]);
		const w = Number(parts[4]);
		const h = Number(parts[5]);
		// console.log(id, l, t, w, h);
		for (let x = l; x < l + w; x++)
			for (let y = t; y < t + h; y++) {
				if (x > maxx)
					maxx = x;
				if (y > maxy)
					maxy = y;
				if (!grid[x])
					grid[x] = [];
				if (!grid[x][y])
					grid[x][y] = 0;
				grid[x][y]++;
				// if (grid[x][y] > 1)
				// 	console.log(num++, x, y, grid[x][y]);
			}
	}
	let count = 0;
	console.log(maxx, maxy);
	for (let x = 0; x < 1000; x++)
		for (let y = 0; y < 1000; y++)
			if (grid[x] && grid[x][y])
				if (grid[x][y] >= 2) {
				//	console.log(x, y);
					count++;
				}


	console.log(count, count / (maxx * maxy));
});
