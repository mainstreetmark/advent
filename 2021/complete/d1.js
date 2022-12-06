import fs from 'fs'
var cards = []

function CheckCard(card) {
	for (var x=0; x<5;x++) {
		var tx=0;
		var ty=0;
			for (var y=0; y<5; y++) {
			// console.log(x,y,card[x][y],tx,ty)
			tx += Number(card[x][y])
			ty += Number(card[y][x])
		}
		if (tx ===0 || ty === 0)
		return true;
	}
	return false
}
function CountCard(card) {
	var sum = 0;
	for (var x= 0; x<5; x++)
		for (var y=0; y<5; y++)
			sum += Number(card[x][y])
	return sum
}

fs.readFile('d.txt', 'utf8', (err, contents) => {
	const lines = contents.split('\n');
	var draw = lines.shift().split(',');
	var card = -1;
	while (lines.length) {
		if (lines[0] === '') {
			card++;
			cards[card]=[]
			lines.shift()
		}
		else {
			cards[card].push(lines.shift().trim().split(/\s+/))
		}
	}

	for (var d of draw) {
		// console.log(d)
		for (var c in cards) {
			var card = cards[c]
			if (card) {
				for (var row in card) {
					for (var col in card[row]) {
						if (card[row][col] === d) cards[c][row][col]=0
					}
				}
				if (CheckCard(card)) {
					cards[c] = false;
					if(cards.filter(c => c !== false).length===0)
						console.log(card, c, d,CheckCard(card), CountCard(card), CountCard(card)*d)
				}
			}
		}
	}

	// for (var d of draw) {
	// 	// console.log('-----', d)
	// 	for (var c in cards) {
	// 		var card = cards[c]
	// 		if (card) {
	// 			for (var row in card) {
	// 				for (var col in card[row]) {
	// 					if (card[row][col] === d) cards[c][row][col]=0
	// 				}
	// 			}
	// 			// console.log(card)
	// 		}
	// 	}

	// 	var count = cards.length;
	// 	for (var c in cards) {
	// 		var card = cards[c];
	// 		// console.log(card)
	// 		if (!card || CheckCard(card)) {
	// 			count--;
	// 			cards[c] = false;
	// 		}
	// 	}

	// 	if (count == 1) {
	// 		card = cards.filter(c => c !== false)
	// 		console.log(card[0], d)
	// 		console.log(CountCard(card[0]))
	// 	}
	// }
	// console.log(cards);
	// console.log(draw)
	// var wins = cards.length
	// for (var d of draw) {
	// 	// console.log(d)
	// 	for(var c in cards) {
	// 		if (cards[c]) {
	// 			for (var r in cards[c])
	// 				for (var n in cards[c][r])
	// 					if (cards[c][r][n]==d)
	// 						cards[c][r][n]=0
	// 		}			
	// 		if (wins > 0 && cards[c] && CheckCard(cards[c])) {
	// 			wins--;
	// 			console.log("win",d, wins,c, cards[c], CountCard(cards[c])*d, d)
	// 			cards[c] = false;
	// 			break ;
	// 		}
		
	// 	}
	// 	// console.log(d,cards)
	// }

}) 