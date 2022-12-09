import fs from "fs";
const stacklines = [];
const movelines = [];

function stack_to_array(stack) {
	const length = Math.max(...stack.map(s => s.length));
	const cols = (length+1)/4
	console.log("len", length,"cols", cols);
	const array = [];

	for (var l =stack.length-1; l>=0; l--) {
		const r= 0;
		let row = stack[l].padEnd(length).replace(/[\[\]]/g,' ');
		// console.log(">", row,"<");
		let string = '';
		for(var col = 1; col < length; col += 4) {
			if(!array[(col-1)/4]) array[(col-1)/4]='';
			array[(col-1)/4]+=row[col]
		}
		// array.push(string);
	}

	return array.map(a => a.trim());
}

function Move(stacks, count, from, to) {
	count = Number(count);
	from = Number(from)-1;
	to = Number(to)-1;
	console.log("move", stacks[1], count, from , to);
	for (var c = 0; c<count; c++) {
		var item = stacks[from].split('').pop();
		stacks[from] = stacks[from].replace(/.$/, '')
		stacks[to]+=item;
		// console.log("  >", item);
	}
	return stacks
}

fs.readFile("e1.txt", "utf8", (err, contents) => {
	const lines = contents.split("\n");
	for (var l of lines) {
		if (l.substring(0, 4) == "move") movelines.push(`${l}`);
		else if (l.indexOf("[") >= 0) stacklines.push(l);
	}
	console.log();

	let stacks = stack_to_array(stacklines);
	for (var m of movelines) {
		const [ x, count,y , from,z , to ] = m.split(" ");
		stacks = Move(stacks, count, from,to);
		console.log(stacks);
	}

	console.log("out>", stacks.map(s => s.split('').pop()).join(''))

});

