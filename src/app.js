const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const app = express();

cloudinary.config({
  cloud_name: "minterger",
  api_key: "645972382878563",
  api_secret: "hUnCkWMVBFpwObWoe1-DEJqIb0g",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
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

/**
 * sube la imagen
 */
app.post("/upload", (req, res) => {
  cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    } else {
      console.log(result);
      res.json({
        data: result,
      });
    }
  });
});

module.exports = app;
