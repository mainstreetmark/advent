import fs from "fs";

const H = [0, 0];
const T = [0, 0];
const snake = Array(10)
	.fill()
	.map(() => [0, 0]);
const size = 400;
const map = Array(size)
	.fill()
	.map(() => Array(size).fill("."));

function Catchup() {
	snake[0][0] = H[0];
	snake[0][1] = H[1];
	for (var s = 1; s < snake.length; s++) {
		if (
			Math.abs(snake[s - 1][0] - snake[s][0]) >= 2 ||
			Math.abs(snake[s - 1][1] - snake[s][1]) >= 2
		) {
			if (snake[s - 1][0] < snake[s][0]) snake[s][0]--;
			if (snake[s - 1][0] > snake[s][0]) snake[s][0]++;
			if (snake[s - 1][1] < snake[s][1]) snake[s][1]--;
			if (snake[s - 1][1] > snake[s][1]) snake[s][1]++;
		}
	}
	T[0] = snake[snake.length - 1][0];
	T[1] = snake[snake.length - 1][1];
	console.log(T);
	map[size / 2 + T[1]][size / 2 + T[0]] = "#";
	// console.log(map.map((m) => m.join("")).join("\n"));
}

function Move(dir, dist) {
	for (var i = 0; i < dist; i++) {
		switch (dir) {
			case "R":
				H[0]++;
				break;
			case "L":
				H[0]--;
				break;
			case "U":
				H[1]--;
				break;
			case "D":
				H[1]++;
				break;
		}
		Catchup();
		// console.log(map.map((m) => m.join("")).join("\n"));
	}
}

fs.readFile("d09.txt", "utf8", (err, contents) => {
	const lines = contents.split("\n");
	lines.pop();
	for (var l of lines) {
		const [dir, dist] = l.split(" ");
		console.log(dir, dist);
		Move(dir, dist);
	}
	// console.log(map.map((m) => m.join("")).join("\n"));
	console.log(">>", map.join("").split("#").length - 1);
});
