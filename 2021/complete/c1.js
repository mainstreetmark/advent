import fs from 'fs'
var counts=[0,0,0,0,0,0,0,0,0,0,0,0]

function count(array, yes, no) {
	var counts=[0,0,0,0,0]
	var counts=[0,0,0,0,0,0,0,0,0,0,0,0]
	for (var l of array) {
		var bits = l.split('')
		for (var b in bits) {
			if (bits[b]=='1')
				counts[b]++
		}
	}
	return counts.map(c => c>=array.length/2?yes:no)
}

function decimal(bin) {
	return bin.reduce((total,current,index)=>total+current*Math.pow(2,bin.length -1- index),0)
}

fs.readFile('c.txt', 'utf8', (err, contents) => {
	const lines = contents.split('\n');

	// console.log(counts)
	var gamma = count(lines, 1,0)
	var epsilon = count(lines,0,1)
	console.log(gamma, epsilon)
	var gr= decimal(gamma)
	var er= decimal(epsilon)
	console.log(gr, er, gr*er)

	var gf = lines;
	var i=0;
	while(gf.length>1) {
		var gf = gf.filter(l=>l.charAt(i)==gamma[i] )
		gamma = count(gf,1,0)
		i++
	}
	var ogr = decimal(gf[0].split(''))

	var ef = lines;
	// console.log(lines)
	var i=0;
	while(ef.length>1) {
		var ef = ef.filter(l=>l.charAt(i)==epsilon[i] )
		epsilon = count(ef,0,1)
		console.log(i, ef, epsilon)
		i++
	}
	var co2 = decimal(ef[0].split(''))


	console.log(ogr, co2, ogr*co2)
})