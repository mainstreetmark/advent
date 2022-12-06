import fs from "fs";

const scores = { X: 1, Y: 2, Z: 3 }; // rock, pap, siss
const results = { AX: 3, AY: 6, AZ: 0, BX: 0, BY: 3, BZ: 6, CX: 6, CY: 0, CZ: 3 };

const scores2 = { X: 0, Y: 3, Z: 6 }; // loose,draw, win
const results2 = { AX: 3, AY: 1, AZ: 2, BX: 1, BY: 2, BZ: 3, CX: 2, CY: 3, CZ: 1 };

let totalscore = 0;
let score = 0;

fs.readFile("b1.txt", "utf8", (err, contents) => {
  const lines = contents.split("\n");
  for (var l of lines) {
    const [A, X] = l.split(" ");
    score = scores2[X] + results2[A + X];

    console.log(">", A, X, results2[A + X], scores2[X], "=", score);
    totalscore += score;
  }

  console.log(totalscore);
});
