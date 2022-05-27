const express = require("express");
const res = require("express/lib/response");
const mysql = require("mysql");
const quiz = require("./routes/api/quiz");

const db = mysql.createConnection({
  host: "quiz-manager.cabgmdnsr9sn.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "quizAdmin",
  password: "2sm5NUCpMUCjQrX",
  database: "quiz_manager",
});

db.connect((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Content-Type: application/json");
  next();
});

app.use("/api/quiz", quiz);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
