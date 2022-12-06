import fs from "fs";

const scores = { X: 1, Y: 2, Z: 3 };
const results = { AX: 3, AY: 6, AZ: 0, BX: 0, BY: 3, BZ: 6, CX: 6, CY: 0, CZ: 3 };

let totalscore = 0;
let score = 0;

fs.readFile("b1.txt", "utf8", (err, contents) => {
  const lines = contents.split("\n");
  for (var l of lines) {
    const [A, X] = l.split(" ");
    score = scores[X] + results[A + X];

    console.log(">", A, X, scores[A], results[A + X], "=", score);
    totalscore += score;
  }

  console.log(totalscore);
});
