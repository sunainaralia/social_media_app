/*import multer for upload image and used it as middleware */
const multer = require("multer");
/*set image destination and filename in our staorage  */
module.exports = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("others_file");
