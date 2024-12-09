import Map from "../Map.class.js";

const map = new Map("d08/d08.txt");

function AddNodes(node1, node2, multiply = 1) {
	const dr = (node2[0] - node1[0]) * multiply;
	const dc = (node2[1] - node1[1]) * multiply;
	return [node2[0] + dr, node2[1] + dc];
}
function SubNodes(node1, node2, multiply = 1) {
	const dr = (node2[0] - node1[0]) * multiply;
	const dc = (node2[1] - node1[1]) * multiply;
	return [node1[0] - dr, node1[1] - dc];
}

map.print("Original");
const freqs = map.identifyChars();
var antinodes = [];
for (var f of freqs) {
	const nodes = map.findAll(f);
	// console.log("Freq>", f, nodes);
	for (var n1 = 0; n1 < nodes.length; n1++) {
		var node1 = nodes[n1];
		// console.log(n1, node1);
		for (var n2 = n1 + 1; n2 < nodes.length; n2++) {
			// console.log(n1, nodes[n1], "=>", n2, nodes[n2]);
			var node2 = nodes[n2];
			for (var i = 1; i < 10; i++) {
				antinodes.push(AddNodes(node1, node2, i));
				antinodes.push(SubNodes(node1, node2, i));
			}
			antinodes.push(node1);
			antinodes.push(node2);
		}
	}
}
const field = Array(map.height * map.width).fill(0);
for (var a of antinodes) {
	if (map.set(a, "#")) {
		field[a[1] * map.width + a[0]]++;
	}
}
// console.log(field.join(""));
map.print("result");
// console.log(field.reduce((a, b) => a + b, 0));
console.log(">>", map.findAll("#").length);

// console.log(map.findAll("A"));
