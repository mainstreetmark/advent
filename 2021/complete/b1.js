import fs from 'fs'
var depth = 0, horizontal=0;
fs.readFile('b1.txt', 'utf8', (err, contents) => {
	const lines = contents.split('\n');
	for (var l of lines) {
		var [cmd,distance] = l.split(' ')
		console.log(distance,cmd);
		switch(cmd) {
			case 'forward':
				horizontal += Number(distance); break;
			case 'down':
				depth += Number(distance); break;
			case 'up':
				depth -= Number(distance); break
		}
	}
	console.log(horizontal, depth, horizontal*depth)
});