import fs from 'fs'

var map = [];
var cache = [];
var paths = [];
var count = 0;
var remap = []

function PrintMap() {
	console.log(map.join("\n"))
}

function AtEnd(x,y) {
	return y === map.length-1 && x === map[0].length-1
}

function GetRisk(x,y) {
	var val = map[y].charAt(x);
	// console.log('  risk', x,y,val);
	return Number(val);
}

function ReMap() {
	for (var Z = 0; Z < 5; Z++) {
		// console.log(Z)
		for (var Y = 0; Y< map.length; Y++) {
			var out = '';
			for (var X = 0; X<5; X++) {
				var chars = map[Y].split('');
				for (var c of chars) {
					var next = Number(c)+X+Z+0;
					// console.log(out, next);
					if (next>9) next = next%9;
					out += next
				}
			}
			// console.log('>',out)
			remap.push(out);
		}
	}
}

function Walk(x,y) {
	var val = GetRisk(x,y);
	if (x < map[0].length-1)
		val += Walk(x+1,y)
	if (y < map.length-1)
		val += Walk(x,y+1)
	return val;
}

function Map(lvl, cost,x,y) {
	var X = map[0].length;
	var Y = map.length;
	
	// console.log(lvl, x,y,'cache', cache[x][y])
	if (cache[x][y]>0) {
		return cache[x][y];
	}
	
	count++;
	
	var val = GetRisk(x,y);
	var vals = []
	if (x<X-1)
		vals.push(Map(lvl+' ',cost,1+x,y))
	if (y<Y-1){
		vals.push(Map(lvl+' ',cost,x,1+y))
	}
	if (vals.length) {
		cache[x][y] = GetRisk(x,y) + Math.min(...vals);
		// console.log(lvl, x,y,vals, GetRisk(x,y),'+',Math.min(...vals), '=', cache[x][y])
	}
	else
		cache[x][y] = GetRisk(x,y);
	return cache[x][y];
}

fs.readFile('o.txt', 'utf8', (err, contents) => {
	var line
	var lines = contents.split('\n');
	while (line = lines.shift()) {
		map.push(line)
	}

		// PrintMap()
	console.log('')
	ReMap()
	map = JSON.parse(JSON.stringify(remap))

	// PrintMap()

	var X = map[0].length;
	var Y = map.length;
	for (var x = 0; x<X; x++) {
		cache[x] = [];
		for (var y = 0; y<Y; y++) {
			cache[x][y] = 0;
		}
	}

	var x = 0, y = 0;
	console.log(x,y,'>')
	console.log("risk", Map('', 0,x,y) - GetRisk(x,y))
	// console.log(cache);
	console.log("count", count)
})