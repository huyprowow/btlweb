const Product = require("../models/product");
// const async = require('async');

exports.get_product_list = (req, res, next) => {
  Product.find().exec((err, products) => {
    if (err) return next(err);
    res.json(products);
  });
};
exports.get_single_product = (req, res, next) => {
  Product.findById(req.params.id).exec((err, product) => {
    if (err) return next(err);
    res.json(product);
  });
};
// exports.create_product = [
//   body("name")
//     .trim()
//     .escape()
//     .not()
//     .isEmpty()
//     .withMessage("product name is required"),
//   body("status")
//     .trim()
//     .escape()
//     .not()
//     .isEmpty()
//     .withMessage("product status is required")
//     .isBoolean()
//     .withMessage("product status must be boolean"),
//   body("image")
//     .trim()
//     .escape()
//     .not()
//     .isEmpty()
//     .withMessage("product image is required"),
//   body("type")
//     .trim()
//     .escape()
//     .not()
//     .isEmpty()
//     .withMessage("product type is required"),
//   body("price")
//     .trim()
//     .escape()
//     .not()
//     .isEmpty()
//     .withMessage("product type is required")
//     .isNumeric()
//     .withMessage("product price must be number"),
//   body("description").trim().escape(),

//   async (req, res, next) => {},
// ];
