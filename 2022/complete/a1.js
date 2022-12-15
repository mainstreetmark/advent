import fs from "fs";

var elfs = [];
var i = 0;

fs.readFile("a1.txt", "utf8", (err, contents) => {
  const lines = contents.split("\n");
  for (var l of lines) {
    if (l.length == 0) i++;
    if (!elfs[i]) elfs[i] = 0;
    elfs[i] += Number(l);
    console.log(">", i, l, l.length);
  }
  console.log(elfs);
  const max = Math.max(...elfs);
  const elf = elfs.indexOf(max);
  console.log(max, elf);

  // part2

  const sort = elfs.sort((a, b) => b - a);
  console.log(sort);

  const total = sort[0] + sort[1] + sort[2];
  console.log(total);
});
