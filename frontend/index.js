const express = require("express");
const path = require("path");

require("dotenv").config();

const registerRoute = require("./routes/auth/register");

const app = express();

app.use(require("morgan")("dev"));

app.use(express.json());
app.use(registerRoute);

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  const myPath = path.resolve(__dirname, "client", "build", "index.html");
  console.log("__dirname: ", __dirname);
  console.log("My Path: ", myPath);
  return res.sendFile(myPath);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
