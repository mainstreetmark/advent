import fs from 'fs'
var count = 0, last=0;
fs.readFile('a.txt', 'utf8', (err, contents) => {
	const lines = contents.split('\n');
	for (var l in lines) {
		if (l>=3) {
		// console.log(">", l, (l-last))
			var val = Number(lines[l])+Number(lines[l-1])+Number(lines[l-2]) 
			console.log(val)
			if (last)
				count += (val-last)>0?1:0
			last=val
		}
	}
	console.log('=',count, lines.length)
});
