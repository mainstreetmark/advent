import fs from 'fs'
var coords = [];
var maxy=0;
var maxx=0;

function PrintMap(string, w, h) {
	var out = '';
	for (var x = 0; x<w; x++) {
		out += string.substring(x*w,x*w+w)+'\n'
	}
	return out;
}

function IncCoord(map, x, y, w, h) {
	var index = (y)*w+x+1
	var val = map.charAt(index-1);
	// console.log(index, val, map)
	map = map.substring(0,index-1) + (Number(val)+1) + map.substring(index)
	return map
}
function is_diagnal(c) {
	// console.log(c[0],c[1])
	return Math.abs((c[0][0]-c[1][0])/(c[0][1]-c[1][1]))===1
}

fs.readFile('e.txt', 'utf8', (err, contents) => {
	const lines = contents.split('\n');
	for (var l of lines) {
		var [from,crap,to] = l.split(' ')
		from = from.split(',').map(n => Number(n))
		to = to.split(',').map(n => Number(n))
		// console.log(from, to);

		coords.push([from,to])
		maxx = Math.max(maxy, from[0],to[0])
		maxy = Math.max(maxy, from[1],to[1])
	}
	maxx++; maxy++;
	console.log(maxx,'x',maxy)
	var map = '0'.padStart(maxx*maxy,'0')
	
	for (var c of coords.filter(c => c[0][0] === c[1][0])) { // veritcxall
		c = c.sort((a,b) => a[1] - b[1])
		var x = c[0][0];
		// console.log('V',c, x)
		for (var y = c[0][1]; y<=c[1][1]; y++) {
			// console.log(' - ',x,y)
			map = IncCoord(map, x, y, maxx, maxy)
		}
	}
	for (var c of coords.filter(c => c[0][1] === c[1][1])) { // horizontal
		c = c.sort((a,b) => a[0] - b[0])
		var y = c[0][1];
		// console.log('H',c, x,y)
		for (var x = c[0][0]; x<=c[1][0]; x++) {
			// console.log(' - ',x,y)
			map = IncCoord(map, x, y, maxx, maxy)
		}
	}

	for (var c of coords.filter(is_diagnal)) { // diagnal
		c = c.sort((a,b) => a[0] - b[0])
		// console.log('D',c, x,y)
		var y = c[0][1]
		for (var x = c[0][0]; x<=c[1][0]; x+=(c[0][0]>c[1][0]?-1:1)) {
			// console.log(' - ',x,y)
			map = IncCoord(map, x, y, maxx, maxy)
			y+=(c[0][1]>c[1][1]?-1:1)
			
		}
	}

	// map = IncCoord(map, 1,1, maxx, maxy)
	// map = IncCoord(map, 1,1, maxx, maxy)
	// map = IncCoord(map, 1,1, maxx, maxy)
	// PrintMap(map, maxx, maxy)

	// console.log(PrintMap(map, maxx, maxy))
	map = map.replace(/0/g,'').replace(/1/g,'')
	console.log(map, map.length);
})