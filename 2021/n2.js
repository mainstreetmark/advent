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

	var paircounts = {}
	while (line = lines.shift()) {
		var pair = line.split(' ');
		pairs[pair[0]]=pair[2];
		paircounts[pair[0]]=0;
	}
	console.log(template)
	
	var result = template;
	for (var b =0; b<result.length-1; b++) {
		if (!paircounts[result[b]+result[b+1]])
			paircounts[result[b]+result[b+1]] = 0
		paircounts[result[b]+result[b+1]]++;
	}

	for (var step = 1; step <= 40;step++) {
		var counts2 = JSON.parse(JSON.stringify(paircounts));
		var counts = {}
		for (var c of Object.keys(counts2)) {
			paircounts[c]-= counts2[c]
			var a = c.charAt(0) + pairs[c];
			paircounts[a]+= counts2[c]
			var b = pairs[c]+c.charAt(1);
			paircounts[b]+= counts2[c]
				// console.log(counts2[c], "loose", c, "add", a,b)
			// console.log(c, counts2[c])
			// counts[c.charAt(0)]  = counts[c.charAt(0)] ? counts[c.charAt(0)]+counts2[c]: counts2[c]
			// counts[c.charAt(1)]  = counts[c.charAt(1)] ? counts[c.charAt(1)]+counts2[c]: counts2[c]

		}

		var counts = {}
		for (var c of Object.keys(paircounts)) {
			// if (c.charAt(0)==='C')
			// 	console.log(c.charAt(0), c,paircounts[c])
			counts[c.charAt(0)]  = counts[c.charAt(0)] ? counts[c.charAt(0)]+paircounts[c]: paircounts[c]
		}
		counts[template.split('').pop()]++;
		console.log("step",step,sortObject(counts));
		var max = Object.values(counts).sort((a,b) => a-b).pop()
		var min = Object.values(counts).sort((a,b) => a-b).shift()
	// 	console.log(Object.values(counts).sort((a,b) => a-b),min, max, max-min);
		console.log("answer>", max-min);
	}


})
