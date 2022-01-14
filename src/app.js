const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/uploads"));
  },
  filename: (req, file, cb) => {
    const filename = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  dest: path.join(__dirname, "public/uploads"),
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

/**
 * Obtiene la url de la api
 * @param {Obejct} req Objeto request de express
 * @returns 
 */
const getUrl = (req) => {
  const url = req.protocol + "://" + req.get("host");
  return url;
};

app.post("/upload", upload.single("image"), (req, res) => {
  const url = getUrl(req);
  const imageUrl = url + "/uploads/" + req.file.filename;
  res.json({
    url: imageUrl,
  });
});

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
