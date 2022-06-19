//return json: number of products, number user, total revenue
const Product = require("../models/product");
const Invoice = require("../models/invoice");
const Account = require("../models/account");

exports.get_overview = async (req, res, next) => {
  try {
    const numberProduct = await Product.countDocuments();
    const numberUser = await Account.countDocuments();
    const totalRevenue = await Invoice.aggregate([
      {
        $project: {
          price: 1,
          number: 1,
        },
      },
      {
        $group: {
          _id: "revenue",
          totalRevenue: {
            $sum: { $multiply: ["$price", "$number"] },
          },
        },
      },
    ]);
    return res.status(200).json({
      numberProduct,
      numberUser,
      totalRevenue: totalRevenue[0].totalRevenue,
    });
  } catch (error) {
    return res.status(500).json({ errors: [{ msg: error.message }] });
  }
};
