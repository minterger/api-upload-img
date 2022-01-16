const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const path = require("path");

const app = express();

cloudinary.config({
  cloud_name: "minterger",
  api_key: "645972382878563",
  api_secret: process.env.API_SECRET,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("ok");
});

/**
 * sube la imagen
 */
app.post("/upload", (req, res) => {
  cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.json({
        data: result,
      });
    }
  });
});

module.exports = app;
