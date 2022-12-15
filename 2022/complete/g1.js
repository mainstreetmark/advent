import fs from "fs";

let flat = [];
let dir = {};
let pwd = "/";

fs.readFile("g1.txt", "utf8", (err, contents) => {
	const lines = contents.split("\n");
	for (var l of lines) {
		// console.log(l);
		if (l.length) {
			if (l[0] == "$") {
				const [dollar, cmd, arg] = l.split(" ");
				switch (cmd) {
					case "cd":
						if (arg == "/") pwd = "/";
						else if (arg == "..")
							pwd = pwd.substring(0, pwd.lastIndexOf("/"));
						else pwd += "/" + arg;
						pwd = pwd.replace("//", "/");
						if (pwd == "") pwd = "/";
						// console.log(arg, "\t", pwd);
						break;
					case "ls":
						break;
				}
			} else {
				const [size, file] = l.split(" ");
				if (size != "dir") flat.push(`${pwd} ${file} ${size}`);
			}
		}
	}
	console.log("flat", flat);
	const dirs = [...new Set(flat.map((f) => f.split(" ")[0]))];
	// console.log("dirs", dirs);

	// console.log(
	// 	">>",
	// 	dirs.map((dir) => flat.filter((f) => f.indexOf(dir) == 0))
	// );

	const sizes = dirs
		.map((dir) => flat.filter((f) => f.indexOf(dir) == 0))
		.map((files) =>
			files.reduce((sum, f) => sum + Number(f.split(" ")[2]), 0)
		);
	// console.log("sizes", sizes);

	let sum = 0;
	for (var i = 0; i < dirs.length; i++) {
		if (sizes[i] <= 100000) {
			console.log("+ ", sizes[i], "\t", dirs[i]);
			sum += sizes[i];
			// }
		} else console.log("  ", sizes[i], "\t", dirs[i]);
	}

	console.log(">>", sum);
});
