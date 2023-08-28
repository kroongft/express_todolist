const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const db = require("../db");

router.get("/", (req, res) => {
  const sql = "Select * from todo Order by active != 0, created_at desc;";
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
router.post("/", (req, res) => {
  const { title, body, active } = req.body;
  const sql = `INSERT INTO express_db.todo (title, body, active) VALUES ('${title}', '${body}', ${active});`;
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

router.put("/", (req, res) => {
  const { id, title, body, active } = req.body;
  const date = dayjs().format("YYYY-MM-DD hh:mm:ss");

  const sql = `UPDATE express_db.todo SET title='${title}', body='${body}', active=${active}, updated_at='${date}' WHERE id=${id};`;
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

router.put("/updateCheck/:id", (req, res) => {
  const { active } = req.body;
  const { id } = req.params;

  const sql = `UPDATE express_db.todo SET active=${active} WHERE id=${id};`;
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  console.log(id);
  console.log(req);
  console.log(req.params.id);
  const sql = `DELETE FROM express_db.todo WHERE id=${id};`;
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
