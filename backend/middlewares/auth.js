const jwt = require("jsonwebtoken");
const Account = require("../models/account");

const protecting = async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      req.user = await Account.findById(decoded._id).select("-password");
      next();
    }
  } catch (err) {
    return res.status(401).json({
      errors: [{ msg: "auth failed token wrong or expired" }],
    });
  }
  if (!token) {
    return res.status(401).json({
      errors: [{ msg: "No token found in header " }],
    });
  }
};

module.exports = { protecting };
