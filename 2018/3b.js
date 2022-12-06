const fs = require('fs');

const CheckCollision2 = function cc(x1, y1, w1, h1, x2, y2, w2, h2) {
	const X1 = (x2 >= x1 && x2 < x1 + w1);
	const Y1 = (y2 >= y1 && y2 < y1 + h1);
	const X2 = (x2 + w2 >= x1 && x2 + w2 < x1 + w1);
	const Y2 = (y2 + h2 >= y1 && y2 + h2 < y1 + h1);
	// console.log(X1, Y1, X2, Y2, '=', X1 || Y1 || X2 || Y2);
	return (X1 && Y1) || (X2 && Y2) || (X1 && Y2) || (X2 && Y1);
};
const CheckCollision = function cc2(x1, y1, w1, h1, x2, y2, w2, h2) {
	if (x1 >= x2 && x1 < x2 + w2 && y1 >= y2 && y1 < y2 + h2)
		return true;
	if (x1 + w1 >= x2 && x1 + w1 < x2 + w2 && y1 >= y2 && y1 < y2 + h2)
		return true;
	if (x1 >= x2 && x1 < x2 + w2 && y1 + h1 >= y2 && y1 + h1 < y2 + h2)
		return true;
	if (x1 + w1 >= x2 && x1 + w1 < x2 + w2 && y1 + h1 >= y2 && y1 + h1 < y2 + h2)
		return true;
	return false;
};


fs.readFile('fabric.txt', 'utf8', (err, contents) => {
	console.log('start');
	const lines = contents.split('\n');
	let line = '';
	let line2 = '';
	for (let n = 0; n < lines.length - 1; n++) {
		line = lines[n];
		// line = '#476 @ 461,26: 13x24';
		const parts = line.split(/[\s#@,:x]+/);
		const id = parts[1];
		const l = Number(parts[2]);
		const t = Number(parts[3]);
		const w = Number(parts[4]);
		const h = Number(parts[5]);
		let collision = false;
		for (let m = 0; m < lines.length - 1; m++) {
			if (m == n)
				continue;
			line2 = lines[m];
			const parts2 = line2.split(/[\s#@,:x]+/);
			const id2 = parts2[1];
			const l2 = Number(parts2[2]);
			const t2 = Number(parts2[3]);
			const w2 = Number(parts2[4]);
			const h2 = Number(parts2[5]);
			const collide = CheckCollision2(l, t, w, h, l2, t2, w2, h2) || CheckCollision2(l2, t2, w2, h2, l, t, w, h);
			// console.log(n, m, collide);
			if (collide) {
				// console.log('colide', n, m, line, line2);
				collision = true;
				break;
			}
		}
		if (!collision)
			console.log(line);
	}
});
