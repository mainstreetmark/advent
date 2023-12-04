import fs from "fs";

const map = {
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
	zero: "0",
	1: "1",
	2: "2",
	3: "3",
	4: "4",
	5: "5",
	6: "6",
	7: "7",
	8: "8",
	9: "9",
	0: "0",
};

fs.readFile("a1.txt", "utf8", (err, contents) => {
	let sum = 0;
	const lines = contents.split("\n");
	for (var line of lines) {
		const num = [];
		if (line) {
			console.log("] ", line);
			for (var s = 0; s < line.length; s++) {
				// console.log(line.substring(s));
				const keys = Object.keys(map);
				for (var m of keys) {
					if (line.substring(s, s + m.length) === m) {
						console.log(">", m, line);
						num.push(map[m]);
						// s = 0;
						// break;
					}
				}
			}
			// console.log(">>", line);
			// var nums = line.match(/\d+/g);
			// var num = nums.join("");
			// // console.log(num);
			var val = `${num[0]}${num[num.length - 1]}`;
			// console.log(val);
			sum += parseInt(val);
		}
		console.log("ouit", num);
	}
	console.log(">", sum);
});
