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
  if (!req.files.image.mimetype.includes("image")) {
    return res.status(400).json({
      ok: false,
      message: "The file is not an image",
    });
  }

  cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {
    if (err) {
      res.status(500).json({
        ok: false,
        message: "Error uploading the image",
      });
    } else {
      res.json({
        ok: true,
        data: result,
      });
    }
  });
});

module.exports = app;
