const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../db");

router.post("/register", (req, res) => {
  const sql = "INSERT INTO express_db.user set ?";
  const { id, name, email, password } = req.body;
  let currentPassword = password;
  const encryptedPW = bcrypt.hashSync(currentPassword, 10);
  const param = {
    name,
    email,
    password: encryptedPW,
  };
  db.query(sql, param, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
router.post("/checkEmail", (req, res) => {
  const sql = "SELECT email from express_db.user where email=?";
  const { email } = req.body;

  db.query(sql, email, function (err, result, fields) {
    if (err) throw err;
    const checkEmail = new Object();

    checkEmail.valid = false;

    if (result[0] === undefined) {
      checkEmail.valid = true;
    } else {
      checkEmail.valid = false;
    }

    res.send(checkEmail);
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sendData = { isLogin: "" };

  console.log(email, password);

  if (email && password) {
    db.query(
      "SELECT * FROM express_db.user WHERE email =?",
      [email],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          console.log("-------------------", results);
          bcrypt.compare(password, results[0].password, (err, result) => {
            // 비밀번호가 일치하면 세션 정보 갱신

            console.log(result);
            if (result === true) {
              req.session.is_login = true;
              req.session.name = result.name;

              req.session.nickname = req.session.save(function () {
                sendData.isLogin = true;
                res.send(sendData);
              });
            } else {
              conosle.log(2222);
              // 비밀번호가 다른 경우
              sendData.isLogin = "로그인 정보가 일치하지 않습니다.";
            }
          });
        } else {
          // db에 해당 아이디가 없는 경우
          sendData.isLogin = "아이디 정보가 일치하지 않습니다.";
          res.send(sendData);
        }
      }
    );
  } else {
    // 아이디, 비밀번호 중 입력되지 않은 값이 있는 경우
    sendData.isLogin = "아이디와 비밀번호를 입력하세요!";
    res.send(sendData);
  }
});

module.exports = router;
