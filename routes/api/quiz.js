const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const bcrypt = require("bcrypt");
// const config = require("config");
const jwt = require("jsonwebtoken");

const db = mysql.createConnection({
  host: "quiz-manager.cabgmdnsr9sn.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "quizAdmin",
  password: "2sm5NUCpMUCjQrX",
  database: "quiz_manager",
});

db.connect();

router.use("/", (req, res, next) => {
  res.header();
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Content-Type: application/json");
  next();
});

router.get("/question/:quizId", (req, res) => {
  const sql = `SELECT FROM question WHERE quizId = ${req.params.quizId}`;

  try {
    db.query(sql, (err, result) => {
      if (err) throw error;
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    return;
  }
});

router.post("/createQuiz", (req, res) => {
  console.log(req.body);

  const sql = `INSERT INTO quiz (name, userId, createdDate, updatedDate) VALUES ('${req.body.name}', '${req.body.userId}', '${req.body.createdDate}', '${req.body.updatedDate}')`;

  try {
    db.query(sql, (err, result) => {
      if (err) throw error;
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    return;
  }
});

router.post("/createQuestion", (req, res) => {
  console.log(req.body);

  const sql = `INSERT INTO question (question, quizId, createdDate, updatedDate) VALUES ('${req.body.question}', '${req.body.quizId}', '${req.body.createdDate}', '${req.body.updatedDate}')`;

  try {
    db.query(sql, (err, result) => {
      if (err) throw error;
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    return;
  }
});

router.post("/createAnswer", (req, res) => {
  console.log(req.body);

  const sql = `INSERT INTO answer (answer, questionId, isCorrect, createdDate, updatedDate) VALUES ('${req.body.answer}','${req.body.questionId}',${req.body.isCorrect}, '${req.body.createdDate}', '${req.body.updatedDate}')`;

  try {
    db.query(sql, (err, result) => {
      if (err) throw error;
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    return;
  }
});

router.get("/questions", (req, res) => {});

module.exports = router;
