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
	[0,4]
	[0,2,3,5,7,8,9],
	[0,1,2,3,4,7,8,9],
	[0,2,6,8]
	[2,3,4,5,6,8,9],
	[0,1,3,4,5,6,7,8,9],
	[0,2,3,5,6,8,9]

]
var segs = [[],[],[],[],[],[],[]]

// [ ['ab', 'dc']] => [ 'abcd' ]
function Reduce(segs) {
	return segs.map(seg => [...new Set(seg.join('').split(''))].sort().join(''))
}

function Sort(seg) {
	return seg.split('').sort().join('')
}

function CalcMap(seg) {
	var map = [];
	seg = Sort(seg)
	for (var c of seg.split('')) 
		map.push('abcdefg'.indexOf(c))
	return map;
}
function AddGuess(guesses, seg, digit) {
	for (var c of seg.split('')) {
		guesses[c].push(digit)
	}
	return guesses
}
function GetGuess(guesses, seg) {
	var score = [];
	for (var guess = 0; guess<10; guess++) {
		score[guess] = seg.split('').reduce((t,s) => t+guesses[s].indexOf(guess) === -1 ? 0 : 1,0)
	}
	return score
}

fs.readFile('h.txt', 'utf8', (err, contents) => {
	var  lines = contents.split('\n');
	lines = [lines[0]]
	var count=0
	for (var line of lines) {
		console.log("line", line);
		const [signal, output] = line.split(' | ');
		var lookup = ['','','','','','','','','','']
		var guesses = {a:[],b:[],c:[],d:[],e:[],f:[],g:[]}
		var sigs = signal.split(' ');
		for (var s of sigs) {
			switch(s.length) {
				case 2: // 1
					segs[2].push(s);
					segs[5].push(s);
					lookup[1] = Sort(s);
					AddGuess(guesses, s, 1)
					break;
				case 3: // 7
					segs[1].push(s)
					segs[2].push(s);
					segs[5].push(s);
					lookup[7] = Sort(s);
					AddGuess(guesses, s, 7)
					break;
				case 4: // 4
					segs[0].push(s);
					segs[2].push(s);
					segs[4].push(s);
					segs[5].push(s);
					lookup[4] = Sort(s);
					AddGuess(guesses, s, 4)
					break;
				case 7: // 8
					console.log(s)
					segs[0].push(s)
					segs[1].push(s)
					segs[2].push(s)
					segs[3].push(s)
					segs[4].push(s)
					segs[5].push(s)
					segs[6].push(s)
					break;
			}
		}
		console.log("lookup", lookup);
		console.log("guess", guesses)
		console.log(output, output.split(' ').map(o => lookup.indexOf(Sort(o))))
		console.log(GetGuess(guesses, 'g'))
	}
})