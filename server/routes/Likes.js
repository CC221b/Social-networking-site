const express = require("express");
const router = express.Router();
const likesService = require("../services/Likes");


router.get("/insertLikeToLikesTable/:ImageId/:AlbumId/:UserId", async function (req, res, next) { 
    let ImageId =req.params.ImageId;
    let AlbumId = req.params.AlbumId;
    let UserId = req.params.UserId;
    try {
      res.json(await likesService.InsertLikeToLikesTable(ImageId, AlbumId, UserId));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  }
);

router.put("/updateLike/:ImageId/:AlbumId/:UserId/:IsLike", async function (req, res, next) { 
    let ImageId =req.params.ImageId;
    let AlbumId = req.params.AlbumId;
    let UserId = req.params.UserId;
    let IsLike = req.params.IsLike;
    try {
      res.json(await likesService.UpdateLike(ImageId, AlbumId, UserId, IsLike));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  }
);


module.exports = router;
