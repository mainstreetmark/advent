import fs from 'fs'

var map = [];

function Height(x,y) {
	if (!map[y])
		return 99;
	if (!map[y][x])
		return 99;
	return map[y][x]
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
			}
			else row+=el
		}
		console.log(row, map[y].join(''))
	}
	console.log(risk);

})
