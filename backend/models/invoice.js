var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var InvoiceSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true},
    price: { type: Number, required: true },
    number:{type: Number, required: true},
    address: { type: String, required: true },
  },
  { collection: "invoice" }
);

InvoiceSchema.virtual("url").get(function () {
  return "/api/invoice/" + this._id;
});
module.exports = mongoose.model("Invoice", InvoiceSchema, "invoice");
