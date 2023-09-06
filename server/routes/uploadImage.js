const express = require("express");
const router = express.Router();
const uploadImageService = require("../services/uploadImage");

router.post("/InsertToFolder", uploadImageService.upload.single("file"), function (req, res, next) {
  try {
    res.json(uploadImageService.SaveImageInDB(req.body.AlbumId,req.body.ImageName));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
}
);

router.post("/DeleteImage", async function (req, res, next) {
  console.log(req.body);
  try {
    res.json(await uploadImageService.DeleteImage(req.body));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get("/DeleteAllImages/:UserId", async function (req, res, next) {
  let UserId = req.params.UserId;
  try {
    res.json(await uploadImageService.DeleteAllImages(UserId));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

module.exports = router;
