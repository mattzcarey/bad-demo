//This is bad code
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
