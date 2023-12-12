import fs from "fs";

fs.readFile(process.argv[2], "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	for (var l of lines) {
		if (l) {
			console.log(l);
		}
	}
});
