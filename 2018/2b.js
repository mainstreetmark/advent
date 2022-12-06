const fs = require('fs');

fs.readFile('boxid.txt', 'utf8', (err, contents) => {
	const lines = contents.split('\n');
	for (const l in lines) {
		const line = lines[l];

		for (let n = Number(l) + 1; n < lines.length - 1; n++) {
			const line2 = lines[n];
			let diffs = 0;
			for (const c in line)
				if (line[c] !== line2[c])
					diffs++;

			if (diffs == 1) {
				// console.log(diffs, line, line2);
				console.log(line);
				console.log(line2);
			}
			// process.exit();
		}
	}
});

