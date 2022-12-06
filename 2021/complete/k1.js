import fs from 'fs'

var map = [];
var flashes = 0;

function PrintMap() {
	console.log()
	map.forEach(m=>console.log(m.join('')))
}

function Charge() {
	map = map.map(m=> m.map(m => m+1))
}

function Flash(r,c,charge) {
	if (typeof map[r] !== 'undefined' && typeof map[r][c] !== 'undefined') {
		if (map[r][c] > 9) {
			// console.log("flash", r, c)
			flashes++;
			map[r][c] = '*';
			Flash(r-1,c-1,1)
			Flash(r,c-1,1)
			Flash(r+1,c-1,1)

			Flash(r-1,c,1)
			// Flash(r,c)
			Flash(r+1,c,1)
			
			Flash(r-1,c+1,1)
			Flash(r,c+1,1)
			Flash(r+1,c+1,1)
		}
		else if (map[r][c] !== '*') {
			map[r][c]+=charge;
			// if (charge>0)
			// 	console.log("  ", r,c)
			if (map[r][c] > 9)
				Flash(r,c,1)
		}
	}
}

function FlashMap() {
	for(var r in map) {
		for (var c in map[r]) {
			Flash(Number(r),Number(c),0)
		}
	}
}

function DeCharge() {
	map = map.map(m=> m.map(m => m==='*'?0:m))
}

function CheckForSync(){ 
	var string = map.map(m=>m.join('')).join('').split('');
	for (var c of string)
		if (Number(c)>0)
			return false;
	return true;

	
}

fs.readFile('k.txt', 'utf8', (err, contents) => {
	var line
	var lines = contents.split('\n');
	while (line = lines.shift()) {
		map.push(line.split('').map(n => Number(n)))
	}
	PrintMap()

	for (var step = 1; step <= 1000; step++) {
		console.log()
		console.log(`Step ${step}, flashes ${flashes}`)
		Charge();
		FlashMap();
		DeCharge();
		PrintMap();
		if (CheckForSync())
			break;

	}
	console.log('total flashes', flashes)
})