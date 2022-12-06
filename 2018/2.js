const fs = require('fs');

fs.readFile('boxid.txt', 'utf8', (err, contents) => {
	let twos = 0;
	let threes = 0;
	const lines = contents.split('\n');
	for (const l in lines) {
		const line = lines[l];
		const counts = {};

		for (let n = 0; n < line.length; n++) {
			const char = line[n];
			counts[char] = counts[char] ? counts[char] + 1 : 1;
		}

		for (const c in counts)
			if (counts[c] == 2) {
				twos++;
				break;
			}

		for (const c in counts)
			if (counts[c] == 3) {
				threes++;
				break;
			}
	}
	console.log(twos, threes, twos * threes);
});

