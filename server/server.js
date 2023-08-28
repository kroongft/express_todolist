const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const sessionOption = require("./sessionOption");
const PORT = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
};

app.use(cors(corsOptions));

const MySQLStore = require("express-mysql-session")(session);
const sessionStore = new MySQLStore(sessionOption);

app.use(
  session({
    key: "session_cookie_name",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

// routes
const todoRouter = require("./routes/todo");
const authRouter = require("./routes/auth");

app.use("/todo", todoRouter);
app.use("/auth", authRouter);
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
