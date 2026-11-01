const md5 = require("md5");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

let storage;

const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_URL ||
  (process.env.CLOUDINARY_CLOUD_NAME &&
   process.env.CLOUDINARY_API_KEY &&
   process.env.CLOUDINARY_API_SECRET)
);

if (isCloudinaryConfigured) {
  const cloudinary = require("cloudinary").v2;
  const { CloudinaryStorage } = require("multer-storage-cloudinary");

  if (process.env.CLOUDINARY_URL) {
    cloudinary.config(); // Automatically parses CLOUDINARY_URL from process.env
  } else {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      const isDocument =
        file.mimetype.includes("pdf") ||
        file.mimetype.includes("word") ||
        file.mimetype.includes("officedocument") ||
        file.mimetype.includes("octet-stream");

      return {
        folder: "arma/uploads",
        resource_type: isDocument ? "raw" : "auto",
        public_id: `${Date.now()}-${md5(file.originalname)}`,
      };
    },
  });
} else {
  // Local disk storage fallback
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const hashValue = md5(file.originalname + Date.now());
      const pathValue = path.join(
        __dirname,
        "../../../data/static/",
        hashValue.slice(0, 1),
        hashValue.slice(0, 2)
      );

      let stat = null;
      try {
        stat = fs.statSync(pathValue);
      } catch (err) {
        fs.mkdirSync(pathValue, { recursive: true });
      }
      if (stat && !stat.isDirectory()) {
        throw new Error(
          'Directory cannot be created because an inode of a different type exists at "' +
            pathValue +
            '"'
        );
      }
      cb(null, pathValue);
    },
    filename: function (req, file, cb) {
      const fileName =
        md5(file.originalname + String(Date.now())) +
        "." +
        file.mimetype.substring(file.mimetype.indexOf("/") + 1);
      return cb(null, fileName);
    },
  });
}

module.exports = storage;
