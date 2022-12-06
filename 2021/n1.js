import fs from 'fs'

var template = [];
var pairs = []
const sortObject = (obj) => Object.fromEntries(Object.entries(obj).sort( ));

fs.readFile('n.txt', 'utf8', (err, contents) => {
	var line
	var lines = contents.split('\n');
	while (line = lines.shift()) {
		template.push(line)
	}
	template = template.shift();

	while (line = lines.shift()) {
		var pair = line.split(' ');
		pairs[pair[0]]=pair[2];
	}
	console.log(template)

	// console.log(template, pairs);

	var result = template;
	for (var step = 1; step <=20; step++) {
		var part = '';
		var bits = result.split('');
		for(var b in bits) {
			if (b<bits.length-1) {
				b = Number(b);
				var pair = bits[b]+bits[b+1];
				part += bits[b];
				if (pairs[pair])
					part += pairs[pair]

			}
		}
		part += bits.pop()
		result = part;
		var counts = {};
		result.split('').forEach(c => counts[c]  = counts[c] ? counts[c]+1: 1)
		console.log("step", step, sortObject(counts));
		var max = Object.values(counts).sort((a,b) => a-b).pop()
		var min = Object.values(counts).sort((a,b) => a-b).shift()
	// 	console.log(Object.values(counts).sort((a,b) => a-b),min, max, max-min);
		console.log("answer>", max-min);
		}

	// var counts = {};
	// result.split('').forEach(c => counts[c]  = counts[c] ? counts[c]+1: 1)
	// console.log(counts);
})
