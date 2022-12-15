import fs from "fs";

function is_marker(chars) {
	// console.log(new Set(chars).size, chars.length);
	return (
		new Set(chars).size == chars.length &&
		chars.indexOf("_") == -1 &&
		chars[0] !== undefined
	);
}

const size = 14;
const stack = Array(size);
let pos = 1;

fs.readFile("f1.txt", "utf8", (err, contents) => {
	var chars = contents.split("");
	console.log(chars);
	for (var c of chars) {
		stack.shift();
		stack.push(c);
		console.log(pos, stack.join(""), is_marker(stack));
		if (is_marker(stack)) break;
		pos++;
	}
	console.log(">>", pos);
});
