import fs from 'fs'

var map = [];
var basins = [];

function Height(x,y) {
	if (!map[y])
		return 99;
	if (!map[y][x])
		return 99;
	return map[y][x]
}

function Basin(map,loc, lastloc) {
	var count = 1;
	var [x,y] = loc;
	if (map[y][x] === '9') return 0;
	if (x<0 || x>map[0].length) return 0;
	if (y<0 || y>map.length) return 0;

	console.log("basin", loc, lastloc, map[y][x], 'x+1', map[y][x+1]);
	
	if (x>0 && map[y][x-1] > map[y][x])
		count += Basin(map, [x-1,y], loc)
	if (x<map[0].length-1 && map[y][x+1] > map[y][x])
		count += Basin(map, [x+1,y], loc)
	if (y>0 && map[y-1][x] > map[y][x])
		count += Basin(map, [x,y-1], loc)
	if (y < map.length-1 && map[y+1][x] > map[y][x])
		count += Basin(map, [x,y+1], loc)
	
	map[y][x] = ' ';
	return count;
}

fs.readFile('i.txt', 'utf8', (err, contents) => {
	var line
	const lines = contents.split('\n');
	const H = lines.length;
	const W = lines[0].length;
	console.log(W,H);
	while (line = lines.shift()) {
		map.push(line.split(''));
		// console.log(">",line1, GetHeight(1,2));
	}
	
	var risk = 0;
	for (var y=0; y<H; y++) {
		var row = ''
		for (var x = 0; x<W; x++) {
			var el = Height(x,y);
			if (
				Height(x-1,y)>el &&
				Height(x+1,y)>el &&
				Height(x,y-1)>el &&
				Height(x,y+1)>el
			) {
				// console.log("  H>", el,x,y);
				risk += Number(el) + 1;
				row+='_'
				basins.push([x,y])
			}
			else row+=el
		}
		// console.log(row, map[y].join(''))
	}
//	console.log(risk);

	console.log('--')
	map.forEach(m => console.log(m.join('')))

	var counts = [];
	for (var b in basins) {
		console.log("start", basins[b]);
		counts[b] = Basin(map, basins[b], [])
	}
	console.log('--')
	map.forEach(m => console.log(m.join('')))
	console.log(counts);
	console.log(counts.sort((a,b) => b-a).splice(0,3).reduce((c,t) => c*t, 1))
})
