const Product = require("../models/product");
const { body, validationResult } = require("express-validator");
const path = require("path");
// const async = require('async');
const Resize = require("../utils/resize");
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
exports.create_product = [
  body("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("product name is required"),
  body("status")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("product status is required")
    .isBoolean()
    .withMessage("product status must be boolean"),
  body("type")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("product type is required"),
    body("number")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("product number is required"),
  body("price")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("product type is required")
    .isNumeric()
    .withMessage("product price must be number"),
  body("description").trim().escape(),
  async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      // const url = req.protocol + "://" + req.get("host");
      // const imgPath = url + "/public/images";
      try {
        const imgPath = path.join(__dirname, "../../frontend/public/images");
        const fileUpload = new Resize(imgPath);
        // console.log(imgPath);
        console.log(fileUpload);
        console.log(req.body);
        if (!req.file) {
          res.status(401).json({ errors: [{ msg: "làm ơn tải lên ảnh" }] });
        }
        console.log(req.file);
        const fileName = await fileUpload.resize(req.file.buffer); //cho resize, luu anh tra ve file name
        const product = await new Product({
          name: req.body.name,
          price: req.body.price,
          image: "/images/" + fileName,
          type: req.body.type,
          status: req.body.status,
          number: req.body.number,
          description: req.body.description,
        });
        const createdProduct = await product.save();
        return res.status(201).json({
          message: "upload successfully",
          product: createdProduct,
        });
      } catch (err) {
        return res.status(500).json({
          errors: [
            { msg: "Không up được ảnh hoặc k lưu đc sản phẩm vào csdl" },
          ],
        });
      }
    }
  },
];
