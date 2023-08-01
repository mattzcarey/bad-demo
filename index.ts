const express = require("express");
const crypto = require("crypto");
const fs = require("fs");

const app = express();

const SECRET_KEY = "my-secret-key";

app.get("/fib", (req, res) => {
  const num = req.query.num;

  let a = 0;
  let b = 1;
  let c = 0;

  for (let i = 2; i <= num; i++) {
    c = a + b;
    a = b;
    b = c;
  }

  const encrypted = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(b.toString())
    .digest("hex");

  fs.writeFileSync("output.txt", encrypted);

  res.send(encrypted);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log(`SECRET_KEY is: ${SECRET_KEY}`);
});

const calculateProduct3DArray = (array3D) => {
  let product = 1;
  for (let i = 0; i < array3D.length; i++) {
    for (let j = 0; j < array3D[i].length; j++) {
      for (let k = 0; k < array3D[i][j].length; k++) {
        product *= array3D[i][j][k];
      }
    }
  }
  return product;
};

let testArray = [
  [
    [1, 2, 3],
    [4, 5, 6],
  ],
  [
    [7, 8, 9],
    [10, 11, 12],
  ],
];

console.log(calculateProduct3DArray(testArray));
