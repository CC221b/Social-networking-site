const express = require("express");
const router = express.Router();
const friendsListService = require("../services/friendsList");

router.get("/:UserId", async function (req, res, next) {
  let UserId = req.params.UserId;
  try {
    res.json(await friendsListService.GetFriendList(UserId));
  } catch (err) {
    console.error(`The server can not get the friends list`, err.message);
    next(err);
  }
});

router.post("/addFriend", async function (req, res, next) {
  try {
    res.json(await friendsListService.addAFriend(req.body));
  } catch (err) {
    console.error(`The server can not get the friends list`, err.message);
    next(err);
  }
});

router.get("/:UserId/:FriendId", async function (req, res, next) {
  let UserId = req.params.UserId;
  let FriendId = req.params.FriendId;
  try {
    res.json(await friendsListService.existInTheFriendsList(UserId, FriendId));
  } catch (err) {
    console.error(`The server can not check if the friend exist in the friends list`, err.message);
    next(err);
  }
});

router.post("/removeAFriend", async function (req, res, next) {
  try {
    res.json(await friendsListService.removeAFriend(req.body));
  } catch (err) {
    console.error(`The server can not remove the friend to the friends list`, err.message);
    next(err);
  }
});

module.exports = router;
