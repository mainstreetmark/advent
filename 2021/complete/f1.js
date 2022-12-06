import fs from 'fs'

function CCount(line) {
	var fishes = line.split(',').map(f=>Number(f))
	var counts = [0,0,0,0,0,0,0,0,0,0]
	for (var f of fishes) {
		f = Number(f);
		counts[f]++;
	}
	return counts
}


fs.readFile('f.txt', 'utf8', (err, contents) => {
	var  line = contents.split('\n')[0];
	// line='5'
	var fishes = line.split(',').map(f=>Number(f))
	var counts = [0,0,0,0,0,0,0,0,0,0]

	for (var f of fishes) {
		f = Number(f);
		counts[f]++;
	}
	console.log('  Initial:', line, counts.join(''))
	
	for (var d = 1; d<=51200; d++) {
					
		counts[7] += counts[0];
		counts[9] += counts[0];
		counts[0] = 0;
		for (var c=0; c<counts.length-1; c++) {
			counts[c] = counts[c+1]
		}
		counts[counts.length-1] = 0
		console.log(`Day ${d}:`.padStart(10), counts.join(','), counts.reduce((t,c)=>t+c))
		
		
		// var newfish = []
		// for (var f in fishes) {
		// 	var fish = fishes[f]
		// 	// console.log("f", fish)

		// 	fish = fish.concat(Array.from({ length: fish.filter(f=>f===0).length }).fill(9))
		// 	fish = fish.map(f => f?f-1:6)

		// 	var size = 1000000;
		// 	if (fish.length>size) {
		// 		fishes[f] = fish.slice(0,size/2)
		// 		newfish.push(fish.slice(size/2))
		// 	}
		// 	else {
		// 		fishes[f] = fish;
		// 	}
		// }
		// // console.log(">",fishes, newfish)
		// if (newfish.length>0) 
		// 	fishes = fishes.concat(newfish)

		// 	// for (var f in fish) {
		// // 	if (fish[f] === 0) {
		// // 		fish[f]=6;
		// // 		fish.push(8)
		// // 	}
		// // 	else fish[f]--;
		// // }

		// // fish.push(...(''.padStart(fish.filter(f=>f===0).length,'9')).split('').map(f=>Number(f)))
		
		// // fish = fish.concat(Array.from({ length: fish.filter(f=>f===0).length }).fill(9))
		// // fish = fish.map(f => f?f-1:6)
		// console.log(`Day ${d}:`.padStart(10),'\t', fishes.length, fishes.map(a => a.length).reduce((t,c) => t+c))
	}
});


