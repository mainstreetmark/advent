import fs from 'fs'

fs.readFile('j.txt', 'utf8', (err, contents) => {
	var line
	var lines = contents.split('\n');
	const H = lines.length;
	const W = lines[0].length;
	var OPEN = ['{','[','(','<']
	var CLOSE = ['}',']',')','>']
	var points = [1197,57,3,25137]
	var points2 = [3,2,1,4]
	var score = 0;
	var score2 = 0;
	var scores = [];
	// lines = [lines[0]]
	while (line = lines.shift()) {
		// console.log(line);
		score2 = 0;
		var chars = line.split('');
		var stack = [];
		var corrupt = false;
		for (var c of chars) {
			// console.log("Stack", stack.join(''))
			if (OPEN.indexOf(c)>=0)
				stack.push(c);
			if (CLOSE.indexOf(c)>=0) {
				// console.log(":",  stack[0], c, OPEN[CLOSE.indexOf(c)])
				var expected = CLOSE[OPEN.indexOf(stack[stack.length-1])]
				if (expected===c) {
					stack.pop();
				}
				else {
					// console.log("fault", c, "expected", expected)
					corrupt = c;
					break;
				}
			}
		}
		if (corrupt) {
//			console.log("line>",line, "found", corrupt, points[CLOSE.indexOf(corrupt)]);
			score += points[CLOSE.indexOf(corrupt)];
		}
		else {
			stack.reverse().map(c => CLOSE[OPEN.indexOf(c)]).forEach(c => { score2 = score2*5 + points2[CLOSE.indexOf(c)]})
			console.log(line,score2, stack.reverse().map(c => CLOSE[OPEN.indexOf(c)]).join(''))
			scores.push(score2)
		}
		
	}
	console.log(scores.sort((a,b) => a-b)[Math.floor(scores.length/2)])
})