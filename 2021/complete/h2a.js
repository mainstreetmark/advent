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

function Translate(lookup, sig) {
	return lookup[sig] || sig
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
	console.log(x,y,out)
	return out;
}

fs.readFile('h.txt', 'utf8', (err, contents) => {
	var  lines = contents.split('\n');
	lines = [lines[0]]
	var count=0
	for (var line of lines) {
		console.log("line>>", line);
		const [signal, output] = line.split(' | ');
		var lookup = {}
		var sigs = signal.split(' ');
		sigs = sigs.map(seg => Sort(seg))
		console.log(sigs)
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

		// var segnumbers = GetSegNumbers(lookup)
		// console.log("segnumbers", segnumbers);

		console.log("lookup", lookup)
		console.log(rlookup)
		// Use One
		// var one = sigs.find(s => s.length===2)
		// var hasone=[0,3,4,7,8,9] // these digets must contain 1's segments (be)

		// what is the uniqe segment for the number 7, which is segment 1
		var seg = Unique(rlookup[1], rlookup[7])
		segmap[seg] = 1;  // segment ID for unique segment between 1 and 7
		console.log("segmap", segmap)
		var pairs = segpairs[1];
		console.log("segment 1 pairs", pairs) // these numbers can be made with segment 1
		var 
		console.log("segment 1 nots", [0,1,2,3,4,5,6,7,8,9].filter(d => pairs.indexOf(d)===-1))
		console.log("segment symbol 1 nots", sigs.filter(sig=>sig.indexOf(seg)===-1))
		
		
		
		console.log(Unique(rlookup[7], rlookup[4])) // this equals segments [0,4]  



// 		console.log(sigs.map(sig => Translate(lookup, sig)))
	}
})