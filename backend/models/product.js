var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ProductSchema = new Schema(
  {
    name: { type: String, required: true},
    price: { type: Number, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: Boolean, required: true },
    number:{type: Number, required: true},
    description: { type: String},
  },
  { collection: "product" }
);

ProductSchema.virtual("url").get(function () {
  return "/api/product/" + this._id;
});
module.exports = mongoose.model("Product", ProductSchema, "product");
