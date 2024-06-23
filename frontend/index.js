const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const registerRoute = require("./routes/auth/register");
const loginRoute = require("./routes/auth/login");
const logoutRoute = require("./routes/auth/logout");
const meRoute = require("./routes/auth/me");

const app = express();

app.use(require("morgan")("dev"));

app.use(express.json());
app.use(cookieParser());

app.use(registerRoute);
app.use(loginRoute);
app.use(logoutRoute);
app.use(meRoute);

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  const myPath = path.resolve(__dirname, "client", "build", "index.html");
  console.log("__dirname: ", __dirname);
  console.log("My Path: ", myPath);
  return res.sendFile(myPath);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
