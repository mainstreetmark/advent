import fs from "fs";

let pwd = "/";
let files = [];
let dirs = [];
let sizes = {};

fs.readFile("g1.txt", "utf8", (err, contents) => {
	const lines = contents.split("\n");
	lines.pop();
	for (var l of lines) {
		if (l[0] == "$") {
			// cmd
			const [dollar, cmd, arg] = l.split(" ");
			switch (cmd) {
				case "cd":
					if (arg == "..") {
						const bits = pwd.split("/");
						bits.pop();
						bits.pop();
						pwd = bits.join("/") + "/";
					} else if (arg == "/") pwd = "/";
					else pwd += arg + "/";
					dirs.push(pwd);
				// console.log(l, pwd);
			}
		} else {
			const [size, file] = l.split(" ");
			if (size !== "dir") {
				files.push(`${pwd}${file} ${size}`);
				// console.log(pwd, file, size);
			}
		}
	}
	// console.log(files);
	dirs = [...new Set(dirs)];
	// console.log(dirs);

	const total = 70000000;
	const need = 30000000;
	let current = false;
	let smallest = 100000000000000;
	let free = 0;

	var sum = 0;
	for (var d of dirs) {
		const matches = files.filter((f) => f.indexOf(d) == 0);
		const size = matches.reduce(
			(sum, m) => sum + Number(m.split(" ")[1]),
			0
		);
		if (!current) {
			current = size;
			free = total - size;
		}
		console.log(free + size, need, free + size > need);
		if (free + size > need) {
			if (size < smallest) {
				smallest = size;
				// console.log("", d, size, smallest, need - (total - current));
			}
		}
	}
	console.log(">>", smallest);
});
