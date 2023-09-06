const express = require("express");
const router = express.Router();
const serveDataService = require("../services/serveData");

router.get("/serveAlbum/UserId/:UserId", async function (req, res, next) {
  let UserId = req.params.UserId;
  try {
    res.json(await serveDataService.GetAlbumWithUserId(UserId, req.query.page));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get("/servePublicUsers", async function (req, res, next) {
  try {
    res.json(await serveDataService.GetPublicUsers());
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get("/serveAllUsers", async function (req, res, next) {
  try {
    res.json(await serveDataService.serveAllUsers());
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.post("/serveAlbum/UserName/", async function (req, res, next) {
  let UserName = req.body.UserName;
  try {
    res.json(
      await serveDataService.GetAlbumWithUserName(UserName, req.query.page)
    );
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get("/serveUsers/:UserId", async function (req, res, next) {
  let UserId = req.params.UserId;
  try {
    res.json(await serveDataService.GetUsers(UserId));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get("/ServeAllImageAlbum", async function (req, res, next) {
  try {
    res.json(await serveDataService.GetAllImage(req.query.page));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get("/serveAlbum/friendAlbum/:UserId/:FollowerId",async function (req, res, next) {
    let UserId = req.params.UserId;
    let FollowerId = req.params.FollowerId;
    try {
      res.json(await serveDataService.GetFriendAlbumToUser(UserId,FollowerId,req.query.page));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  }
);

router.get("/serveAlbum/friendAlbum/:UserId/",async function (req, res, next) {
  let UserId = req.params.UserId;
  try {
    res.json(await serveDataService.GetFriendAlbumToGuestAndAdmin(UserId,req.query.page));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
}
);

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

module.exports = router;
