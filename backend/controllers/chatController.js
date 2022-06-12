const Chat = require("../models/chat");
const { body, validationResult } = require("express-validator");

exports.get_chat = (req, res, next) => {
  //res.json({"res":"respond with a resource"});
  Chat.find().sort({time:-1}).limit(10).exec((err, chats) => {
    if (err) return next(err);
    res.json(chats);
  });
};
exports.create_chat = [
  body("message")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("message is required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      try {
        const chat = new Chat({
          userName: req.body.userName,
          message: req.body.message,
          time: req.body.time,
        });
        const result = await chat.save();

        global.io.emit("chat message", result);
        res.json(result);
      } catch (err) {
        return next(err);
      }
    }
  },
];
