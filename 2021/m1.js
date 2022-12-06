import fs from 'fs'

var coords = [];
var folds = [];
var map = [];

function PrintMap() {
	for (var x of map) {
		console.log(x.join(''))
	}
}

function Map() {
	map = [];
	var W = 0;
	var H = 0;
	for (var c of coords) {
		W = Math.max(c[0],W);
		H = Math.max(c[1],H);
	}
	console.log(W, H);

	for (var y = 0; y <= H; y++) {
		map[y]=[];
		for (var x = 0; x<= W; x++) {
			map[y][x] = '.';
		}
	}
}

function Count() {
	var count = 0;
	for (var x of map) {
		for (var y of x) {
			if (y==='#')
				count++;
		}
	}
	return count;
}


fs.readFile('m.txt', 'utf8', (err, contents) => {
	var line
	var lines = contents.split('\n');
	while (line = lines.shift()) {
		coords.push(line.split(','))
	}
	while (line = lines.shift()) {
		folds.push(line);
	}
	// console.log(coords);
	// console.log(folds);

	Map();
	for (var c of coords) {
		map[c[1]][c[0]] = '#'
	}
	// PrintMap();

	for(var f of folds) {
		var fold = f.split(' ')[2];
		var [dir, row] = fold.split('=')
		console.log(f, dir, row);
		row = Number(row);

		for (var c in coords) {
			if (dir === 'x') {
				if (Number(coords[c][0])>row) {
					coords[c][0] -= (coords[c][0] - row)*2
				}
			}
			else {
				if (Number(coords[c][1])>row) {
					coords[c][1] -= (coords[c][1] - row)*2 
				}
			}
		}
		Map();
		for (var c of coords) {
			map[c[1]][c[0]] = '#'
		}
		console.log("count", Count());
	}
	PrintMap();
	//	console.log(Count());
})
