import fs from 'fs'
var count = 0, last=0;
fs.readFile('a.txt', 'utf8', (err, contents) => {
	const lines = contents.split('\n');
	for (var l of lines) {
		console.log(">", l, (l-last))
		if (last)
			count += (l-last)>0?1:0
		last=l
	}
	console.log('=',count, lines.length)
});
