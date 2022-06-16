const multer = require("multer");
const path = require("path");
// const storage=multer.diskStorage({// dung sharp de luu nen k dung cai nay (co dung dan roi)
//   destination: function(req, file, cb){
//     const imgPath = path.join(__dirname, "../../frontend/public/images");
//     cb(null, imgPath);
//   },
//   filename: function(req, file, cb){
//     cb(null, file.originalname);
//   }
// });
const filterFile = (req, file, callback) => {
  var ext = path.extname(file.originalname).toLowerCase();
  if (
    ext !== ".png" &&
    ext !== ".jpg" &&
    ext !== ".gif" &&
    ext !== ".jpeg" &&
    ext !== ".svg" &&
    ext !== ".webp"&&
    ext!==".jfif"
  ) {
    return callback(/*res.end('Only images are allowed')*/ null, false);
  }

  callback(null, true);
};

const upload = multer({
  limits: {
    fileSize: 16 * 1024 * 1024,
  }, // 16MB
  fileFilter: filterFile,
});

module.exports = upload;
