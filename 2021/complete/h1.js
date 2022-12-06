import fs from 'fs'


fs.readFile('h.txt', 'utf8', (err, contents) => {
	var  lines = contents.split('\n');
	var count=0
	for (var line of lines) {
		const [signal, output] = line.split(' | ');
		// console.log(signal, '>', output)
		var outs = output.split(' ');
		for (var o of outs) {
			switch(o.length) {
				case 2:
				case 3:
				case 4:
				case 7:
					count++;
			}
		}
	}
	console.log(">>>", count)
})