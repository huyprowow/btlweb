const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const AccountSchema = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true ,default:"user" },
  },
  { collection: "account" }
);

AccountSchema.pre("save", async function save(next) {
  //if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

AccountSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

AccountSchema.virtual("url").get(function () {
  return "/api/account/" + this._id;
});
//require('crypto').randomBytes(64).toString('hex')
module.exports = mongoose.model("Account", AccountSchema, "account");
