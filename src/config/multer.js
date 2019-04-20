const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

//Upload de arquivo
module.exports = {
  //path resolver
  dest: path.resolve(__dirname, "..", "..", "tmp"),
  //gravar o arquivo
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) cb(err.message);

        file.key = `${buf.toString("hex")} - ${file.originalname}`;
        cb(null, file.key);
      });
    }
  })
};
