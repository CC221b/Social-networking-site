const express = require("express");
const router = express.Router();
const profilePictureService = require("../services/profilePicture");

router.post(
  "/",
  profilePictureService.upload.single("file"),
  async function (req, res, next) {
    try {
      res.json({});
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  }
);

router.get("/DeleteProfilePicture/:ImageName",async function (req, res, next) {
    try {
      res.json(
        await profilePictureService.DeleteProfilePicture(req.params.ImageName)
      );
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  }
);

module.exports = router;
