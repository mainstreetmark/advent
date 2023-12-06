import fs from "fs";

fs.readFile("d1s.txt", "utf8", (err, contents) => {
	const lines = contents.trim().split("\n");
	for (var l of lines) {
		if (l) {
		}
	}
});
