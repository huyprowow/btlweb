const express = require("express");
// var path = require('path');
var createError = require("http-errors");
var cookieParser = require("cookie-parser");
var logger = require("morgan"); //log lỗi
var cors = require("cors");

var homeRouter = require("./routes/home");
var accountRouter = require("./routes/account");
var chatRouter = require("./routes/chat");
var indexRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/api", homeRouter);
app.use("/api/accounts", accountRouter);
app.use("/api/chat",chatRouter);

// app.use("*", (req, res) => {
//   res.status(404).json({ error: "not found" });
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development(tlap cuc bo, chỉ cung cấp lỗi trong quá trình phát triển)
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page (json)
  res.status(err.status || 500);
  res.json({ error: err.message, "err status": err.status });
});

module.exports = app;
