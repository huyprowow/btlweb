var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ChatSchema = new Schema(
  {
    userName: { type: String, required: true },
    time:{ type: Date, required: true ,default: Date.now},
    message: { type: String, required: true},
  },
  { collection: "chat" }
);

module.exports = mongoose.model("Chat", ChatSchema, "chat");