const express = require("express");
const router = express.Router();
const followersListService = require("../services/followersList");

router.get("/:UserId", async function (req, res, next) {
  let UserId = req.params.UserId;
  try {
    res.json(await followersListService.GetFollowersList(UserId));
  } catch (err) {
    console.error(`The server can not get the followers list`, err.message);
    next(err);
  }
});

router.post("/removeAFollower", async function (req, res, next) {
  try {
    res.json(await followersListService.removeAFollower(req.body));
  } 
  catch (err) {
    console.error(`The server can not remove the friend to the friends list`, err.message);
    next(err);
  }
});

module.exports = router;
