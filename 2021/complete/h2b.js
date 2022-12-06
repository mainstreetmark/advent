import fs from 'fs'
/*
    11 
  0    2
    44  
  3    5
    66
*/

// WHat segments do each number use
var map = [
	[0,1,2,3,5,6], //0
	[2,5], //1
	[1,2,3,4,6], // 2
	[1,2,4,5,6] // 3
	[0,2,4,5], // 4
	[0,1,4,5,6], // 5
	[0,1,3,4,5,6], // 6
	[1,2,5], //7
	[0,1,2,3,4,5,6,7,8], 8
	[0,1,2,4,5,6], // 9
]
// What numbers do each segment use
var segpairs = [
	[0,4,5,6,8,9]
	[0,2,3,5,7,8,9],
	[0,1,2,3,4,7,8,9],
	[0,2,6,8]
	[2,3,4,5,6,8,9],
	[0,1,3,4,5,6,7,8,9],
	[0,2,3,5,6,8,9]

]
var segs = [[],[],[],[],[],[],[]]
var abcdef='abcdef'

function Sort(seg) {
	return seg.split('').sort().join('')
}

function GetByLength(segs, l) {
	return segs.filter(seg => seg.length === l)
}

function Translate(lookup, sig) {
	return lookup[sig]
}
// which segment letter can draw what numbers
function GetSegNumbers(lookup) {
	var map = {a:[],b:[],c:[],d:[],e:[],f:[],g:[]}
	for (var seg of Object.keys(lookup)) {
		for (var s of seg.split('')) {
			console.log(seg, s)
			map[s].push(lookup[seg])
		}
	}
	return map;
}

// return letters in y that do not appear in x
function Unique(x,y) {
	var out = [];
	for (var i of y.split('')) {
		if (x.indexOf(i) == -1)
			out.push(i) // not found
	}
	// console.log(x,y,out)
	return out;
}

fs.readFile('h.txt', 'utf8', (err, contents) => {
	var SUM = 0;
	var  lines = contents.split('\n');
	// lines = [lines[1]]
	var count=0
	for (var line of lines) {
		// console.log("line>>", line);
		const [signal, output] = line.split(' | ');
		var lookup = {}
		var sigs = signal.split(' ');
		var outs = output.split(' ');
		outs = outs.map(seg => Sort(seg));
		sigs = sigs.map(seg => Sort(seg))
		// cons=ole.log(sigs)
		for (var sig of sigs) {
			switch(sig.length) {
				case 2: lookup[sig] = 1; break;
				case 3: lookup[sig] = 7; break;
				case 4: lookup[sig] = 4; break;
				case 7: lookup[sig] = 8; break;
			}
		}
		var segmap = {}
		var rlookup = {}
		for (var k of Object.keys(lookup))
			rlookup[lookup[k]]=k


		// console.log("lookup", lookup)
		// console.log("rlooki", rlookup)


		// console.log("\nsix from eight")
		var  sixes = GetByLength(sigs, 6);
		var seven = rlookup[8];
		var one = rlookup[1];
		// console.log("  6]",sixes, seven, one);
		for (var s of sixes) {
			if (one.indexOf(Unique(s, seven)[0]) !== -1) {
				// console.log("  6] found 6", s) 
				lookup[s] = 6;
				rlookup['6'] = s
			}
		}

		// console.log("lookup", lookup)

		// console.log("2 from six")
		var  fives = GetByLength(sigs, 5);
		var six = rlookup[6];
		var one = rlookup[1];
		// console.log("  2]",fives, six, one);
		for (var s of fives) {
			// console.log("  2]", s)
			if (one.indexOf(Unique(s, six)[0]) !== -1) {
				// console.log("  2] found 2", s) 
				lookup[s] = 2;
				rlookup['2'] = s;
			}
			else {
				// console.log("2/5>", one, s)
				if (s.indexOf(one.split('')[0]) >= 0 && s.indexOf(one.split('')[1]) >= 0) {
					// console.log("  2] found 3", s);
					lookup[s] = 3;
					rlookup['3'] = s;
				}
			}
		}

		// console.log(" 2vs5>");
			var dunno= fives.filter(sig => typeof lookup[sig] === 'undefined')
			console.log(dunno)
			for (var s of dunno) {
				if (Unique(s, rlookup['6']).length === 1) {
					lookup[s] = 5;
					rlookup['5']=s;
				}
				else {
					lookup[s] = 2;
					rlookup['2'] = s;
				}
			}


			// var niner = Unique(s, rlookup['9'],)
			// if (!rlookup['5']) {
			// 	// console.log("  2] found 5", s);
			// 	lookup[s] = 5;
			// 	rlookup['5'] = s;
			// }



		// console.log("rlookup" ,rlookup, sigs, rlookup['5'])
		for (var s of sigs) {
			// console.log(s, typeof lookup[s]);
			if (typeof lookup[s] === 'undefined') {
				// console.log(" ?>", s, Unique(rlookup['5'], s))

				// console.log(" >?", Unique(s, rlookup['8']))
				// console.log(" >?", Unique(rlookup['5'], rlookup['6']))

				if (Unique(rlookup['5'], s).length === 1) {
					// console÷.log("  ?] found 9", s);
					lookup[s] = 9;
					rlookup['9']=s;
				}
				else {
					lookup[s] = 0;
					rlookup['0'] = s;
				}
			}
		}






		// console.log(Unique(rlookup[7], rlookup[4])) // this equals segments [0,4]  

		// console.log("LOOKUP", rlookup, lookup);

 		// console.log("SIGNAL>", sigs.map(sig => Translate(lookup, sig)))
 		console.log("OUTPUT>", output, "\t",outs.map(sig => Translate(lookup, sig)).join(''))
		 SUM += outs.map(sig => Translate(lookup, sig)).join('')|0
	}
	console.log(SUM);
})